"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { guide, profile, toc } from "../data/content";
import { setBookMessage } from "../lib/bookNav";
import { pages } from "./BookPages";
import "./MobileBook.css";

const TOTAL_PAGES = pages.length;
const TOTAL_SPREADS = Math.ceil(TOTAL_PAGES / 2);
const OPEN_START = 0.14;
const PAGE_RANGE = 0.76;
const SWIPE_MIN = 48;

const TAP_MAX = 10;
const NO_TURN =
  "a,button,input,textarea,select,summary,label,.toc li,.lightbox,[data-no-turn]";

const clamp = (value, min, max) =>
  Math.max(min, Math.min(value, max));

export default function MobileBook() {
  const [spread, setSpread] = useState(-1);
  const [closedAtEnd, setClosedAtEnd] = useState(false);
  const start = useRef(null);
  const spreadRef = useRef(-1);
  const dragged = useRef(false);
  const [dir, setDir] = useState("next");
  const syncFromScroll = useCallback(() => {
    const section = document.getElementById("story");
    if (!section) return;

    const top = section.getBoundingClientRect().top + window.scrollY;
    const length = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = clamp((window.scrollY - top) / length, 0, 1);

    let nextSpread = -1;
    let atEnd = false;

    if (progress < OPEN_START) {
      nextSpread = -1;
    } else if (progress >= OPEN_START + PAGE_RANGE) {
      nextSpread = -1;
      atEnd = true;
    } else {
      const spreadProgress =
        (progress - OPEN_START) / PAGE_RANGE;
      nextSpread = clamp(
        Math.floor(spreadProgress * TOTAL_SPREADS),
        0,
        TOTAL_SPREADS - 1,
      );
    }

    if (nextSpread !== spreadRef.current) {
      setDir(nextSpread > spreadRef.current ? "next" : "prev");
      spreadRef.current = nextSpread;
      setSpread(nextSpread);
    }

    setClosedAtEnd(atEnd);
  }, []);

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        syncFromScroll();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    syncFromScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [syncFromScroll]);

  useEffect(() => {
    const message =
      spread < 0
        ? closedAtEnd
          ? guide.end ?? "That's the end of the book. Thanks for reading!"
          : guide.cover
        : guide.spreads[spread] ?? guide.static;

    setBookMessage(message);
  }, [spread, closedAtEnd]);

  const goTo = useCallback((to) => {
    if (to < -1 || to >= TOTAL_SPREADS) return;

    const section = document.getElementById("story");
    if (!section) return;

    const top = section.getBoundingClientRect().top + window.scrollY;
    const length = Math.max(1, section.offsetHeight - window.innerHeight);

    const progress =
      to < 0
        ? 0.06
        : OPEN_START + ((to + 0.5) / TOTAL_SPREADS) * PAGE_RANGE;

    window.scrollTo({
      top: top + progress * length,
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
        ? "auto"
        : "smooth",
    });
  }, []);

  const next = () =>
    goTo(Math.min(TOTAL_SPREADS - 1, spread + 1));

  const prev = () =>
    goTo(Math.max(-1, spread - 1));

  const onPointerDown = (event) => {
    dragged.current = false;
    start.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const onPointerUp = (event) => {
    const point = start.current;
    start.current = null;
    if (!point) return;

    const dx = event.clientX - point.x;
    const dy = event.clientY - point.y;

    dragged.current =
      Math.abs(dx) > TAP_MAX || Math.abs(dy) > TAP_MAX;

    if (
      Math.abs(dx) >= SWIPE_MIN &&
      Math.abs(dx) > Math.abs(dy) * 1.4
    ) {
      goTo(clamp(spread + (dx < 0 ? 1 : -1), -1, TOTAL_SPREADS - 1));
      return;
    }

    if (Math.abs(dy) > 12) {
      window.scrollBy({ top: -dy, behavior: "auto" });
    }
  };

  const onWheel = (event) => {
    event.preventDefault();
    window.scrollBy({ top: event.deltaY, behavior: "auto" });
  };

  const onClickCapture = (event) => {
    const li = event.target.closest?.(".toc li");
    if (!li) return;

    event.stopPropagation();

    const itemIndex = Array.from(
      li.parentElement.children,
    ).indexOf(li);

    const pageNumber = Number.parseInt(
      String(toc[itemIndex]?.page ?? "").match(/\d+/)?.[0],
      10,
    );

    if (Number.isFinite(pageNumber)) {
      goTo(clamp(Math.floor((pageNumber - 1) / 2), 0, TOTAL_SPREADS - 1));
    }
  };

  const onTap = (event) => {
    if (dragged.current) {
      dragged.current = false;
      return;
    }

    if (
      !event.currentTarget.contains(event.target) ||
      event.target.closest?.(NO_TURN)
    ) {
      return;
    }

    const sel = window.getSelection?.();
    if (sel && !sel.isCollapsed && sel.toString().trim()) return;

    if (closedAtEnd) {
      goTo(TOTAL_SPREADS - 1);
    } else if (spread < 0) {
      goTo(0);
    } else if (event.target.closest?.(".mbook-page-left")) {
      prev();
    } else {
      next();
    }
  };

  const leftPage = spread < 0 ? null : spread * 2;
  const rightPage =
    spread < 0 ? null : Math.min(spread * 2 + 1, TOTAL_PAGES - 1);

  const renderCover = () => (
    <div className="mbook-front-cover">
      <div className="mbook-front-frame" />
      <div className="mbook-front-content">
        <div className="mbook-front-dots" />
        <h2>{profile.name}</h2>
        <p className="mbook-front-role">Software Engineer</p>
        <p className="mbook-front-subtitle">
          {closedAtEnd ? "The End" : "My Journey"}
        </p>
      </div>
    </div>
  );

  return (
    <div className="mbook" aria-label="Portfolio book">
      <div className="mbook-cover">
        <div
          className="mbook-book"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            start.current = null;
          }}
          onWheel={onWheel}
          onClickCapture={onClickCapture}
          onClick={onTap}
        >
          {spread < 0 ? (
            <div className="mbook-front-sheet" key="cover">
              {renderCover()}
            </div>
          ) : (
            <div
              className={`mbook-spread turn-${dir}`}
              key={`spread-${spread}`}
            >
              <div className="mbook-page mbook-page-left">
                {pages[leftPage]}
              </div>
              <div className="mbook-page mbook-page-right">
                {pages[rightPage]}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mbook-controls">
        <button
          type="button"
          className="mbook-arrow"
          aria-label="Previous spread"
          onClick={prev}
          disabled={spread === -1 && !closedAtEnd}
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>

        <span className="mbook-count">
          {closedAtEnd
            ? "The End"
            : spread < 0
              ? "Cover"
              : `Pages ${leftPage + 1}–${rightPage + 1} of ${TOTAL_PAGES}`}
        </span>

        <button
          type="button"
          className="mbook-arrow"
          aria-label="Next spread"
          onClick={closedAtEnd ? () => goTo(TOTAL_SPREADS - 1) : next}
          disabled={spread === TOTAL_SPREADS - 1}
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      <p className="mbook-hint">
        Scroll, swipe, or tap a page to turn it
      </p>
    </div>
  );
}