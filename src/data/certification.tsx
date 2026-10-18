import { type LucideIcon, Code2, Rocket } from "lucide-react";

enum Status {
  Certified = "Certified",
  InProgress = "In Progress",
}

export type Certification = {
  title: string;
  details: string[];
  fromClass: string;
  status: string;
  icon: LucideIcon;
  link: string;
};

export const certifications: Certification[] = [
  {
    title: "Meta Front-End Developer Professional Certificate",
    details: [
      "Advanced React coverage: hooks, context, performance optimization, and modern component patterns.",
      "Responsive UX and UI design: scaling layouts across breakpoints so the interface adapts to the user's device.",
    ],
    fromClass: "from-[#F5E6D3]",
    status: Status.Certified,
    icon: Code2,
    link: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/7D3LO2QO73UE",
  },
  {
    title: "IBM AI Engineering Professional Certificate",
    details: [
      "Machine learning algorithms, data preprocessing, and model deployment.",
    ],
    fromClass: "from-[#FFF8E7]",
    status: Status.InProgress,
    icon: Rocket,
    link: "https://www.coursera.org/professional-certificates/ai-engineer",
  },
];
