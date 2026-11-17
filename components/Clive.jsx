"use client";

import { useEffect, useRef } from "react";
import "./Clive.css";

export function CliveDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <radialGradient id="cl-body" cx="38%" cy="28%" r="85%">
          <stop offset="0" stopColor="#ff5fb4" />
          <stop offset=".55" stopColor="#F00078" />
          <stop offset="1" stopColor="#A00068" />
        </radialGradient>
        <radialGradient id="cl-face" cx="45%" cy="30%" r="85%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#ffe3f1" />
        </radialGradient>
        <radialGradient id="cl-foot" cx="50%" cy="30%" r="80%">
          <stop offset="0" stopColor="#ffc2e1" />
          <stop offset="1" stopColor="#ff8cc6" />
        </radialGradient>
        <radialGradient id="cl-ant" cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#ff9ccb" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function Clive({ wave = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const pupils = el.querySelector(".pupils");
    const head = el.querySelector(".head");

    function onMove(e) {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.5;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const d = Math.hypot(dx, dy) || 1;
      const s = Math.min(1, d / 280);
      const ux = dx / d;
      const uy = dy / d;
      pupils.style.transform = `translate(${(ux * s * 5.5).toFixed(2)}px,${(uy * s * 4.5).toFixed(2)}px)`;
      head.style.transform = `translate(${(ux * s * 4).toFixed(2)}px,${(uy * s * 3).toFixed(2)}px)`;
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className={`clive${wave ? " wave" : ""}`} ref={ref}>
      <svg className="clive-svg" viewBox="0 0 240 270" role="img" aria-label="Clive, the guide mascot">
        <ellipse cx="120" cy="258" rx="62" ry="8" fill="#000" opacity=".18" />
        <g>
          <ellipse cx="92" cy="241" rx="25" ry="14" fill="url(#cl-foot)" />
          <ellipse cx="148" cy="241" rx="25" ry="14" fill="url(#cl-foot)" />
        </g>
        <g className="arm-l">
          <ellipse cx="40" cy="170" rx="17" ry="29" transform="rotate(20 40 170)" fill="url(#cl-body)" />
        </g>
        <g className="arm-r">
          <ellipse cx="200" cy="170" rx="17" ry="29" transform="rotate(-20 200 170)" fill="url(#cl-body)" />
        </g>
        <line x1="120" y1="68" x2="120" y2="40" stroke="#ff8cc6" strokeWidth="5" strokeLinecap="round" />
        <circle className="ant" cx="120" cy="31" r="11" fill="url(#cl-ant)" />
        <g className="head">
          <ellipse cx="120" cy="154" rx="84" ry="88" fill="url(#cl-body)" />
          <ellipse cx="96" cy="100" rx="34" ry="14" fill="#fff" opacity=".16" transform="rotate(-18 96 100)" />
          <ellipse cx="120" cy="148" rx="60" ry="54" fill="url(#cl-face)" />
          <g className="eyes">
            <circle cx="97" cy="138" r="15" fill="#fff" stroke="#061138" strokeOpacity=".12" />
            <circle cx="143" cy="138" r="15" fill="#fff" stroke="#061138" strokeOpacity=".12" />
            <g className="pupils">
              <circle cx="97" cy="139" r="8.5" fill="#061138" />
              <circle cx="143" cy="139" r="8.5" fill="#061138" />
              <circle cx="100" cy="135.5" r="2.7" fill="#fff" />
              <circle cx="146" cy="135.5" r="2.7" fill="#fff" />
            </g>
          </g>
          <circle cx="78" cy="160" r="8.5" fill="#ff8cc6" opacity=".7" />
          <circle cx="162" cy="160" r="8.5" fill="#ff8cc6" opacity=".7" />
          <ellipse cx="120" cy="156" rx="4.2" ry="3.2" fill="#F00078" />
          <path d="M108 166 Q120 178 132 166" fill="none" stroke="#061138" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

export function MascotStage({ caption }) {
  return (
    <div className="mascot-stage">
      <div className="blob a" />
      <div className="blob b" />
      <div className="clive-slot" data-clive-dock />
      {caption && <div className="caption mono">{caption}</div>}
    </div>
  );
}