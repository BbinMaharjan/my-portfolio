"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  BsGithub,
  BsLinkedin,
  BsMoonStarsFill,
  BsSunFill,
} from "react-icons/bs";

type ProjectType = "All" | "Banking" | "CMS" | "3D" | "Health" | "Warehouse";

type Project = {
  title: string;
  type: Exclude<ProjectType, "All">;
  stack: string[];
  challenge: string;
  solution: string;
  impact: string;
};

const projects: Project[] = [
  {
    title: "Bank Account Opening System",
    type: "Banking",
    stack: ["React", "TypeScript", "RJSF", "Redux-Saga", "REST APIs"],
    challenge:
      "Digitizing a complex multi-step bank account opening workflow with configurable forms across multiple account types and business requirements.",
    solution:
      "Led the frontend development from scratch — built the application architecture with React and TypeScript, developed dynamic schema-driven forms using RJSF, reusable components for multiple registration workflows, and managed complex asynchronous workflows with Redux-Saga.",
    impact:
      "Automated account creation through backend REST API integration, reducing manual processing overhead and improving rollout reliability.",
  },
  {
    title: "Banking Web Application & CMS",
    type: "Banking",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "TanStack Query",
      "Redux-Saga",
      "Material UI",
    ],
    challenge:
      "Delivering a responsive customer-facing banking platform along with an administrative CMS for managing banking website content.",
    solution:
      "Built responsive and reusable frontend features using Next.js, React, and TypeScript; developed the admin CMS; used TanStack Query for server-state management, Redux-Saga for complex async workflows, and Material UI for component-driven UI.",
    impact:
      "Enabled efficient delivery and management of banking-related content with a consistent, maintainable user experience.",
  },
  {
    title: "Employee Health Tracking System",
    type: "Health",
    stack: ["React", "Ant Design", "Redux Toolkit", "TanStack Query", "OIDC"],
    challenge:
      "Supporting employee health workflows involving complex forms, heavy data management, and secure protected records.",
    solution:
      "Built complex forms and data tables, managed client and server state with Redux Toolkit and TanStack Query, developed responsive interfaces with Ant Design, and implemented OIDC-based authentication for secure access.",
    impact:
      "Strengthened secure data handling and improved efficiency for health operations teams.",
  },
  {
    title: "3D Web Application & CMS",
    type: "3D",
    stack: [
      "React",
      "Three.js",
      "Redux Toolkit",
      "TanStack Query",
      "Node.js",
      "Express.js",
      "OpenAPI",
    ],
    challenge:
      "Rendering interactive 3D elements in the browser while providing a CMS for managing 3D models, assets, and related content.",
    solution:
      "Developed interactive UIs with React and Three.js, built the CMS interface, handled client/server state with Redux Toolkit and TanStack Query, integrated backend services via OpenAPI, and implemented a Node.js/Express feature with full CRUD REST APIs.",
    impact:
      "Delivered a performant and scalable 3D experience backed by structured content management.",
  },
  {
    title: "Warehouse Management System",
    type: "Warehouse",
    stack: ["React", "Material UI", "Redux Toolkit", "TanStack Query"],
    challenge:
      "Surfacing warehouse operations, inventory tracking, and logistics monitoring clearly across business teams.",
    solution:
      "Built responsive interfaces and interactive dashboards with React and Material UI, managed state and API communication with Redux Toolkit and TanStack Query, and created reusable components for warehouse workflows.",
    impact:
      "Increased operational visibility and decision speed through usable dashboards and maintainable components.",
  },
];

const skills = {
  frontend: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Vite",
  ],
  state: [
    "Redux Toolkit",
    "Redux-Saga",
    "TanStack Query (React Query)",
    "Context API",
  ],
  ui: ["Material UI (MUI)", "Ant Design", "Responsive Web Design"],
  backend: ["Node.js", "Express.js", "MongoDB", "MySQL", "RESTful APIs"],
  api: ["REST APIs", "OpenAPI/Swagger", "Axios", "Fetch API"],
  ai: [
    "Prompt Engineering",
    "AI-Assisted Development",
    "AI Code Generation (ChatGPT, Claude)",
  ],
  tools: ["Git", "GitHub", "GitLab"],
  practices: [
    "Code Review",
    "Performance Optimization",
    "Component-Based Architecture",
  ],
};

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const duration = 1200;
    const start = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setValue(Math.round(progress * end));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [end]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<ProjectType>("All");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const useDark = savedTheme ? savedTheme === "dark" : prefersDark;
    setDarkMode(useDark);
    document.documentElement.classList.toggle("dark", useDark);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !darkMode;
    setDarkMode(nextTheme);
    localStorage.setItem("theme", nextTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", nextTheme);
  };

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }
    return projects.filter((project) => project.type === activeFilter);
  }, [activeFilter]);

  const filters: ProjectType[] = [
    "All",
    "Banking",
    "CMS",
    "3D",
    "Health",
    "Warehouse",
  ];

  return (
    <main className="relative">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,120,255,0.18),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(56,120,255,0.12),transparent_38%)]" />

      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-slate-50/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 overflow-hidden rounded-full border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900">
              <Image
                src="/images/user.gif"
                width={36}
                height={36}
                alt="Bibin Maharjan avatar"
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <p className="text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-200">
              Bibin Maharjan
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/BbinMaharjan"
              target="_blank"
              className="rounded-lg border border-slate-300 p-2 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:hover:border-brand-400"
              aria-label="GitHub profile"
            >
              <BsGithub />
            </Link>
            <Link
              href="https://www.linkedin.com/in/bbinmaharjan"
              target="_blank"
              className="rounded-lg border border-slate-300 p-2 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:hover:border-brand-400"
              aria-label="LinkedIn profile"
            >
              <BsLinkedin />
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg border border-slate-300 p-2 transition hover:border-brand-500 dark:border-slate-700"
              aria-label="Toggle dark and light mode"
            >
              {darkMode ? <BsSunFill /> : <BsMoonStarsFill />}
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid min-h-[80vh] max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="hidden w-full max-w-[160px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-panel dark:border-slate-800 dark:bg-slate-900 md:block">
              <Image
                src="/images/me.jpg"
                alt="Bibin Maharjan profile"
                className="h-auto w-full rounded-xl object-cover"
                width={160}
                height={160}
                unoptimized
                priority
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-6xl">
                Bibin
              </h1>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-6xl">
                Maharjan
              </h1>
              <span className="text-sm uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
                Software Engineer / Frontend Developer
              </span>
            </div>
          </div>
          <p className="max-w-2xl text-lg text-slate-700 dark:text-slate-300">
            Designing and developing enterprise web applications with React,
            Next.js, TypeScript, and modern frontend technologies.
          </p>
          <p className="max-w-2xl text-slate-600 dark:text-slate-400">
            Frontend engineer with 4+ years of experience building complex
            forms, reusable UI components, dashboards, and responsive
            applications across banking, content management, warehouse
            management, healthcare, and 3D platforms — with a focus on
            maintainable, scalable, and user-friendly applications.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:hover:border-brand-400"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500">Experience</p>
            <p className="mt-2 text-3xl font-bold">
              <CountUp end={4} suffix="+" />
            </p>
            <p className="text-xs text-slate-500">
              Years in frontend engineering
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500">Case Studies</p>
            <p className="mt-2 text-3xl font-bold">
              <CountUp end={5} />
            </p>
            <p className="text-xs text-slate-500">Production-grade projects</p>
          </div>
          <div className="col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-panel dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500">Current Focus</p>
            <p className="mt-2 text-lg font-semibold text-slate-800 dark:text-slate-100">
              Scalable architecture, maintainable UI systems, and enterprise
              performance optimization.
            </p>
          </div>
        </motion.div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-panel dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="text-2xl font-bold">About Me</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Frontend engineer with 4+ years of hands-on experience at AMNIL
            Technologies, building enterprise web applications with strong
            experience in Redux Toolkit, Redux-Saga, TanStack Query, REST API
            integration, and component-based architecture — focused on
            maintainable, scalable, and user-friendly applications.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Enterprise-level application development",
              "Complex forms, dashboards & reusable components",
              "Strong team player with good communication skills",
              "Self-motivated, quick learner under pressure & deadlines",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-700 dark:bg-slate-800/60"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-2xl font-bold">Skills</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries({
            Frontend: skills.frontend,
            "State Management": skills.state,
            "UI & Styling": skills.ui,
            "Backend & Databases": skills.backend,
            "API Integration": skills.api,
            "AI Technologies": skills.ai,
            "Version Control": skills.tools,
            Practices: skills.practices,
          }).map(([group, values]) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-panel dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="text-lg font-semibold">{group}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {values.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm text-brand-700 dark:border-brand-800 dark:bg-brand-900/30 dark:text-brand-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-2xl font-bold">Why Hire Me</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Enterprise Experience",
              desc: "Hands-on experience building production systems in banking, CMS, and enterprise tools.",
            },
            {
              title: "Scalable Architecture",
              desc: "Focused on reusable components, clean architecture, and long-term maintainability.",
            },
            {
              title: "Problem Solving",
              desc: "Comfortable handling complex UI, APIs, and real-world engineering challenges.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">Project Case Studies</h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  activeFilter === filter
                    ? "bg-brand-600 text-white"
                    : "border border-slate-300 text-slate-600 hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          {filteredProjects.map((project) => (
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200 }}
              key={project.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {project.type}
                </span>
              </div>
              <div className="mb-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-slate-200 px-2.5 py-1 text-xs dark:border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Challenge
                  </p>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                    {project.challenge}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Solution
                  </p>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                    {project.solution}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Impact
                  </p>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                    {project.impact}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-6 text-2xl font-bold">Experience</h2>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-panel dark:border-slate-800 dark:bg-slate-900"
        >
          <h3 className="text-xl font-semibold">
            Frontend Developer — AMNIL Technologies
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Started as MERN Stack Development Intern, progressed to full-time
            Frontend Developer • Kathmandu, Nepal
          </p>
          <ul className="mt-5 space-y-3 text-slate-700 dark:text-slate-300">
            <li>
              Contributed to the development of multiple enterprise web
              applications across banking, CMS, health, warehouse, and 3D
              domains.
            </li>
            <li>
              Built complex forms, reusable UI components, dashboards, and
              responsive applications using React, Next.js, and TypeScript.
            </li>
            <li>
              Managed application and server state with Redux Toolkit,
              Redux-Saga, and TanStack Query.
            </li>
            <li>
              Integrated frontend applications with backend REST APIs and
              OpenAPI-driven services.
            </li>
            <li>
              Collaborated with cross-functional teams to translate business
              requirements into functional applications.
            </li>
          </ul>
        </motion.div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-panel dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="text-xl font-semibold">Education</h3>
            <p className="mt-4 font-medium">
              BSc (HONS) in Computing — UCSI University
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Institute of Management Science (IIMS), affiliated to UCSI
              University, Malaysia • Putalisadak, Kathmandu
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-panel dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="text-xl font-semibold">Training</h3>
            <p className="mt-4 font-medium">
              MERN Stack Development Training — AMNIL Technologies
            </p>
            <p className="mt-1 text-sm text-slate-500">
              3-month training starting August 2021 • Jhamsikhel, Kathmandu —
              hands-on experience in MongoDB, Express.js, React, and Node.js
            </p>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 pb-20 pt-16">
        <h2 className="mb-8 text-2xl font-bold">Contact</h2>
        <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-panel dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500">Email</p>
            <a
              href="mailto:bbinmaharjan@gmail.com"
              className="mt-2 block font-medium text-brand-600 dark:text-brand-300"
            >
              bbinmaharjan@gmail.com
            </a>
            <p className="mt-5 text-sm text-slate-500">Mobile</p>
            <a href="tel:9843772318" className="mt-2 block font-medium">
              9843772318
            </a>
            <p className="mt-5 text-sm text-slate-500">Location</p>
            <p className="mt-2 font-medium">Kirtipur, Kathmandu, Nepal</p>
            <p className="mt-5 text-sm text-slate-500">Website</p>
            <a
              href="https://www.bibinmaharjan.com.np"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block font-medium text-brand-600 dark:text-brand-300"
            >
              www.bibinmaharjan.com.np
            </a>
            <p className="mt-5 text-sm text-slate-500">Languages</p>
            <p className="mt-2 font-medium">Newari, Nepali, English</p>
          </div>
          <form
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-panel dark:border-slate-800 dark:bg-slate-900"
            action="mailto:bbinmaharjan@gmail.com"
            method="post"
            encType="text/plain"
          >
            <div className="grid gap-4">
              <input
                required
                type="text"
                name="name"
                placeholder="Your name"
                className="rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none transition focus:border-brand-500 dark:border-slate-700"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Your email"
                className="rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none transition focus:border-brand-500 dark:border-slate-700"
              />
              <textarea
                required
                name="message"
                rows={5}
                placeholder="How can I help?"
                className="rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none transition focus:border-brand-500 dark:border-slate-700"
              />
              <button
                type="submit"
                className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="border-t border-zinc-800 py-6 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Bibin Maharjan — Software Engineer
      </footer>
    </main>
  );
}
