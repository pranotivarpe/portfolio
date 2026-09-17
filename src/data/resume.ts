export const profile = {
  name: "Pranoti Varpe",
  initials: "PV",
  title: "Software Developer",
  tagline: "Full-stack developer building web apps with React, Node.js and Java",
  location: "Pune, India",
  email: "pranoti17501@gmail.com",
  phone: "+91 7666135487" as string | null,
  linkedin: "https://www.linkedin.com/in/pranoti-varpe/",
  github: "https://github.com/pranotivarpe",
  resumeFile: "/Pranoti_Varpe_Resume.pdf",
  photo: "/profile.jpg" as string | null,
  bio: [
    "I'm a full-stack developer based in Pune. Most recently I was a Software Engineer Intern at Siddhesh Technologies, where I built and maintained RESTful APIs with Node.js and Express and designed PostgreSQL schemas on Neon for production backend modules.",
    "I completed my MCA at MIT World Peace University in 2026, after a BCA at Bharati Vidyapeeth. Along the way I've built a cafe management platform, an AI voice note summarizer, and two e-commerce apps (one on Spring Boot, one on Django REST), and led a six-member team building an AI travel app at HACK'MIT. I like taking products from a rough idea to something people can actually click through and use.",
    "I'm now looking for a full-time Software Developer or Full-Stack Developer role where I can build reliable backend systems and polished interfaces, and keep learning along the way.",
  ],
} as const;

export const skills = [
  {
    category: "Languages",
    items: ["Java", "JavaScript", "TypeScript", "SQL", "Python"],
  },
  {
    category: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "Redux",
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
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "Django REST Framework",
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
      "Stripe",
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
    items: ["Git", "GitHub", "Postman", "Vite", "Maven", "Vercel"],
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
    // TODO: replace "2026" with the month your internship ended, e.g. "Feb 2026 – Jul 2026"
    period: "Feb 2026 – 2026",
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

export type FlowStep = { label: string; detail: string };
export type Layer = { layer: string; tech: string };

export const projects = [
  {
    slug: "cafe-pos",
    name: "Cafe POS",
    tagline: "Full-stack cafe management system",
    description:
      "A full-stack POS platform for cafe operations covering order management, inventory tracking, payments, reservations, and kitchen workflows.",
    bullets: [
      "Developed REST APIs with Node.js, Express.js, Prisma, and MySQL with JWT authentication and role-based access control.",
      "Implemented operational modules such as split payments, table reservations, low-stock alerts, a chef dashboard, and sales analytics.",
    ],
    features: [
      "Order management from the counter",
      "Inventory tracking with low-stock alerts",
      "Split payments",
      "Table reservations",
      "A chef dashboard for kitchen workflow",
      "Sales analytics",
      "Role-based access for different staff",
    ],
    flow: [
      { label: "Staff sign in", detail: "Each account gets a JWT that carries its role." },
      { label: "React POS screen", detail: "Orders, tables and payments are handled in the browser UI." },
      { label: "Express REST API", detail: "Routes check the token and the role before doing anything." },
      { label: "Prisma + MySQL", detail: "Orders, stock and reservations are stored and updated." },
      { label: "Kitchen and reports", detail: "The chef dashboard and sales analytics read the same data." },
    ] as FlowStep[],
    layers: [
      { layer: "Frontend", tech: "React.js, Tailwind CSS" },
      { layer: "Backend", tech: "Node.js, Express.js" },
      { layer: "Data", tech: "Prisma ORM, MySQL" },
      { layer: "Auth", tech: "JWT with role-based access control" },
    ] as Layer[],
    // Optional: a short paragraph in your own words (a hard problem you solved,
    // a decision you made). Shown on the project page when filled in.
    notes: null as string | null,
    stack: ["React.js", "Node.js", "Express.js", "Prisma", "MySQL", "JWT", "Tailwind CSS"],
    // Repo is private for now. Paste the URL here once it's public.
    github: null as string | null,
    demo: null as string | null,
  },
  {
    slug: "ai-voice-note-summarizer",
    name: "AI Voice Note Summarizer",
    tagline: "Voice-to-summary pipeline with AI",
    description:
      "Record or upload a voice note and get back a transcript plus a summary of key points and action items, with live progress while it works.",
    bullets: [
      "Built an end-to-end pipeline: MediaRecorder → Node/Express → AssemblyAI → OpenRouter, with structured JSON output and robust error handling.",
      "Ran processing as an async job that the frontend polls, so users see real Upload, Transcribe and Summarize steps instead of a spinner.",
    ],
    features: [
      "Record in the browser with a live waveform, or upload an audio file",
      "Automatic transcription with AssemblyAI",
      "Summaries with key points and action items from an LLM via OpenRouter",
      "Real progress steps backed by an async job on the server",
      "Editable transcript that can be re-summarized without re-uploading",
      "Note history saved in the browser",
      "Copy, Markdown export and read-aloud playback",
    ],
    flow: [
      { label: "Record", detail: "MediaRecorder captures audio while the Web Audio API draws a waveform." },
      { label: "Upload", detail: "The file is posted to Express, where Multer saves it and a job starts." },
      { label: "Transcribe", detail: "The server sends the audio to AssemblyAI for speech-to-text." },
      { label: "Summarize", detail: "The transcript goes to an LLM on OpenRouter, which returns JSON." },
      { label: "Show results", detail: "The browser polls the job, then shows, saves and reads out the result." },
    ] as FlowStep[],
    layers: [
      { layer: "Frontend", tech: "React, Web Audio API, MediaRecorder, localStorage" },
      { layer: "Backend", tech: "Node.js, Express, Multer, in-memory job queue" },
      { layer: "AI services", tech: "AssemblyAI (transcription), OpenRouter (summaries)" },
    ] as Layer[],
    notes: null as string | null,
    stack: ["React", "Node.js", "Express.js", "AssemblyAI", "OpenRouter", "JavaScript", "CSS"],
    github: "https://github.com/pranotivarpe/AI-Voice-Note-Summarizer" as string | null,
    demo: null as string | null,
  },
  {
    slug: "eshop",
    name: "EShop",
    tagline: "Storefront on Spring Boot and React",
    description:
      "A storefront with a Java Spring Boot REST API and a React frontend, with product browsing, categories, a cart and JWT-based sign-in.",
    bullets: [
      "Built REST endpoints with Spring Boot to list products, fetch one by id and filter by category, using a service layer over Spring Data JPA repositories on MySQL.",
      "Added registration and login secured with Spring Security and a custom JWT filter, with the React (Vite) frontend attaching the token to API calls through Axios.",
    ],
    features: [
      "Product listing and product detail pages",
      "Filtering products by category",
      "Shopping cart",
      "Registration and login with JWT",
      "Entity model for products, categories, users and orders",
    ],
    flow: [
      { label: "React storefront", detail: "Pages for home, products, product detail and cart." },
      { label: "Axios client", detail: "Sends requests to the API and adds the saved JWT." },
      { label: "Spring Security", detail: "A JWT filter checks the token before a controller runs." },
      { label: "Controllers and services", detail: "REST controllers call a service layer that maps entities to DTOs." },
      { label: "JPA + MySQL", detail: "Spring Data JPA repositories read and write through Hibernate." },
    ] as FlowStep[],
    layers: [
      { layer: "Frontend", tech: "React, Vite, React Router, Bootstrap, Axios" },
      { layer: "Backend", tech: "Java 17, Spring Boot, Spring Security, Maven" },
      { layer: "Data", tech: "Spring Data JPA, Hibernate, MySQL" },
      { layer: "Auth", tech: "JWT with a custom Spring Security filter" },
    ] as Layer[],
    notes: null as string | null,
    stack: ["Java 17", "Spring Boot", "Spring Security", "Spring Data JPA", "JWT", "MySQL", "React", "Vite", "Bootstrap", "Maven"],
    github: "https://github.com/pranotivarpe/EShop-SpringBoot-React" as string | null,
    demo: null as string | null,
  },
  {
    slug: "shopnest",
    name: "ShopNest",
    tagline: "E-commerce platform with Stripe payments",
    description:
      "A full-stack store built with Django REST Framework and React + Redux, with a product catalog, cart, checkout and order history.",
    bullets: [
      "Built the REST API with Django REST Framework and JWT authentication (Simple JWT) for registration, login and protected routes.",
      "Integrated Stripe for checkout and saved cards, and managed cart and user state on the frontend with Redux.",
    ],
    features: [
      "Product catalog with create, update and delete for admins",
      "Cart that can be added to, updated and cleared",
      "Checkout and saved cards through Stripe",
      "Saved delivery addresses",
      "Order history and order status updates",
      "User registration, login and account management",
    ],
    flow: [
      { label: "React + Redux", detail: "The store UI keeps cart and user state in Redux." },
      { label: "JWT sign-in", detail: "Simple JWT issues tokens that protect account and order routes." },
      { label: "Django REST API", detail: "Views for products, cart, addresses and orders." },
      { label: "Stripe", detail: "Payments and saved cards go through Stripe customers and payment methods." },
      { label: "Database", detail: "Django models store products, orders and addresses." },
    ] as FlowStep[],
    layers: [
      { layer: "Frontend", tech: "React, Redux, React Router, Bootstrap" },
      { layer: "Backend", tech: "Python, Django, Django REST Framework" },
      { layer: "Payments", tech: "Stripe" },
      { layer: "Auth", tech: "JWT via Simple JWT" },
      { layer: "Data", tech: "SQLite" },
    ] as Layer[],
    notes: null as string | null,
    stack: ["Django REST Framework", "Python", "React", "Redux", "JWT", "Stripe", "Bootstrap"],
    github: "https://github.com/pranotivarpe/ShopNest" as string | null,
    demo: null as string | null,
  },
] as const;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

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
    period: "2024 – 2026",
    detail: "CGPA 8.10",
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
