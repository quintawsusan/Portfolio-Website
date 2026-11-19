"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Users,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  profile,
  toc,
  skillGroups,
  moreSkillGroups,
  projects,
} from "../data/content";

import { goBook } from "../lib/bookNav";

function Chips({ group }) {
  return (
    <div className="group">
      <div className="gl">{group.label}</div>
      <div className="chips">
        {group.items.map((item) => (
          <span className="chip" key={item}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function MealQGraphic() {
  return (
    <div className="project-graphic mealq-graphic">
      <div className="queue-icon">
        <Users size={28} strokeWidth={1.8} />
      </div>
      <div className="queue-content">
        <div className="queue-status">
          <span className="queue-dot active" />
          <span className="queue-line long" />
          <CheckCircle2 size={15} />
        </div>
        <div className="queue-status">
          <span className="queue-dot" />
          <span className="queue-line medium" />
          <Clock3 size={15} />
        </div>
        <div className="queue-status">
          <span className="queue-dot" />
          <span className="queue-line short" />
          <Clock3 size={15} />
        </div>
      </div>
    </div>
  );
}

const graphics = {
  mealq: MealQGraphic,
};

const projectMockups = {
  vuka: "/images/vuka-mockup.png",
  umucyo: "/images/umucyo-mockup.png",
  mealq: "/images/mealq-mockup.png",
  ham10000: "/images/ham10000-mockup.png",
};

function ProjectCard({ project }) {
  const Graphic = graphics[project.id];

  return (
    <div className="pcard">
      {Graphic && (
        <div className="illus">
          <span className="lab">Project overview</span>
          <Graphic />
        </div>
      )}

      <h4>{project.name}</h4>
      <p>{project.summary}</p>

      <div className="tags">
        {project.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function FitPage({ className = "", children, ...rest }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      let f = 1;
      el.style.setProperty("--fit", "1");

      while (el.scrollHeight > el.clientHeight + 1 && f > 0.62) {
        f -= 0.03;
        el.style.setProperty("--fit", f.toFixed(2));
      }
    };

    fit();

    const ro = new ResizeObserver(fit);
    ro.observe(el);
    document.fonts?.ready.then(fit);

    return () => ro.disconnect();
  }, []);

  return (
    <article ref={ref} className={`page fit-page ${className}`} {...rest}>
      {children}
    </article>
  );
}

function ZoomImage({ src, alt, gallery }) {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);

  const slides = gallery && gallery.length ? gallery : [{ src, label: alt }];
  const many = slides.length > 1;

  const close = () => setOpen(false);
  const step = (d) => setI((v) => (v + d + slides.length) % slides.length);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (many && e.key === "ArrowRight") step(1);
      if (many && e.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <>
      <button
        type="button"
        className="zoom-btn"
        onClick={() => {
          setI(0);
          setOpen(true);
        }}
        aria-label={`View ${alt} larger`}
      >
        <img src={src} alt={alt} className="project-mockup" />
        <span className="zoom-hint">
          <Maximize2 size={13} aria-hidden="true" />{" "}
          {many ? "Tap to view screens" : "Tap to enlarge"}
        </span>
      </button>

      {open &&
        createPortal(
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={close}
          >
            <button
              type="button"
              className="lightbox-close"
              aria-label="Close"
              onClick={close}
            >
              <X size={20} aria-hidden="true" />
            </button>

            <img
              className="lightbox-img"
              src={slides[i].src}
              alt={slides[i].label}
              onClick={(e) => e.stopPropagation()}
            />

            <div className="lightbox-bar" onClick={(e) => e.stopPropagation()}>
              {many && (
                <button
                  type="button"
                  aria-label="Previous screen"
                  onClick={() => step(-1)}
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
              )}
              <span>
                {slides[i].label}
                {many ? ` · ${i + 1} / ${slides.length}` : ""}
              </span>
              {many && (
                <button
                  type="button"
                  aria-label="Next screen"
                  onClick={() => step(1)}
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

const mockupBg = {
  umucyo: "#fcf7ef",
};

const projectGallery = {
  umucyo: [
    {
      src: "/images/umucyo-mockup.png",
      label: "Umucyo: web and mobile experience",
    },
  ],
  mealq: [
    { src: "/images/mealq-mockup.png", label: "Admin and Student dashboard" },
  ],
  ham10000: [
    {
      src: "/images/ham10000-mockup.png",
      label: "HAM10000 Skin Lesion Classifier",
    },
  ],
};

const introText = {
  vuka: [
    "Vuka is a career and learning platform that helps Kenyan high-school graduates turn their interests into structured learning pathways and career opportunities.",
    "By bringing educational content from social media into one guided experience, Vuka meets young people where they already spend their time, helping them discover learning resources, build skills, track progress and explore opportunities.",
  ],
  mealq: [
    "MealQ is a web-based cafeteria queue coordination system that simplifies meal distribution in educational institutions.",
    "It organizes students into serving batches, coordinates meal schedules and allows administrators to monitor serving activities, while students receive clear instructions on when to proceed to the cafeteria.",
  ],
  umucyo: [
    "Umucyo is an IoT-enabled digital platform designed to digitize tea cooperative operations in Rwanda and keep farmers informed. It connects farmers, field agents and cooperative administrators through integrated web applications, combining a custom-built IoT digital weighing device with a Progressive Web App (PWA), Dashboard and backend infrastructure.",
    "The platform automates tea weight recording, simplifies tea delivery management, maintains digital operational records and sends SMS notifications to farmers, ensuring greater visibility into weighing results, deliveries and transactions while reducing manual processes and information gaps.",
  ],
  ham10000: [
    "A deep-learning image classification project using EfficientNetB0 to classify dermatoscopic skin lesion images into seven categories: Actinic keratoses (akiec), Basal cell carcinoma (bcc), Benign keratosis-like lesions (bkl), Dermatofibroma (df), Melanoma (mel), Melanocytic nevi (nv) and Vascular lesions (vasc).",
    "The project involved image preprocessing, model training and evaluation and development of an interactive Streamlit application for image uploads and predictions.",
    "It is a student project, not a medical device, and the app says so clearly to anyone who uses it.",
  ],
};

function ProjectIntroduction({ project, number, kicker }) {
  const mockup = projectMockups[project.id];
  const Graphic = graphics[project.id];

  return (
    <FitPage className={`project-intro-page ${project.id}-intro-page`}>
      <div className="kicker">{kicker}</div>

      <h3 className={project.name.length > 20 ? "long-title" : undefined}>
        {project.name}
      </h3>

      {introText[project.id].map((text) => (
        <p className="project-description" key={text.slice(0, 24)}>
          {text}
        </p>
      ))}

      <div
        className="project-showcase"
        style={{ background: mockupBg[project.id] }}
      >
        {mockup ? (
          <ZoomImage
            src={mockup}
            gallery={projectGallery[project.id]}
            alt={`${project.name} displayed on a laptop and mobile screens`}
          />
        ) : (
          Graphic && <Graphic />
        )}
      </div>

      <div className="pn r">{number}</div>
    </FitPage>
  );
}

function ProjectContributions({ project, number, kicker }) {
  return (
    <FitPage
      className={`project-contributions-page ${project.id}-contributions-page`}
    >
      <div className="kicker">{kicker}</div>

      <p className="lead">My contributions to {project.name}</p>

      <ul className="contribution-list">
        {project.bullets.map((bullet, index) => (
          <li key={`${project.id}-${index}`}>
            <span className="contribution-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="stack project-stack">
        <div className="gl">Tech stack</div>
        {project.stack.map((group) => (
          <Chips group={group} key={group.label} />
        ))}
      </div>

      <div className="pn r">{number}</div>
    </FitPage>
  );
}

const approach = [
  {
    title: "Understand the problem first",
    text: "Before jumping into a solution, I take time to understand the problem, who is affected and what the effects are.",
  },
  {
    title: "Research and explore",
    text: "I use research to learn unfamiliar technologies, explore possible approaches and spot what could go wrong.",
  },
  {
    title: "Break it down and build",
    text: "I split complex challenges into smaller parts, experiment and keep the architecture clear.",
  },
  {
    title: "Learn and collaborate",
    text: "I learn from what works and what doesn't, and I value working with others to build software that solves real problems.",
  },
];

const byId = (id) => projects.find((p) => p.id === id);
const vuka = byId("vuka");
const umucyo = byId("umucyo");
const mealq = byId("mealq");
const ham = byId("ham10000");

export const pages = [
  <FitPage key="p1">
    <div className="kicker">{profile.name} · Portfolio</div>
    <h3>Contents</h3>

    <ol className="toc">
      {toc.map((item) => (
        <li key={item.n} onClick={() => goBook(item.go)}>
          <span className="n">{item.n}</span>
          <span className="t">{item.title}</span>
          <span className="p">{item.page}</span>
        </li>
      ))}
    </ol>

    <div className="pn">1</div>
  </FitPage>,

  <article className="page about-page" key="p2">
    <div className="kicker">Chapter 01</div>
    <h3>About me</h3>

    {profile.about.map((paragraph) => (
      <p className="body" key={paragraph.slice(0, 24)}>
        {paragraph}
      </p>
    ))}

    <dl className="meta">
      <div>
        <dt>Based in</dt>
        <dd>{profile.location}</dd>
      </div>
    </dl>

    <div className="pn r">2</div>
  </article>,

  <article className="page thinking-page" key="p3">
    <div className="kicker">Chapter 02</div>
    <h3>How I think</h3>

    <p className="body">
      I approach software engineering with curiosity and a willingness to
      question assumptions. Before jumping into a solution, I take time to
      understand the problem, explore possible approaches and identify what
      could go wrong.
    </p>

    <p className="body">
      I enjoy breaking complex challenges into smaller parts, experimenting with
      ideas and learning from what works and what doesn't. For me, writing code
      is only one part of engineering. The real value is building solutions that
      are thoughtful, practical and useful.
    </p>

    <div className="pn">3</div>
  </article>,

  <article className="page skills-page" key="p4">
    <div className="kicker">Chapter 03</div>
    <h3>Technical skills</h3>

    <div className="stack">
      {skillGroups.map((group) => (
        <Chips group={group} key={group.label} />
      ))}
    </div>

    <div className="pn r">4</div>
  </article>,

  <article className="page skills-page" key="p5">
    <div className="kicker">Chapter 03</div>

    <div className="stack">
      {moreSkillGroups.map((group) => (
        <Chips group={group} key={group.label} />
      ))}
    </div>

    <div className="pn">5</div>
  </article>,

  <FitPage className="approach-page" key="p6">
    <div className="kicker">Chapter 04</div>
    <h3>How I approach a project</h3>

    <ul className="contribution-list">
      {approach.map((step, index) => (
        <li key={step.title}>
          <span className="contribution-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>
            <strong>{step.title}.</strong> {step.text}
          </span>
        </li>
      ))}
    </ul>

    <div className="pn r">6</div>
  </FitPage>,

  <ProjectIntroduction
    key="p7"
    project={vuka}
    kicker="Chapter 05 · Vuka"
    number="7"
  />,

  <ProjectContributions
    key="p8"
    project={vuka}
    kicker="Chapter 05 · Vuka"
    number="8"
  />,

  <ProjectIntroduction
    key="p9"
    project={umucyo}
    kicker="Chapter 06 · IoT Enabled Platform"
    number="9"
  />,

  <ProjectContributions
    key="p10"
    project={umucyo}
    kicker="Chapter 06 · IoT Enabled Platform"
    number="10"
  />,

  <ProjectIntroduction
    key="p11"
    project={mealq}
    kicker="Chapter 07 · Meal Q"
    number="11"
  />,

  <ProjectContributions
    key="p12"
    project={mealq}
    kicker="Chapter 07 · Meal Q"
    number="12"
  />,

  <ProjectIntroduction
    key="p13"
    project={ham}
    kicker="Chapter 08 · Machine Learning & Image Analysis"
    number="13"
  />,

  <ProjectContributions
    key="p14"
    project={ham}
    kicker="Chapter 08 · Machine Learning & Image Analysis"
    number="14"
  />,

  <article className="page" key="p15">
    <div className="kicker">Chapter 09</div>
    <h3>What's next?</h3>

    <p className="body">
      I'm interested in exploring new ideas and turning what I learn into things
      that work. If you would like to build something together, I'd love to hear
      from you.
    </p>

    <a className="next-link" href="#contact">
      Turn the page to say hello
      <ArrowRight size={16} aria-hidden="true" />
    </a>

    <div className="pn">15</div>
  </article>,

  <article className="page endpage" key="p16">
    <div className="dots2" />
    <h3>The end</h3>
    <p className="lead">Thank you for reading.</p>
    <div className="pn r">16</div>
  </article>,
];
