export type Education = {
  degree: string;
  institution: string;
  date: string;
  description: string[];
  tags: string[];
};

export const education: Education[] = [
  {
    degree: "B.S., Computer Science",
    institution: "University of North Florida",
    date: "2016 - 2020",
    description: [
      "Coursework: data structures & algorithms, software engineering, operating systems, web systems, networking, and computer hardware.",
    ],
    tags: [
      "Data Structures & Algorithms",
      "Software Engineering",
      "Operating Systems",
      "Web Systems",
      "Networking",
      "Computer Hardware",
    ],
  },
  {
    degree: "Computer Science",
    institution: "Widener University",
    date: "2015 - 2016",
    description: ["Transferred to the University of North Florida."],
    tags: ["Python", "C"],
  },
];
