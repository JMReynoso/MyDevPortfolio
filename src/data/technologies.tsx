import {
  Code2,
  Server,
  Globe,
  Database,
  Layers,
  Box,
  Zap,
  Package,
  Monitor,
  Palette,
} from "lucide-react";

export type Technology = {
  name: string;
  icon: React.ReactNode;
  link?: string;
};

export type TechnologyCategory = {
  id: "frontend" | "backend";
  label: string;
  icon: React.ReactNode;
  technologies: Technology[];
};

//TODO: update
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
        name: "Vue.js",
        icon: <Box className="w-8 h-8" />,
        link: "https://vuejs.org/",
      },
      {
        name: "JavaScript",
        icon: <Zap className="w-8 h-8" />,
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
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
        name: "Express",
        icon: <Package className="w-8 h-8" />,
        link: "https://expressjs.com/",
      },
      {
        name: "MongoDB",
        icon: <Database className="w-8 h-8" />,
        link: "https://www.mongodb.com/",
      },
      {
        name: "PostgreSQL",
        icon: <Database className="w-8 h-8" />,
        link: "https://www.postgresql.org/",
      },
      {
        name: "Python",
        icon: <Code2 className="w-8 h-8" />,
        link: "https://www.python.org/",
      },
      {
        name: "GraphQL",
        icon: <Layers className="w-8 h-8" />,
        link: "https://graphql.org/",
      },
    ],
  },
];
