use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct StatusChecks {
    pub edge_routing: String,
    pub security_headers: String,
    pub static_assets: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct StatusResponse {
    pub status: String,
    pub service: String,
    pub commit: String,
    pub region: String,
    pub environment: String,
    pub timestamp: String,
    pub checks: StatusChecks,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct ProjectItem {
    pub name: String,
    pub category: String,
    pub state: String,
    pub summary: String,
    pub repo: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub case_study: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct ProjectsResponse {
    pub projects: Vec<ProjectItem>,
}

pub fn get_status_payload() -> StatusResponse {
    StatusResponse {
        status: "ok".into(),
        service: "nirjar.me".into(),
        commit: "fa657df".into(),
        region: "edge".into(),
        environment: "production".into(),
        timestamp: "2026-11-11T10:00:00Z".into(),
        checks: StatusChecks {
            edge_routing: "ok".into(),
            security_headers: "enforced".into(),
            static_assets: "ok".into(),
        },
    }
}

pub fn get_projects_payload() -> ProjectsResponse {
    ProjectsResponse {
        projects: vec![
            ProjectItem {
                name: "Trace".into(),
                category: "Digital Forensics & Incident Response".into(),
                state: "active".into(),
                summary: "Local-first forensic CLI and console with tamper-evident, append-only SQLite audit trails.".into(),
                repo: "https://github.com/nirjxr26/Trace".into(),
                case_study: Some("/works/trace".into()),
            },
            ProjectItem {
                name: "Bastion".into(),
                category: "Identity & Access Management".into(),
                state: "active".into(),
                summary: "Self-hosted access control gateway with MFA, session control, policy enforcement, and audit logs.".into(),
                repo: "https://github.com/nirjxr26/Bastion".into(),
                case_study: Some("/works/bastion".into()),
            },
            ProjectItem {
                name: "Kost".into(),
                category: "Kubernetes Cost Intelligence".into(),
                state: "active".into(),
                summary: "Single-pod Kubernetes agent calculating workload resource waste and posting right-sizing commands to Slack.".into(),
                repo: "https://github.com/nirjxr26/Kost".into(),
                case_study: Some("/works/kost".into()),
            },
            ProjectItem {
                name: "HookDrop".into(),
                category: "Backend & Webhooks".into(),
                state: "active".into(),
                summary: "Go webhook receiver with HMAC signature verification, live event streaming, and GitOps automated delivery.".into(),
                repo: "https://github.com/nirjxr26/HookDrop".into(),
                case_study: Some("/works/hookdrop".into()),
            },
            ProjectItem {
                name: "DeployLens".into(),
                category: "CI/CD & Observability".into(),
                state: "active".into(),
                summary: "Deployment observability tool unifying GitHub Actions workflow runs and AWS CodeDeploy events in a single timeline.".into(),
                repo: "https://github.com/nirjxr26/DeployLens".into(),
                case_study: None,
            },
            ProjectItem {
                name: "VaultLock".into(),
                category: "Security Engineering".into(),
                state: "maintained".into(),
                summary: "Offline password manager with AES-256 local credential encryption and zero cloud dependencies.".into(),
                repo: "https://github.com/nirjxr26/VaultLock-Password-Manager".into(),
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
        assert_eq!(payload.checks.edge_routing, "ok");
        assert_eq!(payload.checks.security_headers, "enforced");
        assert_eq!(payload.checks.static_assets, "ok");
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
        assert!(!status_json.contains("\"version\""));

        let projects_json = get_projects_json();
        assert!(projects_json.contains("\"Trace\""));
        assert!(!projects_json.contains("\"stack\""));
    }
}
