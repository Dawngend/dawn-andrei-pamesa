export const profile = {
  name: "Dawn Andrei Pamesa",
  title: "AI/ML engineer, data scientist, and backend systems architect",
  location: "Quezon City, PH",
  availability: "Open to remote / international",
  bio: "I work the whole path from raw data to running system: ML pipelines that clean, transform, and analyze datasets into executive BI dashboards, GPU-optimized inference, RAG architectures with real vector isolation, and the async backends that keep them online. Certified DataCamp Data Scientist, reading Computer Science (Data Science). Former FlyRank AI machine learning intern (Jul–Sep 2026), currently co-founder of Dzuka Agri.",
  email: "andreipamesa20@gmail.com",
} as const;

export type ContactLink = {
  label: string;
  value: string;
  href: string;
};

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "andreipamesa20@gmail.com",
    href: "mailto:andreipamesa20@gmail.com",
  },
  { label: "GitHub", value: "Dawngend", href: "https://github.com/Dawngend" },
  {
    label: "LinkedIn",
    value: "dawn-andrei-pamesa",
    href: "https://linkedin.com/in/dawn-andrei-pamesa-870689280",
  },
  { label: "Site", value: "andyhub.org", href: "https://andyhub.org" },
];

export type TopStat = {
  value: number;
  suffix: string;
  prefix?: string;
  caption: string;
};

export const topStats: TopStat[] = [
  { value: 60, suffix: "%+", caption: "VRAM cut, AMD MI300X pipeline" },
  { value: 95, suffix: "%+", caption: "Retrieval latency reduction" },
  { value: 100, suffix: "%", caption: "Structurally validated deck output" },
  { value: 24, suffix: "/7", caption: "Andy's Hub production availability" },
];

export type ImpactBar = {
  project: string;
  metric: string;
  value: number;
};

/** Percentage-scale metrics — share a single 0-100% axis. */
export const impactBars: ImpactBar[] = [
  { project: "ForgeAI", metric: "VRAM reduction", value: 60 },
  { project: "Andy's Hub", metric: "retrieval latency cut", value: 95 },
  { project: "Sophy", metric: "structurally valid output", value: 100 },
];

/** Off-scale metric — a multiplier, deliberately kept off the percent axis. */
export const impactMultiplier = {
  project: "ForgeAI",
  metric: "QPS throughput vs. baseline",
  value: 2.0,
  unit: "×",
} as const;

export type Project = {
  id: string;
  name: string;
  context: string;
  href: string | null;
  linkLabel: string | null;
  videoHref?: string;
  problem: string;
  built: string;
  impact: string;
  tags: string[];
  diagram?: "rag-pipeline";
};

export const projects: Project[] = [
  {
    id: "forgeai",
    name: "ForgeAI",
    context: "AMD Developer Cloud Hackathon",
    href: null,
    linkLabel: null,
    problem:
      "High VRAM overhead and inference latency bottleneck PyTorch models on enterprise GPU clusters.",
    built:
      "A 7-phase model compression platform (knowledge distillation, pruning, INT8/FP8 quantization) tuned for AMD Instinct MI300X via ROCm, with an Optuna-powered Pareto frontier engine and an async FastAPI/aiosqlite/WebSockets backend for live benchmarking.",
    impact:
      "60%+ VRAM reduction, 2× QPS throughput for high-concurrency production deployments.",
    tags: ["PyTorch", "ROCm", "Optuna", "FastAPI", "WebSockets"],
  },
  {
    id: "andyshub",
    name: "Andy's Hub",
    context: "Personal Production System",
    href: "https://andyhub.org",
    linkLabel: "andyhub.org",
    problem:
      "Large document collections cause retrieval latency and cross-subject context contamination in RAG systems.",
    built:
      "A stateful AI study reviewer with automated subject classification and subject-scoped vector isolation in ChromaDB, plus a hybrid text/OCR ingestion layer on GCP VMs behind Cloudflare Tunnels.",
    impact: "95%+ cut in ingestion and retrieval latency, 24/7 availability.",
    tags: ["ChromaDB", "RAG", "GCP", "Cloudflare Tunnels"],
    diagram: "rag-pipeline",
  },
  {
    id: "job-pipeline",
    name: "Job Market Pipeline",
    context: "Personal Data Infrastructure",
    href: null,
    linkLabel: null,
    problem:
      "Job boards expose only a live snapshot, so the labour-market signal underneath disappears the moment a listing expires. Keyword search cannot separate a real skills match from an incidental tool mention either.",
    built:
      "A fault-tolerant ingestion pipeline over five public job APIs and RSS feeds, with SHA-256 content-hash deduplication, per-source failure isolation, and an append-only observation store that keeps every posting ever seen. Ranking pairs a curated skills vocabulary with sentence-transformer embeddings, so each score names the skills matched and missing.",
    impact:
      "Turns a disposable feed into a longitudinal market dataset, with explainable skill-gap reporting instead of an opaque relevance score. Runs unattended daily; 160 automated tests.",
    tags: ["Python", "SQLite", "ETL", "Sentence-Transformers", "Task Scheduler"],
  },
  {
    id: "andy-trader",
    name: "Andy Trader",
    context: "Calibrated Forecast Harness",
    href: "https://github.com/Dawngend/andy-trader",
    linkLabel: "GitHub",
    problem:
      "Short-horizon crypto predictions are easy to mistake for real model skill without a fair test.",
    built:
      "A paper-trading harness that logs every prediction before its outcome is known, settles it blind, and evaluates it walk-forward. A promotion gate rejected its first model, live-performance demotion pulled a promoted PyTorch model back out, and a skill gate blocks predictors that have not beaten the base rate from using paper capital. It runs unattended on scheduled tasks with a stdlib-only runtime.",
    impact:
      "Six strategies produced about 2,800 settled out-of-sample predictions across eight instruments. None beat the base rate, so the harness found no skill and now refuses to trade.",
    tags: ["Python", "PyTorch", "SQLite", "Backtesting", "Calibration"],
  },
  {
    id: "andy-run",
    name: "Andy Router and andy run",
    context: "Agent Orchestration Tooling",
    href: "https://github.com/Dawngend/andy-router",
    linkLabel: "GitHub",
    videoHref: "https://github.com/Dawngend/andy-router/blob/main/docs/walkthrough.mp4",
    problem:
      "Coding agents differ in cost and strength, and unattended agent work needs guardrails.",
    built:
      "Python tooling routes each task to an agent and model by complexity and policy, builds on an isolated git branch, runs a review loop between two model families, and runs the project's check command. It merges only small passing work and stops big or risky work for a human. andy sync keeps two machines in sync automatically.",
    impact:
      "Safety at the merge step. In 166 real runs, 50 merged, 99 stopped for a human and 17 failed; the public repo has 220+ offline tests and a published benchmark.",
    tags: ["Python", "Git", "LLM Orchestration", "Automation"],
  },
  {
    id: "sophy",
    name: "Sophy",
    context: "ACM TECHSPRINT — Team Runtime Terrors",
    href: "https://github.com/Dawngend/Runtime-Terrors-TECHSPRINT",
    linkLabel: "GitHub",
    problem:
      "Low-connectivity learners hit network drops, and single-model RAG tools hallucinate structurally.",
    built:
      "A stateful RAG study engine with dual-API orchestration (Groq/Llama 3.3 for generation, NVIDIA NIM/Qwen 2.5 for JSON validation), plus a hybrid OCR fallback with disk caching for offline resilience.",
    impact: "100% structurally validated learning content, sub-second reprocessing.",
    tags: ["Groq/Llama 3.3", "NVIDIA NIM", "ChromaDB", "OCR"],
  },
  {
    id: "bangon",
    name: "BANGON",
    context: "eGovPH Hackathon 2026",
    href: "https://github.com/TadeyRuk/eGov",
    linkLabel: "GitHub",
    problem:
      "Cross-agency government identity databases carry fraud risk and mismatches under legacy query-loop designs.",
    built:
      "A PII-secure integration platform replacing query loops with a tamper-evident blockchain verification layer, national digital-ID checks with device binding, and strict AAA security logging under CADENA Act compliance.",
    impact: "Eliminated cross-agency identity mismatches, zero-PII-leakage design.",
    tags: ["Blockchain", "AAA logging", "PII security"],
  },
  {
    id: "dzuka",
    name: "Dzuka Agri",
    context: "lablab.ai Band of Agents — Co-Founder",
    href: null,
    linkLabel: null,
    problem:
      "Smallholder farmers across Africa lack real-time data to prevent crop failure.",
    built:
      "Backend REST APIs and real-time geospatial data ingestion for a multi-agent agricultural diagnostic platform, as co-founder and lead backend engineer.",
    impact:
      "Live climate/crop diagnostics; nominated for the We The Peoples Africa Awards.",
    tags: ["Geospatial pipelines", "Multi-agent systems", "REST APIs"],
  },
];

/** Ingestion → retrieval path rendered inside the Andy's Hub card. */
export const pipelineStages = [
  { key: "upload", label: "Upload", detail: "PDF / slide deck" },
  { key: "extract", label: "Extract", detail: "text + OCR" },
  { key: "chroma", label: "Chroma", detail: "subject-scoped" },
  { key: "retrieve", label: "Retrieve", detail: "vector search" },
  { key: "generate", label: "Generate", detail: "reviewer output" },
  { key: "study", label: "Study session", detail: "" },
] as const;

export type Role = {
  period: string;
  title: string;
  org: string;
  blurb: string;
};

export const experience: Role[] = [
  {
    period: "Jul 2026 — Sep 2026",
    title: "Machine Learning Intern",
    org: "FlyRank AI",
    blurb:
      "Engineered automated ML pipelines to clean, transform, and analyze datasets, streamlining data workflows and powering executive BI dashboards.",
  },
  {
    period: "2026 — present",
    title: "Co-Founder & Lead Backend Engineer",
    org: "Dzuka Agri",
    blurb:
      "Backend architecture, REST API design, and geospatial telemetry ingestion for a multi-agent agricultural diagnostics platform serving smallholder farmers.",
  },
  {
    period: "Aug 2025 — present",
    title: "Junior Officer",
    org: "FEU Tech ACM Student Chapter",
    blurb:
      "Manage chapter technical infrastructure; organize developer workshops and hackathon bootcamps.",
  },
];

export type StackGroup = {
  label: string;
  items: string[];
};

export const stack: StackGroup[] = [
  {
    label: "Languages",
    items: ["Python 3.11+", "SQL", "PL/SQL", "C++", "Java", "PHP", "JSON"],
  },
  {
    label: "Data & analytics",
    items: [
      "SQL / PL-SQL",
      "ETL / ELT pipelines",
      "Data cleaning & transformation",
      "Exploratory analysis",
      "scikit-learn",
      "Embedding & similarity scoring",
      "Executive BI dashboards",
      "PostgreSQL / SQLite",
    ],
  },
  {
    label: "AI / ML",
    items: [
      "PyTorch",
      "ROCm workloads",
      "Quantization & pruning (INT8/FP8/INT4)",
      "Knowledge distillation",
      "RAG",
      "ChromaDB",
      "Multi-agent LLM orchestration (Groq/Llama 3, NVIDIA NIM/Qwen)",
      "OCR",
    ],
  },
  {
    label: "Backend & cloud",
    items: [
      "FastAPI",
      "Pydantic v2",
      "REST / WebSockets",
      "Supabase (PostgreSQL)",
      "SQLite / aiosqlite",
      "GCP VMs",
      "Cloudflare Tunnels",
      "Docker",
      "CI/CD",
    ],
  },
  {
    label: "Frontend",
    items: ["Next.js", "Tailwind CSS", "Streamlit"],
  },
];

export const education = {
  degree: "BS Computer Science — Data Science",
  school: "FEU Institute of Technology, Manila",
  expected: "Expected Jul 2028",
  note: "100% SM Foundation Scholar",
} as const;

export type Certification = {
  name: string;
  issuer: string;
  when: string;
};

export const certifications: Certification[] = [
  { name: "Data Scientist", issuer: "DataCamp", when: "Aug 2026" },
  { name: "AWS Certified AI Practitioner", issuer: "AWS", when: "2026" },
  {
    name: "CCNA: Introduction to Networks",
    issuer: "Cisco",
    when: "Jul 2026",
  },
  {
    name: "IT Specialist — Python",
    issuer: "Certiport",
    when: "Valid to Jul 2031",
  },
];

export const sections = [
  { id: "work", label: "Work" },
  { id: "impact", label: "Impact" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
] as const;

export const footerCta =
  "Building something that needs real infrastructure, not just a demo?";
