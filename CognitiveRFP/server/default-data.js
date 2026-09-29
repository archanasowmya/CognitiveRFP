// Pre-seeded authentic enterprise memories across industries and RFP requirements
export const DEFAULT_MEMORIES = [
  {
    id: "mem-001",
    title: "Lost Barclays Enterprise Deal",
    experienceType: "Lost Bid",
    industry: "FinTech & Investment Banking",
    client: "Barclays Capital",
    tags: ["sla-rejection", "pricing-objection", "support", "legal"],
    opportunitySize: "$3.2M",
    experience: "99.9% availability was rejected during procurement final review. The deal team offered our standard 99.9% uptime SLA without financial backing. The client procurement and risk committee marked this as a high risk and selected a competitor who guaranteed 99.99% monthly availability with explicit 10% to 50% tiered financial service credits for qualifying breaches. Evaluator notes specifically cited: 'Vendor refused to put financial skin in the game on uptime for trading-adjacent workloads.'",
    lessonLearned: "Enterprise FinTech proposals must proactively commit to 99.99% availability and include a defined service-credit matrix (10%-50% credit tiers) rather than vague 'best effort' remediation.",
    guardrailId: "guard-001",
    relevanceKeywords: ["sla", "uptime", "availability", "service credit", "disaster recovery", "breach", "outage", "fintech", "banking"],
    date: "2025-11-14",
    impactScore: 94
  },
  {
    id: "mem-002",
    title: "Won Morgan Stanley Digital Core RFP",
    experienceType: "Won Bid",
    industry: "FinTech & Investment Banking",
    client: "Morgan Stanley Digital",
    tags: ["compliance-redline", "security-audit", "legal"],
    opportunitySize: "$4.1M",
    experience: "Won against 3 incumbent vendors by preempting the security and compliance review. Proactively attached SOC 2 Type II report with zero exceptions, ISO 27001 certificate, FedRAMP alignment summary, and continuous audit monitoring via quarterly bridge letters. Client procurement committee noted: 'Vendor demonstrated institutional maturity and saved 6 weeks of infosec back-and-forth.'",
    lessonLearned: "Proactively provide SOC 2 Type II audit report, ISO 27001 validation, and explicit bridge letter commitments in the core proposal.",
    guardrailId: "guard-002",
    relevanceKeywords: ["soc 2", "compliance", "security", "audit", "iso 27001", "bridge letter", "encryption", "infosec", "morgan stanley"],
    date: "2026-01-20",
    impactScore: 96
  },
  {
    id: "mem-003",
    title: "Lost Mount Sinai Health System Tender",
    experienceType: "Lost Bid",
    industry: "Healthcare & Life Sciences",
    client: "Mount Sinai Health",
    tags: ["compliance-redline", "legal", "security-audit"],
    opportunitySize: "$2.8M",
    experience: "Disqualified in Phase 2 because the proposal used our standard generic SaaS terms instead of an executed Business Associate Agreement (BAA) with explicit HIPAA Omnibus Rule guarantees. Furthermore, the RFP response failed to explicitly detail PHI encryption at rest using AES-256 with customer-managed keys (BYOK) and neglected to confirm 7-year immutable audit log retention.",
    lessonLearned: "Healthcare proposals must attach our pre-executed BAA schedule, confirm HIPAA Omnibus compliance, detail PHI zero-knowledge encryption, and guarantee 7-year audit log retention.",
    guardrailId: "guard-003",
    relevanceKeywords: ["hipaa", "baa", "phi", "healthcare", "audit", "retention", "encryption", "byok", "compliance", "patient data"],
    date: "2025-09-08",
    impactScore: 92
  },
  {
    id: "mem-004",
    title: "Won Pfizer Global Trials Proposal",
    experienceType: "Won Bid",
    industry: "Healthcare & Life Sciences",
    client: "Pfizer Global",
    tags: ["compliance-redline", "security-audit", "implementation"],
    opportunitySize: "$5.5M",
    experience: "Won multi-year contract by highlighting HITRUST CSF certification, GxP (Good Clinical Practice) compliance readiness, and strict multi-tenant logical partitioning with data residency in customer-designated US/EU cloud regions. Offered a dedicated validation testing period for FDA 21 CFR Part 11 electronic signature workflows.",
    lessonLearned: "Explicitly reference HITRUST CSF certification, 21 CFR Part 11 validation protocols, and regional data sovereignty guarantees in pharma RFPs.",
    guardrailId: "guard-004",
    relevanceKeywords: ["hitrust", "fda", "21 cfr part 11", "gxp", "pharma", "clinical", "data residency", "sovereignty", "validation"],
    date: "2026-02-11",
    impactScore: 95
  },
  {
    id: "mem-005",
    title: "Stripe Infrastructure Pricing Redline",
    experienceType: "Pricing Redline",
    industry: "Enterprise SaaS & Cloud Infrastructure",
    client: "Stripe",
    tags: ["pricing-objection", "procurement", "pricing", "legal"],
    opportunitySize: "$1.9M",
    experience: "Stripe procurement pushed back heavily on standard flat-rate SaaS pricing. They demanded volume-based stepped discounting (15% discount past 10M API calls/mo, 25% past 25M), annual credit rollover for unused units, and a 36-month price-lock guarantee. After agreeing to these terms in the BAFO (Best and Final Offer), we won the deal and standardizing this tiered table increased close rates by 34%.",
    lessonLearned: "Enterprise cloud infrastructure bids should include a transparent volume-tiered pricing schedule with 2-3 year price protection and annual unused credit rollovers.",
    guardrailId: "guard-005",
    relevanceKeywords: ["pricing", "volume", "discount", "tier", "api calls", "price lock", "procurement", "cost", "billing", "rollover"],
    date: "2025-10-28",
    impactScore: 90
  },
  {
    id: "mem-006",
    title: "Snowflake Strategic Alliance Evaluation",
    experienceType: "Evaluator Feedback",
    industry: "Enterprise SaaS & Cloud Infrastructure",
    client: "Snowflake Inc.",
    tags: ["support", "implementation", "sla-rejection"],
    opportunitySize: "$2.2M",
    experience: "Evaluator feedback scored us 3.5/5 on Support because the response offered standard 'business hours email and portal support' with 4-hour response SLA. Competitor offered a Named Technical Account Manager (TAM), 15-minute response SLA for Severity 1 incidents, and an integrated Slack/Teams shared channel for live escalation. We lost the technical evaluation margin.",
    lessonLearned: "High-value SaaS bids must include a dedicated TAM, 15-minute P1 incident escalation SLA, and dedicated Slack/Teams collaboration channels.",
    guardrailId: "guard-006",
    relevanceKeywords: ["support", "tam", "escalation", "response time", "severity 1", "slack channel", "customer success", "24/7"],
    date: "2025-12-05",
    impactScore: 88
  },
  {
    id: "mem-007",
    title: "Goldman Sachs Digital Asset Security Redline",
    experienceType: "Security Redline",
    industry: "FinTech & Investment Banking",
    client: "Goldman Sachs",
    tags: ["security-audit", "compliance-redline", "legal"],
    opportunitySize: "$3.8M",
    experience: "CISO office halted contract signing due to shared cloud encryption keys. Required FIPS 140-2 Level 3 Hardware Security Module (HSM) key storage, customer-managed encryption keys (CMEK), TLS 1.3 in-transit, and automated quarterly third-party penetration test reports with remediated CVE verification.",
    lessonLearned: "Default to FIPS 140-2 Level 3 HSM support, CMEK/BYOK capabilities, and proactive inclusion of clean third-party pentest executive summaries for Tier-1 investment banks.",
    guardrailId: "guard-007",
    relevanceKeywords: ["fips 140-2", "hsm", "cmek", "byok", "penetration test", "cve", "tls 1.3", "encryption", "ciso", "security"],
    date: "2026-01-15",
    impactScore: 93
  },
  {
    id: "mem-008",
    title: "Target Q4 Peak Freeze Uptime Requirement",
    experienceType: "Won Bid",
    industry: "Retail & E-commerce",
    client: "Target Corporation",
    tags: ["sla-rejection", "implementation", "support"],
    opportunitySize: "$2.5M",
    experience: "Retail customer required guaranteed zero-maintenance freeze window from Nov 15 through Jan 10, accompanied by a 99.999% availability commitment during Black Friday and Cyber Week. Proactively submitting an architecture with active-active dual-region failover and dedicated War Room support during peak shopping hours clinched the win.",
    lessonLearned: "Retail and e-commerce proposals must explicitly accommodate Q4 code/maintenance freeze windows and provision dedicated peak event War Room support.",
    guardrailId: "guard-008",
    relevanceKeywords: ["retail", "black friday", "cyber week", "freeze", "high traffic", "peak", "ecommerce", "99.999%", "active-active"],
    date: "2025-10-12",
    impactScore: 89
  },
  {
    id: "mem-009",
    title: "State of Texas Public Sector Bid Loss",
    experienceType: "Lost Bid",
    industry: "Government & Public Sector",
    client: "Texas Department of Information Resources",
    tags: ["compliance-redline", "security-audit", "legal"],
    opportunitySize: "$1.7M",
    experience: "Disqualified because proposal stated cloud hosting on standard US-East multi-tenant regions without StateRAMP or TX-RAMP Level 2 certification. Did not confirm US citizens on US soil for technical support and failed to certify CJIS background checks.",
    lessonLearned: "Government and public sector RFPs require verified StateRAMP/FedRAMP certification, US-citizen-only support on domestic soil, and CJIS background clearance statements.",
    guardrailId: "guard-009",
    relevanceKeywords: ["stateramp", "tx-ramp", "fedramp", "cjis", "government", "public sector", "us citizen", "sovereign", "clearance"],
    date: "2025-08-19",
    impactScore: 91
  },
  {
    id: "mem-010",
    title: "Siemens Smart Factory Edge Resilience",
    experienceType: "Won Bid",
    industry: "Manufacturing",
    client: "Siemens AG",
    tags: ["implementation", "sla-rejection", "support"],
    opportunitySize: "$3.4M",
    experience: "Won against legacy industrial providers because our response guaranteed 72-hour offline edge autonomous operation with local store-and-forward queuing during network cuts, plus zero data loss synchronization upon reconnect.",
    lessonLearned: "Manufacturing RFPs require explicit edge offline buffering guarantees (>= 72 hrs) and deterministic reconnect sync protocols.",
    guardrailId: "guard-010",
    relevanceKeywords: ["manufacturing", "iot", "edge", "offline", "buffer", "factory", "resilience", "store and forward", "scada"],
    date: "2026-02-02",
    impactScore: 87
  }
];

export const DEFAULT_GUARDRAILS = [
  {
    id: "guard-001",
    title: "Enterprise FinTech SLA Guardrail",
    rule: "Do not propose 99.9% availability for regulated enterprise accounts. Default to 99.99% monthly availability with explicit 10%-50% service-credit structure when RFP involves trading, payments, or treasury operations.",
    industry: "FinTech & Investment Banking",
    category: "SLA & Reliability",
    isActive: true,
    derivedFromMemories: ["mem-001", "mem-002"],
    createdAt: "2026-01-22"
  },
  {
    id: "guard-002",
    title: "Healthcare Compliance & BAA Guardrail",
    rule: "Explicitly attach executed Business Associate Agreement (BAA) schedule, detail PHI zero-knowledge AES-256 encryption at rest, and guarantee 7-year immutable audit log retention whenever healthcare or life sciences requirements are present.",
    industry: "Healthcare & Life Sciences",
    category: "Compliance & Security",
    isActive: true,
    derivedFromMemories: ["mem-003", "mem-004"],
    createdAt: "2026-02-12"
  },
  {
    id: "guard-003",
    title: "High-Volume SaaS Pricing & Price-Lock",
    rule: "Include a tiered volume discount schedule (15-25% at scale) with 3-year rate lock and annual unused credit rollover rather than rigid seat/API license costs for enterprise procurement.",
    industry: "Enterprise SaaS & Cloud Infrastructure",
    category: "Pricing & Procurement",
    isActive: true,
    derivedFromMemories: ["mem-005"],
    createdAt: "2025-11-02"
  },
  {
    id: "guard-004",
    title: "Enterprise White-Glove Support SLA",
    rule: "Mandate Named Technical Account Manager (TAM), 15-minute response SLA for Severity 1 incidents, and integrated Slack/Teams bridge rather than generic web ticketing.",
    industry: "Enterprise SaaS & Cloud Infrastructure",
    category: "Support & Customer Success",
    isActive: true,
    derivedFromMemories: ["mem-006"],
    createdAt: "2025-12-10"
  },
  {
    id: "guard-005",
    title: "FIPS 140-2 HSM Key Custody & BYOK",
    rule: "Default to FIPS 140-2 Level 3 hardware security module support, customer-managed encryption keys (CMEK), and proactive third-party penetration test attestations for Tier-1 banks.",
    industry: "FinTech & Investment Banking",
    category: "Security & Encryption",
    isActive: true,
    derivedFromMemories: ["mem-007"],
    createdAt: "2026-01-18"
  },
  {
    id: "guard-006",
    title: "Retail Q4 Peak Freeze & High Availability",
    rule: "Commit to absolute code/maintenance freeze from Nov 15 through Jan 10 with 99.999% peak availability and dedicated War Room escalation for retail clients.",
    industry: "Retail & E-commerce",
    category: "SLA & Operations",
    isActive: true,
    derivedFromMemories: ["mem-008"],
    createdAt: "2025-10-15"
  }
];

export const PRESET_REQUIREMENTS = [
  {
    id: "preset-sla",
    title: "Disaster Recovery & SLA Guarantee",
    industry: "FinTech & Investment Banking",
    client: "Morgan Stanley Digital",
    opportunitySize: "$2.4M",
    requirement: "Describe your service level agreements (SLAs), guaranteed uptime availability percentages, definition of service downtime, scheduled maintenance windows, and the financial remedies or service credits offered in the event of an unscheduled breach. Detail your Disaster Recovery (DR) architecture, including RPO and RTO commitments, multi-region failover protocols, and recent audit certifications."
  },
  {
    id: "preset-security",
    title: "Data Retention & Encryption Standards",
    industry: "Healthcare & Life Sciences",
    client: "Mount Sinai Health System",
    opportunitySize: "$3.1M",
    requirement: "Detail your end-to-end data security posture, encryption algorithms at rest and in transit, customer-managed encryption key (CMEK/BYOK) support, and compliance certifications (SOC 2 Type II, ISO 27001, HIPAA, HITRUST). Describe your data retention schedules, immutable audit trail capabilities, and how Protected Health Information (PHI) is isolated in a multi-tenant cloud environment."
  },
  {
    id: "preset-pricing",
    title: "Pricing & Volume Discounting",
    industry: "Enterprise SaaS & Cloud Infrastructure",
    client: "Stripe Infrastructure",
    opportunitySize: "$1.8M",
    requirement: "Provide a transparent pricing schedule, including base licensing, API consumption tiers, volume-based discounts for scale, multi-year contract commitments, and price-lock guarantees. Detail policies regarding unused credit rollovers, bursting limits, and overage fees."
  },
  {
    id: "preset-compliance",
    title: "Security & Compliance",
    industry: "Government & Public Sector",
    client: "Department of Transportation",
    opportunitySize: "$4.5M",
    requirement: "Confirm that your platform meets all federal and state regulatory requirements, including FedRAMP / StateRAMP authorization, CJIS background clearance for all support staff with physical or logical system access, and sovereign data residency exclusively within the contiguous United States."
  },
  {
    id: "preset-timeline",
    title: "Implementation Timeline",
    industry: "Manufacturing",
    client: "Siemens Global Operations",
    opportunitySize: "$2.9M",
    requirement: "Outline your end-to-end enterprise onboarding and implementation timeline from contract execution to full production cutover. Specify phases, milestone deliverables, technical integration requirements for on-premise industrial systems and edge buffering, dedicated resources, and user acceptance testing (UAT) criteria."
  },
  {
    id: "preset-support",
    title: "Customer Support & Escalation",
    industry: "Enterprise SaaS & Cloud Infrastructure",
    client: "Snowflake Global IT",
    opportunitySize: "$2.2M",
    requirement: "Describe your customer support tiering, hours of availability, incident severity classifications (Severity 1 through 4), target initial response times, mean time to resolution (MTTR) targets, dedicated Technical Account Management (TAM), and direct escalation communication channels (e.g., Slack / Microsoft Teams shared connect)."
  }
];
