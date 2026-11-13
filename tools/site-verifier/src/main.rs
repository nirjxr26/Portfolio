use base64::prelude::*;
use regex::Regex;
use sha2::{Digest, Sha256};
use std::collections::{HashMap, HashSet};
use std::env;
use std::fs;
use std::path::{Path, PathBuf};
use std::time::Instant;

const VERSION: &str = env!("CARGO_PKG_VERSION");

struct Cli {
    dist: PathBuf,
    root: Option<PathBuf>,
    domain: Option<String>,
    manifests: Option<Vec<String>>,
    skip_csp: bool,
    skip_sitemap: bool,
    skip_llms: bool,
    warn_only: bool,
    quiet: bool,
}

impl Cli {
    fn print_help() {
        println!(
            "site-verifier {VERSION}
Blazing-fast zero-browser static site integrity auditor & CSP drift checker.

USAGE:
    site-verifier [OPTIONS] [DIST]

ARGS:
    <DIST>                       Path to built static directory [default: dist]

OPTIONS:
    -r, --root <ROOT>            Project root directory [default: auto-detected]
    -d, --domain <DOMAIN>        Canonical domain (e.g. https://example.com)
                                 [default: auto-detected from sitemap.xml]
    -m, --manifests <FILES>      Comma-separated list of security manifests to check
                                 [default: public/_headers, vercel.json, netlify.toml]
        --skip-csp               Skip Content Security Policy inline script hash audit
        --skip-sitemap           Skip sitemap.xml route auditing
        --skip-llms              Skip llms.txt route auditing
        --warn-only              Exit with code 0 even if integrity errors are found
    -q, --quiet                  Silence non-error output
    -h, --help                   Print help information
    -V, --version                Print version information

EXAMPLES:
    site-verifier dist
    site-verifier dist --domain https://example.com
    site-verifier dist --skip-csp --warn-only
"
        );
    }

    fn parse() -> Self {
        let args: Vec<String> = env::args().skip(1).collect();
        let mut dist: Option<PathBuf> = None;
        let mut root: Option<PathBuf> = None;
        let mut domain: Option<String> = None;
        let mut manifests: Option<Vec<String>> = None;
        let mut skip_csp = false;
        let mut skip_sitemap = false;
        let mut skip_llms = false;
        let mut warn_only = false;
        let mut quiet = false;

        let mut i = 0;
        while i < args.len() {
            let arg = &args[i];
            match arg.as_str() {
                "-h" | "--help" => {
                    Self::print_help();
                    std::process::exit(0);
                }
                "-V" | "--version" => {
                    println!("site-verifier {}", VERSION);
                    std::process::exit(0);
                }
                "-r" | "--root" => {
                    i += 1;
                    if i < args.len() {
                        root = Some(PathBuf::from(&args[i]));
                    }
                }
                "-d" | "--domain" => {
                    i += 1;
                    if i < args.len() {
                        domain = Some(args[i].clone());
                    }
                }
                "-m" | "--manifests" => {
                    i += 1;
                    if i < args.len() {
                        let list = args[i].split(',').map(|s| s.trim().to_string()).collect();
                        manifests = Some(list);
                    }
                }
                "--skip-csp" => skip_csp = true,
                "--skip-sitemap" => skip_sitemap = true,
                "--skip-llms" => skip_llms = true,
                "--warn-only" => warn_only = true,
                "-q" | "--quiet" => quiet = true,
                _ => {
                    if !arg.starts_with('-') && dist.is_none() {
                        dist = Some(PathBuf::from(arg));
                    }
                }
            }
            i += 1;
        }

        Self {
            dist: dist.unwrap_or_else(|| PathBuf::from("dist")),
            root,
            domain,
            manifests,
            skip_csp,
            skip_sitemap,
            skip_llms,
            warn_only,
            quiet,
        }
    }
}

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

/// Compute SHA-256 base64 hash in standard CSP format: `sha256-<base64>`
fn hash_script(content: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(content.as_bytes());
    let hash = hasher.finalize();
    format!("sha256-{}", BASE64_STANDARD.encode(hash))
}

/// Extract inline executable scripts from an HTML string
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

        // Skip non-executable data blocks like application/ld+json or importmap
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

/// Extract href and src references along with optional #fragment anchors
fn extract_references(html: &str, canonical_domain: Option<&str>) -> Vec<(String, Option<String>)> {
    let link_regex = Regex::new(r#"(?is)<(?:a|link)\b[^>]*\bhref\s*=\s*["']([^"']+)["']"#).unwrap();
    let src_regex = Regex::new(r#"(?is)<(?:script|img|source)\b[^>]*\bsrc\s*=\s*["']([^"']+)["']"#).unwrap();

    let mut links = Vec::new();

    let clean_domain = canonical_domain.map(|d| {
        d.trim()
            .trim_end_matches('/')
            .to_lowercase()
    });

    for cap in link_regex.captures_iter(html) {
        if let Some(href_match) = cap.get(1) {
            let raw_href = href_match.as_str().trim();

            if raw_href.starts_with("mailto:")
                || raw_href.starts_with("tel:")
                || raw_href.starts_with("javascript:")
                || raw_href.starts_with("data:")
                || raw_href.starts_with("blob:")
                || raw_href.is_empty()
            {
                continue;
            }

            // Strip canonical domain if present
            let path_to_eval = if let Some(ref domain) = clean_domain {
                let lower_href = raw_href.to_lowercase();
                if lower_href.starts_with(domain) {
                    let stripped = &raw_href[domain.len()..];
                    if stripped.is_empty() {
                        "/"
                    } else {
                        stripped
                    }
                } else if raw_href.starts_with("http://") || raw_href.starts_with("https://") {
                    continue; // External domain
                } else {
                    raw_href
                }
            } else if raw_href.starts_with("http://") || raw_href.starts_with("https://") {
                continue; // External link
            } else {
                raw_href
            };

            // Remove query parameters before checking target file
            let (without_query, anchor_part) = if let Some((base, rest)) = path_to_eval.split_once('?') {
                if let Some((_, anchor)) = rest.split_once('#') {
                    (base, Some(anchor.to_string()))
                } else {
                    (base, None)
                }
            } else if let Some((path_part, anchor)) = path_to_eval.split_once('#') {
                (path_part, Some(anchor.to_string()))
            } else {
                (path_to_eval, None)
            };

            links.push((percent_decode(without_query), anchor_part));
        }
    }

    for cap in src_regex.captures_iter(html) {
        if let Some(src_match) = cap.get(1) {
            let raw_src = src_match.as_str().trim();
            if raw_src.starts_with("http://")
                || raw_src.starts_with("https://")
                || raw_src.starts_with("data:")
                || raw_src.is_empty()
            {
                continue;
            }
            let (without_query, _) = raw_src.split_once('?').unwrap_or((raw_src, ""));
            links.push((percent_decode(without_query), None));
        }
    }

    links
}

/// Simple percent decoder for URLs (e.g. "%20" -> " ")
fn percent_decode(s: &str) -> String {
    let mut result = String::with_capacity(s.len());
    let mut chars = s.chars().peekable();

    while let Some(c) = chars.next() {
        if c == '%' {
            let h1 = chars.next();
            let h2 = chars.next();
            if let (Some(h1), Some(h2)) = (h1, h2) {
                if let Ok(byte) = u8::from_str_radix(&format!("{}{}", h1, h2), 16) {
                    result.push(byte as char);
                    continue;
                } else {
                    result.push('%');
                    result.push(h1);
                    result.push(h2);
                    continue;
                }
            }
        }
        result.push(c);
    }
    result
}

/// Extract all element IDs and names for anchor target verification
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

/// Load rewrite/redirect rules from vercel.json, _redirects, or netlify.toml
fn load_rewrites(root: &Path, dist: &Path) -> HashMap<String, String> {
    let mut map = HashMap::new();

    // 1. Check vercel.json
    for dir in [root, dist] {
        let vercel_path = dir.join("vercel.json");
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
    }

    // 2. Check _redirects (Netlify / Cloudflare Pages)
    for p in [
        root.join("_redirects"),
        root.join("public").join("_redirects"),
        dist.join("_redirects"),
    ] {
        if let Ok(content) = fs::read_to_string(&p) {
            for line in content.lines() {
                let trimmed = line.trim();
                if trimmed.is_empty() || trimmed.starts_with('#') {
                    continue;
                }
                let parts: Vec<&str> = trimmed.split_whitespace().collect();
                if parts.len() >= 2 {
                    let s = parts[0].trim_start_matches('/').to_string();
                    let d = parts[1].trim_start_matches('/').to_string();
                    map.insert(s, d);
                }
            }
        }
    }

    map
}

/// Auto-detect site domain from sitemap.xml if not explicitly provided
fn auto_detect_domain(dist: &Path) -> Option<String> {
    let sitemap_path = dist.join("sitemap.xml");
    if let Ok(content) = fs::read_to_string(&sitemap_path) {
        let loc_regex = Regex::new(r"<loc>(https?://[^/<]+)").unwrap();
        if let Some(cap) = loc_regex.captures(&content) {
            if let Some(domain_match) = cap.get(1) {
                return Some(domain_match.as_str().to_string());
            }
        }
    }
    None
}

/// Recursively collect all .html files within a directory
fn collect_html_files(dir: &Path, html_files: &mut Vec<PathBuf>) {
    if let Ok(entries) = fs::read_dir(dir) {
        for entry in entries.flatten() {
            let path = entry.path();
            if path.is_dir() {
                collect_html_files(&path, html_files);
            } else if path.extension().map_or(false, |ext| ext == "html" || ext == "htm") {
                html_files.push(path);
            }
        }
    }
}

/// Check if a path exists within the dist folder, accounting for clean URLs and rewrites
fn path_exists_in_dist(dist: &Path, clean_target: &str, rewrites: &HashMap<String, String>) -> bool {
    if clean_target.is_empty() {
        return dist.join("index.html").is_file();
    }

    if let Some(target) = rewrites.get(clean_target) {
        return path_exists_in_dist(dist, target, rewrites);
    }

    // Edge API endpoint check (e.g., api/status -> api/status.ts or api/status.js in root)
    if clean_target.starts_with("api/") {
        let root = dist.parent().unwrap_or(Path::new("."));
        let as_ts = root.join(format!("{}.ts", clean_target));
        let as_js = root.join(format!("{}.js", clean_target));
        if as_ts.is_file() || as_js.is_file() {
            return true;
        }
    }

    let direct = dist.join(clean_target);
    let as_index = dist.join(clean_target).join("index.html");
    let with_html = dist.join(format!("{}.html", clean_target));

    direct.is_file() || direct.is_dir() || as_index.is_file() || with_html.is_file()
}

/// Verify that inline executable scripts in index.html match CSP hashes in headers/manifests
fn verify_csp_integrity(
    root: &Path,
    dist: &Path,
    custom_manifests: Option<&[String]>,
    report: &mut VerificationReport,
) {
    let index_html_path = if dist.join("index.html").is_file() {
        dist.join("index.html")
    } else if root.join("index.html").is_file() {
        root.join("index.html")
    } else {
        report
            .errors
            .push("index.html not found in build directory or project root".to_string());
        return;
    };

    let index_html = match fs::read_to_string(&index_html_path) {
        Ok(c) => c,
        Err(e) => {
            report
                .errors
                .push(format!("Failed to read {}: {}", index_html_path.display(), e));
            return;
        }
    };

    let scripts = extract_inline_scripts(&index_html);
    if scripts.is_empty() {
        return;
    }

    let calculated_hashes: Vec<String> = scripts.iter().map(|s| hash_script(s)).collect();
    report.inline_scripts_checked += calculated_hashes.len();

    let default_manifests = [
        "public/_headers",
        "_headers",
        "dist/_headers",
        "vercel.json",
        "netlify.toml",
    ];

    let manifest_paths: Vec<PathBuf> = if let Some(user_list) = custom_manifests {
        user_list.iter().map(|m| root.join(m)).collect()
    } else {
        default_manifests
            .iter()
            .map(|m| root.join(m))
            .filter(|p| p.is_file())
            .collect()
    };

    if manifest_paths.is_empty() {
        return;
    }

    for manifest_path in &manifest_paths {
        if !manifest_path.exists() {
            report
                .errors
                .push(format!("Security manifest missing: {}", manifest_path.display()));
            continue;
        }

        let manifest_content = match fs::read_to_string(manifest_path) {
            Ok(c) => c,
            Err(e) => {
                report.errors.push(format!(
                    "Failed to read security manifest {}: {}",
                    manifest_path.display(),
                    e
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

/// Verify all internal links, assets, and DOM anchor targets (#fragments) across all HTML files
fn verify_dist_links(
    dist: &Path,
    canonical_domain: Option<&str>,
    rewrites: &HashMap<String, String>,
    report: &mut VerificationReport,
) {
    let mut html_files = Vec::new();
    let mut file_ids_cache: HashMap<PathBuf, HashSet<String>> = HashMap::new();

    collect_html_files(dist, &mut html_files);
    report.files_scanned = html_files.len();

    // First pass: index all HTML ids and anchor names for instantaneous fragment lookup
    for file_path in &html_files {
        if let Ok(content) = fs::read_to_string(file_path) {
            let ids = extract_ids(&content);
            file_ids_cache.insert(file_path.clone(), ids);
        }
    }

    // Second pass: verify every link reference and anchor target
    for file_path in &html_files {
        let content = match fs::read_to_string(file_path) {
            Ok(c) => c,
            Err(_) => continue,
        };

        let links = extract_references(&content, canonical_domain);

        for (target_path, anchor) in links {
            report.links_verified += 1;

            // Same-page fragment (#section)
            let target_file = if target_path.is_empty() {
                file_path.clone()
            } else {
                let clean_target = target_path.trim_start_matches('/');
                let effective_clean = rewrites
                    .get(clean_target)
                    .map(|s| s.as_str())
                    .unwrap_or(clean_target);

                let direct = dist.join(effective_clean);
                let as_index = dist.join(effective_clean).join("index.html");
                let with_html = dist.join(format!("{}.html", effective_clean));

                let is_api_endpoint = if clean_target.starts_with("api/") {
                    let root = dist.parent().unwrap_or(Path::new("."));
                    root.join(format!("{}.ts", clean_target)).is_file()
                        || root.join(format!("{}.js", clean_target)).is_file()
                } else {
                    false
                };

                if direct.is_file() {
                    direct
                } else if as_index.is_file() {
                    as_index
                } else if with_html.is_file() {
                    with_html
                } else if effective_clean.is_empty() {
                    dist.join("index.html")
                } else if is_api_endpoint {
                    continue;
                } else {
                    report.errors.push(format!(
                        "Broken link/asset in '{}': target '{}' not found in build directory",
                        file_path.display(),
                        target_path
                    ));
                    continue;
                }
            };

            // If anchor fragment is present, verify target HTML file contains an element with that ID
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

/// Verify that every <loc> in sitemap.xml corresponds to a built HTML page
fn verify_sitemap_urls(
    dist: &Path,
    canonical_domain: Option<&str>,
    rewrites: &HashMap<String, String>,
    report: &mut VerificationReport,
) {
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

                let relative_path = if let Some(domain) = canonical_domain {
                    url.strip_prefix(domain)
                } else {
                    url.split_once("://")
                        .and_then(|(_, rest)| rest.split_once('/').map(|(_, path)| path))
                };

                if let Some(rel) = relative_path {
                    let clean = rel.trim_start_matches('/');
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

/// Verify that every URL referenced in llms.txt exists in the build output
fn verify_llms_urls(
    dist: &Path,
    canonical_domain: Option<&str>,
    rewrites: &HashMap<String, String>,
    report: &mut VerificationReport,
) {
    let llms_path = dist.join("llms.txt");
    if !llms_path.exists() {
        return;
    }

    if let Ok(content) = fs::read_to_string(&llms_path) {
        let pattern = if let Some(domain) = canonical_domain {
            let escaped = regex::escape(domain.trim_end_matches('/'));
            format!(r"{}([a-zA-Z0-9_\-\./]*)", escaped)
        } else {
            r"https?://[^/\s\)]+([a-zA-Z0-9_\-\./]*)".to_string()
        };

        if let Ok(url_regex) = Regex::new(&pattern) {
            for cap in url_regex.captures_iter(&content) {
                if let Some(path_match) = cap.get(1) {
                    let raw_path = path_match.as_str();
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
}

fn main() {
    let start_time = Instant::now();
    let cli = Cli::parse();

    let dist = cli.dist;
    let root = cli.root.unwrap_or_else(|| {
        if Path::new("package.json").exists() || Path::new("vercel.json").exists() || Path::new("index.html").exists() {
            PathBuf::from(".")
        } else if let Some(parent) = dist.parent() {
            if parent.exists() && parent != Path::new("") {
                parent.to_path_buf()
            } else {
                PathBuf::from(".")
            }
        } else {
            PathBuf::from(".")
        }
    });

    if !cli.quiet {
        println!("🔍 Checking build integrity with Parapet...\n");
    }

    if !dist.exists() {
        eprintln!(
            "❌ Error: Build directory '{}' does not exist.\nPlease run your static build (e.g., `npm run build` or `vite build`) first.",
            dist.display()
        );
        std::process::exit(2);
    }

    // Determine domain (CLI flag > auto-detection from sitemap)
    let domain = cli.domain.or_else(|| auto_detect_domain(&dist));
    let rewrites = load_rewrites(&root, &dist);
    let mut report = VerificationReport::new();

    // 1. CSP Inline Script Hash Drift Audit
    if !cli.skip_csp {
        verify_csp_integrity(
            &root,
            &dist,
            cli.manifests.as_deref(),
            &mut report,
        );
    }

    // 2. Dist Links & Anchor Verification
    verify_dist_links(&dist, domain.as_deref(), &rewrites, &mut report);

    // 3. Sitemap Verification
    if !cli.skip_sitemap {
        verify_sitemap_urls(&dist, domain.as_deref(), &rewrites, &mut report);
    }

    // 4. LLMs.txt Verification
    if !cli.skip_llms {
        verify_llms_urls(&dist, domain.as_deref(), &rewrites, &mut report);
    }

    let elapsed = start_time.elapsed();

    // Formatted audit report
    let no_color = env::var("NO_COLOR").is_ok();
    let green = if no_color { "" } else { "\x1b[32m" };
    let red = if no_color { "" } else { "\x1b[31m" };
    let reset = if no_color { "" } else { "\x1b[0m" };

    if !cli.quiet {
        println!("══════════════════════════════════════════════════════════");
        println!("  PARAPET INTEGRITY REPORT");
        println!("══════════════════════════════════════════════════════════");
        println!("  HTML Pages Scanned:      {}", report.files_scanned);
        println!("  Links & Assets Checked:  {}", report.links_verified);
        println!("  Sitemap URLs Verified:   {}", report.sitemap_urls_verified);
        println!("  LLMs.txt URLs Verified:  {}", report.llms_urls_verified);
        println!("  Inline Scripts Audited:  {}", report.inline_scripts_checked);
        println!("  Elapsed Time:            {:.2?}", elapsed);
    }

    if report.errors.is_empty() {
        if !cli.quiet {
            println!(
                "\n  Status: {}[ PASSED ] All links, assets, sitemap URLs, and CSP hashes verified.{}\n",
                green, reset
            );
        }
        std::process::exit(0);
    } else {
        eprintln!(
            "\n  Status: {}[ FAILED ] Found {} integrity issues:{}{}",
            red,
            report.errors.len(),
            reset,
            "\n"
        );
        for err in &report.errors {
            eprintln!("  ❌ {}", err);
        }
        eprintln!();

        if cli.warn_only {
            std::process::exit(0);
        } else {
            std::process::exit(1);
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_percent_decode() {
        assert_eq!(percent_decode("hello%20world"), "hello world");
        assert_eq!(percent_decode("normal_text"), "normal_text");
        assert_eq!(percent_decode("trailing%20"), "trailing ");
    }

    #[test]
    fn test_hash_script() {
        let script = "console.log('test');";
        let hash = hash_script(script);
        assert!(hash.starts_with("sha256-"));
        assert_eq!(hash.len(), 51);
    }

    #[test]
    fn test_extract_inline_scripts() {
        let html = r#"
            <html>
                <head>
                    <script src="/external.js"></script>
                    <script type="application/ld+json">{"@context": "https://schema.org"}</script>
                    <script>
                        const theme = 'dark';
                    </script>
                </head>
            </html>
        "#;
        let scripts = extract_inline_scripts(html);
        assert_eq!(scripts.len(), 1);
        assert!(scripts[0].contains("const theme = 'dark';"));
    }

    #[test]
    fn test_extract_ids() {
        let html = r#"
            <div id="hero"></div>
            <section id="features" class="container"></section>
            <a name="legacy-anchor"></a>
        "#;
        let ids = extract_ids(html);
        assert!(ids.contains("hero"));
        assert!(ids.contains("features"));
        assert!(ids.contains("legacy-anchor"));
        assert!(!ids.contains("container"));
    }

    #[test]
    fn test_extract_references() {
        let html = r#"
            <a href="/about">About</a>
            <a href="/pricing#faq">FAQ</a>
            <a href="https://nirjar.me/works#demo">Works Demo</a>
            <a href="https://google.com">External</a>
            <img src="/logo.svg" />
        "#;
        let refs = extract_references(html, Some("https://nirjar.me"));
        let mut map: HashMap<String, Option<String>> = HashMap::new();
        for (path, anchor) in refs {
            map.insert(path, anchor);
        }

        assert_eq!(map.get("/about"), Some(&None));
        assert_eq!(map.get("/pricing"), Some(&Some("faq".to_string())));
        assert_eq!(map.get("/works"), Some(&Some("demo".to_string())));
        assert_eq!(map.get("/logo.svg"), Some(&None));
        assert!(!map.contains_key("https://google.com"));
    }
}
