"use client";

import { useRef, useState } from "react";
import { Mail } from "lucide-react";
import { profile } from "../data/content";
import { MascotStage } from "./Clive";
import "./Contact.css";

export default function Contact() {
  const emailRef = useRef(null);
  const [label, setLabel] = useState("Copy");

  function reset() {
    setTimeout(() => setLabel("Copy"), 1600);
  }

  function selectEmail() {
    const range = document.createRange();
    range.selectNodeContents(emailRef.current);

    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    setLabel("Selected");
    reset();
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setLabel("Copied");
      reset();
    } catch (e) {
      selectEmail();
    }
  }

  return (
    <section className="contact wrap" id="contact">
      <div className="contact-grid">
        <div>
          <div className="mono contact-eyebrow">Connect</div>

          <h2>Let&apos;s Build Something Together.</h2>

          <p className="lede">
            Tell me what you&apos;re working on, or just say hello.
          </p>

          <div className="rows">
            <div className="row">
              <span className="k mono">Email</span>

              <span className="v" ref={emailRef}>
                {profile.email}
              </span>

              <button className="copy" type="button" onClick={copyEmail}>
                {label}
              </button>
            </div>

            <div className="row">
              <span className="k mono">LinkedIn</span>

              <a
                className="v"
                href={profile.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.linkedin.label}
              </a>

              <span />
            </div>

            <div className="row">
              <span className="k mono">GitHub</span>

              <a
                className="v"
                href={profile.github.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.github.label}
              </a>

              <span />
            </div>

            <div className="row">
              <span className="k mono">Based in</span>

              <span className="v">{profile.location}</span>

              <span />
            </div>
          </div>

          <div className="btns">
            <a className="btn primary" href={`mailto:${profile.email}`}>
              Start a conversation
              <Mail size={16} strokeWidth={2.2} aria-hidden="true" />
            </a>

            <a
              className="btn"
              href={profile.github.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub
            </a>
          </div>
        </div>

        <MascotStage
          bubble={
            <>
              <span className="bubble-line">Got an idea in mind?</span>
              <span className="bubble-line">
                Quinta would love to build something great with you. Drop her a
                message below!
              </span>
            </>
          }
        />
      </div>
    </section>
  );
}
