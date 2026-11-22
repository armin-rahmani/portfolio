import { CapabilityItem, BentoProject, SectorItem, PricingPlan } from '../types';

export const navigationData = {
  solutions: {
    title: "Enterprise Solutions",
    subtitle: "Architectural systems for high-stakes digital operations",
    columns: [
      {
        heading: "Core Architecture",
        links: [
          { name: "Autonomous Systems", desc: "Self-healing enterprise microservices" },
          { name: "Global Asset Clearing", desc: "Cross-border multi-currency settlement" },
          { name: "Risk Telemetry", desc: "Continuous algorithmic compliance" },
          { name: "Sovereign Cloud Fabric", desc: "Private institutional infrastructure" },
        ]
      },
      {
        heading: "Strategic Execution",
        links: [
          { name: "Capital Orchestration", desc: "Treasury optimization algorithms" },
          { name: "Private Equity Analytics", desc: "Predictive deal screening engines" },
          { name: "M&A Intelligence", desc: "Holistic synergy modeling" },
        ]
      }
    ],
    featured: {
      tag: "Case Brief",
      title: "Consortium Liquidity Protocol",
      desc: "How a top 5 European sovereign fund reduced settlement latency by 94%."
    }
  },
  practice: {
    title: "Global Practice",
    subtitle: "Specialized sector advisory and engineering",
    columns: [
      {
        heading: "Industry Domains",
        links: [
          { name: "Institutional Banking", desc: "Tier-1 bank ledger integration" },
          { name: "Energy & Grid Systems", desc: "Distributed energy resource networks" },
          { name: "Advanced Robotics & AI", desc: "Edge governance and verification" },
          { name: "BioTech Consortia", desc: "Privacy-preserving genomic pipelines" },
        ]
      },
      {
        heading: "Advisory Services",
        links: [
          { name: "Board Technology Counsel", desc: "Strategic CTO-level advisory" },
          { name: "Regulatory Sandboxes", desc: "Cross-border compliance clearance" },
          { name: "Cryptographic Audits", desc: "Zero-knowledge security proofing" },
        ]
      }
    ],
    featured: {
      tag: "Global Report",
      title: "The 2027 Autonomous Enterprise",
      desc: "A strategic playbook for Fortune 100 executive committees."
    }
  },
  institutional: {
    title: "Institutional Services",
    subtitle: "Dedicated frameworks for governments and sovereign funds",
    columns: [
      {
        heading: "Sovereign Frameworks",
        links: [
          { name: "Central Bank Clearings", desc: "High-throughput wholesale settlements" },
          { name: "National Registry Systems", desc: "Tamper-evident public registries" },
          { name: "Strategic Reserve Vaults", desc: "Multi-sig institutional custody" },
        ]
      },
      {
        heading: "Governance & ESG",
        links: [
          { name: "Audited Carbon Ledgers", desc: "Scope 1-3 cryptographically verified" },
          { name: "Independent Review Board", desc: "Quarterly institutional disclosures" },
        ]
      }
    ],
    featured: {
      tag: "Institutional",
      title: "Sovereign Infrastructure Whitepaper",
      desc: "Architecting fault-tolerant digital economies."
    }
  }
};

export const heroStats = [
  { label: "Capital Orchestrated", value: "$48.4B+", change: "+32% YoY" },
  { label: "Settlement Latency", value: "<14ms", change: "Sub-second" },
  { label: "Sovereign Nodes", value: "340+", change: "Global mesh" },
  { label: "System Availability", value: "99.999%", change: "Zero downtime" },
];

export const capabilitiesList: CapabilityItem[] = [
  {
    id: "analytics",
    title: "Predictive Strategic Analytics",
    tag: "Intelligence Suite",
    headline: "Real-Time Telemetry & Predictive Capital Forecasting",
    description: "Advanced stochastic simulations and algorithmic market modeling give executive committees unprecedented clarity on liquidity, volatility, and counterparty exposure.",
    category: "Analytics & Intelligence",
    metrics: [
      { label: "Simulation Speed", value: "1.2M", unit: "events/sec" },
      { label: "Confidence Interval", value: "99.8%", unit: "precision" },
      { label: "Predictive Horizon", value: "90 Days", unit: "lookahead" },
    ],
    chartData: [42, 48, 45, 59, 64, 61, 75, 82, 79, 94, 91, 108]
  },
  {
    id: "multicurrency",
    title: "Multi-Jurisdiction Sovereign Accounts",
    tag: "Treasury Infrastructure",
    headline: "Frictionless Cross-Border Institutional Asset Dispatch",
    description: "Manage segregated accounts across 42 premier global jurisdictions with native support for sovereign fiat, high-yield digital treasuries, and automated tax clearance.",
    category: "Global Treasury",
    metrics: [
      { label: "Supported Jurisdictions", value: "42", unit: "countries" },
      { label: "Average FX Spread", value: "0.012%", unit: "institutional" },
      { label: "Instant Clearing", value: "99.4%", unit: "of total volume" },
    ],
    chartData: [30, 36, 42, 50, 58, 67, 72, 85, 89, 98, 104, 115]
  },
  {
    id: "treasury",
    title: "Autonomous Treasury Orchestration",
    tag: "Execution Engine",
    headline: "Algorithmic Yield Optimization & Idle Capital Deployment",
    description: "Continuous automated sweeping and risk-weighted yield routing ensure enterprise liquidity pools earn optimal sovereign yields while preserving instant cash availability.",
    category: "Yield & Asset Management",
    metrics: [
      { label: "Average Yield Boost", value: "+2.4%", unit: "over benchmark" },
      { label: "Liquidity Buffer", value: "100%", unit: "real-time ringfenced" },
      { label: "Audit Frequency", value: "Per-block", unit: "continuous" },
    ],
    chartData: [50, 52, 55, 63, 60, 70, 78, 82, 88, 92, 99, 112]
  },
  {
    id: "risk",
    title: "Institutional Risk Architecture",
    tag: "Defense & Cryptography",
    headline: "Quantum-Resistant Multi-Signature Security Protocols",
    description: "Multi-party computation (MPC) and hardware-isolated enclaves safeguard high-value transactions with zero single point of failure across international boundaries.",
    category: "Security & Governance",
    metrics: [
      { label: "Security Incidents", value: "0", unit: "all-time" },
      { label: "Encrypted Backing", value: "100%", unit: "post-quantum" },
      { label: "Key Custody", value: "3-of-5", unit: "sovereign threshold" },
    ],
    chartData: [60, 63, 67, 72, 76, 81, 85, 90, 94, 98, 102, 118]
  },
  {
    id: "infrastructure",
    title: "High-Throughput Global Settlement Fabric",
    tag: "Network Core",
    headline: "Sub-Second Global Liquidity Dispatch at Massive Scale",
    description: "Engineered specifically for institutional volumes, our distributed network bridges traditional central banking rails with next-generation consensus backbones.",
    category: "Global Network",
    metrics: [
      { label: "Max TPS", value: "140,000", unit: "transactions/sec" },
      { label: "Settlement Finality", value: "350ms", unit: "guaranteed" },
      { label: "Uptime SLA", value: "100.00%", unit: "contractual" },
    ],
    chartData: [45, 52, 60, 65, 73, 80, 88, 95, 103, 110, 118, 126]
  }
];

export const bentoProjects: BentoProject[] = [
  {
    id: "quantum-settle",
    title: "Continental Sovereign Treasury Pipeline",
    category: "Core Infrastructure",
    description: "An interconnected ledger enabling 12 central banks to clear cross-border interbank obligations with zero intermediary exposure and instant mathematical auditability.",
    stats: "€14.2B Daily Clearance",
    tagline: "94% lower friction than legacy SWIFT rails",
    isWide: true
  },
  {
    id: "energy-grid",
    title: "Decentralized Energy Clearing",
    category: "Critical Systems",
    description: "Real-time settlement for 4,200 commercial renewable generation micro-grids with sub-second billing.",
    stats: "3.8GW Dynamic Load",
    tagline: "Automated peer-to-peer distribution"
  },
  {
    id: "ai-governance",
    title: "Algorithmic Risk Verification",
    category: "Machine Intelligence",
    description: "Hardware-attested cryptographic proofing for high-frequency algorithmic institutional trade strategies.",
    stats: "Zero Exploit History",
    tagline: "Autonomous kill-switch governance"
  },
  {
    id: "private-equity",
    title: "Private Asset Tokenization",
    category: "Capital Markets",
    description: "Institutional syndication portal for prime commercial real estate and infrastructure debt funds.",
    stats: "$8.6B Assets Under Platform",
    tagline: "Secondary liquidity in seconds"
  }
];

export const sectorsList: SectorItem[] = [
  {
    id: "finance",
    name: "Capital Markets & Banking",
    shortCode: "CAP",
    title: "Modernizing Tier-1 Financial Architecture",
    description: "From collateral management to atomic foreign exchange arbitrage, our sovereign infrastructure replaces legacy batch processing with real-time liquidity streams.",
    keyMetric: "$31.4B",
    metricLabel: "Monthly Volume Handled",
    nodes: [
      { label: "London Core Vault", status: "active", latency: "2.1ms" },
      { label: "Zurich Settlement Node", status: "active", latency: "3.4ms" },
      { label: "New York Liquidity Hub", status: "active", latency: "1.8ms" },
      { label: "Singapore Gateway", status: "active", latency: "4.2ms" }
    ]
  },
  {
    id: "infrastructure",
    name: "Critical Energy & Grids",
    shortCode: "ENG",
    title: "Autonomous Utilities & Power Settlements",
    description: "Connecting renewable energy producers, battery storage facilities, and high-demand compute centers with deterministic pricing and automated smart grid compensation.",
    keyMetric: "12.8 TWh",
    metricLabel: "Power Measured & Settled",
    nodes: [
      { label: "Nordic Hydro Grid", status: "active", latency: "5.1ms" },
      { label: "North Sea Offshore Wind", status: "active", latency: "4.7ms" },
      { label: "Iberian Solar Matrix", status: "active", latency: "3.9ms" },
      { label: "Alpine Pump Storage", status: "active", latency: "6.0ms" }
    ]
  },
  {
    id: "intelligence",
    name: "Artificial Intelligence Systems",
    shortCode: "AI",
    title: "Verifiable Autonomous Compute Economics",
    description: "Deploying cryptographic guardrails, resource billing contracts, and verifiable inferencing models for frontier AI labs and sovereign data centers.",
    keyMetric: "2.4B Ops",
    metricLabel: "Verified Machine Inferences",
    nodes: [
      { label: "H100 Sovereign Cluster A", status: "active", latency: "0.8ms" },
      { label: "B200 Model Gateway B", status: "active", latency: "0.9ms" },
      { label: "Secure Enclave Node C", status: "verified", latency: "1.2ms" },
      { label: "Private Mesh Validator", status: "active", latency: "1.5ms" }
    ]
  },
  {
    id: "logistics",
    name: "Global Maritime & Trade",
    shortCode: "TRD",
    title: "Digitized Bills of Lading & Customs Clearances",
    description: "Harmonizing ports, customs agencies, and maritime insurers into a unified tamper-proof single source of truth that releases escrow funds automatically upon dock arrival.",
    keyMetric: "1.9M TEU",
    metricLabel: "Cargo Verified in Transit",
    nodes: [
      { label: "Rotterdam Marine Hub", status: "active", latency: "4.0ms" },
      { label: "Singapore Strait Port", status: "active", latency: "3.2ms" },
      { label: "Dubai Jebel Ali Gateway", status: "active", latency: "5.5ms" },
      { label: "Panama Transit Terminal", status: "active", latency: "6.8ms" }
    ]
  },
  {
    id: "healthcare",
    name: "Life Sciences & Genomics",
    shortCode: "BIO",
    title: "Secure Multiparty Clinical Collaboration",
    description: "Zero-knowledge cryptographic environments enabling pharmaceutical consortia to run comparative oncology and rare-disease research without exposing raw patient data.",
    keyMetric: "480k",
    metricLabel: "Protected Clinical Studies",
    nodes: [
      { label: "Basel Pharma Enclave", status: "verified", latency: "3.1ms" },
      { label: "Boston Bio-Center Node", status: "verified", latency: "2.4ms" },
      { label: "Oxford Research Mesh", status: "active", latency: "3.8ms" },
      { label: "Kyoto Genomic Vault", status: "verified", latency: "5.1ms" }
    ]
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "foundation",
    name: "Advisory Core",
    validity: "Executive Strategic Retainer",
    priceMonthly: "$8,500",
    priceAnnual: "$7,200",
    description: "Ideal for growth-stage enterprises planning systemic digital transformation and architectural overhaul.",
    features: [
      "Quarterly architecture & tech stack audit",
      "Executive CTO office advisory hours",
      "Standard cross-border liquidity rails",
      "Single-region cloud deployment blueprint",
      "99.9% uptime service level agreement"
    ],
    ctaText: "Request Scope"
  },
  {
    id: "professional",
    name: "Enterprise Platform",
    validity: "Full Production Deployment",
    priceMonthly: "$18,500",
    priceAnnual: "$15,900",
    description: "Complete infrastructure layer for multinational companies scaling automated capital operations.",
    features: [
      "Dedicated multi-jurisdiction clearing node",
      "Sub-20ms high-throughput trade settlement",
      "Autonomous treasury yield optimization",
      "Hardware-isolated MPC key custody (2-of-3)",
      "24/7 dedicated engineering command desk"
    ],
    isHighlighted: false,
    ctaText: "Initiate Onboarding"
  },
  {
    id: "pro-plus",
    name: "Sovereign Tier",
    validity: "Mission-Critical Operations",
    priceMonthly: "$38,000",
    priceAnnual: "$32,500",
    description: "Engineered for institutional finance, sovereign entities, and Fortune 500 strategic backbones.",
    features: [
      "Private sovereign mesh across 5 regions",
      "Sub-second atomic multi-currency settlement",
      "Post-quantum cryptographic key defense",
      "Custom algorithmic liquidity routing logic",
      "Executive Steering Committee seat"
    ],
    isHighlighted: true,
    ctaText: "Schedule Executive Brief"
  },
  {
    id: "ultimate",
    name: "Bespoke Consortia",
    validity: "Custom Strategic Partnership",
    priceMonthly: "Custom",
    priceAnnual: "Custom",
    description: "Tailored national and cross-border infrastructure initiatives with dedicated engineering teams.",
    features: [
      "Custom consensus protocol & private ledger",
      "Regulatory sandbox advisory & clearance",
      "On-premise hardware security module (HSM) setup",
      "Full source code escrow & verification rights",
      "Bespoke sovereign indemnity & insurance"
    ],
    ctaText: "Contact Chairman"
  }
];

export const whyChooseUsData = [
  {
    iconName: "ShieldCheck",
    title: "Institutional Rigor",
    description: "Zero compromise on regulatory compliance, sovereign segregation, and mathematically proven cryptographic security."
  },
  {
    iconName: "Zap",
    title: "Deterministic Speed",
    description: "Engineered from the silicon up for microsecond execution, deterministic clearing, and sub-second global settlement finality."
  },
  {
    iconName: "Globe2",
    title: "True Global Presence",
    description: "Fully licensed nodes across Zurich, London, New York, Singapore, and Tokyo, providing seamless worldwide coverage."
  },
  {
    iconName: "Cpu",
    title: "Autonomous Intelligence",
    description: "Continuous self-optimizing pipelines that adapt dynamically to volatile macro conditions without manual human latency."
  }
];
