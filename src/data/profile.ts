/*
 * Personal facts that are not projects: contact, profile links, skills,
 * achievements and education. Every value is taken from the resume
 * (Abhishek_res_2026.pdf) and its link annotations.
 *
 * A link is optional: a profile without `url` is simply not shown as a link,
 * never guessed. Codeforces and CodeChef URLs were supplied by Abhishek
 * (they are not in the resume's embedded links).
 */

export type Profile = { id: string; label: string; url?: string };

export const person = {
  name: "Abhishek Srivastava",
  wordmark: "AS.",
  email: "abhishekoff2022@gmail.com",
  // No phone number on the site, by choice. Email is the only direct contact.
  resumePath: "/resume.pdf",
  location: "Bhubaneswar, Odisha, India",
};

export const profiles: Profile[] = [
  { id: "github", label: "GitHub", url: "https://github.com/P-S-Y-C-H-O" },
  { id: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/abhishek-srivastava-9015ab2a7/" },
  { id: "leetcode", label: "LeetCode", url: "https://leetcode.com/u/abhishek22ghostrider/" },
  { id: "codeforces", label: "Codeforces", url: "https://codeforces.com/profile/PSYCHO2022" },
  { id: "codechef", label: "CodeChef", url: "https://www.codechef.com/users/psycho2022" },
];

export const skillGroups: { title: string; items: string[] }[] = [
  { title: "Languages", items: ["C++", "C", "Java", "Python", "JavaScript", "TypeScript", "SQL"] },
  { title: "AI / ML", items: ["Retrieval-Augmented Generation (RAG)", "LangChain"] },
  { title: "Frontend", items: ["React.js", "Next.js"] },
  { title: "Backend", items: ["Node.js", "Hono", "REST APIs", "JWT", "Prisma ORM", "Zod"] },
  { title: "Databases", items: ["PostgreSQL", "SQL", "Vector DB"] },
  { title: "DevOps", items: ["Docker"] },
  { title: "Tools", items: ["Git", "GitHub", "Postman", "VS Code"] },
];

export const achievements = {
  problemsSolved: { value: 1000, suffix: "+", label: "DSA problems solved", detail: "Across LeetCode, Codeforces and CodeChef." },
  codeforces: { value: "1162", label: "Codeforces", detail: "Maximum rating." },
  codechef: { value: "3-Star", label: "CodeChef", detail: "Rating earned." },
};

export const education = {
  school: "Kalinga Institute of Industrial Technology (KIIT)",
  degree: "Bachelor of Technology (B.Tech.) in Computer Science and Engineering",
  cgpa: "8.35",
  years: "2023 – 2027",
  location: "Bhubaneswar, Odisha, India",
  coursework: [
    "Data Structures",
    "Database Management",
    "Object-Oriented Programming",
    "Algorithm Analysis",
    "Operating Systems",
  ],
};

export const certification = {
  title: "NPTEL Certification: Database Management Systems",
  duration: "8 weeks, 65 hours",
  summary: "Relational database models, SQL queries, schema design and transaction management.",
  url: "https://drive.google.com/file/d/1aRplJqB84pqleMXhNoWE6EKxVLIGubCe/view?usp=sharing",
};

export const interests = [
  "Full-stack product development",
  "Backend architecture and APIs",
  "AI-powered applications and retrieval systems",
  "Data structures, algorithms and competitive programming",
];
