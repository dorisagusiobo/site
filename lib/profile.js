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
  {
    slug: "pm",
    kind: "Full-stack app",
    title: "Taskboard",
    pitch: "A kanban board with an AI assistant that helps organize your work.",
    problem: "Small teams need a clear board without the clutter of enterprise tools.",
    built:
      "A one-click “What’s at risk” report: the app flags overdue, due-soon and undated work, and the AI explains it in plain language with next steps. Plus accounts, multiple boards, AI-set due dates and labels, search and export.",
    design:
      "Five fixed columns from Backlog to Done, a zero-setup first login, and a confirmation step before anything destructive.",
    stack: ["AI assistant", "FastAPI", "Next.js", "SQLite", "Docker"],
    meta: "2026 · 200+ automated tests",
    links: [
      { label: "Try it live", href: "https://taskboard-4yst.onrender.com" },
      { label: "Code", href: "https://github.com/dorisagusiobo/taskboard" },
    ],
  },
];

export const moreWork = [
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
      platform: "Azure",
      text: "An AI agent that reviews code for vulnerabilities with Semgrep through an MCP server, packaged with Docker and run on Azure Container Apps.",
      stack: ["Container Apps", "Container Registry", "Docker", "MCP"],
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
    text: "Rigor you can measure: models that improve accuracy, a 3.93 graduate GPA, and agents taken all the way to production.",
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
    note: "3.93 GPA",
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
  "AWS (Bedrock, SageMaker, Lambda)",
  "Terraform",
  "FastAPI",
  "Next.js & React",
  "Docker",
  "Figma & design systems",
];
