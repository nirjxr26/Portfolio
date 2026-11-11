use base64::prelude::*;
use regex::Regex;
use sha2::{Digest, Sha256};
use std::collections::{HashMap, HashSet};
use std::env;
use std::fs;
use std::path::{Path, PathBuf};
use std::time::Instant;

struct VerificationReport {
    files_scanned: usize,
    links_verified: usize,
    sitemap_urls_verified: usize,
    llms_urls_verified: usize,
    inline_scripts_checked: usize,
    errors: Vec<String>,
}

impl VerificationReport {
    fn new() -> Self {
        Self {
            files_scanned: 0,
            links_verified: 0,
            sitemap_urls_verified: 0,
            llms_urls_verified: 0,
            inline_scripts_checked: 0,
            errors: Vec::new(),
        }
    }
}

fn hash_script(content: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(content.as_bytes());
    let hash = hasher.finalize();
    format!("sha256-{}", BASE64_STANDARD.encode(hash))
}

fn extract_inline_scripts(html: &str) -> Vec<String> {
    let script_regex = Regex::new(r"(?is)<script\b([^>]*)>(.*?)</script\b[^>]*>").unwrap();
    let src_regex = Regex::new(r"(?i)\bsrc\s*=").unwrap();
    let type_regex = Regex::new(r#"(?i)\btype\s*=\s*["']?([^"'\s>]+)"#).unwrap();

    let mut scripts = Vec::new();

    for cap in script_regex.captures_iter(html) {
        let attrs = cap.get(1).map_or("", |m| m.as_str());
        let body = cap.get(2).map_or("", |m| m.as_str());

        // Skip external scripts
        if src_regex.is_match(attrs) {
            continue;
        }

        // Skip non-executable data blocks like application/ld+json
        if let Some(type_cap) = type_regex.captures(attrs) {
            let script_type = type_cap.get(1).map_or("", |m| m.as_str()).to_lowercase();
            if script_type == "application/ld+json"
                || script_type == "application/json"
                || script_type == "importmap"
                || script_type == "speculationrules"
            {
                continue;
            }
            if !script_type.is_empty()
                && script_type != "text/javascript"
                && script_type != "module"
            {
                continue;
            }
        }

        if !body.trim().is_empty() {
            scripts.push(body.to_string());
        }
    }

    scripts
}

fn extract_references(html: &str) -> Vec<(String, Option<String>)> {
    let link_regex = Regex::new(r#"(?is)<(?:a|link)\b[^>]*\bhref\s*=\s*["']([^"']+)["']"#).unwrap();
    let script_src_regex = Regex::new(r#"(?is)<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["']"#).unwrap();

    let mut links = Vec::new();

    for cap in link_regex.captures_iter(html) {
        if let Some(href_match) = cap.get(1) {
            let raw_href = href_match.as_str().trim();

            if raw_href.starts_with("mailto:")
                || raw_href.starts_with("tel:")
                || raw_href.starts_with("javascript:")
                || raw_href.is_empty()
            {
                continue;
            }

            // If it's a nirjar.me canonical URL, convert to local path
            let path_to_eval = if let Some(stripped) = raw_href.strip_prefix("https://nirjar.me") {
                if stripped.is_empty() {
                    "/"
                } else {
                    stripped
                }
            } else if raw_href.starts_with("http://") || raw_href.starts_with("https://") {
                continue; // External link
            } else {
                raw_href
            };

            // Split path and fragment anchor
            if let Some((path_part, anchor_part)) = path_to_eval.split_once('#') {
                links.push((path_part.to_string(), Some(anchor_part.to_string())));
            } else {
                links.push((path_to_eval.to_string(), None));
            }
        }
    }

    for cap in script_src_regex.captures_iter(html) {
        if let Some(src_match) = cap.get(1) {
            let raw_src = src_match.as_str().trim();
            if raw_src.starts_with("http://") || raw_src.starts_with("https://") {
                continue;
            }
            links.push((raw_src.to_string(), None));
        }
    }

    links
}

fn extract_ids(html: &str) -> HashSet<String> {
    let id_regex = Regex::new(r#"(?is)\b(?:id|name)\s*=\s*["']([^"'\s>]+)["']"#).unwrap();
    let mut ids = HashSet::new();

    for cap in id_regex.captures_iter(html) {
        if let Some(id_match) = cap.get(1) {
            ids.insert(id_match.as_str().to_string());
        }
    }

    ids
}

fn load_rewrites(root: &Path) -> HashMap<String, String> {
    let mut map = HashMap::new();
    let vercel_path = root.join("vercel.json");
    if let Ok(content) = fs::read_to_string(&vercel_path) {
        let re = Regex::new(r#""source"\s*:\s*"([^"]+)"\s*,\s*"destination"\s*:\s*"([^"]+)""#).unwrap();
        for cap in re.captures_iter(&content) {
            if let (Some(src), Some(dst)) = (cap.get(1), cap.get(2)) {
                let s = src.as_str().trim_start_matches('/').to_string();
                let d = dst.as_str().trim_start_matches('/').to_string();
                map.insert(s, d);
            }
        }
    }
    map
}

fn verify_csp_integrity(root: &Path, report: &mut VerificationReport) {
    let index_html_path = root.join("index.html");
    if !index_html_path.exists() {
        report
            .errors
            .push("index.html not found in project root".to_string());
        return;
    }

    let index_html = match fs::read_to_string(&index_html_path) {
        Ok(c) => c,
        Err(e) => {
            report
                .errors
                .push(format!("Failed to read index.html: {}", e));
            return;
        }
    };

    let scripts = extract_inline_scripts(&index_html);
    if scripts.is_empty() {
        report
            .errors
            .push("No executable inline scripts found in index.html to verify".to_string());
        return;
    }

    let calculated_hashes: Vec<String> = scripts.iter().map(|s| hash_script(s)).collect();
    report.inline_scripts_checked += calculated_hashes.len();

    let manifests = ["public/_headers", "vercel.json"];

    for manifest_name in manifests {
        let manifest_path = root.join(manifest_name);
        if !manifest_path.exists() {
            report
                .errors
                .push(format!("Security manifest missing: {}", manifest_name));
            continue;
        }

        let manifest_content = match fs::read_to_string(&manifest_path) {
            Ok(c) => c,
            Err(e) => {
                report.errors.push(format!(
                    "Failed to read security manifest {}: {}",
                    manifest_name, e
                ));
                continue;
            }
        };

        for hash in &calculated_hashes {
            let single_quote_pattern = format!("'{}'", hash);
            if !manifest_content.contains(&single_quote_pattern) {
                report.errors.push(format!(
                    "Security Manifest Drift: {} is missing inline script hash '{}'",
                    manifest_path.display(),
                    hash
                ));
            }
        }
    }
}

fn collect_html_files(dir: &Path, html_files: &mut Vec<PathBuf>) {
    if let Ok(entries) = fs::read_dir(dir) {
        for entry in entries.flatten() {
            let path = entry.path();
            if path.is_dir() {
                collect_html_files(&path, html_files);
            } else if path.extension().map_or(false, |ext| ext == "html") {
                html_files.push(path);
            }
        }
    }
}

fn path_exists_in_dist(dist: &Path, clean_target: &str, rewrites: &HashMap<String, String>) -> bool {
    if clean_target.is_empty() {
        return dist.join("index.html").is_file();
    }

    if let Some(target) = rewrites.get(clean_target) {
        return path_exists_in_dist(dist, target, rewrites);
    }

    let direct = dist.join(clean_target);
    let as_index = dist.join(clean_target).join("index.html");
    let with_html = dist.join(format!("{}.html", clean_target));

    direct.is_file() || direct.is_dir() || as_index.is_file() || with_html.is_file()
}

fn verify_dist_links(dist: &Path, rewrites: &HashMap<String, String>, report: &mut VerificationReport) {
    if !dist.exists() {
        report
            .errors
            .push(format!("Build directory does not exist: {}", dist.display()));
        return;
    }

    let mut html_files = Vec::new();
    let mut file_ids_cache: HashMap<PathBuf, HashSet<String>> = HashMap::new();

    collect_html_files(dist, &mut html_files);
    report.files_scanned = html_files.len();

    // First pass: index all HTML ids for anchor verification
    for file_path in &html_files {
        if let Ok(content) = fs::read_to_string(file_path) {
            let ids = extract_ids(&content);
            file_ids_cache.insert(file_path.clone(), ids);
        }
    }

    // Second pass: verify references & anchors
    for file_path in &html_files {
        let content = match fs::read_to_string(file_path) {
            Ok(c) => c,
            Err(_) => continue,
        };

        let links = extract_references(&content);

        for (target_path, anchor) in links {
            report.links_verified += 1;

            // Resolve target file
            let target_file = if target_path.is_empty() {
                // Same-page anchor (#something)
                file_path.clone()
            } else {
                let clean_target = target_path.trim_start_matches('/');
                let effective_clean = rewrites.get(clean_target).map(|s| s.as_str()).unwrap_or(clean_target);

                let direct = dist.join(effective_clean);
                let as_index = dist.join(effective_clean).join("index.html");
                let with_html = dist.join(format!("{}.html", effective_clean));

                if direct.is_file() {
                    direct
                } else if as_index.is_file() {
                    as_index
                } else if with_html.is_file() {
                    with_html
                } else if effective_clean.is_empty() {
                    dist.join("index.html")
                } else {
                    report.errors.push(format!(
                        "Broken link/asset in '{}': target '{}' not found in build directory",
                        file_path.display(),
                        target_path
                    ));
                    continue;
                }
            };

            // If anchor is specified, verify it exists in target
            if let Some(ref anchor_id) = anchor {
                if let Some(ids) = file_ids_cache.get(&target_file) {
                    if !ids.contains(anchor_id) {
                        report.errors.push(format!(
                            "Broken anchor in '{}': target '{}#{}' missing element with id='{}'",
                            file_path.display(),
                            target_path,
                            anchor_id,
                            anchor_id
                        ));
                    }
                }
            }
        }
    }
}

fn verify_sitemap_urls(dist: &Path, rewrites: &HashMap<String, String>, report: &mut VerificationReport) {
    let sitemap_path = dist.join("sitemap.xml");
    if !sitemap_path.exists() {
        return;
    }

    if let Ok(content) = fs::read_to_string(&sitemap_path) {
        let loc_regex = Regex::new(r"<loc>(https?://[^<]+)</loc>").unwrap();
        for cap in loc_regex.captures_iter(&content) {
            if let Some(loc) = cap.get(1) {
                let url = loc.as_str().trim();
                report.sitemap_urls_verified += 1;

                if let Some(relative_path) = url.strip_prefix("https://nirjar.me") {
                    let clean = relative_path.trim_start_matches('/');
                    if !path_exists_in_dist(dist, clean, rewrites) {
                        report.errors.push(format!(
                            "Sitemap contains broken route '{}': target '{}' not found in build directory",
                            url, clean
                        ));
                    }
                }
            }
        }
    }
}

fn verify_llms_urls(dist: &Path, rewrites: &HashMap<String, String>, report: &mut VerificationReport) {
    let llms_path = dist.join("llms.txt");
    if !llms_path.exists() {
        return;
    }

    if let Ok(content) = fs::read_to_string(&llms_path) {
        let url_regex = Regex::new(r"https://nirjar\.me([a-zA-Z0-9_\-\./]*)").unwrap();
        for cap in url_regex.captures_iter(&content) {
            if let Some(path_match) = cap.get(1) {
                let raw_path = path_match.as_str();
                // strip trailing markdown syntax or punctuation if captured
                let clean = raw_path
                    .trim_matches(|c: char| c == ')' || c == ']' || c == '.' || c == ',' || c == '"' || c == '\'')
                    .trim_start_matches('/');

                report.llms_urls_verified += 1;
                if !path_exists_in_dist(dist, clean, rewrites) {
                    report.errors.push(format!(
                        "llms.txt references non-existent site path: '/{}'",
                        clean
                    ));
                }
            }
        }
    }
}

fn main() {
    let start_time = Instant::now();
    println!("🔍 Starting Rust Site Verifier & Security Auditor...");

    let args: Vec<String> = env::args().collect();
    let root = Path::new(".");
    let dist_dir_name = if args.len() > 1 { &args[1] } else { "dist" };
    let dist = root.join(dist_dir_name);

    let rewrites = load_rewrites(root);
    let mut report = VerificationReport::new();

    // 1. Audit CSP & Inline Script Hashes
    verify_csp_integrity(root, &mut report);

    // 2. Audit Dist Link, Asset, Anchor, Sitemap, and LLMS Integrity
    if dist.exists() {
        verify_dist_links(&dist, &rewrites, &mut report);
        verify_sitemap_urls(&dist, &rewrites, &mut report);
        verify_llms_urls(&dist, &rewrites, &mut report);
    } else {
        println!("⚠️  Note: '{}' directory not found. Run `npm run build` to verify generated HTML.", dist.display());
    }

    let elapsed = start_time.elapsed();

    println!("\n══════════════════════════════════════════════════════════");
    println!("  RUST VERIFICATION & INTEGRITY AUDIT REPORT");
    println!("══════════════════════════════════════════════════════════");
    println!("  HTML Pages Scanned:      {}", report.files_scanned);
    println!("  Links & Assets Checked:  {}", report.links_verified);
    println!("  Sitemap URLs Verified:   {}", report.sitemap_urls_verified);
    println!("  LLMs.txt URLs Verified:  {}", report.llms_urls_verified);
    println!("  Inline Scripts Audited:  {}", report.inline_scripts_checked);
    println!("  Elapsed Time:            {:.2?}", elapsed);

    if report.errors.is_empty() {
        println!("\n  Status: \x1b[32m[ PASSED ] All links, assets, sitemap URLs, and CSP hashes verified.\x1b[0m\n");
        std::process::exit(0);
    } else {
        println!("\n  Status: \x1b[31m[ FAILED ] Found {} integrity issues:\x1b[0m", report.errors.len());
        for err in &report.errors {
            println!("  ❌ {}", err);
        }
        println!();
        std::process::exit(1);
    }
}
