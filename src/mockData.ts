import { Internship, Job, FreelanceProject, SuccessStory, SkillChallenge } from "./types";

export const initialInternships: Internship[] = [
  {
    id: "int-1",
    title: "AI & Machine Learning Research Intern",
    company: "Google DeepMind Academy",
    location: "Remote",
    type: "Remote",
    category: "AI & Data Science",
    stipend: "$1,500 / month",
    duration: "3 Months",
    skillsRequired: ["Python", "TensorFlow", "Scikit-Learn", "English"],
    description: "Collaborate with senior researchers to analyze neural validation metrics, optimize pre-training data schedules, and construct diagnostic dashboards for Gemini evaluation sets.",
    postedDate: "2026-06-01",
    isPaid: true
  },
  {
    id: "int-2",
    title: "React Front-End Engineer Intern",
    company: "Vercel Labs",
    location: "San Francisco, CA",
    type: "Hybrid",
    category: "Web Engineering",
    stipend: "$2,200 / month",
    duration: "6 Months",
    skillsRequired: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    description: "Work tightly on next-generation layout engines, improve visual responsive state machines, and support Vite dev server caching workflows.",
    postedDate: "2026-06-03",
    isPaid: true
  },
  {
    id: "int-3",
    title: "Digital Marketing Specialist WFH",
    company: "Shopify",
    location: "Remote",
    type: "Work From Home",
    category: "Marketing",
    stipend: "$1,200 / month",
    duration: "3 Months",
    skillsRequired: ["SEO", "Google Analytics", "Copywriting", "Creative Ads"],
    description: "Launch campaigns to empower local merchant networks, craft clear informational landing copies, and review click-through metrics on growth channels.",
    postedDate: "2026-06-05",
    isPaid: true
  },
  {
    id: "int-4",
    title: "UI/UX Layout Designer",
    company: "Linear Systems Inc.",
    location: "Remote",
    type: "Remote",
    category: "Design",
    stipend: "$1,800 / month",
    duration: "4 Months",
    skillsRequired: ["Figma", "Design Systems", "Prototyping"],
    description: "Drive high-fidelity visual system architectures for team planning boards. Align spacing, borders, typography, and dark mode contrast variables.",
    postedDate: "2026-06-02",
    isPaid: true
  }
];

export const initialJobs: Job[] = [
  {
    id: "job-1",
    title: "Junior Full-Stack Developer (Fresher)",
    company: "Stripe",
    location: "Remote",
    type: "Remote",
    salary: "$85,000 / year",
    skillsRequired: ["React", "Node.js", "Express", "PostgreSQL"],
    description: "Join the core billing systems group to assist in maintaining transactional API routes, conducting ledger audits, and engineering responsive support workspaces.",
    postedDate: "2026-05-28"
  },
  {
    id: "job-2",
    title: "Associate Product Designer",
    company: "Airbnb",
    location: "Seattle, WA",
    type: "On-site",
    salary: "$95,000 / year",
    skillsRequired: ["Figma", "Product Strategy", "User Research", "Prototyping"],
    description: "Design fluid booking and search UI patterns. Engage directly with international travel hosts, run interactive split testing, and iterate onboarding maps.",
    postedDate: "2026-06-01"
  },
  {
    id: "job-3",
    title: "Content Marketing Strategist",
    company: "Notion",
    location: "Remote",
    type: "Part-time",
    salary: "$45 / hour",
    skillsRequired: ["Technical Writing", "SEO", "Notion API", "Social Strategy"],
    description: "Craft inspiring technical case studies, maintain company blogging tracks, and support community-led template sharing initiatives.",
    postedDate: "2026-06-04"
  }
];

export const initialFreelanceProjects: FreelanceProject[] = [
  {
    id: "fp-1",
    title: "E-Commerce Web Portal Build",
    category: "Web Development",
    budget: "$1,200",
    client: "Heritage Coffee Roasters",
    duration: "3 Weeks",
    description: "Build an interactive static storefront with secure shopping cart components, robust checkout models, and a sleek modern product visualizer grid.",
    skillsRequired: ["React", "Tailwind CSS", "Local Storage"]
  },
  {
    id: "fp-2",
    title: "Brand Logo & Style Guidelines",
    category: "Logo Design",
    budget: "$450",
    client: "Nova Bioscience",
    duration: "1 Week",
    description: "Create a modern, vector-perfect corporate logo, define color values for light/dark displays, and deliver comprehensive style compliance guidelines.",
    skillsRequired: ["Figma", "Vector Illustration", "Corporate Typography/Brand Layout"]
  },
  {
    id: "fp-3",
    title: "Technical Blog Writing Series",
    category: "Content Writing",
    budget: "$300",
    client: "LogiTrace SaaS",
    duration: "10 Days",
    description: "Write 3 high-scannable technical blog articles clarifying telemetry logging standards, microservices integration strategies, and cloud migration rules.",
    skillsRequired: ["Technical Writing", "SEO Optimization", "Cloud Computing Basics"]
  },
  {
    id: "fp-4",
    title: "Growth Funnel Optimization Campaign",
    category: "Marketing",
    budget: "$750",
    client: "FitLoop Fitness App",
    duration: "2 Weeks",
    description: "Draft 15 targeted ad copy lines, restructure direct email marketing loops, and optimize visual layout highlights on the primary landing page.",
    skillsRequired: ["Ad Copy writing", "Email Marketing", "A/B Testing"]
  }
];

export const successStories: SuccessStory[] = [
  {
    id: "ss-1",
    studentName: "Aditya Verma",
    roleWon: "AWS Research Intern",
    company: "Amazon Web Services",
    quote: "StepUp Elite changed everything. The AI Resume Score coached me directly into ATS friendliness, leading to 5 interviews!",
    story: "Aditya used the ATS Checker daily to fine-tune keywords like Kubernetes, Docker, and CI/CD pipelines. After raising his resume score from 42 to 92, his draft bypassed AWS's strict screening systems seamlessly.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "ss-2",
    studentName: "Maya Lin",
    roleWon: "Product Design Associate",
    company: "Figma Inc.",
    quote: "I practiced 12 mock interviews with the AI Recruiter tool. It felt incredibly realistic and helped me overcome interview anxiety.",
    story: "Maya took advantage of the AI mock interviews. She refined her answers for design critiques and soft-skills behavioral assessments, receiving grading indices on timing and impact statements.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export const initialChallenges: SkillChallenge[] = [
  {
    id: "ch-1",
    title: "Matrix Transpose & Mapping Algorithm",
    type: "Coding",
    difficulty: "Medium",
    points: 150,
    question: "Write a function in TypeScript that receives a 2D array of grid values and outputs its mathematical transpose. Include strict bounds handling for non-square matrices."
  },
  {
    id: "ch-2",
    title: "SaaS Dark-Mode Dashboard Hero Card",
    type: "Design",
    difficulty: "Easy",
    points: 80,
    question: "Design an eye-safe, high-contrast dark visual hero card indicating cloud telemetry metrics. Outline color codes, typography sizing nodes (Figma / CSS values), and padding layout grids."
  },
  {
    id: "ch-3",
    title: "SEO Copywrite for AI Scheduling Tool",
    type: "Content Writing",
    difficulty: "Easy",
    points: 60,
    question: "Compose a 150-word landing page product description targeting high-intent keywords like: 'automatic calendar aggregator', 'smart meeting buffers', and 'workflow optimization'."
  }
];

export const mockCandidates = [
  { id: "cand-1", name: "Anish Gupta", university: "IIT Bombay", major: "Computer Science", skills: ["React", "Typescript", "Node.js", "Express", "Vite", "Git"] },
  { id: "cand-2", name: "Tanvi S.", university: "BITS Pilani", major: "Information Systems", skills: ["React", "CSS", "Python", "SEO", "Google Analytics", "Google Ads"] },
  { id: "cand-3", name: "Rohan Das", university: "VIT Vellore", major: "Software Engineering", skills: ["React", "Node.js", "Docker", "AWS", "Kubernetes", "PostgreSQL", "Next.js"] },
  { id: "cand-4", name: "Meera Nair", university: "DTU Delhi", major: "Electronics", skills: ["Python", "Tensorflow", "Scikit-Learn", "Git", "C++"] }
];

export const mockMentors = [
  { id: "m-1", name: "Suresh Kumar", role: "Principal Engineer at Google", bio: "20+ years of cloud, database, and system-design leadership. Happy to optimize mock interviews.", avatar: "A" },
  { id: "m-2", name: "Neha Sharma", role: "Staff Product Designer at Meta", bio: "Passionate about grid architecture, responsive micro-animations, and portfolio critiques.", avatar: "N" }
];

export const sampleResumes = [
  {
    title: "Web Engineering Resume",
    text: `ALEXHYA SANGU
Email: alekhyareddysangu1352006@gmail.com
Role: React Frontend Intern / Web Developer

TECHNICAL SKILLS:
Languages: JavaScript, TypeScript, HTML, CSS, C++
Frameworks: React.js, Tailwind CSS, Express
Tools: Version Control (Git), GitHub, Node.js, Vite

PROJECT SHOWCASE:
1. Student Portfolio Portal
- Build an interactive web portal featuring flexible client storage caching, standard dashboard grids, and CSS transition models.
- Implemented styled responsive design using Tailwind, boosting loading time speeds by 20%.

EDUCATION:
Bachelor of Technology, Computer Science Engineering (Current Undergrad)`
  },
  {
    title: "Deep Tech & Cloud Resume",
    text: `ALEXHYA SANGU - Software Engineer Candidate
Contact: alekhyareddysangu1352006@gmail.com

SUMMARY:
Highly focused software builder expert in creating systems architecture, building web services, and optimizing local caching layers.

EXPERIENCE PROJECTS:
- Engineered REST proxy gateways in Node.js to aggregate third party analytics pipelines.
- Configured automated test suites via GitHub Actions to run on every commit.

SKILLS:
Database: PostgreSQL, MongoDB, Redis
Infrastructure: Docker, Git, CI/CD Pipelines
Backend: Node.js, Express, TypeScript`
  }
];
