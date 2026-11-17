"use client";

import { useState } from "react";
import "./PortfolioBook.css";

const spreads = [
  {
    leftTitle: "Contents",
    left: (
      <ul className="contents-list">
        <li>About me</li>
        <li>My journey</li>
        <li>Technical skills</li>
        <li>Experience & projects</li>
        <li>What’s next?</li>
      </ul>
    ),
    rightTitle: "About me",
    right: (
      <>
        <p>
          I’m Quinta Susan, a Junior Software Engineer based in Nairobi, Kenya.
        </p>
        <p>
          I’m driven by the belief that growth comes from being willing to start
          with what you do not know. My journey has challenged me to move from
          simply using technology to understanding how it is built, why it works
          and how I can build it myself.
        </p>
      </>
    ),
  },
  {
    leftTitle: "My journey",
    left: (
      <>
        <p>
          My journey into software development has been shaped by curiosity,
          research, experimentation and persistence.
        </p>
        <p>
          Through my Software Engineering journey, I have continued building
          practical experience across web, backend and mobile development.
        </p>
      </>
    ),
    rightTitle: "Technical skills",
    right: (
      <>
        <h4>Frontend & mobile</h4>
        <p>JavaScript, React, Next.js, Flutter, Dart</p>
        <h4>Backend</h4>
        <p>Python, FastAPI, REST APIs</p>
        <h4>Databases</h4>
        <p>PostgreSQL, SQLAlchemy</p>
        <h4>Machine learning</h4>
        <p>TensorFlow, scikit-learn, model training and evaluation</p>
      </>
    ),
  },
  {
    leftTitle: "My Projects",
    left: (
      <>
        <h4>Vuka: Career & Learning Platform</h4>
        <p>
          A career and learning platform helping Kenyan high-school graduates
          turn interests into structured learning pathways and career
          opportunities.
        </p>
        <h4>Meal Q: Meal Queue Management</h4>
        <p>
          A meal queue management system designed to improve how meal service is
          organised and monitored.
        </p>
      </>
    ),
    rightTitle: "What I built",
    right: (
      <>
        <p>
          Across these projects, I have worked on user interfaces, REST API
          integration, authentication, database design, role-based access and
          application workflows.
        </p>
        <p>
          My project work has helped me connect technical implementation with
          the needs of the people using the software.
        </p>
      </>
    ),
  },
  {
    
    rightTitle: "How I work",
    right: (
      <>
        <p>
          I embrace unfamiliar technologies, use research to understand
          problems, experiment with possible solutions and keep learning through
          implementation.
        </p>
        <p>
          I value collaboration, clear architecture and building software that
          solves real problems.
        </p>
      </>
    ),
  },
  {
    leftTitle: "What’s next?",
    left: (
      <>
        <p>
          I want to keep growing as a software engineer, take on meaningful
          technical challenges and contribute to products that solve real-world
          problems.
        </p>
      </>
    ),
    rightTitle: "Thank you for reading.",
    right: (
      <>
        <p>Thank you for taking the time to explore my work and journey.</p>
        <p>I’d love to connect and hear about what you’re building.</p>
        <a className="book-contact-link" href="#contact">
          Let’s connect →
        </a>
      </>
    ),
  },
];

export default function PortfolioBook() {
  const [index, setIndex] = useState(0);
  const current = spreads[index];

  return (
    <section
      className="book-section page-shell"
      aria-label="Interactive portfolio book"
    >
      <div className="book-intro">
        <p className="section-kicker">A little more about me</p>
        <h2>My portfolio, in pages.</h2>
      </div>
      <div className="book-stage">
        <div className="book-spread" key={index}>
          <article className="book-page book-left">
            <span className="book-page-number">{index * 2 + 1}</span>
            <h3>{current.leftTitle}</h3>
            <div className="book-copy">{current.left}</div>
            <span className="book-leaf">✳</span>
          </article>
          <article className="book-page book-right">
            <span className="book-page-number">{index * 2 + 2}</span>
            <h3>{current.rightTitle}</h3>
            <div className="book-copy">{current.right}</div>
            <span className="book-leaf">✳</span>
          </article>
        </div>
      </div>
      <div className="book-controls">
        <button
          type="button"
          onClick={() => setIndex((v) => Math.max(0, v - 1))}
          disabled={index === 0}
        >
          ← Previous
        </button>
        <span>
          {index + 1} / {spreads.length}
        </span>
        <button
          type="button"
          onClick={() => setIndex((v) => Math.min(spreads.length - 1, v + 1))}
          disabled={index === spreads.length - 1}
        >
          Next →
        </button>
      </div>
    </section>
  );
}
