use std::env;
use std::fs;
use std::path::Path;

#[derive(Clone, Debug, PartialEq)]
enum TokenKind {
    Plain,
    Comment,
    String,
    Keyword,
    Control,
    Type,
    Function,
    Macro,
    Ident,
    Number,
    Pass,
    Fail,
    Rule,
    Title,
}

impl TokenKind {
    fn as_str(&self) -> &'static str {
        match self {
            TokenKind::Plain => "plain",
            TokenKind::Comment => "comment",
            TokenKind::String => "string",
            TokenKind::Keyword => "keyword",
            TokenKind::Control => "control",
            TokenKind::Type => "type",
            TokenKind::Function => "function",
            TokenKind::Macro => "macro",
            TokenKind::Ident => "ident",
            TokenKind::Number => "number",
            TokenKind::Pass => "pass",
            TokenKind::Fail => "fail",
            TokenKind::Rule => "rule",
            TokenKind::Title => "title",
        }
    }
}

#[derive(Clone, Debug)]
pub struct CodeToken {
    kind: TokenKind,
    text: String,
}

#[derive(Clone, Debug)]
struct ListItem {
    text: String,
    blocks: Vec<MdNode>,
}

#[derive(Clone, Debug)]
enum MdNode {
    Para { text: String },
    Heading { level: usize, text: String },
    Code { lang: String, code: String, tokens: Vec<CodeToken> },
    Quote { paragraphs: Vec<String> },
    Image { src: String, alt: String },
    Table { head: Vec<String>, rows: Vec<Vec<String>> },
    List { ordered: bool, items: Vec<ListItem> },
}

fn push_token(tokens: &mut Vec<CodeToken>, kind: TokenKind, text: &str) {
    if text.is_empty() {
        return;
    }
    if let Some(last) = tokens.last_mut() {
        if last.kind == kind {
            last.text.push_str(text);
            return;
        }
    }
    tokens.push(CodeToken {
        kind,
        text: text.to_string(),
    });
}

fn is_control_keyword(word: &str) -> bool {
    matches!(
        word,
        "for" | "in" | "if" | "else" | "return" | "match" | "while" | "loop" | "break"
            | "continue" | "await" | "try" | "catch" | "throw" | "where" | "as"
    )
}

fn is_keyword(word: &str) -> bool {
    matches!(
        word,
        // Rust
        "fn" | "let" | "mut" | "struct" | "impl"
            | "pub" | "const" | "type" | "use" | "mod" | "crate"
            | "enum" | "trait" | "async"
            // TS / JS
            | "import" | "export" | "from" | "default" | "function" | "interface" | "extends"
            | "true" | "false" | "null" | "undefined" | "new"
            // SQL
            | "SELECT" | "FROM" | "WHERE" | "INSERT" | "INTO" | "UPDATE" | "DELETE" | "CREATE"
            | "ROLE" | "DATABASE" | "OWNER" | "LOGIN" | "SHOW" | "SET" | "WITH" | "GRANT"
            | "REVOKE" | "ALTER" | "DROP" | "ON" | "TO" | "AND" | "OR" | "NOT"
    )
}

fn is_type_ident(word: &str) -> bool {
    matches!(
        word,
        "String" | "Path" | "PathBuf" | "HashMap" | "HashSet" | "Sha256" | "Regex" | "Vec"
            | "Option" | "Some" | "None" | "Result" | "Ok" | "Err" | "bool" | "usize" | "u8"
            | "u16" | "u32" | "u64" | "i32" | "i64" | "str" | "Self" | "VerificationReport"
            | "Promise" | "Record" | "Readonly" | "ReactNode" | "Uint8Array"
            // HTTP / CSP
            | "Content-Security-Policy" | "default-src" | "script-src" | "style-src" | "img-src"
    )
}

fn is_macro_ident(word: &str) -> bool {
    matches!(word, "format" | "println" | "eprintln" | "panic" | "vec" | "assert" | "matches")
}

fn highlight_terminal_line(tokens: &mut Vec<CodeToken>, line: &str) {
    if let Some(idx) = line.find("[ PASSED ]") {
        push_token(tokens, TokenKind::Plain, &line[..idx]);
        push_token(tokens, TokenKind::Pass, &line[idx..]);
    } else if let Some(idx) = line.find("[ FAILED ]") {
        push_token(tokens, TokenKind::Plain, &line[..idx]);
        push_token(tokens, TokenKind::Fail, &line[idx..]);
    } else if line.trim_start().starts_with('═') || line.trim_start().starts_with('─') {
        push_token(tokens, TokenKind::Rule, line);
    } else if line.contains("PARAPET INTEGRITY REPORT")
        || line.contains("RUST VERIFICATION & INTEGRITY AUDIT REPORT")
    {
        push_token(tokens, TokenKind::Title, line);
    } else {
        push_token(tokens, TokenKind::Plain, line);
    }
}

pub fn tokenize_code(code: &str, lang: &str) -> Vec<CodeToken> {
    let mut tokens = Vec::new();
    let norm = lang.trim().to_ascii_lowercase();

    if norm.is_empty() || norm == "text" || norm == "plain" {
        if code.contains("[ PASSED ]") || code.contains("[ FAILED ]") || code.contains("════") {
            let lines: Vec<&str> = code.split('\n').collect();
            for (idx, line) in lines.iter().enumerate() {
                highlight_terminal_line(&mut tokens, line);
                if idx + 1 < lines.len() {
                    push_token(&mut tokens, TokenKind::Plain, "\n");
                }
            }
            return tokens;
        }
        push_token(&mut tokens, TokenKind::Plain, code);
        return tokens;
    }

    if norm == "pipeline" || (norm == "diagram" && (code.contains('→') || code.contains("->"))) {
        push_token(&mut tokens, TokenKind::Plain, code);
        return tokens;
    }

    let bytes = code.as_bytes();
    let mut i = 0usize;
    let n = bytes.len();

    while i < n {
        // Line comment: // or #
        if (bytes[i] == b'/' && i + 1 < n && bytes[i + 1] == b'/') || bytes[i] == b'#' {
            let start = i;
            while i < n && bytes[i] != b'\n' {
                i += 1;
            }
            push_token(&mut tokens, TokenKind::Comment, &code[start..i]);
            continue;
        }

        // Block comment: /* ... */
        if bytes[i] == b'/' && i + 1 < n && bytes[i + 1] == b'*' {
            let start = i;
            i += 2;
            while i + 1 < n && !(bytes[i] == b'*' && bytes[i + 1] == b'/') {
                i += 1;
            }
            i = (i + 2).min(n);
            push_token(&mut tokens, TokenKind::Comment, &code[start..i]);
            continue;
        }

        // Quoted string: "..." or '...'
        if bytes[i] == b'"' || bytes[i] == b'\'' {
            let quote = bytes[i];
            let start = i;
            i += 1;
            let mut closed = false;
            while i < n {
                if bytes[i] == b'\\' && quote == b'"' && i + 1 < n {
                    i += 2;
                    continue;
                }
                if bytes[i] == quote {
                    i += 1;
                    closed = true;
                    break;
                }
                if bytes[i] == b'\n' {
                    break;
                }
                i += 1;
            }
            if closed {
                push_token(&mut tokens, TokenKind::String, &code[start..i]);
            } else {
                push_token(&mut tokens, TokenKind::Plain, &code[start..i]);
            }
            continue;
        }

        // Number
        if bytes[i].is_ascii_digit()
            && (i == 0 || !(bytes[i - 1].is_ascii_alphanumeric() || bytes[i - 1] == b'_'))
        {
            let start = i;
            while i < n && bytes[i].is_ascii_digit() {
                i += 1;
            }
            if i + 1 < n && bytes[i] == b'.' && bytes[i + 1].is_ascii_digit() {
                i += 1;
                while i < n && bytes[i].is_ascii_digit() {
                    i += 1;
                }
            }
            if i < n && (bytes[i].is_ascii_alphabetic() || bytes[i] == b'_') {
                while i < n && (bytes[i].is_ascii_alphanumeric() || bytes[i] == b'_') {
                    i += 1;
                }
                push_token(&mut tokens, TokenKind::Plain, &code[start..i]);
            } else {
                push_token(&mut tokens, TokenKind::Number, &code[start..i]);
            }
            continue;
        }

        // Identifier / hyphenated CSP keyword
        if bytes[i].is_ascii_alphabetic() || bytes[i] == b'_' {
            let start = i;
            while i < n && (bytes[i].is_ascii_alphanumeric() || bytes[i] == b'_' || bytes[i] == b'-')
            {
                i += 1;
            }
            let word = &code[start..i];
            if i < n && bytes[i] == b'!' && is_macro_ident(word) {
                push_token(&mut tokens, TokenKind::Macro, word);
            } else if is_control_keyword(word) {
                push_token(&mut tokens, TokenKind::Control, word);
            } else if is_keyword(word) {
                push_token(&mut tokens, TokenKind::Keyword, word);
            } else if is_type_ident(word)
                || (i + 1 < n && bytes[i] == b':' && bytes[i + 1] == b':')
            {
                push_token(&mut tokens, TokenKind::Type, word);
            } else if i < n && bytes[i] == b'(' {
                push_token(&mut tokens, TokenKind::Function, word);
            } else {
                push_token(&mut tokens, TokenKind::Ident, word);
            }
            continue;
        }

        // Non-ASCII or punctuation char
        let ch = code[i..].chars().next().unwrap();
        let next = i + ch.len_utf8();
        push_token(&mut tokens, TokenKind::Plain, &code[i..next]);
        i = next;
    }

    tokens
}

fn is_blank(line: &str) -> bool {
    line.trim().is_empty()
}

fn strip_indent(line: &str, indent: usize) -> &str {
    let mut count = 0usize;
    let mut byte_idx = 0usize;
    for (idx, ch) in line.char_indices() {
        if count >= indent {
            byte_idx = idx;
            break;
        }
        if ch == ' ' {
            count += 1;
            byte_idx = idx + 1;
        } else {
            byte_idx = idx;
            break;
        }
    }
    if count < indent {
        return line.trim_start();
    }
    &line[byte_idx..]
}

fn parse_fence_open(trimmed: &str) -> Option<&str> {
    trimmed.strip_prefix("```").map(|rest| rest.trim())
}

fn parse_image(trimmed: &str) -> Option<(String, String)> {
    let rest = trimmed.strip_prefix("![")?;
    let close_alt = rest.find("](")?;
    let alt = &rest[..close_alt];
    let after = &rest[close_alt + 2..];
    let close_src = after.find(')')?;
    if close_src + 1 != after.len() {
        return None;
    }
    let src = &after[..close_src];
    if src.contains(char::is_whitespace) {
        return None;
    }
    Some((src.to_string(), alt.to_string()))
}

fn parse_heading(trimmed: &str) -> Option<(usize, String)> {
    let level = trimmed.bytes().take_while(|&b| b == b'#').count();
    if !(1..=3).contains(&level) {
        return None;
    }
    let after = &trimmed[level..];
    let rest = after.strip_prefix(' ')?;
    Some((level, rest.trim().to_string()))
}

fn parse_quote_line(trimmed: &str) -> Option<&str> {
    let rest = trimmed.strip_prefix('>')?;
    Some(rest.strip_prefix(' ').unwrap_or(rest))
}

fn parse_table_row(line: &str) -> Vec<String> {
    let trimmed = line.trim();
    let inner = trimmed
        .strip_prefix('|')
        .unwrap_or(trimmed)
        .strip_suffix('|')
        .unwrap_or(trimmed);
    inner.split('|').map(|c| c.trim().to_string()).collect()
}

fn is_table_divider(line: &str) -> bool {
    let trimmed = line.trim();
    if !trimmed.starts_with('|') {
        return false;
    }
    let cells = parse_table_row(trimmed);
    !cells.is_empty()
        && cells.iter().all(|c| {
            let s = c.trim_matches(|ch| ch == ':' || ch == '-' || ch == ' ');
            s.is_empty() && c.contains("---")
        })
}

fn parse_list_marker(trimmed: &str) -> Option<(bool, String)> {
    if let Some(rest) = trimmed.strip_prefix("- ") {
        return Some((false, rest.trim().to_string()));
    }
    let digits = trimmed.bytes().take_while(|b| b.is_ascii_digit()).count();
    if digits > 0 {
        if let Some(rest) = trimmed[digits..].strip_prefix(". ") {
            return Some((true, rest.trim().to_string()));
        }
    }
    None
}

fn parse_blocks(lines: &[&str]) -> Vec<MdNode> {
    let mut nodes = Vec::new();
    let mut i = 0usize;
    let n = lines.len();

    while i < n {
        let line = lines[i];
        let trimmed = line.trim();
        if trimmed.is_empty() {
            i += 1;
            continue;
        }

        // Fenced code block
        if let Some(lang) = parse_fence_open(trimmed) {
            i += 1;
            let mut body_lines = Vec::new();
            while i < n && lines[i].trim() != "```" {
                body_lines.push(lines[i]);
                i += 1;
            }
            if i < n {
                i += 1;
            }
            let code = body_lines.join("\n");
            let tokens = tokenize_code(&code, lang);
            nodes.push(MdNode::Code {
                lang: lang.to_string(),
                code,
                tokens,
            });
            continue;
        }

        // Image
        if let Some((src, alt)) = parse_image(trimmed) {
            nodes.push(MdNode::Image { src, alt });
            i += 1;
            continue;
        }

        // Heading
        if let Some((level, text)) = parse_heading(trimmed) {
            nodes.push(MdNode::Heading { level, text });
            i += 1;
            continue;
        }

        // Blockquote
        if trimmed.starts_with('>') {
            let mut paragraphs = Vec::new();
            let mut current = Vec::new();
            while i < n {
                if let Some(inner) = parse_quote_line(lines[i].trim()) {
                    if inner.trim().is_empty() {
                        if !current.is_empty() {
                            paragraphs.push(current.join(" "));
                            current.clear();
                        }
                    } else {
                        current.push(inner.trim().to_string());
                    }
                    i += 1;
                } else {
                    break;
                }
            }
            if !current.is_empty() {
                paragraphs.push(current.join(" "));
            }
            nodes.push(MdNode::Quote { paragraphs });
            continue;
        }

        // Table
        if trimmed.starts_with('|') && i + 1 < n && is_table_divider(lines[i + 1]) {
            let head = parse_table_row(trimmed);
            i += 2;
            let mut rows = Vec::new();
            while i < n && lines[i].trim().starts_with('|') {
                rows.push(parse_table_row(lines[i]));
                i += 1;
            }
            nodes.push(MdNode::Table { head, rows });
            continue;
        }

        // List (ordered or unordered, supporting indented child blocks)
        if let Some((ordered, first_text)) = parse_list_marker(trimmed) {
            let mut items = Vec::new();
            let mut first = true;
            let mut cur_text = first_text;

            while i < n {
                if first {
                    first = false;
                    i += 1;
                } else {
                    let t = lines[i].trim();
                    if let Some((next_ord, next_text)) = parse_list_marker(t) {
                        if next_ord == ordered && !lines[i].starts_with("  ") {
                            cur_text = next_text;
                            i += 1;
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                }

                let mut child_lines = Vec::new();
                while i < n {
                    let l = lines[i];
                    if is_blank(l) {
                        // Look ahead for indented continuation
                        let mut k = i + 1;
                        while k < n && is_blank(lines[k]) {
                            k += 1;
                        }
                        if k < n && lines[k].starts_with("  ") {
                            child_lines.push("");
                            i += 1;
                            continue;
                        }
                        break;
                    }
                    if l.starts_with("  ") {
                        child_lines.push(strip_indent(l, 2));
                        i += 1;
                    } else {
                        break;
                    }
                }

                let blocks = if child_lines.is_empty() {
                    Vec::new()
                } else {
                    parse_blocks(&child_lines)
                };
                items.push(ListItem {
                    text: cur_text.clone(),
                    blocks,
                });

                while i < n && is_blank(lines[i]) {
                    i += 1;
                }
                if i < n {
                    let t = lines[i].trim();
                    if let Some((next_ord, _)) = parse_list_marker(t) {
                        if next_ord == ordered && !lines[i].starts_with("  ") {
                            continue;
                        }
                    }
                }
                break;
            }

            nodes.push(MdNode::List { ordered, items });
            continue;
        }

        // Paragraph
        let mut para_lines = Vec::new();
        while i < n {
            let l = lines[i];
            let t = l.trim();
            if t.is_empty()
                || parse_fence_open(t).is_some()
                || parse_image(t).is_some()
                || parse_heading(t).is_some()
                || t.starts_with('>')
                || (t.starts_with('|') && i + 1 < n && is_table_divider(lines[i + 1]))
                || parse_list_marker(t).is_some()
            {
                break;
            }
            para_lines.push(t);
            i += 1;
        }
        nodes.push(MdNode::Para {
            text: para_lines.join(" "),
        });
    }

    nodes
}

fn json_escape(s: &str, out: &mut String) {
    out.push('"');
    for ch in s.chars() {
        match ch {
            '"' => out.push_str("\\\""),
            '\\' => out.push_str("\\\\"),
            '\n' => out.push_str("\\n"),
            '\r' => {}
            '\t' => out.push_str("\\t"),
            c if (c as u32) < 0x20 => out.push_str(&format!("\\u{:04x}", c as u32)),
            c => out.push(c),
        }
    }
    out.push('"');
}

fn write_node_json(node: &MdNode, out: &mut String) {
    out.push('{');
    match node {
        MdNode::Para { text } => {
            out.push_str("\"kind\":\"para\",\"text\":");
            json_escape(text, out);
        }
        MdNode::Heading { level, text } => {
            out.push_str(&format!("\"kind\":\"heading\",\"level\":{level},\"text\":"));
            json_escape(text, out);
        }
        MdNode::Code { lang, code, tokens } => {
            out.push_str("\"kind\":\"code\",\"lang\":");
            json_escape(lang, out);
            out.push_str(",\"code\":");
            json_escape(code, out);
            out.push_str(",\"tokens\":[");
            for (idx, tok) in tokens.iter().enumerate() {
                if idx > 0 {
                    out.push(',');
                }
                out.push_str("{\"k\":");
                json_escape(tok.kind.as_str(), out);
                out.push_str(",\"t\":");
                json_escape(&tok.text, out);
                out.push('}');
            }
            out.push(']');
        }
        MdNode::Quote { paragraphs } => {
            out.push_str("\"kind\":\"quote\",\"paragraphs\":[");
            for (idx, p) in paragraphs.iter().enumerate() {
                if idx > 0 {
                    out.push(',');
                }
                json_escape(p, out);
            }
            out.push(']');
        }
        MdNode::Image { src, alt } => {
            out.push_str("\"kind\":\"image\",\"src\":");
            json_escape(src, out);
            out.push_str(",\"alt\":");
            json_escape(alt, out);
        }
        MdNode::Table { head, rows } => {
            out.push_str("\"kind\":\"table\",\"head\":[");
            for (idx, h) in head.iter().enumerate() {
                if idx > 0 {
                    out.push(',');
                }
                json_escape(h, out);
            }
            out.push_str("],\"rows\":[");
            for (r_idx, row) in rows.iter().enumerate() {
                if r_idx > 0 {
                    out.push(',');
                }
                out.push('[');
                for (c_idx, cell) in row.iter().enumerate() {
                    if c_idx > 0 {
                        out.push(',');
                    }
                    json_escape(cell, out);
                }
                out.push(']');
            }
            out.push(']');
        }
        MdNode::List { ordered, items } => {
            out.push_str(&format!("\"kind\":\"list\",\"ordered\":{ordered},\"items\":["));
            for (idx, item) in items.iter().enumerate() {
                if idx > 0 {
                    out.push(',');
                }
                out.push_str("{\"text\":");
                json_escape(&item.text, out);
                out.push_str(",\"blocks\":[");
                for (b_idx, block) in item.blocks.iter().enumerate() {
                    if b_idx > 0 {
                        out.push(',');
                    }
                    write_node_json(block, out);
                }
                out.push_str("]}");
            }
            out.push(']');
        }
    }
    out.push('}');
}

fn compile_article_sections(sections: &[(String, String)]) -> String {
    let mut out = String::from("{\"sections\":[");
    for (idx, (subtitle, content)) in sections.iter().enumerate() {
        if idx > 0 {
            out.push(',');
        }
        let lines: Vec<&str> = content.lines().collect();
        let blocks = parse_blocks(&lines);
        out.push_str("{\"subtitle\":");
        json_escape(subtitle, &mut out);
        out.push_str(",\"blocks\":[");
        for (b_idx, block) in blocks.iter().enumerate() {
            if b_idx > 0 {
                out.push(',');
            }
            write_node_json(block, &mut out);
        }
        out.push_str("]}");
    }
    out.push_str("]}");
    out
}

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() < 3 {
        eprintln!("Usage: md-compiler <input-dir> <output-dir>");
        std::process::exit(1);
    }

    let input_dir = Path::new(&args[1]);
    let output_dir = Path::new(&args[2]);
    fs::create_dir_all(output_dir).expect("create output dir");

    let mut compiled_count = 0usize;
    let mut entries: Vec<_> = fs::read_dir(input_dir)
        .expect("read input dir")
        .filter_map(|e| e.ok())
        .collect();
    entries.sort_by_key(|e| e.file_name());

    for entry in entries {
        let path = entry.path();
        if path.extension().and_then(|s| s.to_str()) != Some("txt") {
            continue;
        }
        let slug = path.file_stem().and_then(|s| s.to_str()).unwrap_or("");
        let raw = fs::read_to_string(&path).expect("read input file");

        let mut sections: Vec<(String, String)> = Vec::new();
        let mut cur_subtitle = String::new();
        let mut cur_body = Vec::new();
        let mut in_section = false;

        for line in raw.lines() {
            if let Some(sub) = line.strip_prefix("<<<SECTION:") {
                if in_section {
                    sections.push((cur_subtitle.clone(), cur_body.join("\n")));
                    cur_body.clear();
                }
                cur_subtitle = sub.strip_suffix(">>>").unwrap_or(sub).to_string();
                in_section = true;
            } else if line == "<<<END_SECTION>>>" {
                if in_section {
                    sections.push((cur_subtitle.clone(), cur_body.join("\n")));
                    cur_body.clear();
                    in_section = false;
                }
            } else if in_section {
                cur_body.push(line);
            }
        }
        if in_section {
            sections.push((cur_subtitle, cur_body.join("\n")));
        }

        let json = compile_article_sections(&sections);
        let out_path = output_dir.join(format!("{slug}.json"));
        fs::write(&out_path, json).expect("write compiled json");
        compiled_count += 1;
    }

    println!("md-compiler: compiled {compiled_count} articles");
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn highlights_rust_code_tokens() {
        let tokens = tokenize_code("fn main() { let x: usize = 42; }", "rust");
        assert!(tokens.iter().any(|t| t.kind == TokenKind::Keyword && t.text == "fn"));
        assert!(tokens.iter().any(|t| t.kind == TokenKind::Type && t.text == "usize"));
        assert!(tokens.iter().any(|t| t.kind == TokenKind::Number && t.text == "42"));
    }

    #[test]
    fn parses_table_and_code_blocks() {
        let md = "Intro\n\n```rust\nlet x = 1;\n```\n\n| A | B |\n| --- | --- |\n| 1 | 2 |";
        let lines: Vec<&str> = md.lines().collect();
        let nodes = parse_blocks(&lines);
        assert!(matches!(nodes[0], MdNode::Para { .. }));
        assert!(matches!(nodes[1], MdNode::Code { .. }));
        assert!(matches!(nodes[2], MdNode::Table { .. }));
    }
}
