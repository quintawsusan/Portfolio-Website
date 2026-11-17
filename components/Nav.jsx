"use client";

import { useState } from "react";
import { profile } from "../data/content";
import { goBook } from "../lib/bookNav";
import { Moon, Sun } from "lucide-react";
import "./Nav.css";

const links = [
  { label: "About", go: 0 },
  { label: "Skills", go: 1 },
  { label: "Projects", go: 2 },
];

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";

    return (
      document.documentElement.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark")
    );
  });

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", next);

    try {
      localStorage.setItem("qs-theme", next);
    } catch (e) {}

    setTheme(next);
  }

  return (
    <button
      className="theme-btn"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      type="button"
    >
      {theme === "dark" ? (
        <Moon size={16} strokeWidth={1.8} />
      ) : (
        <Sun size={16} strokeWidth={1.8} />
      )}
    </button>
  );
}

export default function Nav() {
  return (
    <nav className="nav" aria-label="Main">
      <a className="logo" href="#top">
        <i aria-hidden="true" />
        <span>{profile.shortName}</span>
      </a>

      <div className="nav-links">
        {links.map((link) => (
          <a
            key={link.label}
            href="#story"
            onClick={(e) => {
              e.preventDefault();
              goBook(link.go);
            }}
          >
            {link.label}
          </a>
        ))}

        <a href="#contact">Contact</a>
      </div>

      <ThemeToggle />
    </nav>
  );
}
