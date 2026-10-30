// Edit everything here — all links across the site read from this file.
export const profile = {
  name: "Jeet Patel",
  role: "MERN Stack Developer / Computer Science Student",
  college: "Shrimad Rajchandra Institute of Management and Computer Application, Maliba Campus",
  course: "FYMCA (Master of Computer Applications)",
  location: "Bilimora, Gujarat, India",
  email: "pjeet2642@gmail.com",
  linkedin: "https://www.linkedin.com/in/jeet-patel-9b33733a2/",
  github: "https://github.com/pjeet2642-cmd",
  resume: "", // [Your Resume PDF URL]
  intro:
    "I build full-stack web apps with MongoDB, Express, React and Node. I enjoy solving problems, writing clean code and learning new technologies.",
};

export const skills: Record<string, string[]> = {
  Frontend: ["HTML", "CSS", "JavaScript", "React.js"],
  Backend: ["Node.js", "Express.js"],
  Database: ["MongoDB"],
  Tools: ["Git", "GitHub", "VS Code", "Postman"],
  Other: ["[Add My Skills]"],
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  category: "MERN Project" | "Mini Project" | "Personal Project";
  github: string;
  demo: string;
  meta?: string | undefined;
};

const p = (title: string, tech: string[], category: Project["category"], meta?: string): Project => ({
  title: `${title} (Placeholder)`,
  description: "Placeholder — replace with your real project description.",
  tech,
  category,
  github: "",
  demo: "",
  meta,
});

export const projects: Project[] = [
  p("Full-Stack MERN Project", ["MongoDB", "Express", "React", "Node.js"], "MERN Project"),
];
