use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct ServiceHealth {
    pub name: &'static str,
    pub status: &'static str,
    pub category: &'static str,
    pub description: &'static str,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct EdgeMetrics {
    pub engine: &'static str,
    pub edge_sla: &'static str,
    pub cold_start_target: &'static str,
    pub memory_footprint: &'static str,
    pub security_posture: &'static str,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct StatusPayload {
    pub status: &'static str,
    pub version: &'static str,
    pub service: &'static str,
    pub edge_metrics: EdgeMetrics,
    pub systems: [ServiceHealth; 5],
}

pub fn get_status_payload() -> StatusPayload {
    StatusPayload {
        status: "operational",
        version: "0.1.0",
        service: "nirjar.me",
        edge_metrics: EdgeMetrics {
            engine: "Rust Edge / WebAssembly",
            edge_sla: "99.99%",
            cold_start_target: "< 5ms",
            memory_footprint: "< 15KB binary",
            security_posture: "Memory-safe, Zero-trust, Strict CSP",
        },
        systems: [
            ServiceHealth {
                name: "Bastion",
                status: "operational",
                category: "Cybersecurity & IAM",
                description: "Zero-Trust ephemeral access gateway with audit logging",
            },
            ServiceHealth {
                name: "HookDrop",
                status: "operational",
                category: "Backend & Systems",
                description: "High-throughput webhook ingestion and cryptographic relay",
            },
            ServiceHealth {
                name: "Kost",
                status: "operational",
                category: "Cloud Architecture",
                description: "Multi-cloud Kubernetes FinOps and anomaly guardrails",
            },
            ServiceHealth {
                name: "Trace",
                status: "operational",
                category: "Distributed Systems",
                description: "Zero-overhead distributed trace validator and evidence chain",
            },
            ServiceHealth {
                name: "Frontend Static Mesh",
                status: "operational",
                category: "Edge & CDN",
                description: "Pre-rendered immutable assets with CSP sha256 integrity",
            },
        ],
    }
}

pub fn get_status_json() -> String {
    let payload = get_status_payload();
    serde_json::to_string(&payload).unwrap_or_else(|_| "{\"status\":\"error\"}".to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_status_payload_validity() {
        let payload = get_status_payload();
        assert_eq!(payload.status, "operational");
        assert_eq!(payload.systems.len(), 5);
        assert_eq!(payload.edge_metrics.engine, "Rust Edge / WebAssembly");
    }

    #[test]
    fn test_status_json_serializes() {
        let json_str = get_status_json();
        assert!(json_str.contains("\"status\":\"operational\""));
        assert!(json_str.contains("\"Bastion\""));
        assert!(json_str.contains("\"Rust Edge / WebAssembly\""));
    }
}
