export const profile = {
  name: "Pranoti Varpe",
  initials: "PV",
  title: "Software Developer",
  tagline: "Building full-stack products and exploring data engineering",
  location: "Pune, India",
  email: "pranoti17501@gmail.com",
  phone: "+91 7666135487" as string | null,
  linkedin: "https://www.linkedin.com/in/pranoti-varpe/",
  github: "https://github.com/pranotivarpe",
  resumeFile: "/Pranoti_Varpe_Resume.pdf",
  photo: "/profile.jpg" as string | null,
  bio: [
    "I'm a software developer based in Pune, currently working as a Software Engineer Intern at Siddhesh Technologies, where I build and maintain RESTful APIs with Node.js and Express, and design PostgreSQL schemas on Neon for production backend modules.",
    "I just wrapped up my MCA at MIT World Peace University, after a BCA at Bharati Vidyapeeth. Along the way I've built a full-stack cafe management platform, an AI-powered voice note summarizer, and led a six-member team building an AI travel app at HACK'MIT — I like taking products from a rough idea to something people can actually click through and use.",
    "Right now I'm looking for Software Developer or Data Engineer roles where I can keep building reliable backend systems, work with real data at scale, and keep learning in the process.",
  ],
} as const;

export const skills = [
  {
    category: "Languages",
    items: ["Java", "JavaScript", "SQL", "Python"],
  },
  {
    category: "Frontend",
    items: [
      "React.js",
      "React Hooks",
      "Tailwind CSS",
      "Bootstrap",
      "Material UI",
      "HTML5",
      "CSS3",
      "Responsive UI Design",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "REST API Development",
      "MVC Architecture",
      "JWT Authentication",
      "CRUD Operations",
    ],
  },
  {
    category: "AI & API Integration",
    items: [
      "OpenAI APIs",
      "OpenRouter",
      "AssemblyAI",
      "External API Integration",
      "JSON Handling",
    ],
  },
  {
    category: "Database",
    items: ["MySQL", "PostgreSQL", "Prisma ORM", "Neon"],
  },
  {
    category: "Tools & Platforms",
    items: ["Git", "GitHub", "Postman", "Vite"],
  },
  {
    category: "Core Computer Science",
    items: ["DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks"],
  },
] as const;

export const experience = [
  {
    role: "Software Engineer Intern",
    company: "Siddhesh Technologies Pvt. Ltd",
    period: "Feb 2026 – Present",
    bullets: [
      "Developed and maintained RESTful APIs using Node.js and Express.js for backend application modules.",
      "Designed and optimized PostgreSQL databases on Neon, including schema design and CRUD operations.",
      "Integrated backend APIs with frontend systems to ensure seamless data flow and application functionality.",
      "Followed best practices including MVC architecture, API testing with Postman, error handling, and version control using Git.",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "Navodita Infotech (Remote)",
    period: "Dec 2023 – Jan 2024",
    bullets: [
      "Developed responsive frontend interfaces using HTML, CSS, Bootstrap, and JavaScript with a focus on accessibility and mobile-first design.",
      "Improved UI/UX consistency across devices by applying responsive design principles.",
      "Strengthened frontend development skills through hands-on implementation and iterative improvements.",
    ],
  },
] as const;

export const projects = [
  {
    name: "Cafe POS",
    tagline: "Full-stack cafe management system",
    description:
      "A full-stack POS platform for cafe operations covering order management, inventory tracking, payments, reservations, and kitchen workflows.",
    bullets: [
      "Developed REST APIs with Node.js, Express.js, Prisma, and MySQL with JWT authentication and role-based access control.",
      "Implemented operational modules such as split payments, table reservations, low-stock alerts, a chef dashboard, and sales analytics.",
    ],
    stack: ["React.js", "Node.js", "Express.js", "Prisma", "MySQL", "JWT", "Tailwind CSS"],
    // Repo is still being finalized — add the link once it's ready.
    github: null as string | null,
    demo: null as string | null,
  },
  {
    name: "AI Voice Note Summarizer",
    tagline: "Voice-to-summary pipeline with AI",
    description:
      "A full-stack voice note summarization app using AssemblyAI and OpenRouter for transcription and AI-generated summaries.",
    bullets: [
      "Built an end-to-end pipeline: MediaRecorder → Node/Express → AssemblyAI → OpenRouter, with structured JSON output and robust error handling.",
      "Added text-to-speech playback and a responsive UI for an improved user experience.",
    ],
    stack: ["React", "Node.js", "Express.js", "AssemblyAI", "OpenRouter", "JavaScript", "CSS"],
    github: "https://github.com/pranotivarpe/AI-Voice-Note-Summarizer" as string | null,
    demo: null as string | null,
  },
] as const;

export const leadership = [
  {
    title: "HACK'MIT 25 Ideathon",
    period: "Mar 2025",
    bullets: [
      "Built an AI-powered travel app that adapts itineraries in real time using mood, energy, and AR to improve the user experience.",
      "Led a 6-member team to design and prototype a smart, scalable solution for dynamic tourism.",
    ],
  },
  {
    title: "Women Who Code – Social Good Hackathon (Online)",
    period: "Oct 2023",
    bullets: [
      "Collaborated with a 4-member team to build a website promoting women's education.",
      "Handled all front-end development and design contributions.",
    ],
  },
] as const;

export const education = [
  {
    course: "Master of Computer Application (MCA)",
    institute: "MIT World Peace University, Pune",
    period: "Aug 2024 – May 2026 (Expected)",
    detail: "CGPA 7.91 (First Year)",
  },
  {
    course: "Bachelor of Computer Application (BCA)",
    institute: "IMED, Bharati Vidyapeeth, Pune",
    period: "2021 – 2024",
    detail: "CGPA 8.24",
  },
] as const;

export const certifications = [
  {
    name: "Generative AI Data Analyst",
    issuer: "Coursera",
    link: "https://drive.google.com/file/d/1R_4_-hV8jvFTMMavCW9Vtqcb2j8qFG17/view?usp=drive_link" as string | null,
  },
  {
    name: "React JS Certificate",
    issuer: "Great Learning",
    link: "https://drive.google.com/file/d/1iMeY6dR7U_K-Xvbs-F-7NRaBx99LUfXg/view?usp=drive_link" as string | null,
  },
  {
    name: "Version Control Certificate",
    issuer: "Coursera",
    link: "https://drive.google.com/file/d/19VVjB603vtlE4nytSrqWOTuue58fme61/view?usp=drive_link" as string | null,
  },
] as const;
