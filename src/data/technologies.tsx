import {
  Code2,
  Coffee,
  Container,
  Database,
  Figma,
  Globe,
  Hammer,
  Layers,
  Monitor,
  Moon,
  NotebookPen,
  Palette,
  Server,
  SquareDashedBottomCode,
  Webhook,
  Worm,
} from "lucide-react";

export type Technology = {
  name: string;
  icon: React.ReactNode;
  link?: string;
};

export type TechnologyCategory = {
  id: "frontend" | "backend" | "tools";
  label: string;
  icon: React.ReactNode;
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
        name: "TypeScript",
        icon: <Layers className="w-8 h-8" />,
        link: "https://www.typescriptlang.org/",
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
        name: "Framer Motion",
        icon: <Palette className="w-8 h-8" />,
        link: "https://www.framer.com/motion/",
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
        name: "MongoDB",
        icon: <Database className="w-8 h-8" />,
        link: "https://www.mongodb.com/",
      },
      {
        name: "Express",
        icon: <Moon className="w-8 h-8" />,
        link: "https://expressjs.com/",
      },
      {
        name: ".NET",
        icon: <Globe className="w-8 h-8" />,
        link: "https://dotnet.microsoft.com/",
      },
      {
        name: "PostgreSQL",
        icon: <Database className="w-8 h-8" />,
        link: "https://www.postgresql.org/",
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
        icon: <Figma className="w-8 h-8" />,
        link: "https://www.figma.com/",
      },
      {
        name: "JIRA",
        icon: <NotebookPen className="w-8 h-8" />,
        link: "https://www.atlassian.com/software/jira",
      },
      {
        name: "Docker",
        icon: <Container className="w-8 h-8" />,
        link: "https://www.docker.com/",
      },
      {
        name: "Postman",
        icon: <Webhook className="w-8 h-8" />,
        link: "https://www.postman.com/",
      },
    ],
  },
];
