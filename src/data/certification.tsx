import { Code2, Rocket } from "lucide-react";

enum status {
  Certified = "Certified",
  InProgress = "In Progress",
}

//TODO: Update certification data with real certifications, statuses, and links
export const certifications = [
  {
    title: "React Developer",
    text: "Advanced React certification covering hooks, context, performance optimization, and modern patterns.",
    color: "F5E6D3",
    status: status.Certified,
    icon: Code2,
    link: "https://www.example.com/react-certification",
  },
  {
    title: "IBM AI/ML Certification",
    text: "Comprehensive AI/ML certification from IBM covering machine learning algorithms, data preprocessing, and model deployment.",
    color: "FFF8E7",
    status: status.InProgress,
    icon: Rocket,
    link: "https://www.example.com/ibm-ai-ml-certification",
  },
];
