"use client";

import { useEffect, useRef, useState } from "react";
import Clive from "./Clive";
import { guide } from "../data/content";
import { BOOK_MESSAGE_EVENT, getBookMessage } from "../lib/bookNav";
import "./FollowClive.css";

const HOME_MOUSE = (
  <>
    <span className="fc-line">Hello, I'm Clive, Quinta's guide.</span>
    <span className="fc-line">Move your mouse and I'll follow you.</span>
  </>
);

const HOME_TOUCH = (
  <>
    <span className="fc-line">Hello, I'm Clive, Quinta's guide.</span>
    <span className="fc-line">Touch the screen and I'll follow you.</span>
  </>
);

const CONTACT = (
  <>
    <span className="fc-line">Got an idea in mind?</span>
    <span className="fc-line">
      Quinta would love to build something great with you.
    </span>
    <span className="fc-line">Drop her a message.</span>
  </>
);

const RATIO = 270 / 240;
const BUBBLE_MS = 5000;

const clamp = (v, a, b) => Math.max(a, Math.min(v, b));

export default function FollowClive() {
  const box = useRef(null);
  const bubbleRef = useRef(null);

  const [say, setSay] = useState(null);
  const [showBubble, setShowBubble] = useState(false);
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    const el = box.current;
    const bub = bubbleRef.current;

    if (!el || !bub) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const touchOnly = window.matchMedia("(hover: none)").matches;

    const mobileMode = window.matchMedia("(max-width: 899px)");

    const smallW = () => (window.innerWidth <= 560 ? 46 : 56);

    const pos = {
      x: 0,
      y: 0,
      w: smallW(),
    };

    const pointer = {
      x: 0,
      y: 0,
      t: -1e9,
      touch: false,
    };

    let raf = 0;
    let inited = false;
    let lastEvent = performance.now();
    let curMsg;
    let until = 0;
    let shown = false;
    let isDocked = false;
    let placement = "";

    const findDock = () => {
      const home = document.getElementById("home");
      const contact = document.getElementById("contact");

      const homeRect = home?.getBoundingClientRect();
      const contactRect = contact?.getBoundingClientRect();

      const visible = (rect) =>
        rect &&
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom > 0 &&
        rect.top < window.innerHeight;

      const homeVisible = visible(homeRect);
      const contactVisible = visible(contactRect);

      let activeSection = null;

      if (homeVisible && contactVisible) {
        const homeHeight =
          Math.min(homeRect.bottom, window.innerHeight) -
          Math.max(homeRect.top, 0);

        const contactHeight =
          Math.min(contactRect.bottom, window.innerHeight) -
          Math.max(contactRect.top, 0);

        activeSection = homeHeight >= contactHeight ? home : contact;
      } else if (homeVisible) {
        activeSection = home;
      } else if (contactVisible) {
        activeSection = contact;
      }

      if (!activeSection) return null;

      const stage = activeSection.querySelector(".mascot-stage");

      if (!stage) return null;

      const rect = stage.getBoundingClientRect();

      if (!rect.width || !rect.height) return null;

      return {
        rect,
        sectionId: activeSection.id,
      };
    };

    const sectionAtCenter = () => {
      const mid = window.innerHeight / 2;

      const ids = ["home", "story", "contact"];

      for (const id of ids) {
        const section = document.getElementById(id);

        if (!section) continue;

        const r = section.getBoundingClientRect();

        if (r.top <= mid && r.bottom >= mid) {
          return id;
        }
      }

      let best = null;
      let bestHeight = 0;

      for (const id of ids) {
        const section = document.getElementById(id);

        if (!section) continue;

        const r = section.getBoundingClientRect();

        const height = Math.max(
          0,
          Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0),
        );

        if (height > bestHeight) {
          bestHeight = height;
          best = id;
        }
      }

      return best;
    };

    const messageFor = (id) => {
      if (id === "home") {
        return touchOnly ? HOME_TOUCH : HOME_MOUSE;
      }

      if (id === "contact") {
        return CONTACT;
      }

      if (id === "story") {
        return getBookMessage() ?? guide.cover;
      }

      return null;
    };

    const tick = () => {
      raf = 0;

      const now = performance.now();

      const dock = findDock();
      const dockedNow = Boolean(dock);

      const isMobile = mobileMode.matches;

      const idle = pointer.touch ? 1400 : 3500;

      const following = !isMobile && now - pointer.t < idle;

      let tx;
      let ty;
      let tw;

      if (dockedNow) {
        tw = Math.min(dock.rect.width * 0.5, 270, window.innerWidth - 12);

        const th = tw * RATIO;

        tx = dock.rect.left + (dock.rect.width - tw) / 2;
        ty = dock.rect.top + (dock.rect.height - th) / 2;

        tx = clamp(tx, 4, Math.max(4, window.innerWidth - tw - 4));
        ty = clamp(ty, 4, Math.max(4, window.innerHeight - th - 4));
      } else {
        tw = isMobile ? smallW() : smallW();

        const th = tw * RATIO;

        if (isMobile) {
          tx = window.innerWidth - tw - 14;
          ty = window.innerHeight - th - 18;
        } else if (following) {
          if (pointer.touch) {
            tx = pointer.x - tw / 2;
            ty = pointer.y - th - 28;
          } else {
            tx = pointer.x + 18;
            ty = pointer.y + 18;
          }
        } else {
          tx = window.innerWidth - tw - 16;
          ty = window.innerHeight - th - 16;
        }

        tx = clamp(tx, 4, Math.max(4, window.innerWidth - tw - 4));
        ty = clamp(ty, 4, Math.max(4, window.innerHeight - th - 4));
      }

      if (!inited) {
        pos.x = tx;
        pos.y = ty;
        pos.w = tw;
        inited = true;
      } else {
        const kPos = reduce ? 1 : dockedNow ? 0.35 : 0.14;
        const kSize = dockedNow || reduce ? 1 : 0.14;

        pos.x += (tx - pos.x) * kPos;
        pos.y += (ty - pos.y) * kPos;
        pos.w += (tw - pos.w) * kSize;
      }

      const finalHeight = pos.w * RATIO;

      pos.x = clamp(pos.x, 4, Math.max(4, window.innerWidth - pos.w - 4));

      pos.y = clamp(
        pos.y,
        4,
        Math.max(4, window.innerHeight - finalHeight - 4),
      );

      el.style.width = `${pos.w.toFixed(1)}px`;

      el.style.transform = `translate3d(
        ${pos.x.toFixed(1)}px,
        ${pos.y.toFixed(1)}px,
        0
      )`;

      const cx = pos.x + pos.w / 2;
      const cy = pos.y + finalHeight / 2;

      const next = dockedNow
        ? "dock"
        : `${cy > window.innerHeight / 2 ? "up" : "down"}-${
            cx > window.innerWidth / 2 ? "l" : "r"
          }`;

      if (next !== placement) {
        placement = next;
        bub.dataset.pos = next;
      }

      const messageSection = dockedNow ? dock.sectionId : sectionAtCenter();

      const msg = messageFor(messageSection);

      if (msg !== curMsg) {
        curMsg = msg;

        setSay(msg);

        until = msg ? now + BUBBLE_MS : 0;

        if (msg) {
          setTimeout(kick, BUBBLE_MS + 100);
        }
      }

      const wantShow =
        !!curMsg && (dockedNow || messageSection === "story" || now < until);

      if (wantShow !== shown) {
        shown = wantShow;
        setShowBubble(wantShow);
      }

      if (dockedNow !== isDocked) {
        isDocked = dockedNow;
        setDocked(dockedNow);
      }

      const settled =
        Math.abs(tx - pos.x) < 0.3 &&
        Math.abs(ty - pos.y) < 0.3 &&
        Math.abs(tw - pos.w) < 0.3;

      if (!settled || following || dockedNow || now - lastEvent < 400) {
        raf = requestAnimationFrame(tick);
      }
    };

    function kick() {
      lastEvent = performance.now();

      if (!raf) {
        raf = requestAnimationFrame(tick);
      }
    }

    const onPointer = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.touch = e.pointerType === "touch";
      pointer.t = performance.now();

      kick();
    };

    const onLeave = () => {
      pointer.t = -1e9;
      kick();
    };

    const ro = new ResizeObserver(kick);

    ro.observe(document.body);

    window.addEventListener("pointermove", onPointer, {
      passive: true,
    });

    window.addEventListener("pointerdown", onPointer, {
      passive: true,
    });

    window.addEventListener("scroll", kick, {
      passive: true,
    });

    window.addEventListener("resize", kick);
    window.addEventListener("load", kick);
    window.addEventListener(BOOK_MESSAGE_EVENT, kick);

    document.documentElement.addEventListener("mouseleave", onLeave);

    mobileMode.addEventListener("change", kick);

    kick();

    const late = setTimeout(kick, 400);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(late);
      ro.disconnect();

      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      window.removeEventListener("load", kick);
      window.removeEventListener(BOOK_MESSAGE_EVENT, kick);

      document.documentElement.removeEventListener("mouseleave", onLeave);

      mobileMode.removeEventListener("change", kick);
    };
  }, []);

  return (
    <div className="follow-clive" ref={box}>
      <div
        ref={bubbleRef}
        className={`fc-bubble${showBubble ? " on" : ""}`}
        role="status"
      >
        {say}
      </div>

      <Clive wave={docked} />
    </div>
  );
}
