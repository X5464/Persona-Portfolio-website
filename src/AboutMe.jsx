import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import bgVideo from "./assets/main1.mp4";
import bgPoster from "./assets/main1_poster.jpg";
import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import icon3 from "./assets/icon3.png";
import mainm from "./assets/mainm.jpeg";
import mainm2 from "./assets/mainm2.jpeg";
import mainf from "./assets/mainf.jpeg";
import newsign from "./assets/newsign.png";
import arcanaCard from "./assets/card.png";
import SmartVideo from "./SmartVideo";

const CHARS = [char1, char2, char3];
const MAIN_IMAGES = [mainm, mainm2, mainf];
const CHAR_NAMES = ["MAKOTO YUKI // LEADER", "JUNPEI IORI // SEES", "YUKARI TAKEBA // SEES"];

const REVEAL_CONTENT = [
  {
    name: "Name : Rajarshi Chakraborty",
    major: "Major : BCA Cybersecurity (9.08 SGPA · 8.04 CGPA) · CS Minor (IIT Mandi)",
    upper: [
      "Class: Cybersecurity Analyst · PenTester · Digital Forensics",
      "Performing live digital forensics & network log analysis on active",
      "cybercrime cases with Uttar Pradesh Police (APCSIP 2026).",
      "Building Python security tools: CTI dashboards (VirusTotal/AbuseIPDB),",
      "hash crackers, and Tor-routed OSINT suites.",
      "AWS Cloud Club Core Team Member (Social Media & Content)."
    ],
    lower: "About Me",
  },
  {
    name: "Field Endurance & Creative Balance",
    major: "60-Hour International CTF Finisher · National Hackathon Winner",
    upper: [
      "Surviving The Grind & Winning On The Field",
      "Survived a grueling 60-hour non-stop CTF endurance event",
      "at Hck4G CTF Con 2025 International (Melbourne, Australia).",
      "Won 1st Place at Research Horizons 2025 & 3rd Place overall",
      "among 1,000+ teams at JAIN Launchpad 2025 Glitch Pitch.",
      "Off-terminal: I unplug with guitar and watercolor painting.",
    ],
    lower: "Fun Fact About Me",
  },
  {
    name: "Offensive Security & AI/AR Architecture",
    major: "Sentinel AI · ARGUS OSINT · ML Sign Lang AR · Spiderweb · CTI · Floral Aura",
    upper: [
      "Signature Security & AI Architecture",
      "(Threat Intel): Built Sentinel AI (51+ scam patterns) & CTI",
      "Dashboard integrating VirusTotal (60+ engines) & AbuseIPDB.",
      "(OSINT & Offensive): Built ARGUS OSINT (18 LEA tools, SleuthKit,",
      "Tor OpSec, Fernet vault) & Spiderweb (6-tool security suite).",
      "(AI & WebGL AR): PyTorch SignDETR 3D AR HUD, Floral Aura & IC-RPG."
    ],
    lower: "Wired Fact About Me",
  },
];

const ROLES = [
  { text: "LEADER", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "PARTY", color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "PARTY", color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
];

const ITEMS = [
  {
    id: "profile",
    label: "ABOUT ME",
    subtitle: "CYBER ANALYST",
    barIcon: icon1,
    isNew: true,
    stats: [
      { tag: "SGPA", value: "9.08", color: "#00d9ff" },
      { tag: "ARC", value: "01", color: "#e8c100" },
    ],
  },
  {
    id: "funfact",
    label: "FUN FACT ABOUT ME",
    subtitle: "60H CTF & ART",
    barIcon: icon2,
    isNew: false,
    stats: [
      { tag: "CTF", value: "60H", color: "#4a8fff" },
      { tag: "WIN", value: "1ST", color: "#00c853" },
    ],
  },
  {
    id: "wiredfact",
    label: "WIRED FACT ABOUT ME",
    subtitle: "SECURITY & AI",
    barIcon: icon3,
    isNew: true,
    stats: [
      { tag: "TLS", value: "24+", color: "#ff2a6d" },
      { tag: "PRJ", value: "08", color: "#bf94ff" },
    ],
  },
];

export default function AboutMe() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive(i => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "ArrowRight") setActive(i => (i + 1) % ITEMS.length);
      if (e.key === "Escape" || e.key === "Backspace" || e.key === "ArrowLeft") {
        navigate('/');
      }
    };
    const onWheel = (e) => {
      if (e.deltaY > 0) setActive(i => Math.min(ITEMS.length - 1, i + 1));
      else if (e.deltaY < 0) setActive(i => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
    };
  }, [active, navigate]);

  return (
    <div id="menu-screen">
      <SmartVideo
        className="subpage-video-right"
        src={bgVideo}
        poster={bgPoster}
        preload="auto"
      />

      {/* Top-right LB / RB Category Switcher */}
      <div key={`nav-${active}`} className="ab-right-nav">
        <button
          type="button"
          className="ab-nav-click"
          aria-label="Previous section"
          onClick={(e) => {
            e.stopPropagation();
            setActive((i) => (i - 1 + ITEMS.length) % ITEMS.length);
          }}
        >
          <span className="ab-nav-arrow left">◄</span>
          <span className="ab-nav-btn">LB</span>
        </button>
        <span className="ab-nav-label">{ITEMS[active].label}</span>
        <button
          type="button"
          className="ab-nav-click"
          aria-label="Next section"
          onClick={(e) => {
            e.stopPropagation();
            setActive((i) => (i + 1) % ITEMS.length);
          }}
        >
          <span className="ab-nav-btn">RB</span>
          <span className="ab-nav-arrow right">►</span>
        </button>
      </div>

      {/* Center-Right Persona 3 Slanted Bio Panel */}
      <div key={`panel-${active}`} className={`ab-reveal-panel${mounted ? " mounted" : ""}`}>
        <div className="ab-reveal-name-box">
          <img className="ab-arcana-card" src={arcanaCard} width="42" height="58" decoding="async" alt="" />
          <div className="ab-reveal-name-text">
            <div className="ab-reveal-name">{REVEAL_CONTENT[active].name}</div>
            <div className="ab-reveal-major">{REVEAL_CONTENT[active].major}</div>
          </div>
          <img className="ab-stats-thumb" src={bgPoster} width="84" height="48" decoding="async" alt="" title="P3 STATS ARCHIVE" />
        </div>

        <div className="ab-reveal-upper-bar">
          {REVEAL_CONTENT[active].upper.map((line) => (
            <div className="ab-reveal-upper-line" key={line}>{line}</div>
          ))}
        </div>

        <div className="ab-reveal-lower-bar">
          <img className="ab-lower-icon" src={ITEMS[active].barIcon} width="28" height="28" decoding="async" alt="" />
          <span className="ab-lower-title">{REVEAL_CONTENT[active].lower}</span>
          <button
            type="button"
            className="ab-next-btn"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i + 1) % ITEMS.length);
            }}
          >
            NEXT ►
          </button>
        </div>
      </div>

      {/* Far-Right Character Cut-In Portrait (mainm.jpeg, mainm2.jpeg, mainf.jpeg) */}
      <div key={`portrait-${active}`} className={`ab-main-portrait-shell${mounted ? " mounted" : ""}`}>
        <div className="ab-portrait-frame">
          <img
            className="ab-main-portrait"
            src={MAIN_IMAGES[active]}
            width="500"
            height="830"
            decoding="async"
            alt={CHAR_NAMES[active]}
          />
          <div className="ab-portrait-tag">{CHAR_NAMES[active]}</div>
        </div>
      </div>

      <style>{`
        .sc-root {
          position: absolute;
          inset: 0;
          z-index: 20;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 8px;
          padding-left: 0;
        }

        @keyframes ab-reveal-bar-in {
          0% {
            opacity: 0;
            transform: translateX(32px) skewX(-6deg) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateX(0) skewX(-6deg) scale(1);
          }
        }

        @keyframes ab-portrait-in {
          0% {
            opacity: 0;
            transform: translateX(48px) skewX(-6deg) scale(0.94);
          }
          100% {
            opacity: 1;
            transform: translateX(0) skewX(-6deg) scale(1);
          }
        }

        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(-5px); opacity: 0.4; }
        }

        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(5px); opacity: 0.4; }
        }

        /* Far-Right Character Cut-In Portrait */
        .ab-main-portrait-shell {
          position: absolute;
          top: 13%;
          right: 1.8%;
          width: 19.5%;
          height: 74%;
          z-index: 24;
          pointer-events: none;
          opacity: 0;
          transform: translateX(24px) skewX(-6deg);
        }
        .ab-main-portrait-shell.mounted {
          opacity: 1;
          transform: translateX(0) skewX(-6deg);
          animation: ab-portrait-in 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .ab-portrait-frame {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: rgba(8, 16, 46, 0.85);
          border: 2px solid #8ef5ff;
          box-shadow:
            8px 8px 0 #c4001a,
            0 12px 32px rgba(0, 0, 0, 0.7);
          clip-path: polygon(0 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%);
        }
        .ab-main-portrait {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 18%;
          transform: skewX(6deg) scale(1.08);
          transform-origin: center center;
        }
        .ab-portrait-tag {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(90deg, rgba(196, 0, 26, 0.95) 0%, rgba(8, 16, 46, 0.95) 100%);
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          letter-spacing: 2px;
          padding: 4px 10px;
          text-align: center;
          border-top: 1px solid rgba(142, 245, 255, 0.5);
        }

        /* Center-Right Bio Panel */
        .ab-reveal-panel {
          position: absolute;
          top: 15%;
          left: 44.5%;
          width: 32.5%;
          min-height: 68%;
          z-index: 25;
          pointer-events: all;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 10px;
          padding: 16px;
          background: linear-gradient(180deg, rgba(10, 22, 82, 0.88) 0%, rgba(5, 11, 46, 0.92) 100%);
          border: 1px solid rgba(142, 245, 255, 0.35);
          clip-path: polygon(0 0, 100% 0, calc(100% - 24px) 100%, 0 100%);
          box-shadow:
            10px 10px 0 rgba(196, 0, 26, 0.88),
            0 12px 30px rgba(0, 0, 0, 0.65);
          opacity: 0;
          transform: translateX(32px) skewX(-6deg);
        }
        .ab-reveal-panel.mounted {
          opacity: 1;
          transform: translateX(0) skewX(-6deg);
          animation: ab-reveal-bar-in 0.38s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .ab-reveal-panel::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, #c4001a 0%, #8ef5ff 100%);
        }

        .ab-reveal-name-box {
          position: relative;
          width: 100%;
          background: rgba(0, 0, 0, 0.88);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 4px 0 0 #c4001a;
          display: flex;
          align-items: center;
          padding: 10px 14px;
          gap: 12px;
        }
        .ab-arcana-card {
          width: 34px;
          height: 48px;
          object-fit: cover;
          border-radius: 3px;
          border: 1px solid #8ef5ff;
          box-shadow: 0 0 10px rgba(142, 245, 255, 0.4);
          flex-shrink: 0;
        }
        .ab-reveal-name-text {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .ab-reveal-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 2px;
          color: #fff;
          line-height: 1.05;
        }
        .ab-reveal-major {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.8px;
          color: #8ef5ff;
          text-transform: uppercase;
          line-height: 1.25;
        }
        .ab-stats-thumb {
          width: 68px;
          height: 40px;
          object-fit: cover;
          border: 1px solid rgba(142, 245, 255, 0.5);
          border-radius: 3px;
          flex-shrink: 0;
        }

        .ab-reveal-upper-bar {
          flex: 1;
          width: 100%;
          background: rgba(0, 4, 20, 0.82);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          border-left: 3px solid #8ef5ff;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 6px;
          color: rgba(255, 255, 255, 0.95);
          text-align: left;
          padding: 14px 18px;
        }

        .ab-reveal-upper-line {
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          font-size: 13.5px;
          letter-spacing: 0.2px;
          line-height: 1.35;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.9);
          opacity: 0;
          transform: translateX(-12px);
          animation: sc-line-enter 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .ab-reveal-upper-line:nth-child(1) { 
          animation-delay: 0.1s; 
          font-weight: 700; 
          color: #8ef5ff; 
          font-size: 15px; 
          text-transform: uppercase; 
          letter-spacing: 1px;
          margin-bottom: 2px;
        }
        .ab-reveal-upper-line:nth-child(2) { animation-delay: 0.16s; }
        .ab-reveal-upper-line:nth-child(3) { animation-delay: 0.22s; }
        .ab-reveal-upper-line:nth-child(4) { animation-delay: 0.28s; }
        .ab-reveal-upper-line:nth-child(5) { animation-delay: 0.34s; }
        .ab-reveal-upper-line:nth-child(6) { animation-delay: 0.40s; }

        @keyframes sc-line-enter {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .ab-reveal-lower-bar {
          width: 100%;
          min-height: 46px;
          background: rgba(0, 0, 0, 0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 3px 0 0 #c4001a;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          padding: 6px 20px 6px 14px;
          gap: 10px;
        }
        .ab-lower-icon {
          height: 24px;
          width: auto;
          object-fit: contain;
          flex-shrink: 0;
        }
        .ab-lower-title {
          font-size: 24px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #fff;
        }
        .ab-next-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 1.5px;
          color: #fff;
          background: #c4001a;
          border: none;
          padding: 4px 14px;
          cursor: pointer;
          margin-left: auto;
          clip-path: polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .ab-next-btn:hover {
          background: #e03d31;
          transform: scale(1.05);
        }

        /* Top-Right LB / RB Nav */
        .ab-right-nav {
          position: absolute;
          top: 5%;
          right: 2%;
          display: flex;
          align-items: center;
          gap: 8px;
          pointer-events: all;
          z-index: 30;
          background: rgba(8, 16, 46, 0.84);
          border: 1px solid rgba(142, 245, 255, 0.35);
          padding: 4px 14px;
          clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .ab-nav-click {
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
          pointer-events: all;
          touch-action: manipulation;
        }
        .ab-right-nav .ab-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          line-height: 1;
          user-select: none;
          color: #111;
          background: #fff;
          padding: 2px 8px;
        }
        .ab-right-nav .ab-nav-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 2.5px;
          color: #8ef5ff;
          padding: 0 6px;
          white-space: nowrap;
        }
        .ab-right-nav .ab-nav-arrow {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          color: #c4001a;
          display: inline-block;
          user-select: none;
        }
        .ab-right-nav .ab-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .ab-right-nav .ab-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

        /* ── Left Party Bars ── */
        .sc-bar {
          position: relative;
          width: 42cqw;
          height: 68px;
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          background: #111;
          cursor: pointer;
          pointer-events: all;
          touch-action: none;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65);
          z-index: 1;
        }

        .sc-bar-outer {
          position: relative;
          flex-shrink: 0;
          pointer-events: all;
          transform: translateX(-100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-bar-outer.active .sc-bar     { height: 92px; }
        .sc-bar-outer.active .sc-bar-red { height: 92px; }
        .sc-bar-outer.mounted { transform: translateX(0); }
        .sc-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .sc-bar-outer:nth-child(2) { transition-delay: 80ms; }
        .sc-bar-outer:nth-child(3) { transition-delay: 160ms; }

        .sc-bar-red {
          position: absolute;
          top: 0; left: 0;
          width: 42cqw;
          height: 68px;
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px);
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 0;
          pointer-events: all;
        }
        .sc-bar-outer.active .sc-bar-red { opacity: 1; }

        .sc-bar-fill {
          position: absolute;
          inset: 0;
          width: 100%;
          background: #ffffff;
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
          transform: translateX(85%);
          will-change: transform;
          transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .sc-bar-outer.active .sc-bar-fill {
          transform: translateX(0);
        }

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

        .sc-bar::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 6px;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
          z-index: 10;
          pointer-events: all;
        }

        .sc-bar-content {
          position: relative;
          z-index: 4;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px 0 14px;
        }

        .sc-role {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          font-family: 'Anton', sans-serif;
          font-size: 40px;
          letter-spacing: -2px;
          color: #ffffff;
          transform: rotate(-30deg);
          user-select: none;
          line-height: 1;
          padding: 0 8px 0 4px;
        }

        .sc-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 2px;
          padding-left: 108px;
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
        .sc-new-badge {
          position: absolute;
          top: -8px;
          right: 14px;
          height: 22px;
          width: auto;
          z-index: 8;
          pointer-events: none;
        }

        .sc-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          line-height: 1;
          color: rgba(255,255,255,0.92);
          transition: color 0.2s ease;
          user-select: none;
          white-space: nowrap;
        }
        .sc-bar-outer.active .sc-label { color: #111111; }

        .sc-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.5);
          transition: color 0.2s ease;
        }
        .sc-bar-outer.active .sc-subtitle { color: rgba(0,0,0,0.55); }

        .sc-stats {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-right: 12px;
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
          gap: 3px;
        }
        .sc-stat-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 9px;
          letter-spacing: 1.2px;
          padding: 1px 4px;
          border-width: 1px;
          border-style: solid;
          line-height: 1.3;
          user-select: none;
        }
        .sc-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          font-style: italic;
          line-height: 1;
          color: #ffffff;
          letter-spacing: 1px;
          user-select: none;
          transition: color 0.2s ease;
        }
        .sc-bar-outer.active .sc-stat-num { color: #111111; }

        /* character portrait inside bar */
        .sc-char {
          position: absolute;
          top: 0;
          left: 88px;
          height: 100%;
          width: 112px;
          max-width: 112px;
          object-fit: cover;
          object-position: 18% center;
          pointer-events: none;
          z-index: 2;
          clip-path: polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%);
        }

        /* footer hints */
        .sc-footer {
          position: fixed;
          bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 30;
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
            padding-top: 46px;
            gap: 5px;
          }
          body:not(.pc-stage-mode) .sc-bar { width: 95cqw; height: 48px; }
          body:not(.pc-stage-mode) .sc-bar-red { width: 95cqw; height: 48px; }
          body:not(.pc-stage-mode) .sc-bar-outer.active .sc-bar { height: 56px; }
          body:not(.pc-stage-mode) .sc-bar-outer.active .sc-bar-red { height: 56px; }
          body:not(.pc-stage-mode) .sc-bar-content { padding: 0 10px 0 8px; }
          body:not(.pc-stage-mode) .sc-role { font-size: 24px; padding: 0 4px 0 2px; }
          body:not(.pc-stage-mode) .sc-char { width: 78px; max-width: 78px; left: 50px; object-position: 18% center; }
          body:not(.pc-stage-mode) .sc-main { padding-left: 68px; align-items: flex-start; }
          body:not(.pc-stage-mode) .sc-label { font-size: 16px; letter-spacing: 1.2px; white-space: nowrap; }
          body:not(.pc-stage-mode) .sc-subtitle { font-size: 9.5px; }
          body:not(.pc-stage-mode) .sc-stats { padding-right: 4px; gap: 5px; }
          body:not(.pc-stage-mode) .sc-stat-num { font-size: 15px; }
          body:not(.pc-stage-mode) .sc-stat-tag { font-size: 7.5px; }

          body:not(.pc-stage-mode) .ab-right-nav {
            top: 214px;
            left: 3%;
            right: 3%;
            justify-content: center;
            padding: 2px 10px;
          }
          body:not(.pc-stage-mode) .ab-right-nav .ab-nav-btn { font-size: 18px; }
          body:not(.pc-stage-mode) .ab-right-nav .ab-nav-label { font-size: 16px; }

          body:not(.pc-stage-mode) .ab-reveal-panel,
          body:not(.pc-stage-mode) .ab-reveal-panel.mounted {
            top: 252px;
            left: 3%;
            width: 63%;
            min-height: 0;
            bottom: 54px;
            padding: 10px;
            gap: 6px;
            transform: none;
            animation: none;
            opacity: 1;
            clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          }
          body:not(.pc-stage-mode) .ab-reveal-name-box {
            padding: 6px 8px;
            gap: 6px;
          }
          body:not(.pc-stage-mode) .ab-arcana-card { width: 24px; height: 34px; }
          body:not(.pc-stage-mode) .ab-stats-thumb { display: none; }
          body:not(.pc-stage-mode) .ab-reveal-name { font-size: 15px; letter-spacing: 1px; }
          body:not(.pc-stage-mode) .ab-reveal-major { font-size: 8.5px; letter-spacing: 0.4px; }
          body:not(.pc-stage-mode) .ab-reveal-upper-bar {
            padding: 8px 10px;
            gap: 4px;
            overflow-y: auto;
            justify-content: flex-start;
          }
          body:not(.pc-stage-mode) .ab-reveal-upper-line {
            font-size: 10.5px;
            line-height: 1.25;
          }
          body:not(.pc-stage-mode) .ab-reveal-upper-line:nth-child(1) {
            font-size: 11.5px;
          }
          body:not(.pc-stage-mode) .ab-reveal-lower-bar {
            min-height: 34px;
            padding: 4px 10px;
          }
          body:not(.pc-stage-mode) .ab-lower-icon { height: 18px; }
          body:not(.pc-stage-mode) .ab-lower-title { font-size: 14px; letter-spacing: 1px; }
          body:not(.pc-stage-mode) .ab-next-btn { font-size: 12px; padding: 2px 8px; }

          body:not(.pc-stage-mode) .ab-main-portrait-shell,
          body:not(.pc-stage-mode) .ab-main-portrait-shell.mounted {
            top: 252px;
            right: 3%;
            width: 29%;
            height: auto;
            bottom: 54px;
            transform: none;
            animation: none;
            opacity: 1;
          }
          body:not(.pc-stage-mode) .ab-main-portrait {
            transform: scale(1.04);
            object-position: center 15%;
          }
          body:not(.pc-stage-mode) .ab-portrait-tag {
            font-size: 10px;
            letter-spacing: 1px;
            padding: 3px 4px;
          }

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
            ref={(el) => { if (el) el.__p3Hover = () => setActive(i); }}
            onMouseEnter={() => setActive(i)}
          >
            {item.isNew && <img className="sc-new-badge" src={newsign} width="54" height="24" decoding="async" alt="NEW" />}
            <div className="sc-bar-red" />
            <div 
              className="sc-bar"
              onMouseEnter={() => setActive(i)}
              onClick={(e) => {
                e.stopPropagation();
                setActive(i);
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
                  <div className="sc-subtitle">{item.subtitle}</div>
                </div>
                <div className="sc-stats">
                  {item.stats.map(s => (
                    <div className="sc-stat" key={s.tag}>
                      <div className="sc-stat-top">
                        <span className="sc-stat-tag" style={{ color: s.color, borderColor: s.color }}>{s.tag}</span>
                        <span className="sc-stat-num">{s.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row"><span className="sc-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">LB/RB</span><span>SWITCH</span></div>
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
