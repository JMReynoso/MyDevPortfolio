import {
  Code2,
  Container,
  Database,
  Layers,
  type LucideIcon,
} from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  color: "green" | "maple" | "yellow" | "brown";
};

export const productizedServices: Service[] = [
  {
    icon: Code2,
    title: "Backend API Development",
    description:
      "Design and build production-ready REST APIs with clean architecture, proper error handling, auth, and documentation.",
    tags: ["Node.js", "NestJS", "Java Spring", ".NET", "REST"],
    color: "green",
  },
  {
    icon: Database,
    title: "Database Design & Optimization",
    description:
      "Schema design, data normalization, query tuning, and migrations for relational and document-based databases.",
    tags: ["PostgreSQL", "MongoDB", "Migrations", "Indexing"],
    color: "maple",
  },
];

export const retainerPlans: Service[] = [
  {
    icon: Container,
    title: "Ongoing Development Support",
    description:
      "Monthly retainer for continuous development, feature additions, and iterative improvements.",
    tags: ["Feature Development", "Iterative Improvements", "Priority Support"],
    color: "yellow",
  },
  {
    icon: Layers,
    title: "Architecture Review & Refactoring",
    description:
      "Regular codebase reviews, refactoring sessions, and architectural guidance to keep your project healthy.",
    tags: ["Code Review", "Refactoring", "Architectural Guidance"],
    color: "brown",
  },
];

export const colorIcon: Record<Service["color"], string> = {
  green: "bg-[#7BA05B]",
  maple: "bg-[#C77B58]",
  yellow: "bg-[#F5C563]",
  brown: "bg-[#8B6F47]",
};

export const colorGradient: Record<Service["color"], string> = {
  green: "from-[#E8F3E0]",
  maple: "from-[#F5E6D3]",
  yellow: "from-[#FFF8E7]",
  brown: "from-[#F0EAE0]",
};

export const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start with a conversation about your goals, constraints, and existing stack so I can understand what you actually need.",
  },
  {
    number: "02",
    title: "Scoping",
    description:
      "I break the work into clear deliverables with timelines — no surprise scope creep.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Iterative development with regular check-ins. You always know where things stand.",
  },
  {
    number: "04",
    title: "Handoff",
    description:
      "Clean code, documented decisions, and a walkthrough so your team can own and extend the work.",
  },
];
