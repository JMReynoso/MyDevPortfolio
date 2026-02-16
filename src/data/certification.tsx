import { Code2, Rocket } from "lucide-react";

enum status {
  Certified = "Certified",
  InProgress = "In Progress",
}

export const certifications = [
  {
    title: "Meta Front-end Developer Certification",
    text: "Advanced React certification covering hooks, context, performance optimization, and modern patterns.",
    color: "F5E6D3",
    status: status.Certified,
    icon: Code2,
    link: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/7D3LO2QO73UE",
  },
  {
    title: "IBM AI/ML Certification",
    text: "Comprehensive AI/ML certification from IBM covering machine learning algorithms, data preprocessing, and model deployment.",
    color: "FFF8E7",
    status: status.InProgress,
    icon: Rocket,
    link: "https://www.coursera.org/professional-certificates/ai-engineer",
  },
];
