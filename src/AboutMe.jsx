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

const CHARS = [char1, char2, char3];
const MAIN_IMAGES = [mainm, mainm2, mainf];

const REVEAL_CONTENT = [
  {
    name: "Name : Rajarshi Chakraborty",
    major: "Major : BCA Cybersecurity (9.08 SGPA) · CS Minor (IIT Mandi)",
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
    upper: [
      "Signature Security Architecture",
      "(Threat Intel): Built Sentinel AI, a real-time CTI platform",
      "integrating VirusTotal & AbuseIPDB for IP reputation scoring.",
      "(OSINT & Forensics): Built ARGUS OSINT with 18 tools, automated",
      "Tor routing, encrypted key vault & chain-of-custody logging.",
      "(IoT & Offensive): Built VARS Agri Nova (Sarvam API) & Spiderweb."
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
    id: "twitch", label: "ABOUT ME", handle: "@yourname", href: "https://twitch.tv/yourname", icon: "🎮", barIcon: icon1, bars: 1, newBars: [0], counts: ["56"],
    links: ["twitch.tv/videos/2041837265"],
    stats: [
      { tag: "FOL", value: "1.2K", color: "#9147ff" },
      { tag: "VWR", value: "042", color: "#bf94ff" },
    ],
  },
  {
    id: "instagram", label: "FUN FACT ABOUT ME", handle: "@yourhandle", href: "https://instagram.com/yourhandle", icon: "📷", barIcon: icon2, bars: 5, newBars: [1, 2], counts: ["3.4M", "2.5M", "676K", "412K", "198K"],
    links: ["instagram.com/p/C4xQmRrNk2a", "instagram.com/p/C3wLpBsOj7f", "instagram.com/reel/C2vKoArMi6e", "instagram.com/p/C1uJnZqLh5d", "instagram.com/reel/C0tImYpKg4c"],
    stats: [
      { tag: "FOL", value: "3.4K", color: "#e1306c" },
      { tag: "PST", value: "128", color: "#f77737" },
    ],
  },
  {
    id: "tiktok", label: "WIRED FACT ABOUT ME", handle: "@yourhandle", href: "https://tiktok.com/@yourhandle", icon: "🎵", barIcon: icon3, bars: 7, newBars: [0, 3, 5, 6], counts: ["5.1M", "3.7M", "2.2M", "1.4M", "831K", "490K", "217K"],
    links: ["tiktok.com/@yourhandle/video/7318492016374859054", "tiktok.com/@yourhandle/video/7305837261940183342", "tiktok.com/@yourhandle/video/7291046385720348974", "tiktok.com/@yourhandle/video/7278392047163820334", "tiktok.com/@yourhandle/video/7264819203847165742", "tiktok.com/@yourhandle/video/7251047382916430126", "tiktok.com/@yourhandle/video/7237294018463851822"],
    stats: [
      { tag: "FOL", value: "8.9K", color: "#00f2ea" },
      { tag: "LKS", value: "52K", color: "#ff0050" },
    ],
  },
];

export default function AboutMe() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive(i => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "Enter") setRevealed(true);
      if (e.key === "ArrowRight") setRevealed(true);
      if (e.key === "ArrowLeft" && revealed) {
        setRevealed(false);
        return;
      }
      if (e.key === "Escape" || e.key === "Backspace") {
        if (revealed) {
          setRevealed(false);
          return;
        }
        navigate('/');
        return;
      }
      if (e.key === "ArrowLeft" && !revealed) {
        navigate('/');
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, revealed]);

  return (
    <div id="menu-screen">
      <video 
        src={bgVideo}
        poster={bgPoster}
        autoPlay 
        loop 
        muted 
        playsInline 
        preload="auto"
        onCanPlay={(e) => e.currentTarget.play().catch(() => {})}
      />
      {revealed && (
        <div
          key={`dim-${active}`}
          className="sc-dim"
          onClick={() => setRevealed(false)}
        />
      )}
      {revealed && (
        <div key={`panel-${active}`} className={`sc-reveal-panel${mounted ? " mounted" : ""}`}>
          {REVEAL_CONTENT[active].name && (
            <div className="sc-reveal-name-box">
              <div className="sc-reveal-name">{REVEAL_CONTENT[active].name}</div>
              <div className="sc-reveal-major">{REVEAL_CONTENT[active].major}</div>
            </div>
          )}
          <div className="sc-reveal-upper-bar">
            {REVEAL_CONTENT[active].upper.map((line) => (
              <div className="sc-reveal-upper-line" key={line}>{line}</div>
            ))}
          </div>
          <div className="sc-reveal-lower-bar">
            <span>{REVEAL_CONTENT[active].lower}</span>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "auto", marginRight: "32px" }}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((i) => (i + 1) % ITEMS.length);
                }}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "16px",
                  letterSpacing: "1.5px",
                  color: "#fff",
                  background: "#c4001a",
                  border: "none",
                  padding: "4px 12px",
                  cursor: "pointer",
                  clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
                }}
              >
                NEXT ►
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setRevealed(false);
                }}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "16px",
                  letterSpacing: "1.5px",
                  color: "#8ef5ff",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(142,245,255,0.35)",
                  padding: "3px 10px",
                  cursor: "pointer",
                }}
              >
                ✕ CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
      {revealed && (
        <div key={`nav-${active}`} className="sc-right-nav">
          <button
            type="button"
            className="sc-nav-click"
            aria-label="Previous section"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i - 1 + ITEMS.length) % ITEMS.length);
            }}
          >
            <span className="sc-nav-arrow left">◄</span>
            <span className="sc-nav-btn">LB</span>
          </button>
          <span className="sc-nav-dot" />
          <button
            type="button"
            className="sc-nav-click"
            aria-label="Next section"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i + 1) % ITEMS.length);
            }}
          >
            <span className="sc-nav-btn">RB</span>
            <span className="sc-nav-arrow right">►</span>
          </button>
        </div>
      )}
      {revealed && (
        <div key={`portrait-${active}`} className={`sc-main-portrait-shell${mounted ? " mounted" : ""}`}>
          <img
            className="sc-main-portrait"
            src={MAIN_IMAGES[active]}
            width="500"
            height="830"
            decoding="async"
            alt=""
          />
        </div>
      )}
      <style>{`
        .sc-root {
          position: absolute;
          inset: 0;
          z-index: 1000;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 6px;
          padding-left: 0;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-root.revealed {
          transform: translateX(-15%);
        }

        .sc-dim {
          position: absolute;
          inset: 0;
          z-index: 12;
          background: rgba(40, 45, 54, 0.68);
          pointer-events: all;
          cursor: pointer;
          animation: sc-dim-in 0.32s ease-out;
        }

        @keyframes sc-dim-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes sc-reveal-bar-in {
          0% {
            opacity: 0;
            transform: translateX(-120px) rotate(-20deg) scaleX(0.72);
          }
          60% {
            opacity: 0.96;
            transform: translateX(18px) rotate(-20deg) scaleX(1.03);
          }
          100% {
            opacity: 0.92;
            transform: translateX(0) skewX(-12deg) scaleX(1);
          }
        }

        @keyframes sc-portrait-in {
          0% {
            opacity: 0;
            transform: translateX(78px) skewX(-8deg) scale(0.94);
            filter: blur(8px);
          }
          55% {
            opacity: 0.9;
            transform: translateX(-8px) skewX(-8deg) scale(1.015);
            filter: blur(0);
          }
          100% {
            opacity: 0.96;
            transform: translateX(0) skewX(-8deg) scale(1);
            filter: blur(0);
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

        .sc-main-portrait-shell {
          position: absolute;
          top: 0;
          right: -8%;
          z-index: 10;
          pointer-events: none;
          width: 43%;
          height: 100%;
          overflow: hidden;
          opacity: 0;
          transform: translateX(24px) skewX(-8deg) scale(0.98);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .sc-main-portrait-shell.mounted {
          opacity: 0.96;
          transform: translateX(0) skewX(-8deg) scale(1);
          animation: sc-portrait-in 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sc-reveal-panel {
          position: absolute;
          top: 25%;
          left: 22%;
          width: 68%;
          height: 62%;
          z-index: 20;
          pointer-events: all;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(243,246,252,0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 88px) 100%, 0 100%);
          box-shadow:
            0 0 0 2px rgba(255,255,255,0.18),
            18px 0 0 rgba(215, 13, 44, 0.82),
            28px 0 0 rgba(255,255,255,0.26);
          opacity: 0;
          transform: translateX(40px) skewX(-12deg);
          transform-origin: left center;
          transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-reveal-panel.mounted {
          opacity: 0.95;
          transform: translateX(0) skewX(-12deg);
          animation: sc-reveal-bar-in 0.46s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-reveal-panel::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 8px;
          background: linear-gradient(180deg, #e03d31 0%, #eb3333 100%);
          clip-path: inherit;
        }
        .sc-reveal-upper-bar {
          position: absolute;
          top: 27%;
          left: 0%;
          width: 100%;
          height: 40%;
          background: rgba(0, 0, 0, 0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 4px;
          color: rgba(255, 255, 255, 0.95);
          text-align: left;
          padding-left: 25%;
          padding-right: 8%;
        }

        .sc-reveal-name-box {
          position: absolute;
          top: 11%;
          left: 0%;
          width: 100%;
          height: 18%;
          background: rgba(0, 0, 0, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: inset 3px 0 0 #c4001a, 0 0 0 1px rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding-left: 25%;
          padding-right: 8%;
          gap: 4px;
          animation: sc-line-enter 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
        }
        .sc-reveal-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 3px;
          color: #fff;
          line-height: 1;
        }
        .sc-reveal-major {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 1.5px;
          color: #8ef5ff;
          text-transform: uppercase;
        }

        .sc-reveal-upper-line {
          font-family: 'Montserrat', sans-serif;
          font-weight: 400;
          font-size: 15px;
          letter-spacing: 0.3px;
          line-height: 1.3;
          text-shadow: 1px 1px 0px #000, 2px 2px 4px rgba(0,0,0,0.8);
          opacity: 0;
          transform: translateX(-15px);
          animation: sc-line-enter 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .sc-reveal-upper-line:nth-child(1) { 
          animation-delay: 0.3s; 
          font-weight: 700; 
          color: #4a8fff; 
          font-size: 17px; 
          text-transform: uppercase; 
          letter-spacing: 1.2px;
          margin-bottom: 2px;
        }
        .sc-reveal-upper-line:nth-child(2) { animation-delay: 0.38s; }
        .sc-reveal-upper-line:nth-child(3) { animation-delay: 0.46s; }
        .sc-reveal-upper-line:nth-child(4) { animation-delay: 0.54s; }
        .sc-reveal-upper-line:nth-child(5) { animation-delay: 0.62s; }
        .sc-reveal-upper-line:nth-child(6) { animation-delay: 0.70s; }
        .sc-reveal-upper-line:nth-child(7) { animation-delay: 0.78s; }

        @keyframes sc-line-enter {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .sc-reveal-lower-bar {
          position: absolute;
          top: 70%;
          right: 0;
          width: 55%;
          height: 18%;
          background: rgba(0, 0, 0, 0.95);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: -4px 4px 0px rgba(0,0,0,0.3), inset 2px 0 0 #c4001a;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          font-weight: 400;
          font-size: 32px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding-left: 28px;
        }

        @keyframes sc-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .sc-right-nav {
          position: absolute;
          top: 4%;
          left: 4%;
          display: flex;
          align-items: center;
          gap: 6px;
          pointer-events: all;
          z-index: 1010;
          transform: translateX(0) rotate(-10deg);
          transform-origin: left bottom;
          animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-nav-click {
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
          pointer-events: all;
          touch-action: manipulation;
        }
        .sc-right-nav .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 48px;
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: #fff;
          -webkit-text-stroke: 2px #000;
          paint-order: stroke fill;
          background: none;
          border: none;
          padding: 0 6px;
        }
        .sc-right-nav .sc-nav-dot {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: #111;
          margin: 0 10px;
          flex-shrink: 0;
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

        .sc-main-portrait {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top right;
          transform: skewX(8deg) scale(1.08);
          transform-origin: top right;
        }

        /* ── Each bar ── */
        .sc-bar {
          position: relative;
          width: 45cqw;
          height: 64px;
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          background: #111;
          cursor: pointer;
          pointer-events: all;
          touch-action: manipulation;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65);
          z-index: 1;
        }

        /* wrapper holds both the red underlay and the bar */
        .sc-bar-outer {
          position: relative;
          flex-shrink: 0;
          pointer-events: all;
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
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px 0 20px;
        }

        /* left: role label */
        .sc-role {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          font-family: 'Anton', sans-serif;
          font-size: 50px;
          letter-spacing: -2px;
          color: #ffffff;
          transform: rotate(-30deg);
          user-select: none;
          line-height: 1;
          padding: 0 16px 0 8px;
        }

        /* left: icon + name centered in remaining space */
        .sc-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding-left: 78px;
        }
        .sc-main-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sc-icon {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          width: 32px;
          text-align: center;
          flex-shrink: 0;
          color: rgba(255,255,255,0.15);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-icon { color: rgba(255,255,255,0.25); }

        .sc-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 4px;
          line-height: 1;
          color: rgba(255,255,255,0.85);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-label { color: #111111; }

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
          left: 110px;
          height: 100%;
          width: auto;
          max-width: 160px;
          object-fit: cover;
          object-position: top;
          pointer-events: all;
          z-index: 3;
          clip-path: polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
        }

        /* footer hints */
        .sc-footer {
          position: fixed;
          bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 14;
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
          /* Left menu bars in portrait mode */
          body:not(.pc-stage-mode) .sc-bar { width: 92cqw; height: 58px; }
          body:not(.pc-stage-mode) .sc-bar-red { width: 92cqw; }
          body:not(.pc-stage-mode) .sc-bar-outer.active .sc-bar { height: 74px; }
          body:not(.pc-stage-mode) .sc-bar-outer.active .sc-bar-red { height: 74px; }
          body:not(.pc-stage-mode) .sc-char { max-width: 90px; left: 62px; }
          body:not(.pc-stage-mode) .sc-main { padding-left: 38%; }
          body:not(.pc-stage-mode) .sc-root.revealed { transform: translateX(-110%); }

          /* Reveal info panel in portrait mode */
          body:not(.pc-stage-mode) .sc-reveal-panel {
            top: 24%;
            left: 2%;
            width: 96%;
            height: 60%;
            clip-path: polygon(0 0, 100% 0, calc(100% - 28px) 100%, 0 100%);
            transform: skewX(-4deg);
          }
          body:not(.pc-stage-mode) .sc-reveal-upper-bar {
            padding-left: 16px;
            padding-right: 6%;
            height: 46%;
          }
          body:not(.pc-stage-mode) .sc-reveal-upper-line {
            font-size: 12.5px;
            line-height: 1.25;
          }
          body:not(.pc-stage-mode) .sc-reveal-upper-line:nth-child(1) {
            font-size: 14px;
          }
          body:not(.pc-stage-mode) .sc-reveal-lower-bar { font-size: 20px; padding-left: 14px; top: 75%; height: 15%; }
          body:not(.pc-stage-mode) .sc-reveal-name-box { padding-left: 16px; top: 8%; height: 18%; }
          body:not(.pc-stage-mode) .sc-reveal-name { font-size: 22px; }
          body:not(.pc-stage-mode) .sc-reveal-major { font-size: 10.5px; }
          body:not(.pc-stage-mode) .sc-main-portrait-shell { width: 65%; right: -10%; opacity: 0.45; }

          /* Nav & footer */
          body:not(.pc-stage-mode) .sc-right-nav { top: 52px; left: 50%; transform: translateX(-50%); font-size: 14px; }
          body:not(.pc-stage-mode) .sc-right-nav .sc-nav-btn { font-size: 32px; }
          body:not(.pc-stage-mode) .sc-footer { bottom: 8px; right: 8px; }
          body:not(.pc-stage-mode) .sc-footer-row { font-size: 10px; }
          body:not(.pc-stage-mode) .sc-back-btn { bottom: 16px; left: 16px; font-size: 18px; }
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


      <div className={`sc-root${revealed ? " revealed" : ""}`} role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onMouseEnter={() => { setActive(i); }}
          >
            <div className="sc-bar-red" />
            <div 
              className="sc-bar"
              onMouseEnter={() => { setActive(i); }}
              onClick={(e) => {
                e.stopPropagation();
                if (active !== i) {
                  setActive(i);
                  setRevealed(true);
                } else {
                  setRevealed(!revealed);
                }
              }}
            >
              <img className="sc-char" src={CHARS[i]} width="350" height="135" decoding="async" alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="sc-main">
                  <div className="sc-main-top">
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row"><span className="sc-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">↵</span><span>REVEAL</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>BACK</span></div>
      </div>
      <div 
        className="sc-back-btn" 
        onClick={(e) => {
          e.stopPropagation();
          if (revealed) setRevealed(false);
          else navigate('/');
        }}
      >
        <span>◄</span> BACK
      </div>
    </div>
  );
}
