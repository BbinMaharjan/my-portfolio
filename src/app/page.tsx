"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import Link from "next/link";
import {
  BsGithub,
  BsLinkedin,
  BsMoonStarsFill,
  BsSunFill,
} from "react-icons/bs";
const UserImage = "/images/user.gif";
const MyImage = "/images/me.jpg";

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
    stack: ["React", "RJSF", "REST APIs", "TypeScript"],
    challenge:
      "Handling complex, configurable banking account forms for multiple user types and compliance requirements.",
    solution:
      "Built dynamic schema-driven forms with React JSON Schema Form and integrated APIs for automated account creation workflows.",
    impact:
      "Reduced manual processing overhead while improving form reliability and rollout speed.",
  },
  {
    title: "Banking Web Application",
    type: "Banking",
    stack: ["Next.js", "React Query", "TypeScript", "Security Controls"],
    challenge:
      "Delivering secure and responsive customer-facing banking interfaces.",
    solution:
      "Implemented performant data fetching, caching, and robust UI patterns with Next.js and React Query.",
    impact:
      "Improved UX consistency, loading performance, and enterprise readiness.",
  },
  {
    title: "CMS for Banking Platform",
    type: "CMS",
    stack: ["React", "Redux-Saga", "Material UI", "OpenAPI"],
    challenge:
      "Providing scalable content operations for multiple banking modules.",
    solution:
      "Designed a maintainable admin panel architecture with asynchronous side-effects via Redux-Saga.",
    impact:
      "Enabled efficient content management with better operational visibility.",
  },
  {
    title: "3D Web Application",
    type: "3D",
    stack: ["React", "Three.js", "Real-time UI", "Performance Tuning"],
    challenge:
      "Rendering interactive 3D interfaces with smooth real-time updates.",
    solution:
      "Optimized scene updates, component boundaries, and interaction loops for stable rendering performance.",
    impact: "Delivered advanced UI experiences without sacrificing usability.",
  },
  {
    title: "Employee Health Tracking System",
    type: "Health",
    stack: ["React", "OIDC", "TypeScript", "Complex Forms"],
    challenge:
      "Handling secure, data-heavy workflows and compliance-sensitive records.",
    solution:
      "Implemented robust form workflows, authenticated access with OIDC, and scalable UI state handling.",
    impact:
      "Improved secure data handling and user efficiency for operations teams.",
  },
  {
    title: "Warehouse Management System",
    type: "Warehouse",
    stack: ["React", "Dashboards", "Inventory UI", "REST APIs"],
    challenge:
      "Surfacing inventory status and operational metrics clearly across teams.",
    solution:
      "Built dashboard-oriented modules for tracking stock movement and key logistics actions.",
    impact:
      "Increased decision speed through usable data visualization and streamlined flows.",
  },
];

const skills = {
  frontend: ["React.js", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS"],
  state: ["Redux Toolkit", "Redux-Saga", "React Query"],
  ui: ["Material UI", "Ant Design"],
  other: ["REST APIs", "OpenAPI", "Git"],
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
              <img
                src={UserImage}
                alt="Bibin Maharjan avatar"
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-200">
              Bibin Maharjan
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com"
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
              <img
                src={MyImage}
                alt="Bibin Maharjan profile"
                width={160}
                height={160}
                className="h-auto w-full rounded-xl object-cover"
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
            Building scalable, high-performance web applications with modern
            frontend technologies.
          </p>
          <p className="max-w-2xl text-slate-600 dark:text-slate-400">
            Frontend engineer with 4+ years of experience at AMNIL Technologies
            delivering secure and enterprise-grade platforms across banking,
            CMS, health, and warehouse domains.
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
              <CountUp end={6} />
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
            I bring 4+ years of hands-on frontend engineering experience at
            AMNIL Technologies, building enterprise web applications with a
            focus on scalability, reliability, and usability.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Enterprise-level application development",
              "Clean, maintainable and scalable codebases",
              "Complex UI/UX problem solving",
              "Cross-functional team collaboration",
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
        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries({
            "Frontend Technologies": skills.frontend,
            "State Management": skills.state,
            "UI Libraries": skills.ui,
            Other: skills.other,
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
          <h3 className="text-xl font-semibold">AMNIL Technologies</h3>
          <p className="mt-1 text-sm text-slate-500">
            Intern to Software Engineer • Kathmandu, Nepal
          </p>
          <ul className="mt-5 space-y-3 text-slate-700 dark:text-slate-300">
            <li>
              Built scalable frontend systems for enterprise-grade web
              platforms.
            </li>
            <li>
              Integrated REST APIs and OpenAPI-driven services across domains.
            </li>
            <li>
              Improved performance through rendering and data-fetching
              optimizations.
            </li>
            <li>
              Implemented clean, consistent, and user-centric UI/UX solutions.
            </li>
          </ul>
        </motion.div>
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
