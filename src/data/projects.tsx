export type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  imageFit?: "cover" | "contain";
};

export const projects: Project[] = [
  {
    title: "Job Assistance",
    description:
      "Turns a job posting into a tailored resume, personalized outreach and a ranked contact list in one AI pipeline across the Claude, Perplexity and Hunter.io APIs.",
    image: "/images/projects/job-assistance.png",
    tags: [
      "Claude API",
      "Perplexity API",
      "Hunter.io API",
      "Ollama API",
      "Node.js",
      "PostgreSQL",
      "Fastify",
      "React",
      "Next.js",
      "NestJS",
      "Puppeteer",
      "Handlebars",
    ],
    link: "https://github.com/JMReynoso/job-assistance",
  },
  {
    title: "Distributed API Rate Limiter",
    description:
      "A production Redis-backed rate limiter shared across Cadmium's high-traffic SaaS products, increasing API performance under heavy load while preserving response times for lower-volume clients.",
    image: "/images/projects/distributed-api-rate-limiter.svg",
    imageFit: "contain",
    tags: [".NET Core", "ASP.NET Web API", "NUnit", "Redis", "Azure"],
  },
  {
    title: "Household Task Tracker",
    description:
      "A full-stack .NET and Next.js app in clean architecture, with Redis-cached scoring, Hangfire recurring jobs, Testcontainers integration tests and a live demo shipped through CI/CD.",
    image: "/images/projects/household-task-tracker.png",
    tags: [
      ".NET Core",
      "React",
      "PostgreSQL",
      "Redis",
      "Next.js",
      "Hangfire",
      "Docker",
    ],
    link: "https://github.com/JMReynoso/todo",
  },
];
