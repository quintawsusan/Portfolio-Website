"use client";

import { profile } from "../data/content";
import { goBook } from "../lib/bookNav";
import { MascotStage } from "./Clive";
import { ArrowDown, ExternalLink } from "lucide-react";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero wrap" id="home">
      <div className="hero-grid">
        <div className="hero-content">
          <p className="eyebrow mono">
            Meet {profile.shortName} Clive will show you around
          </p>

          <h1>
            Hello, I'm <em>{profile.name}</em>
          </h1>

          <p className="tagline">{profile.title}</p>

          <p className="lede">{profile.summary}</p>

          <div className="btns">
            <a
              className="btn primary"
              href="#story"
              onClick={(e) => {
                e.preventDefault();
                goBook(-1);
              }}
            >
              Open My Book
              <ArrowDown size={18} strokeWidth={2.4} aria-hidden="true" />
            </a>

            <a
              className="btn"
              href="/documents/quinta-susan-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View CV
              <ExternalLink size={18} strokeWidth={2.4} aria-hidden="true" />
            </a>
          </div>
        </div>
        <MascotStage
          bubble={
            <>
              <span className="bubble-line">
                Hello, I'm Clive, Quinta's guide.
              </span>
              <span className="bubble-line">
                Move your mouse and I'll follow you.
              </span>
            </>
          }
        />{" "}
      </div>

      <div className="scroll-hint mono">
        <span className="mouse" />
        Scroll to open the book
      </div>
    </section>
  );
}
