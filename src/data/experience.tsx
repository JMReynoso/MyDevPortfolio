export type Experience = {
  title: string;
  company: string;
  date: string;
  description: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    title: "Back-end Developer",
    company: "Cadmium",
    date: "Dec 2022 - Nov 2024",
    description: [
      "Created features and managed bugs across multiple products.",
      "Developed an internal REST API (Next.js) to enable seamless data transfer between services.",
      "Consolidated and migrated data to a normalized database.",
      "Wrote API documentation (Swagger).",
      "Implemented CI/CD workflows and improved application reliability and performance.",
      "Created a Rate Limiter to optimize API call bottlenecks and reduce server load, increasing performance by up to 70% in high-traffic scenarios.",
    ],
    tags: [
      "Node.js",
      "Express",
      "NestJS",
      "PostgreSQL",
      "SQL",
      "Swagger",
      "Jest",
      "GitLab CI/CD",
      "Docker",
      "AWS",
      "MongoDB",
      "Lambda",
      "Redis",
      ".NET API",
      "C#",
      "Typescript",
      "JIRA",
      "Confluence",
      "SCRUM",
    ],
  },
  {
    title: "Junior Full-Stack Developer",
    company: "Cadmium",
    date: "Mar 2022 - Jan 2023",
    description: [
      "Developed new features and resolved bugs for a SaaS platform.",
      "Worked on front-end and back-end tasks to deliver polished user experiences.",
      "Collaborated with design and product teams to implement new features and improve existing ones.",
      "Contributed to testing and deployment processes, increasing code quality and reliability by up to 40%.",
    ],
    tags: ["Java Spring", "Java", "JIRA", "SCRUM", "SQL", "JSP"],
  },
  {
    title: "Junior Software Developer & Support Analyst",
    company: "System Innovations",
    date: "Mar 2020 - 2022",
    description: [
      "Built and maintained internal tools.",
      "Provided application support and troubleshooting for internal and customer-facing modules.",
      "Automated repetitive tasks and improved system monitoring, increasing efficiency and reducing downtime by up to 30%.",
      "Created technical documentation and assisted in deployments.",
    ],
    tags: [
      ".NET Core",
      ".NET Framework",
      "SQL Server",
      "SSMS",
      "MTFS",
      "Confluence",
      "Customer Service",
      "Technical Support",
      "Troubleshooting",
      "Documentation",
    ],
  },
  {
    title: "Computer Science Major",
    company: "University of North Florida",
    date: "2016 - 2020",
    description: [
      "Completed coursework in programming, data structures, algorithms, and software engineering.",
      "Participated in coding projects and collaborated with peers on assignments.",
    ],
    tags: [
      "Data Structures & Algorithms",
      "Software Engineering",
      "Operating Systems",
      "Web Systems",
      "Networking",
      "Hardware",
      "Java",
      "Linear Algebra",
      "Calculus",
      "Statistics",
    ],
  },
  {
    title: "Computer Science Major",
    company: "Widener University",
    date: "2015 - 2016",
    description: [
      "Transfered to University of North Florida after one year due to family moving.",
    ],
    tags: ["Python", "C", "Linux"],
  },
  {
    title: "IT Support Technician",
    company: "Chichester School District",
    date: "2016 - 2016",
    description: [
      "Installed and maintained educational technology and servers.",
      "Provided end-user support, hardware troubleshooting, and assisted with network setup and basic system administration tasks.",
    ],
    tags: [
      "Software and Hardware Trouble Shooting",
      "macOS",
      "Windows",
      "Customer Service",
    ],
  },
];
