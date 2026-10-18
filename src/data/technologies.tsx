import {
  AppWindow,
  Boxes,
  Braces,
  Brain,
  BrainCircuit,
  Cat,
  Cloud,
  Code2,
  Coffee,
  Component,
  Container,
  Database,
  DatabaseZap,
  Dog,
  FileCode,
  FlaskConical,
  Frame,
  GitBranch,
  Globe,
  Hammer,
  Layers,
  ListChecks,
  Monitor,
  Moon,
  Network,
  NotebookPen,
  PackageCheck,
  Palette,
  PenTool,
  Rocket,
  Route,
  Server,
  ShieldCheck,
  SquareDashedBottomCode,
  SquareFunction,
  Table,
  TestTube,
  Triangle,
  Webhook,
  Workflow,
  Worm,
} from "lucide-react";
import { ReactNode } from "react";

export type Technology = {
  name: string;
  icon: ReactNode;
  link?: string;
};

export type TechnologyCategory = {
  id: "frontend" | "backend" | "tools";
  label: string;
  icon: ReactNode;
  technologies: Technology[];
};

export const categories: TechnologyCategory[] = [
  {
    id: "frontend",
    label: "Front-end",
    icon: <Monitor className="w-8 h-8" />,
    technologies: [
      {
        name: "React",
        icon: <Code2 className="w-8 h-8" />,
        link: "https://reactjs.org/",
      },
      {
        name: "React Router",
        icon: <Route className="w-8 h-8" />,
        link: "https://reactrouter.com/",
      },
      {
        name: "TypeScript",
        icon: <Layers className="w-8 h-8" />,
        link: "https://www.typescriptlang.org/",
      },
      {
        name: "JavaScript",
        icon: <FileCode className="w-8 h-8" />,
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        name: "Next.js",
        icon: <Globe className="w-8 h-8" />,
        link: "https://nextjs.org/",
      },
      {
        name: "Tailwind CSS",
        icon: <Palette className="w-8 h-8" />,
        link: "https://tailwindcss.com/",
      },
      {
        name: "Radix UI",
        icon: <Component className="w-8 h-8" />,
        link: "https://www.radix-ui.com/",
      },
      {
        name: "Framer Motion",
        icon: <Palette className="w-8 h-8" />,
        link: "https://www.framer.com/motion/",
      },
      {
        name: "Vite",
        icon: <Frame className="w-8 h-8" />,
        link: "https://vitejs.dev/",
      },
      {
        name: "Vitest",
        icon: <FlaskConical className="w-8 h-8" />,
        link: "https://vitest.dev/",
      },
    ],
  },
  {
    id: "backend",
    label: "Back-end",
    icon: <Server className="w-8 h-8" />,
    technologies: [
      {
        name: "Node.js",
        icon: <Server className="w-8 h-8" />,
        link: "https://nodejs.org/",
      },
      {
        name: "NestJS",
        icon: <Cat className="w-8 h-8" />,
        link: "https://nestjs.com/",
      },
      {
        name: "Java Spring",
        icon: <Layers className="w-8 h-8" />,
        link: "https://spring.io/",
      },
      {
        name: "AWS",
        icon: <Server className="w-8 h-8" />,
        link: "https://aws.amazon.com/",
      },
      {
        name: "AWS Lambda",
        icon: <SquareFunction className="w-8 h-8" />,
        link: "https://aws.amazon.com/lambda/",
      },
      {
        name: "Azure",
        icon: <Cloud className="w-8 h-8" />,
        link: "https://azure.microsoft.com/",
      },
      {
        name: "MongoDB",
        icon: <Database className="w-8 h-8" />,
        link: "https://www.mongodb.com/",
      },
      {
        name: "Redis",
        icon: <DatabaseZap className="w-8 h-8" />,
        link: "https://redis.io/",
      },
      {
        name: "Express",
        icon: <Moon className="w-8 h-8" />,
        link: "https://expressjs.com/",
      },
      {
        name: "Prisma",
        icon: <Triangle className="w-8 h-8" />,
        link: "https://www.prisma.io/",
      },
      {
        name: "Swagger / OpenAPI",
        icon: <Braces className="w-8 h-8" />,
        link: "https://swagger.io/",
      },
      {
        name: ".NET",
        icon: <Globe className="w-8 h-8" />,
        link: "https://dotnet.microsoft.com/",
      },
      {
        name: "ASP.NET",
        icon: <AppWindow className="w-8 h-8" />,
        link: "https://dotnet.microsoft.com/en-us/apps/aspnet",
      },
      {
        name: "Entity Framework Core",
        icon: <Layers className="w-8 h-8" />,
        link: "https://learn.microsoft.com/en-us/ef/core/",
      },
      {
        name: "PostgreSQL",
        icon: <Database className="w-8 h-8" />,
        link: "https://www.postgresql.org/",
      },
      {
        name: "Microsoft SQL Server",
        icon: <Database className="w-8 h-8" />,
        link: "https://www.microsoft.com/en-us/sql-server",
      },
      {
        name: "SQL",
        icon: <Table className="w-8 h-8" />,
        link: "https://www.iso.org/standard/76583.html",
      },
      {
        name: "Python",
        icon: <Worm className="w-8 h-8" />,
        link: "https://www.python.org/",
      },
      {
        name: "C#",
        icon: <SquareDashedBottomCode className="w-8 h-8" />,
        link: "https://learn.microsoft.com/en-us/dotnet/csharp/",
      },
      {
        name: "Java",
        icon: <Coffee className="w-8 h-8" />,
        link: "https://www.java.com/en/",
      },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: <Hammer className="w-8 h-8" />,
    technologies: [
      {
        name: "Figma",
        icon: <PenTool className="w-8 h-8" />,
        link: "https://www.figma.com/",
      },
      {
        name: "JIRA",
        icon: <NotebookPen className="w-8 h-8" />,
        link: "https://www.atlassian.com/software/jira",
      },
      {
        name: "Git",
        icon: <GitBranch className="w-8 h-8" />,
        link: "https://git-scm.com/",
      },
      {
        name: "GitHub Actions",
        icon: <Workflow className="w-8 h-8" />,
        link: "https://github.com/features/actions",
      },
      {
        name: "GitLab CI/CD",
        icon: <Rocket className="w-8 h-8" />,
        link: "https://docs.gitlab.com/ci/",
      },
      {
        name: "Docker",
        icon: <Container className="w-8 h-8" />,
        link: "https://www.docker.com/",
      },
      {
        name: "Nginx",
        icon: <Network className="w-8 h-8" />,
        link: "https://nginx.org/",
      },
      {
        name: "Cloudflare Zero Trust",
        icon: <ShieldCheck className="w-8 h-8" />,
        link: "https://www.cloudflare.com/zero-trust/",
      },
      {
        name: "Datadog",
        icon: <Dog className="w-8 h-8" />,
        link: "https://www.datadoghq.com/",
      },
      {
        name: "Postman",
        icon: <Webhook className="w-8 h-8" />,
        link: "https://www.postman.com/",
      },
      {
        name: "Jest",
        icon: <TestTube className="w-8 h-8" />,
        link: "https://jestjs.io/",
      },
      {
        name: "NUnit",
        icon: <ListChecks className="w-8 h-8" />,
        link: "https://nunit.org/",
      },
      {
        name: "Testcontainers",
        icon: <PackageCheck className="w-8 h-8" />,
        link: "https://testcontainers.com/",
      },
      {
        name: "Ollama",
        icon: <Brain className="w-8 h-8" />,
        link: "https://ollama.com/",
      },
      {
        name: "Continue.dev",
        icon: <Boxes className="w-8 h-8" />,
        link: "https://continue.dev/",
      },
      {
        name: "Claude Code",
        icon: <Brain className="w-8 h-8" />,
        link: "https://claude.co/code",
      },
      {
        name: "Claude API",
        icon: <BrainCircuit className="w-8 h-8" />,
        link: "https://claude.com/platform/api",
      },
    ],
  },
];
