import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import bgVideo from "./assets/main3.mp4";
import bgPoster from "./assets/main3_poster.jpg";
import newsign from "./assets/newsign.png";
import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import icon3 from "./assets/icon3.png";
import mainm from "./assets/mainm.jpeg";
import mainm2 from "./assets/mainm2.jpeg";
import mainf from "./assets/mainf.jpeg";
import arcanaCard from "./assets/card.png";

const CHARS = [char1, char2, char3];
const MAIN_IMAGES = [mainm, mainm2, mainf];

const ROLES = [
  { text: "LEADER", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "PARTY", color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "PARTY", color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
];

const ITEMS = [
  {
    id: "linkedin", label: "LINKEDIN", handle: "@rajarshi-cybersecurity", href: "https://www.linkedin.com/in/rajarshi-cybersecurity/", icon: "", barIcon: icon1, bars: 5, newBars: [0, 3],
    links: [
      { text: "LINKEDIN ACCOUNT", pillLabel: "STAT", pillValue: "ACTIVE", href: "https://www.linkedin.com/in/rajarshi-cybersecurity/" },
      { text: "GITHUB REPOSITORIES: X5464", pillLabel: "CODE", pillValue: "OPEN", href: "https://github.com/X5464" },
      { text: "PROFESSIONAL NETWORK & ENDORSEMENTS", pillLabel: "CON", pillValue: "840+", href: "https://www.linkedin.com/in/rajarshi-cybersecurity/" },
      { text: "EMAIL: RAJARSHI7474@GMAIL.COM", pillLabel: "MAIL", pillValue: "OPEN", href: "mailto:rajarshi7474@gmail.com" },
      { text: "PHONE: +91 94339 39953", pillLabel: "CALL", pillValue: "DIRECT", href: "tel:+919433939953" },
    ],
    stats: [
      { tag: "CON", value: "840", color: "#0077b5" },
      { tag: "NET", value: "LIVE", color: "#00a0dc" },
    ],
  },
  {
    id: "instagram", label: "INSTAGRAM", handle: "@_.optimus_prime.exe", href: "https://www.instagram.com/_.optimus_prime.exe", icon: "📷", barIcon: icon2, bars: 3, newBars: [0],
    links: [
      { text: "INSTAGRAM ACCOUNT ", pillLabel: "STAT", pillValue: "ACTIVE", href: "https://www.instagram.com/_.optimus_prime.exe" },
      { text: "WATERCOLOR & PENCIL SKETCH GALLERY", pillLabel: "TYPE", pillValue: "VISUAL", href: "https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MDE1MzAyOTgwNDc2Njk1?story_media_id=3032502774085131252&igsh=MXBmeDMwaWI5OTA2OQ==" },
      { text: "TRAVEL EXPEDITIONS: THAILAND", pillLabel: "LOC", pillValue: "THAI", href: null },
    ],
    stats: [
      { tag: "FOL", value: "350", color: "#e1306c" },
      { tag: "PST", value: "04", color: "#f77737" },
    ],
  },
  {
    id: "tryhackme", label: "TRYHACKME", handle: "@OmegaR [PATHFINDER]", href: "https://tryhackme.com/p/OmegaR", icon: "🔴", barIcon: icon3, bars: 4, newBars: [0],
    links: [
      { text: "TRYHACKME ACCOUNT : OMEGAR ", pillLabel: "STAT", pillValue: "ACTIVE", href: "https://tryhackme.com/p/OmegaR" },
      { text: "GLOBAL RANK — TOP 35% WORLDWIDE", pillLabel: "RANK", pillValue: "TOP 35%", href: "https://tryhackme.com/p/OmegaR" },
      { text: "COMPLETED ROOMS: 14 — BADGES EARNED: 3", pillLabel: "PROG", pillValue: "14 RMS", href: "https://tryhackme.com/p/OmegaR" },
      { text: "60-HR HCK4G CTF CON 2025 (MELBOURNE) — FINISHER", pillLabel: "COMP", pillValue: "SECURED", href: null },
    ],
    stats: [
      { tag: "LVL", value: "0x3", color: "#ff0000" },
      { tag: "BGE", value: "03", color: "#cc0000" },
    ],
  },
];

export default function Socials() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [activeInfoBar, setActiveInfoBar] = useState(0);
  const [focus, setFocus] = useState("left"); // "left" | "right"
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (focus === "left") {
        if (e.key === "ArrowUp") setActive(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));
        if (e.key === "ArrowRight") { setFocus("right"); setActiveInfoBar(0); }
        if (e.key === "Enter") window.open(ITEMS[active].href, "_blank");
      } else {
        const barCount = ITEMS[active].bars;
        if (e.key === "ArrowUp") setActiveInfoBar(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActiveInfoBar(i => Math.min(barCount - 1, i + 1));
        if (e.key === "ArrowLeft") setFocus("left");
        if (e.key === "Enter") {
          const barLink = ITEMS[active].links[activeInfoBar]?.href;
          if (barLink) window.open(barLink, "_blank");
          else window.open(ITEMS[active].href, "_blank");
        }
      }
      if (e.key === "ArrowLeft" && focus === "right") {
        setFocus("left");
        return;
      }
      if (e.key === "Escape" || e.key === "Backspace") {
        if (focus === "right") {
          setFocus("left");
          return;
        }
        navigate('/');
        return;
      }
      if (e.key === "ArrowLeft" && focus === "left") {
        navigate('/');
      }
    };
    window.addEventListener("keydown", onKey);

    const onWheel = (e) => {
      const isRightSide = e.clientX > window.innerWidth * 0.52;
      if (isRightSide || focus === "right") {
        setFocus("right");
        const barCount = ITEMS[active].bars;
        if (e.deltaY > 0) setActiveInfoBar((i) => Math.min(barCount - 1, i + 1));
        else if (e.deltaY < 0) setActiveInfoBar((i) => Math.max(0, i - 1));
      } else {
        setFocus("left");
        if (e.deltaY > 0) {
          setActive((i) => Math.min(ITEMS.length - 1, i + 1));
          setActiveInfoBar(0);
        } else if (e.deltaY < 0) {
          setActive((i) => Math.max(0, i - 1));
          setActiveInfoBar(0);
        }
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
    };
  }, [active, navigate, focus, activeInfoBar]);

  return (
    <div id="menu-screen">
      <video 
        className="subpage-video-bottom-right"
        src={bgVideo}
        poster={bgPoster}
        autoPlay 
        loop 
        muted 
        playsInline 
        preload="auto"
        onCanPlay={(e) => e.currentTarget.play().catch(() => {})}
      />
      <style>{`
        .sc-root {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 6px;
          padding-left: 0;
          transition: opacity 0.3s ease;
        }
        .sc-root.dimmed { opacity: 0.94; }


        /* ── Each bar ── */
        .sc-bar {
          position: relative;
          width: 45cqw;
          height: 64px;
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          background: #111;
          cursor: pointer;
          pointer-events: all;
          touch-action: none;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65);
          z-index: 1;
        }

        /* wrapper holds both the red underlay and the bar */
        .sc-bar-outer {
          position: relative;
          flex-shrink: 0;
          transform: translateX(-100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-bar-outer.active .sc-bar     { height: 90px; }
        .sc-bar-outer.active .sc-bar-red { height: 90px; }
        .sc-bar-outer.mounted { transform: translateX(0); }
        .sc-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .sc-bar-outer:nth-child(2) { transition-delay: 80ms; }
        .sc-bar-outer:nth-child(3) { transition-delay: 160ms; }

        /* red underlay — peeks out below the bar when active */
        .sc-bar-red {
          position: absolute;
          top: 0; left: 0;
          width: 45cqw;
          height: 64px;
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px);
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 0;
          pointer-events: all;
        }
        .sc-bar-outer.active .sc-bar-red { opacity: 1; }

        /* white fill — skewed parallelogram on the right 25% */
        .sc-bar-fill {
          position: absolute;
          inset: 0;
          width: 100%;
          background: #ffffff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .sc-bar-outer.active .sc-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }

        /* shade on the left edge of the white fill */
        .sc-bar-shade {
          position: absolute;
          top: 0; bottom: 0;
          left: 73%;
          width: 6%;
          background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%);
          z-index: 1;
          pointer-events: all;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .sc-bar-outer.active .sc-bar-shade { opacity: 1; }

        /* bottom shadow line under each bar */
        .sc-bar::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 6px;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
          z-index: 10;
          pointer-events: all;
        }

        /* content layout inside each bar */
        .sc-bar-content {
          position: relative;
          z-index: 4;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 18px 0 14px;
        }

        /* left: role label */
        .sc-role {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          letter-spacing: -2px;
          color: #ffffff;
          transform: rotate(-30deg);
          user-select: none;
          line-height: 1;
          padding: 0 8px 0 4px;
        }

        /* left: icon + name centered in remaining space */
        .sc-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding-left: 112px;
        }
        .sc-main-top {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sc-bar-icon-img {
          height: 18px;
          width: auto;
          object-fit: contain;
          flex-shrink: 0;
        }

        .sc-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 3px;
          line-height: 1;
          color: rgba(255,255,255,0.92);
          transition: color 0.2s ease;
          user-select: none;
          white-space: nowrap;
        }
        .sc-bar-outer.active .sc-label { color: #111111; }

        /* lb/rb nav row */
        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(-5px); opacity: 0.4; }
        }
        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(5px); opacity: 0.4; }
        }
        .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          color: #111;
          border: 1px solid rgba(0,0,0,0.35);
          padding: 1px 7px;
          line-height: 1.5;
          user-select: none;
        }
        .sc-nav-arrow {
          font-size: 12px;
          color: #c4001a;
          display: inline-block;
        }
        .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

        /* right: stats group */
        .sc-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-right: 24px;
          flex-shrink: 0;
        }

        .sc-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .sc-stat-top {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .sc-stat-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 9px;
          letter-spacing: 1.5px;
          padding: 1px 4px;
          border-width: 1px;
          border-style: solid;
          line-height: 1.4;
          user-select: none;
        }

        .sc-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          font-style: italic;
          line-height: 1;
          color: #ffffff;
          letter-spacing: 1px;
          user-select: none;
          transition: color 0.2s ease;
        }
        .sc-bar-outer.active .sc-stat-num { color: #111111; }

        .sc-stat-bars {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1px;
          margin-top: 2px;
        }
        .sc-stat-bar-color {
          height: 3px;
          width: 100%;
        }
        .sc-stat-bar-black {
          height: 2px;
          width: 100%;
          background: #000;
        }

        /* character portrait */
        .sc-char {
          position: absolute;
          top: 0;
          left: 92px;
          height: 100%;
          width: 118px;
          max-width: 118px;
          object-fit: cover;
          object-position: 18% center;
          pointer-events: none;
          z-index: 2;
          clip-path: polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%);
        }

        /* right-side nav bar */
        @keyframes sc-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .sc-right-nav {
          position: fixed;
          top: 40px;
          right: 40px;
          display: flex;
          align-items: center;
          gap: 10px;
          pointer-events: all;
          z-index: 50;
          background: rgba(8, 16, 46, 0.84);
          border: 1px solid rgba(142, 245, 255, 0.38);
          padding: 6px 14px;
          clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          box-shadow: 6px 6px 0 #c4001a;
          animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-social-portrait-wrap {
          width: 48px;
          height: 48px;
          border-radius: 4px;
          overflow: hidden;
          border: 1.5px solid #8ef5ff;
          flex-shrink: 0;
          background: #08102e;
        }
        .sc-social-portrait {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 15%;
        }
        .sc-social-arcana {
          width: 24px;
          height: 34px;
          object-fit: cover;
          border-radius: 2px;
          border: 1px solid rgba(142, 245, 255, 0.6);
          flex-shrink: 0;
        }
        .sc-nav-meta {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 6px;
        }
        .sc-nav-handle {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.8px;
          color: #8ef5ff;
          line-height: 1.1;
          white-space: nowrap;
        }
        .sc-right-nav .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 2px;
          line-height: 1;
          user-select: none;
          color: #111;
          background: #fff;
          border: 1px solid #000;
          padding: 2px 8px;
        }
        .sc-right-nav .sc-nav-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: #fff;
        }
        .sc-right-nav .sc-nav-arrow {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          color: #c4001a;
          display: inline-block;
          user-select: none;
        }
        .sc-right-nav .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-right-nav .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

        /* info bar under nav */
        @keyframes sc-infobar-in {
          0%   { opacity: 0; transform: translateX(40px); }
          60%  { opacity: 1; transform: translateX(-4px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .sc-info-list-panel {
          --sc-step: 50px;
          position: fixed;
          top: 150px;
          left: 63%;
          right: 0;
          bottom: 60px;
          z-index: 50;
          pointer-events: none;
          touch-action: none;
        }
        .sc-info-bar-wrap {
          position: absolute;
          top: calc(var(--bar-i, 0) * var(--sc-step));
          right: 0;
          left: 0;
          height: 46px;
          background: transparent;
          pointer-events: all;
          touch-action: none;
          cursor: pointer;
          z-index: 50;
          padding: 0;
          animation: sc-infobar-in 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-info-bar-wrap.selected {
          background: #111;
          padding: 1.5px;
          border-radius: 8px;
        }
        .sc-info-bar {
          position: relative;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.86);
          border-radius: 7px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.22);
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .sc-info-bar-wrap.selected .sc-info-bar {
          background: #fff;
          border-radius: 7px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.45);
        }
        .sc-info-bar-new {
          position: absolute;
          left: -40px;
          bottom: 0;
          height: 65%;
          width: auto;
          pointer-events: all;
          z-index: 3;
        }
        .sc-info-bar-wrap.selected .sc-info-bar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: #c4001a;
          z-index: 1;
        }
        .sc-info-bar-text {
          flex: 1;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 17px;
          letter-spacing: 1.5px;
          color: #111;
          padding: 0 8px;
          user-select: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sc-info-bar-box {
          height: 65%;
          background: #000;
          display: flex;
          align-items: center;
          padding: 0 10px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 1px;
          color: #fff;
          flex-shrink: 0;
          border-radius: 4px;
          margin-right: 4px;
          user-select: none;
        }

        .sc-info-bar-icon {
          height: 55%;
          width: auto;
          flex-shrink: 0;
          margin-left: 14px;
          object-fit: contain;
          pointer-events: all;
          user-select: none;
        }

        .sc-info-bar-count {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 1px;
          color: #111;
          margin-right: 16px;
          flex-shrink: 0;
          user-select: none;
        }

        .sc-acc-badge {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px;
          letter-spacing: 1.5px;
          color: #fff;
          background: #c4001a;
          padding: 2px 8px;
          margin-left: 8px;
          clip-path: polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
          flex-shrink: 0;
          user-select: none;
          animation: sc-arrow-right 1.2s ease-in-out infinite;
        }

        /* footer hints */
        .sc-footer {
          position: fixed;
          bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 50;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }
        .sc-footer.mounted { opacity: 1; }
        .sc-footer-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(255,255,255,0.85);
        }
        .sc-footer-key {
          border: 1px solid rgba(255,255,255,0.8);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }

        @media (max-width: 768px) {
          body:not(.pc-stage-mode) .sc-root {
            justify-content: flex-start;
            padding-top: 38px;
            padding-left: 0;
            gap: 4px;
          }
          body:not(.pc-stage-mode) .sc-root.dimmed {
            opacity: 1;
          }
          body:not(.pc-stage-mode) .sc-bar { width: 96cqw; height: 42px; }
          body:not(.pc-stage-mode) .sc-bar-outer.active .sc-bar { height: 48px; }
          body:not(.pc-stage-mode) .sc-bar-outer.active .sc-bar-red { height: 48px; }
          body:not(.pc-stage-mode) .sc-bar-red { width: 96cqw; height: 42px; }
          body:not(.pc-stage-mode) .sc-bar-content { padding: 0 12px 0 6px; }
          body:not(.pc-stage-mode) .sc-role { font-size: 22px; width: 42px; padding: 0; justify-content: center; }
          body:not(.pc-stage-mode) .sc-char { width: 68px; max-width: 68px; left: 44px; object-position: 18% center; }
          body:not(.pc-stage-mode) .sc-main { padding-left: 60px; align-items: flex-start; min-width: 0; }
          body:not(.pc-stage-mode) .sc-bar-icon-img { height: 15px; }
          body:not(.pc-stage-mode) .sc-label { font-size: 17px; letter-spacing: 1.5px; }
          body:not(.pc-stage-mode) .sc-stats { padding-right: 6px; gap: 6px; flex-shrink: 0; }
          body:not(.pc-stage-mode) .sc-stat-num { font-size: 14px; }
          body:not(.pc-stage-mode) .sc-stat-tag { font-size: 7.5px; padding: 1px 3px; background: rgba(4, 12, 38, 0.85); }

          body:not(.pc-stage-mode) .sc-right-nav {
            top: 182px;
            left: 3%;
            right: 3%;
            height: 36px;
            justify-content: center;
            background: rgba(8, 16, 46, 0.92);
            border: 1px solid rgba(142, 245, 255, 0.45);
            border-radius: 6px;
            padding: 2px 10px;
            box-shadow: 4px 4px 0 #c4001a;
          }
          body:not(.pc-stage-mode) .sc-social-portrait-wrap { width: 26px; height: 26px; }
          body:not(.pc-stage-mode) .sc-social-arcana { width: 16px; height: 24px; }
          body:not(.pc-stage-mode) .sc-nav-handle { font-size: 8px; }
          body:not(.pc-stage-mode) .sc-right-nav .sc-nav-btn { font-size: 15px; padding: 1px 6px; }
          body:not(.pc-stage-mode) .sc-right-nav .sc-nav-label { font-size: 15px; color: #fff; }

          body:not(.pc-stage-mode) .sc-info-list-panel {
            --sc-step: 42px;
            top: 224px;
            left: 3%;
            right: 3%;
            bottom: 48px;
          }
          body:not(.pc-stage-mode) .sc-info-bar-wrap {
            left: 0;
            right: 0;
            height: 37px;
          }
          body:not(.pc-stage-mode) .sc-info-bar-icon {
            height: 56%;
            margin-left: 8px;
          }
          body:not(.pc-stage-mode) .sc-info-bar-new {
            top: -5px;
            left: 2px;
            bottom: auto;
            height: 16px;
          }
          body:not(.pc-stage-mode) .sc-info-bar-text { font-size: 12.5px; letter-spacing: 0.7px; padding: 0 6px; }
          body:not(.pc-stage-mode) .sc-info-bar-box { font-size: 10.5px; padding: 0 6px; }
          body:not(.pc-stage-mode) .sc-info-bar-count { font-size: 12px; margin-right: 8px; }
          body:not(.pc-stage-mode) .sc-acc-badge { font-size: 9.5px; padding: 1px 5px; }

          body:not(.pc-stage-mode) .sc-footer { display: none; }
          body:not(.pc-stage-mode) .sc-back-btn { bottom: 10px; left: 12px; font-size: 16px; padding: 4px 12px; }
        }

        .sc-back-btn {
          position: fixed;
          bottom: 40px;
          left: 40px;
          z-index: 9999;
          color: white;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(0,0,0,0.6);
          padding: 5px 15px;
          clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          transition: all 0.2s;
          z-index: 9999;
          pointer-events: all;
          border: 1px solid rgba(255,255,255,0.1);
          touch-action: manipulation;
        }
        .sc-back-btn:hover {
          background: #c4001a;
          transform: scale(1.1) skewX(-5deg);
        }

      `}</style>


      <div className="sc-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            data-p3-hover="true"
            ref={(el) => {
              if (el) {
                el.__p3Hover = () => {
                  if (active !== i) {
                    setActive(i);
                    setActiveInfoBar(0);
                  }
                  setFocus("left");
                };
              }
            }}
            onMouseEnter={() => { setActive(i); setFocus("left"); }}
          >
            <div className="sc-bar-red" />
            <div 
              className="sc-bar"
              onMouseEnter={() => { setActive(i); setFocus("left"); }}
              onClick={() => {
                if (active !== i) {
                  setActive(i);
                  setActiveInfoBar(0);
                } else {
                  setFocus("right");
                }
              }}
            >
              <img className="sc-char" src={CHARS[i]} width="220" height="135" decoding="async" alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="sc-main">
                  <div className="sc-main-top">
                    <img className="sc-bar-icon-img" src={item.barIcon} width="24" height="24" decoding="async" alt="" />
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
                <div className="sc-stats">
                  {item.stats.map(s => (
                    <div className="sc-stat" key={s.tag}>
                      <div className="sc-stat-top">
                        <span className="sc-stat-tag" style={{ color: s.color, borderColor: s.color }}>{s.tag}</span>
                        <span className="sc-stat-num">{s.value}</span>
                      </div>
                      <div className="sc-stat-bars">
                        <div className="sc-stat-bar-color" style={{ background: s.color }} />
                        <div className="sc-stat-bar-black" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mounted && (
        <div className="sc-info-panel-container">
          <div className="sc-right-nav" key={active}>
            <button
              type="button"
              aria-label="Previous social category"
              style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                setActive((i) => (i - 1 + ITEMS.length) % ITEMS.length);
                setActiveInfoBar(0);
              }}
            >
              <span className="sc-nav-arrow left">◄</span>
              <span className="sc-nav-btn">LB</span>
            </button>
            <div className="sc-social-portrait-wrap">
              <img className="sc-social-portrait" src={MAIN_IMAGES[active]} width="60" height="60" decoding="async" alt="" />
            </div>
            <div className="sc-nav-meta">
              <span className="sc-nav-label">{ITEMS[active].label}</span>
              <span className="sc-nav-handle">{ITEMS[active].handle}</span>
            </div>
            <img className="sc-social-arcana" src={arcanaCard} width="28" height="40" decoding="async" alt="" />
            <button
              type="button"
              aria-label="Next social category"
              style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                setActive((i) => (i + 1) % ITEMS.length);
                setActiveInfoBar(0);
              }}
            >
              <span className="sc-nav-btn">RB</span>
              <span className="sc-nav-arrow right">►</span>
            </button>
          </div>
        </div>
      )}

      {mounted && (
        <div className="sc-info-list-panel">
          {Array.from({ length: ITEMS[active].bars }).map((_, i) => (
            <div
              className={`sc-info-bar-wrap${activeInfoBar === i ? " selected" : ""}`}
              key={`bar-${active}-${i}`}
              data-p3-hover="true"
              ref={(el) => {
                if (el) {
                  el.__p3Hover = () => {
                    setFocus("right");
                    setActiveInfoBar(i);
                  };
                }
              }}
              style={{ "--bar-i": i, animationDelay: `${i * 50}ms` }}
              onClick={() => {
                setFocus("right");
                setActiveInfoBar(i);
                const link = ITEMS[active].links[i]?.href;
                if (link) window.open(link, "_blank");
              }}
              onMouseEnter={() => { setFocus("right"); setActiveInfoBar(i); }}
            >
              {ITEMS[active].newBars.includes(i) && (
                <img className="sc-info-bar-new" src={newsign} width="100" height="100" decoding="async" alt="" />
              )}
              <div className="sc-info-bar">
                <img className="sc-info-bar-icon" src={ITEMS[active].barIcon} width="48" height="28" decoding="async" alt="" />
                <span className="sc-info-bar-text">{ITEMS[active].links[i].text}</span>
                {ITEMS[active].links[i]?.href && <span className="sc-acc-badge">▶ LINK</span>}
                <span className="sc-info-bar-box">{ITEMS[active].links[i].pillLabel}</span>
                <span className="sc-info-bar-count">{ITEMS[active].links[i].pillValue}</span>
              </div>
            </div>
          ))}
        </div>
      )}


      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row"><span className="sc-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">↵</span><span>OPEN</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>BACK</span></div>
      </div>
      <div 
        className="sc-back-btn" 
        onClick={(e) => {
          e.stopPropagation();
          navigate('/');
        }}
      >
        <span>◄</span> BACK
      </div>
    </div>
  );
}
