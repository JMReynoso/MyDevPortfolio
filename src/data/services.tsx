import {
    Code,
    Code2,
    CodeXml,
    Container,
    FileCode,
    FolderCode,
    Puzzle,
    Sparkles,
    Wrench,
    type LucideIcon,
} from "lucide-react";

export type Service = {
    icon: LucideIcon;
    title: string;
    description: React.ReactNode;
    price?: string;
    tags: string[];
    color: "green" | "maple" | "yellow" | "brown";
    status: "available" | "unavailable" | "coming_soon";
};

//TODO: update productized services with price and status
export const productizedServices: Service[] = [
    {
        icon: Code2,
        title: "Backend Performance Audit",
        description: (
            <>
                For <b>1 service</b>, I can provide a comprehensive review of
                your backend architecture, code quality, and performance
                bottlenecks with actionable recommendations. if more services
                are needed, refer to the 'Productized Services in batches'
                section below.
            </>
        ),
        tags: ["Node.js", "NestJS", ".NET", "REST"],
        color: "green",
        price: "Price TBD",
        status: "coming_soon",
    },
    {
        icon: CodeXml,
        title: "API Health Check",
        description: (
            <>
                For <b>1 service</b>, I can perform a focused review of your API
                endpoints, including response times, error rates, and adherence
                to best practices with specific recommendations for improvement!
            </>
        ),
        tags: ["Node.js", "NestJS", ".NET", "REST"],
        color: "maple",
        price: "Price TBD",
        status: "coming_soon",
    },
];

//TODO: update batch productized services with price and status
export const batchProductizedServices: Service[] = [
    {
        icon: Code,
        title: "Enterprise Performance Audit",
        description: (
            <>
                For <b>2-4 services</b> and depending on the scope of work, I
                can provide a comprehensive review of your backend architecture,
                code quality, and performance bottlenecks with actionable
                recommendations (including summary, findings, prioritized
                recommendations, and possible roadmap for implementation).
            </>
        ),
        tags: ["Node.js", "NestJS", ".NET", "REST"],
        color: "maple",
        price: "Price TBD",
        status: "coming_soon",
    },
];

//TODO: Update retainer plans with price and status
export const retainerPlans: Service[] = [
    {
        icon: Container,
        title: "Monitoring and Maintenance",
        description: (
            <>
                Ongoing monitoring of your backend services, regular health
                checks, and proactive maintenance to ensure optimal performance
                and reliability.
            </>
        ),
        tags: [
            "Feature Development",
            "Iterative Improvements",
            "Priority Support",
        ],
        color: "yellow",
        price: "Price TBD",
        status: "coming_soon",
    },
    {
        icon: FileCode,
        title: "Backend Developer",
        description: (
            <>
                Ongoing support for your backend development needs, including
                new feature development, iterative improvements, and priority
                support to ensure your services are always running smoothly.
            </>
        ),
        tags: ["Endpoint Creation", "Refactoring", "Performance Optimization"],
        color: "brown",
        price: "Price TBD",
        status: "coming_soon",
    },
    {
        icon: FolderCode,
        title: "Lead Backend Developer",
        description: (
            <>
                Ongoing support for your backend development needs, including
                new feature development, iterative improvements, and priority
                support to ensure your services are always running smoothly. I
                can also provide architectural guidance and code reviews to help
                your team grow and improve over time.
            </>
        ),
        tags: ["Code Review", "Refactoring", "Architectural Guidance"],
        color: "green",
        price: "Price TBD",
        status: "coming_soon",
    },
];

//TODO: Update custom projects with price and status
export const customProjects: Service[] = [
    {
        icon: Sparkles,
        title: "Tailored Backend Solution",
        description: (
            <>
                Have a unique idea that doesn't fit a standard package? I can
                design and build a custom backend solution tailored to your
                business goals, from initial concept through production
                deployment.
            </>
        ),
        tags: ["Custom Architecture", "Scoping", "End-to-End Delivery"],
        color: "green",
        price: "Price TBD",
        status: "coming_soon",
    },
    {
        icon: Puzzle,
        title: "Third-Party Integration",
        description: (
            <>
                Need to connect your systems with external services, payment
                processors, or partner APIs? I can build reliable integrations
                with proper error handling, retries, and observability.
            </>
        ),
        tags: ["API Integration", "Webhooks", "Data Sync"],
        color: "maple",
        price: "Price TBD",
        status: "coming_soon",
    },
    {
        icon: Wrench,
        title: "Legacy Modernization",
        description: (
            <>
                Working with an aging codebase? I can help migrate, refactor, or
                incrementally modernize legacy backend systems while keeping
                business operations running smoothly throughout the transition.
            </>
        ),
        tags: ["Migration", "Refactoring", "Modernization"],
        color: "brown",
        price: "Price TBD",
        status: "coming_soon",
    },
];

export const steps = [
    {
        number: "01",
        title: "Discovery",
        description: (
            <>
                We start with a conversation about your goals, constraints, and
                existing stack so I can understand what you actually need.
            </>
        ),
    },
    {
        number: "02",
        title: "Scoping",
        description: (
            <>
                I break the work into clear deliverables with timelines — no
                surprise scope creep.
            </>
        ),
    },
    {
        number: "03",
        title: "Build",
        description: (
            <>
                Iterative development with regular check-ins. You always know
                where things stand.
            </>
        ),
    },
    {
        number: "04",
        title: "Handoff",
        description: (
            <>
                Clean code, documented decisions, and a walkthrough so your team
                can own and extend the work.
            </>
        ),
    },
];
