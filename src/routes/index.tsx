import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Github, Linkedin, Mail, FileDown, ExternalLink, MapPin, GraduationCap } from "lucide-react";
import { profile, skills, projects, type Project } from "@/data/profile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jeet Patel — MERN Stack Developer Portfolio" },
      { name: "description", content: "Portfolio of Jeet Patel, FYMCA student and MERN stack developer from Gujarat, India." },
      { property: "og:title", content: "Jeet Patel — MERN Stack Developer" },
      { property: "og:description", content: "Projects, college practicals, skills and contact for Jeet Patel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const NAV = ["home", "about", "skills", "projects", "education", "certificates", "contact"];
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function NavLinks({ active }: { active?: string }) {
  return (
    <>
      {NAV.map((id) => (
        <a key={id} href={`#${id}`} className={`nav-link ${active === id ? "nav-link-active" : ""}`}>
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </a>
      ))}
    </>
  );
}

function Index() {
  const [active, setActive] = useState("home");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const cats = ["All", ...new Set(projects.map((p) => p.category))];
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <a href="#home" className="font-display text-lg font-bold text-primary">JP.</a>
          <div className="hidden gap-1 md:flex"><NavLinks active={active} /></div>
        </nav>
        <div className="flex gap-1 overflow-x-auto px-4 pb-3 md:hidden"><NavLinks active={active} /></div>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        <section id="home" className="hero-glow grid min-h-[85vh] items-center gap-10 py-16 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-mono text-sm text-primary">Hi, I'm</p>
            <h1 className="mt-2 font-display text-5xl font-bold md:text-7xl">{profile.name}</h1>
            <p className="mt-3 text-xl text-muted-foreground">{profile.role}</p>
            <p className="mt-6 max-w-xl text-muted-foreground">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary">View My Projects</a>
              {profile.resume ? (
                <a href={profile.resume} {...ext} className="btn-ghost"><FileDown size={16} /> Download Resume</a>
              ) : (
                <a href={`mailto:${profile.email}?subject=Resume%20request`} className="btn-ghost" title="Resume link not added yet — request by email">
                  <FileDown size={16} /> Request Resume
                </a>
              )}
              <a href="#contact" className="btn-ghost">Contact Me</a>
            </div>
            <div className="mt-8 flex gap-3">
              <a href={profile.github} {...ext} aria-label="GitHub" className="icon-btn"><Github size={20} /></a>
              <a href={profile.linkedin} {...ext} aria-label="LinkedIn" className="icon-btn"><Linkedin size={20} /></a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="icon-btn"><Mail size={20} /></a>
            </div>
          </div>
          <div className="avatar mx-auto">JP</div>
        </section>

        <Section id="about" title="About Me">
          <p className="max-w-3xl text-lg text-muted-foreground">
            I'm an FYMCA student passionate about web development, programming and problem-solving. I'm currently
            focused on the MERN stack and enjoy turning ideas into working applications while continuously learning new
            technologies. <span className="text-primary">[Edit this with your own story]</span>
          </p>
          <p className="mt-4 flex items-center gap-2 text-muted-foreground"><MapPin size={16} /> {profile.location}</p>
        </Section>

        <Section id="skills" title="Technical Skills">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([group, list]) => (
              <div key={group} className="card">
                <h3 className="font-display font-semibold">{group}</h3>
                <div className="mt-3 flex flex-wrap gap-2">{list.map((s) => <span key={s} className="tag">{s}</span>)}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects & College Practicals">
          <div className="mb-6 flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`chip ${filter === c ? "chip-active" : ""}`}>{c}</button>
            ))}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{shown.map((p) => <ProjectCard key={p.title} p={p} />)}</div>
        </Section>

        <Section id="education" title="Education">
          <div className="card flex gap-4">
            <GraduationCap className="shrink-0 text-primary" />
            <div>
              <h3 className="font-display font-semibold">{profile.course}</h3>
              <p className="text-muted-foreground">{profile.college}</p>
              <p className="mt-2 text-sm text-muted-foreground">Semester: [#] · Coursework: [Add relevant subjects]</p>
            </div>
          </div>
        </Section>

        <Section id="certificates" title="Certificates & Achievements">
          <div className="card text-center text-muted-foreground">
            No certificates added yet. <span className="text-primary">[Add certificates, workshops and competitions]</span>
          </div>
        </Section>

        <Section id="contact" title="Get In Touch">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <a href={profile.github} {...ext} className="card social-card"><Github /> <div><b>GitHub</b><p className="text-sm text-muted-foreground">View my repositories</p></div><ExternalLink size={16} className="ml-auto" /></a>
              <a href={profile.linkedin} {...ext} className="card social-card"><Linkedin /> <div><b>LinkedIn</b><p className="text-sm text-muted-foreground">Connect professionally</p></div><ExternalLink size={16} className="ml-auto" /></a>
              <a href={`mailto:${profile.email}`} className="card social-card"><Mail /> <div><b>Email</b><p className="text-sm text-muted-foreground">{profile.email}</p></div></a>
            </div>
            <ContactForm />
          </div>
        </Section>
      </main>

      <footer className="mt-20 border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-sm text-muted-foreground">
          <div className="flex flex-wrap justify-center gap-1"><NavLinks /></div>
          <div className="flex gap-3">
            <a href={profile.github} {...ext} aria-label="GitHub" className="icon-btn"><Github size={18} /></a>
            <a href={profile.linkedin} {...ext} aria-label="LinkedIn" className="icon-btn"><Linkedin size={18} /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="icon-btn"><Mail size={18} /></a>
          </div>
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 py-16">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const fallback = profile.github; // until real links are added, point to your GitHub profile
  return (
    <article className="card flex flex-col">
      <div className="thumb">{p.tech.at(0) ?? ""}</div>
      <span className="mt-4 text-xs font-mono text-primary">{p.category}</span>
      <h3 className="mt-1 font-display font-semibold">{p.title}</h3>
      {p.meta && <p className="text-xs text-muted-foreground">{p.meta}</p>}
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">{p.tech.map((t) => <span key={t} className="tag">{t}</span>)}</div>
      <div className="mt-4 flex gap-2">
        <a href={p.github || fallback} {...ext} className="btn-ghost btn-sm"><Github size={14} /> Code</a>
        <a href={p.demo || p.github || fallback} {...ext} className="btn-ghost btn-sm"><ExternalLink size={14} /> Live Demo</a>
      </div>
    </article>
  );
}

function ContactForm() {
  const [err, setErr] = useState("");
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const [name = "", email = "", subject = "", message = ""] = ["name", "email", "subject", "message"].map((k) => String(f.get(k) || "").trim());
    if (!name || !subject || !message) return setErr("Please fill in every field.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr("Please enter a valid email.");
    setErr("");
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;
  };
  return (
    <form onSubmit={onSubmit} className="card space-y-3" noValidate>
      <input name="name" placeholder="Your name" className="field" />
      <input name="email" type="email" placeholder="Your email" className="field" />
      <input name="subject" placeholder="Subject" className="field" />
      <textarea name="message" rows={5} placeholder="Message" className="field" />
      {err && <p className="text-sm text-destructive">{err}</p>}
      <button type="submit" className="btn-primary w-full justify-center">Send Message</button>
      <p className="text-xs text-muted-foreground">Opens your email app with the message ready to send.</p>
    </form>
  );
}
