export type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
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
    tags: [".NET Core", "ASP.NET Web API", "NUnit", "Redis", "Azure"],
  },
  {
    title: "My Development Portfolio",
    description:
      "A Front-end developer portfolio showcasing my skills, projects, and experience with a clean, modern, and warm design.",
    image: "/images/projects/Screenshot 2026-02-19 193057.png",
    tags: [
      "React",
      "Node.js",
      "TypeScript",
      "Tailwind",
      "Vite",
      "Framer Motion",
      "Docker",
      "Nginx",
      "Github Actions",
      "CD/CI",
    ],
    link: "https://github.com/JMReynoso/My-dev-portfolio/tree/main",
  },
  {
    title: "Little Lemon Restaurant Reservation App",
    description:
      "The culmination of the course is the Capstone Project: building a fully functional restaurant reservation web app (nicknamed “Little Lemon” in the course). This is a real-world, portfolio-style project where students apply everything they’ve learned.",
    image: "/images/projects/Screenshot 2026-02-19 192542.png",
    tags: [
      "React",
      "Node.js",
      "TypeScript",
      "Jest",
      "SEO",
      "CSS",
      "Accessibility",
    ],
    link: "https://github.com/JMReynoso/little-lemon",
  },
];
