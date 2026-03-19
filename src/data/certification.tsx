import { type LucideIcon, Code2, Rocket } from "lucide-react";

enum Status {
  Certified = "Certified",
  InProgress = "In Progress",
}

export type Certification = {
  title: string;
  text: string;
  fromClass: string;
  status: string;
  icon: LucideIcon;
  link: string;
};

export const certifications: Certification[] = [
  {
    title: "Meta Front-end Developer Certification",
    text: "Advanced React certification covering hooks, context, performance optimization, and modern patterns.",
    fromClass: "from-[#F5E6D3]",
    status: Status.Certified,
    icon: Code2,
    link: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/7D3LO2QO73UE",
  },
  {
    title: "IBM AI/ML Certification",
    text: "Comprehensive AI/ML certification from IBM covering machine learning algorithms, data preprocessing, and model deployment.",
    fromClass: "from-[#FFF8E7]",
    status: Status.InProgress,
    icon: Rocket,
    link: "https://www.coursera.org/professional-certificates/ai-engineer",
  },
];
