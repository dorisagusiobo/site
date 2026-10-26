// Single source of truth for career facts. The page renders from this file and
// the Digital Twin’s system prompt is built from it, so the two can’t drift apart.

export const person = {
  name: "Doris Agusiobo Echianu",
  firstName: "Doris",
  role: "AI Engineer",
  location: "Maryland, USA",
  thesis:
    "I started as a designer. Now I build machine learning, generative AI and AI agents that people understand and use.",
  mission: "Turn complexity into clarity.",
  linkedin: "https://www.linkedin.com/in/doris-agusiobo-echianu-83571764",
  github: "https://github.com/dorisagusiobo",
  designPortfolio: "https://doriss.webflow.io/",
};

export const results = [
  { value: "40%", label: "less processing time from a Python reporting pipeline" },
  { value: "10 hrs", label: "saved every week for the team by that pipeline" },
  { value: "+18%", label: "prediction accuracy from a classification model" },
  { value: "+32%", label: "user engagement after an ML-informed dashboard redesign" },
  { value: "−22%", label: "support tickets after the same redesign" },
];

export const featuredWork = [
  {
    slug: "carebridge",
    kind: "Healthcare AI",
    title: "CareBridge",
    pitch: "Turns hospital discharge instructions into a plain-language care plan a patient can follow at home.",
    problem:
      "Discharge paperwork is written for clinicians. Patients go home unsure what to take, what to avoid and when to worry, and an AI that gets one detail wrong is worse than none.",
    built:
      "A care plan, daily check-in and read-aloud in 10 languages a patient can choose from the first screen. Every line must quote the instructions, and fixed rules from emergency-physician guidance escalate signs like blue lips to call 911. Nothing is stored on the server.",
    design:
      "Urgency first, a typeface designed for low-vision readers, its own accessible palette, and a toggle that shows the quote behind every line.",
    stack: ["Claude Haiku", "FastAPI", "Next.js", "Docker", "Render"],
    meta: "2026 · 178 automated tests",
    links: [
      { label: "Case study", href: "/work/carebridge" },
      { label: "Try it live", href: "https://carebridge-ojwt.onrender.com" },
      { label: "Code", href: "https://github.com/dorisagusiobo/carebridge" },
    ],
  },
  {
    slug: "jobscout",
    kind: "AI agent on AWS",
    title: "JobScout",
    pitch: "An agent that finds AI roles worth applying to, scores my fit and emails me only the strong matches.",
    problem:
      "Job boards are noisy. Thousands of postings a week, many needing a security clearance, US citizenship or an office I can’t reach, and reading each one by hand doesn’t scale.",
    built:
      "Every weekday it scans about 10,000 public postings across 43 company job boards, drops roles I can’t take, and has Claude on Amazon Bedrock score the rest with structured output: fit score, strengths, gaps and a pitch line. It remembers what it has scored and caps model calls per run. The agent structure follows a pattern from Ed Donner’s LLM Engineering course; the problem, sources, scoring and AWS deployment are mine.",
    design:
      "Cheap rules run before any model call, so Claude only sees the few hundred postings that matter. The model may only use facts from my profile, and a real eligibility concern blocks an alert instead of hiding inside it.",
    stack: ["Claude on Bedrock", "AWS Lambda", "EventBridge", "DynamoDB", "SNS", "Terraform"],
    meta: "2026 · 45 automated tests · Runs daily",
    links: [{ label: "Code", href: "https://github.com/dorisagusiobo/jobscout" }],
  },
  {
    slug: "prelegal",
    kind: "AI product",
    title: "Prelegal",
    pitch: "Draft common legal agreements by having a conversation instead of filling in a form.",
    problem:
      "Legal templates are dense. Most people don’t know which agreement they need or what goes in each blank.",
    built:
      "One AI chat covers 11 agreement types. It picks the right one, asks for the details and fills a live preview as you talk. Accounts, saved drafts and a review disclaimer included.",
    design:
      "You can draft without signing up. An account is only needed to save. The preview stays visible so you always see what you’re agreeing to.",
    stack: ["LLM chat", "FastAPI", "Next.js", "SQLite", "Docker"],
    meta: "2026 · 150+ automated tests",
    links: [
      { label: "Try it live", href: "https://prelegal-fwbr.onrender.com" },
      { label: "Code", href: "https://github.com/dorisagusiobo/prelegal" },
    ],
  },
  {
    slug: "twin",
    kind: "AI agent",
    title: "Digital Twin",
    pitch: "An AI agent that answers questions about my work, in my voice. You can talk to it on this page.",
    problem: "Recruiters and collaborators have follow-up questions at any hour. A résumé can’t answer them.",
    built:
      "An agent grounded only in verified facts about my career, with guardrails against making things up. A second version runs serverless on AWS Lambda with Terraform and GitHub Actions.",
    design:
      "It tells you it’s an AI when asked, and points you to LinkedIn when it doesn’t know something instead of guessing.",
    stack: ["AI agent", "OpenRouter", "AWS Lambda", "Terraform", "CI/CD"],
    meta: "2026 · Live on this site",
    links: [{ label: "Ask it a question", href: "#twin" }],
  },
];

export const moreWork = [
  {
    kind: "AI on AWS",
    title: "Loan Policy Assistant",
    text: "A student loan assistant on Amazon Bedrock that answers only from policy documents. Guardrails mask SSNs, refuse credit decisions and investment advice, and block any answer the retrieved text doesn’t support. Knowledge Bases on S3 Vectors, Claude, Terraform.",
    href: "https://github.com/dorisagusiobo/loan-policy-assistant",
  },
  {
    kind: "Full-stack app",
    title: "Taskboard",
    text: "A kanban board with an AI assistant and a one-click “What’s at risk” report that flags overdue and undated work and explains it in plain language. 200+ automated tests.",
    href: "https://github.com/dorisagusiobo/taskboard",
  },
  {
    kind: "Voice AI",
    title: "Mira Assistant",
    text: "A voice-first assistant: speak or type, hear the reply, and pick saved conversations back up. Written to be heard, and honest about what it can’t do.",
    href: "https://github.com/dorisagusiobo/mira-assistant",
  },
  {
    kind: "Generative AI",
    title: "AI Email Secretary",
    text: "An LLM that sorts an inbox into six priority levels and drafts replies. Full marks in the Johns Hopkins program.",
  },
  {
    kind: "Generative AI",
    title: "Research Proposal Automation",
    text: "A generative AI workflow that drafts research proposals. Full marks in the Johns Hopkins program.",
  },
  {
    kind: "Algorithms",
    title: "Algorithms Portfolio System",
    text: "Sorting visualizations, quickselect, a full Set class and classic data structures in one interactive system, with a performance report. 200/200 at CSU Global.",
  },
];

// Hands-on work from the AI Engineer Production Track (Ed Donner & Ligency, Udemy):
// course projects I built and deployed to real cloud accounts myself.
export const deployments = {
  credit: "Built and deployed during the AI Engineer Production Track (Ed Donner, Udemy). The projects follow the course; the cloud setup, debugging and deploys were mine.",
  items: [
    {
      title: "Digital Twin",
      platform: "AWS",
      text: "Serverless AI agent on Lambda behind CloudFront with an HTTPS certificate, provisioned with Terraform and shipped by GitHub Actions using keyless (OIDC) sign-in to AWS.",
      stack: ["Lambda", "CloudFront", "Terraform", "GitHub Actions"],
    },
    {
      title: "Alex, a multi-agent financial planner",
      platform: "AWS",
      text: "A containerized research agent on Lambda that runs on a schedule, plus a CloudWatch dashboard to monitor the agents in production.",
      stack: ["Lambda containers", "ECR", "EventBridge Scheduler", "CloudWatch"],
    },
    {
      title: "Cyber, a security code analyzer",
      platform: "Azure + Google Cloud",
      text: "An AI agent that reviews code for vulnerabilities with Semgrep through an MCP server. Packaged with Docker and deployed with Terraform to two clouds: Azure Container Apps, and Google Cloud Run through Artifact Registry. Both were torn down after testing so nothing kept billing.",
      stack: ["Container Apps", "Cloud Run", "Artifact Registry", "Terraform", "Docker", "MCP"],
    },
    {
      title: "MediNotes Pro",
      platform: "Vercel",
      text: "A healthcare SaaS that turns consultation notes into summaries, with sign-in through Clerk and a FastAPI backend calling OpenAI.",
      stack: ["Next.js", "Clerk", "FastAPI", "OpenAI"],
    },
  ],
};

export const pillars = [
  {
    title: "Intelligent",
    text: "Rigor you can measure: models that improve accuracy, 98% in a Johns Hopkins generative AI program, and agents taken all the way to production.",
  },
  {
    title: "Intuitive",
    text: "Design training applied to every system. I turn model output into interfaces and visuals people can act on.",
  },
  {
    title: "Helpful",
    text: "Built for real people. Hours given back to teams, fewer support tickets, and a long-term focus on access to education, healthcare and opportunity.",
  },
];

export const story = [
  "I didn’t begin in AI. I began in design, first graphics and then UI/UX, where you learn to listen before you build and understand people before you try to solve their problems.",
  "Over time I saw technology get more powerful without getting more human. Tools were intelligent on paper and confusing in practice. So I moved into software, cloud and then machine learning, to translate between what AI can do and what people need.",
  "I’m an introvert, and I count that as a strength. It lets me think deeply, notice the patterns others miss and work with intention.",
];

export const experience = [
  {
    period: "2023 – now",
    role: "AI Engineer",
    org: "CapacityBay Inc.",
    points: [
      "Design and deploy agentic AI systems, including multi-agent flows for document parsing, summarization and content validation.",
      "Integrate LLM features into SaaS tools: content generation, semantic search and intelligent reporting.",
      "Benchmark LLMs for performance and cost, and advise small businesses on AI readiness and integration.",
    ],
  },
  {
    period: "2019 – 2023",
    role: "Software & Systems Consultant",
    org: "CapacityBay Inc.",
    points: [
      "Built web applications with secure data handling and cloud dashboards for analytics and real-time monitoring.",
      "Delivered user-centered, AI-enhanced design solutions and reusable design components for startups and clients.",
    ],
  },
  {
    period: "2017 – 2018",
    role: "User Experience Designer",
    org: "Freelance (Fiverr)",
    points: [
      "Led discovery workshops and user research, and turned complex client problems into clear design objectives.",
      "Built a design system in Figma covering patterns, layout, typography and hierarchy.",
    ],
  },
];

export const education = [
  {
    period: "2025 – June 2027 (expected)",
    title: "M.S. Artificial Intelligence & Machine Learning Engineering",
    org: "Colorado State University Global",
    note: "In progress",
  },
  {
    period: "Jan – May 2025",
    title: "Certificate in Applied Generative AI",
    org: "Johns Hopkins University, with Great Learning",
    note: "98% overall",
  },
  {
    period: "2005 – 2009",
    title: "B.A. Graphic Design",
    org: "Imo State University",
    note: "",
  },
];

export const credentials = [
  { title: "AI Leader: Generative AI & Agentic AI for Leaders & Founders", issuer: "Udemy", date: "Oct 2026" },
  { title: "AI Engineer Production Track: Deploy LLMs & Agents at Scale", issuer: "Udemy", date: "Oct 2026" },
  { title: "SCLA Honor Society", issuer: "Society for Collegiate Leadership & Achievement", date: "Oct 2026" },
  { title: "AI Coder: Complete Claude Code & Coding Agents", issuer: "Udemy", date: "Aug 2026" },
  { title: "Critical Thinking & Structured Problem Solving", issuer: "SCLA", date: "Jul 2026" },
  { title: "The Complete Agentic AI Engineering Course", issuer: "Udemy", date: "Sep 2025" },
  { title: "AI on Cloud", issuer: "Great Learning", date: "May 2025" },
  { title: "UX/UI Design Masterclass", issuer: "DesignerShip", date: "Jul 2024" },
  { title: "Practical UX Research & Strategy", issuer: "DesignerShip", date: "Jul 2024" },
  { title: "Ultimate Figma Masterclass", issuer: "DesignerShip", date: "May 2024" },
];

export const toolkit = [
  "Python",
  "LLMs & prompt engineering",
  "RAG",
  "AI agents (LangChain, CrewAI)",
  "OpenAI & OpenRouter",
  "AWS (Bedrock, Knowledge Bases, Guardrails, Lambda, DynamoDB, SageMaker)",
  "Azure Container Apps & Google Cloud Run",
  "Terraform",
  "FastAPI",
  "Next.js & React",
  "Docker",
  "Figma & design systems",
];
