import {
    Code2,
    Container,
    Database,
    Layers,
    type LucideIcon,
} from "lucide-react";

export type Service = {
    icon: LucideIcon;
    title: string;
    description: string;
    price?: string;
    tags: string[];
    color: "green" | "maple" | "yellow" | "brown";
    status: "available" | "unavailable" | "coming_soon";
};

//TODO: update productized services
export const productizedServices: Service[] = [
    {
        icon: Code2,
        title: "Backend API Development",
        description:
            "Design and build production-ready REST APIs with clean architecture, proper error handling, auth, and documentation.",
        tags: ["Node.js", "NestJS", "Java Spring", ".NET", "REST"],
        color: "green",
        price: "$750",
        status: "unavailable",
    },
    {
        icon: Database,
        title: "Database Design & Optimization",
        description:
            "Schema design, data normalization, query tuning, and migrations for relational and document-based databases.",
        tags: ["PostgreSQL", "MongoDB", "Migrations", "Indexing"],
        color: "maple",
        price: "$500",
    },
];

//TODO: update batch productized services
export const batchProductizedServices: Service[] = [
    {
        icon: Code2,
        title: "Backend API Development",
        description:
            "Design and build production-ready REST APIs with clean architecture, proper error handling, auth, and documentation.",
        tags: ["Node.js", "NestJS", "Java Spring", ".NET", "REST"],
        color: "green",
        price: "$750",
        status: "unavailable",
    },
    {
        icon: Database,
        title: "Database Design & Optimization",
        description:
            "Schema design, data normalization, query tuning, and migrations for relational and document-based databases.",
        tags: ["PostgreSQL", "MongoDB", "Migrations", "Indexing"],
        color: "maple",
        price: "$500",
    },
];

//TODO: Update retainer plans
export const retainerPlans: Service[] = [
    {
        icon: Container,
        title: "Ongoing Development Support",
        description:
            "Monthly retainer for continuous development, feature additions, and iterative improvements.",
        tags: [
            "Feature Development",
            "Iterative Improvements",
            "Priority Support",
        ],
        color: "yellow",
        price: "Starting at $1500/month",
    },
    {
        icon: Layers,
        title: "Architecture Review & Refactoring",
        description:
            "Regular codebase reviews, refactoring sessions, and architectural guidance to keep your project healthy.",
        tags: ["Code Review", "Refactoring", "Architectural Guidance"],
        color: "brown",
        price: "Starting at $6000/month",
        status: "coming_soon",
    },
];

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
