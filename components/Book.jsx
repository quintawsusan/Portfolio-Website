"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { guide, profile } from "../data/content";
import { BOOK_GO_EVENT, setBookMessage } from "../lib/bookNav";
import { pages } from "./BookPages";
import "./Book.css";
import MobileBook from "./MobileBook";

const SPREADS = 8;
const RISE_END = 0.14;
const OPEN_START = 0.18;
const OPEN_LEN = 0.07;
const SPREAD_START = 0.25;
const SPREAD_LEN = (1 - SPREAD_START) / SPREADS;
const CLOSE_START = 0.94;
const FLIP_MS = 640;

const clamp = (v, a, b) => Math.max(a, Math.min(v, b));

export default function Book() {
  const trackRef = useRef(null);
  const wrapRef = useRef(null);
  const bookRef = useRef(null);
  const coverRef = useRef(null);
  const spreadRef = useRef(null);
  const leafRef = useRef(null);
  const guideRef = useRef(null);
  const rafRef = useRef(0);
  const staticRef = useRef(false);
  const flipRef = useRef(null);
  const settleRef = useRef(0);

  const [view, setView] = useState(-1);
  const [shown, setShown] = useState(0);
  const [target, setTarget] = useState(0);
  const [flip, setFlip] = useState(null);

  flipRef.current = flip;

  useEffect(() => {
    const message =
      view < 0
        ? guide.cover
        : guide.spreads[view] ?? guide.static;

    setBookMessage(message);
  }, [view]);

  const update = useCallback(() => {
    rafRef.current = 0;

    const track = trackRef.current;

    if (!track || staticRef.current) return;

    const top =
      track.getBoundingClientRect().top + window.scrollY;

    const len = Math.max(
      1,
      track.offsetHeight - window.innerHeight,
    );

    const p = clamp(
      (window.scrollY - top) / len,
      0,
      1,
    );

    const k = clamp(p / RISE_END, 0, 1);
    const e = 1 - Math.pow(1 - k, 3);
    const t = clamp(
      (p - OPEN_START) / OPEN_LEN,
      0,
      1,
    );
    const te = t * t * (3 - 2 * t);
    const closeT = clamp(
      (p - CLOSE_START) / (1 - CLOSE_START),
      0,
      1,
    );

    const close = closeT * closeT * (3 - 2 * closeT);
    const finalOpen = 1 - close;
    const finalRise = e * finalOpen;
    const finalTurn = te * finalOpen;
    const y = (1 - finalRise) * 60;
    const rx = (1 - finalRise) * 26;
    const s = 0.82 + 0.18 * finalRise;

    if (bookRef.current) {
      bookRef.current.style.transform =
        `translate3d(${(-25 * (1 - finalTurn)).toFixed(2)}%,${y.toFixed(1)}px,0) ` +
        `rotateX(${rx.toFixed(2)}deg) rotateY(${(-9 * (1 - finalTurn)).toFixed(2)}deg) scale(${s.toFixed(3)})`;
    }

    if (coverRef.current) {
      coverRef.current.style.transform =
        `rotateY(${(-180 * finalTurn).toFixed(2)}deg)`;

      coverRef.current.style.pointerEvents =
        finalTurn > 0.5 ? "none" : "auto";
    }

    if (spreadRef.current) {
      spreadRef.current.style.opacity = String(
        Math.min(
          clamp((te - 0.35) / 0.4, 0, 1),
          1 - close,
        ),
      );
    }

    if (te < 0.5) {
      clearTimeout(settleRef.current);

      setView(-1);
      setTarget(0);

      if (!flipRef.current) {
        setShown(0);
      }
    } else {
      const idx =
        p >= SPREAD_START
          ? clamp(
              Math.floor((p - SPREAD_START) / SPREAD_LEN),
              0,
              SPREADS - 1,
            )
          : 0;

      setView(idx);
      clearTimeout(settleRef.current);
      setTarget(idx);
    }
  }, []);

  const schedule = useCallback(() => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(update);
    }
  }, [update]);

  const go = useCallback((k) => {
    const track = trackRef.current;

    if (!track) return;

    const smooth = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
      ? "auto"
      : "smooth";

    if (staticRef.current) {
      const el =
        k < 0
          ? guideRef.current
          : document.querySelector(
              `[data-static-page="${2 * k}"]`,
            );

      if (el) {
        window.scrollTo({
          top:
            el.getBoundingClientRect().top +
            window.scrollY -
            90,
          behavior: smooth,
        });
      }

      return;
    }

    const top =
      track.getBoundingClientRect().top + window.scrollY;

    const len = Math.max(
      1,
      track.offsetHeight - window.innerHeight,
    );

    const f =
      k < 0
        ? 0.16
        : SPREAD_START + SPREAD_LEN * (k + 0.5);

    window.scrollTo({
      top: top + f * len,
      behavior: smooth,
    });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(
      "(max-width: 899px), (prefers-reduced-motion: reduce)",
    );

    const onMode = () => {
      staticRef.current = mq.matches;

      if (!mq.matches) {
        schedule();
      }
    };

    onMode();

    const onJump = (e) => go(e.detail);

    window.addEventListener("scroll", schedule, {
      passive: true,
    });

    window.addEventListener("resize", schedule);
    window.addEventListener(BOOK_GO_EVENT, onJump);

    mq.addEventListener("change", onMode);

    update();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener(BOOK_GO_EVENT, onJump);

      mq.removeEventListener("change", onMode);

      clearTimeout(settleRef.current);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [go, schedule, update]);

  useEffect(() => {
    if (flip || shown === target) return;

    const fwd = target > shown;

    setFlip({
      a: shown,
      next: target,
      fwd,
    });
  }, [flip, shown, target]);

  useEffect(() => {
    if (!flip) return;

    const el = leafRef.current;

    if (el) {
      el.style.transition = "none";
      el.style.transform = "rotateY(0deg)";

      void el.offsetWidth;

      el.style.transition =
        `transform ${FLIP_MS - 40}ms cubic-bezier(.5,.05,.2,1)`;

      el.style.transform = flip.fwd
        ? "rotateY(-180deg)"
        : "rotateY(180deg)";
    }

    const timer = setTimeout(() => {
      setShown(flip.next);
      setFlip(null);
    }, FLIP_MS);

    return () => clearTimeout(timer);
  }, [flip]);

  let left = 2 * shown;
  let right = 2 * shown + 1;
  let front = 0;
  let back = 0;

  if (flip) {
    const { a, next, fwd } = flip;

    left = fwd ? 2 * a : 2 * next;
    right = fwd ? 2 * next + 1 : 2 * a + 1;
    front = fwd ? 2 * a + 1 : 2 * a;
    back = fwd ? 2 * next : 2 * next + 1;
  }

  const counter =
    view < 0
      ? "Cover"
      : view === SPREADS - 1
        ? "The end"
        : `Pages ${2 * view + 1} to ${2 * view + 2} of 16`;

  return (
    <section
      className="book-track"
      id="story"
      ref={trackRef}
      aria-label={`${profile.shortName}'s portfolio book`}
    >
      <div className="stage">
        <div className="book-wrap" ref={wrapRef}>
          <div className="book" ref={bookRef}>
            <div className="spread" ref={spreadRef}>
              <div className="half left">
                {pages[left]}
              </div>

              <div className="half right">
                {pages[right]}
              </div>

              {flip && (
                <div
                  className={`leaf ${flip.fwd ? "fwd" : "bwd"}`}
                  ref={leafRef}
                >
                  <div className="face front half">
                    {pages[front]}
                  </div>

                  <div className="face back half">
                    {pages[back]}
                  </div>
                </div>
              )}
            </div>

            <div className="cover" ref={coverRef}>
              <div className="frame" />

              <div className="cover-in">
                <div className="dots" />

                <h2>{profile.name}</h2>

                <div className="sub">
                  Software Engineer
                </div>

                <p className="sub">
                  My Journey
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="guide"
          ref={guideRef}
          aria-hidden="true"
        />

        <div className="controls">
          <button
            className="arrow"
            type="button"
            aria-label="Previous page"
            disabled={view < 0}
            onClick={() => go(view <= 0 ? -1 : view - 1)}
          >
            <ChevronLeft
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>

          <span className="counter mono">
            {counter}
          </span>

          <button
            className="arrow"
            type="button"
            aria-label="Next page"
            disabled={view === SPREADS - 1}
            onClick={() =>
              go(
                view < 0
                  ? 0
                  : Math.min(SPREADS - 1, view + 1),
              )
            }
          >
            <ChevronRight
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>
        </div>

        <MobileBook />

        <div className="pages-static">
          {pages.map((page, i) => (
            <div
              className="static-page"
              data-static-page={i}
              key={i}
            >
              {page}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
