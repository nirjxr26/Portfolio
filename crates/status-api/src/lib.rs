use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct StatusChecks {
    pub static_assets: &'static str,
    pub csp: &'static str,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct StatusResponse {
    pub status: &'static str,
    pub service: &'static str,
    pub version: &'static str,
    pub commit: &'static str,
    pub region: &'static str,
    pub timestamp: &'static str,
    pub checks: StatusChecks,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct ProjectItem {
    pub name: &'static str,
    pub category: &'static str,
    pub state: &'static str,
    pub summary: &'static str,
    pub stack: &'static [&'static str],
    pub repo: &'static str,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub case_study: Option<&'static str>,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct ProjectsResponse {
    pub projects: Vec<ProjectItem>,
}

pub fn get_status_payload() -> StatusResponse {
    StatusResponse {
        status: "ok",
        service: "nirjar.me",
        version: "0.1.0",
        commit: "fa657df",
        region: "edge",
        timestamp: "2026-11-11T10:00:00Z",
        checks: StatusChecks {
            static_assets: "ok",
            csp: "enforced",
        },
    }
}

pub fn get_projects_payload() -> ProjectsResponse {
    ProjectsResponse {
        projects: vec![
            ProjectItem {
                name: "Trace",
                category: "Digital Forensics & Incident Response",
                state: "active",
                summary: "Local-first forensic CLI and console with tamper-evident, append-only SQLite audit trails.",
                stack: &["Python", "Textual TUI", "SQLite", "Cryptography"],
                repo: "https://github.com/nirjxr26/Trace",
                case_study: Some("/works/trace"),
            },
            ProjectItem {
                name: "Bastion",
                category: "Identity & Access Management",
                state: "active",
                summary: "Self-hosted access control gateway with MFA, session control, policy enforcement, and audit logs.",
                stack: &["Go", "Docker", "Kubernetes", "PostgreSQL"],
                repo: "https://github.com/nirjxr26/Bastion",
                case_study: Some("/works/bastion"),
            },
            ProjectItem {
                name: "Kost",
                category: "Kubernetes Cost Intelligence",
                state: "active",
                summary: "Single-pod Kubernetes agent calculating workload resource waste and posting right-sizing commands to Slack.",
                stack: &["Go", "Kubernetes API", "Slack Webhooks"],
                repo: "https://github.com/nirjxr26/Kost",
                case_study: Some("/works/kost"),
            },
            ProjectItem {
                name: "HookDrop",
                category: "Backend & Webhooks",
                state: "active",
                summary: "Go webhook receiver with HMAC signature verification, live event streaming, and GitOps automated delivery.",
                stack: &["Go", "Docker", "AWS ECR", "GitHub Actions"],
                repo: "https://github.com/nirjxr26/HookDrop",
                case_study: Some("/works/hookdrop"),
            },
            ProjectItem {
                name: "DeployLens",
                category: "CI/CD & Observability",
                state: "active",
                summary: "Deployment observability tool unifying GitHub Actions workflow runs and AWS CodeDeploy events in a single timeline.",
                stack: &["TypeScript", "AWS SDK", "GitHub Actions API"],
                repo: "https://github.com/nirjxr26/DeployLens",
                case_study: None,
            },
            ProjectItem {
                name: "VaultLock",
                category: "Security Engineering",
                state: "maintained",
                summary: "Offline password manager with AES-256 local credential encryption and zero cloud dependencies.",
                stack: &["Python", "AES-256", "CustomTkinter"],
                repo: "https://github.com/nirjxr26/VaultLock-Password-Manager",
                case_study: None,
            },
        ],
    }
}

pub fn get_status_json() -> String {
    let payload = get_status_payload();
    serde_json::to_string(&payload).unwrap_or_else(|_| "{\"status\":\"error\"}".to_string())
}

pub fn get_projects_json() -> String {
    let payload = get_projects_payload();
    serde_json::to_string(&payload).unwrap_or_else(|_| "{\"projects\":[]}".to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_status_payload_validity() {
        let payload = get_status_payload();
        assert_eq!(payload.status, "ok");
        assert_eq!(payload.service, "nirjar.me");
        assert_eq!(payload.checks.static_assets, "ok");
        assert_eq!(payload.checks.csp, "enforced");
    }

    #[test]
    fn test_projects_payload_validity() {
        let payload = get_projects_payload();
        assert_eq!(payload.projects.len(), 6);
        assert_eq!(payload.projects[0].name, "Trace");
        assert_eq!(payload.projects[0].state, "active");
        assert_eq!(payload.projects[5].name, "VaultLock");
        assert_eq!(payload.projects[5].state, "maintained");
    }

    #[test]
    fn test_serialization() {
        let status_json = get_status_json();
        assert!(status_json.contains("\"status\":\"ok\""));
        assert!(status_json.contains("\"static_assets\":\"ok\""));

        let projects_json = get_projects_json();
        assert!(status_json.contains("\"nirjar.me\""));
        assert!(projects_json.contains("\"Trace\""));
        assert!(projects_json.contains("\"Bastion\""));
    }
}
