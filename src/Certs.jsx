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

const CHARS = [char1, char2, char3];

const ROLES = [
  { text: "CYBER", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "DEV",   color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "STRAT", color: "#ff5577", bg: "rgba(255,85,119,0.12)", border: "rgba(255,85,119,0.5)" },
];

const ITEMS = [
  {
    id: "cyber", label: "CYBER & CLOUD", subtitle: "CRT 12 · STS VALID", barIcon: icon1, bars: 12, newBars: [0],
    stats: [
      { tag: "CRT", value: "12", color: "#0077b5" },
      { tag: "STS", value: "VALID", color: "#00c853" },
    ],
    links: [
      { text: "GOOGLE: FOUNDATIONS OF CYBERSECURITY", pillLabel: "ISSUER", pillValue: "GOOGLE", href: "/certs/google.pdf" },
      { text: "CISCO: INTRODUCTION TO CYBERSECURITY", pillLabel: "ISSUER", pillValue: "CISCO", href: "/certs/cisco.pdf" },
      { text: "AWS FORAGE: APAC SOLUTIONS ARCHITECTURE SIM", pillLabel: "ISSUER", pillValue: "AWS", href: "/certs/aws.pdf" },
      { text: "AIG FORAGE: SHIELDS UP CYBERSECURITY SIM", pillLabel: "ISSUER", pillValue: "AIG", href: "/certs/aig.pdf" },
      { text: "TCS FORAGE: CYBERSECURITY ANALYST SIM", pillLabel: "ISSUER", pillValue: "TCS", href: "/certs/tcs.pdf" },
      { text: "DELOITTE FORAGE: CYBER JOB SIMULATION", pillLabel: "ISSUER", pillValue: "DELOITTE", href: "/certs/deloitte.pdf" },
      { text: "MASTERCARD FORAGE: CYBERSECURITY SIM", pillLabel: "ISSUER", pillValue: "MCARD", href: "/certs/mastercard.pdf" },
      { text: "OPSWAT: INTRO TO CRITICAL INFRASTRUCTURE (ICIP)", pillLabel: "ISSUER", pillValue: "OPSWAT", href: "/certs/opswat.pdf" },
      { text: "TEACHNOOK: CYBER SECURITY", pillLabel: "ISSUER", pillValue: "TEACHNOOK", href: "/certs/teachnook.pdf" },
      { text: "UDEMY: WIFI HACKING — EVIL TWIN & CAPTIVE PORTALS", pillLabel: "ISSUER", pillValue: "UDEMY", href: "/certs/udemy-wifi.pdf" },
      { text: "MYCAPTAIN: ETHICAL HACKING COURSE", pillLabel: "ISSUER", pillValue: "MYCAPTAIN", href: "/certs/mycaptain-ethical.pdf" },
      { text: "LEARNTUBE.AI: ETHICAL HACKING ASSESSMENT", pillLabel: "ISSUER", pillValue: "LEARNTUBE", href: "/certs/learntube.pdf" },
    ],
  },
  {
    id: "dev", label: "DEV & ENGINEERING", subtitle: "CRT 06 · STS VALID", barIcon: icon2, bars: 6, newBars: [0],
    stats: [
      { tag: "CRT", value: "06", color: "#4a8fff" },
      { tag: "STS", value: "VALID", color: "#00c853" },
    ],
    links: [
      { text: "IIT MANDI / PRAVARTAK: PYTHON COURSE", pillLabel: "ISSUER", pillValue: "IIT", href: "/certs/iit.pdf" },
      { text: "HCL GUVI: PYTHON", pillLabel: "ISSUER", pillValue: "HCL GUVI", href: "/certs/hcl-python.pdf" },
      { text: "MYCAPTAIN: C PROGRAMMING COURSE", pillLabel: "ISSUER", pillValue: "MYCAPTAIN", href: "/certs/mycaptain-c.pdf" },
      { text: "GOOGLE: AI ESSENTIALS", pillLabel: "ISSUER", pillValue: "GOOGLE", href: "/certs/google-ai.pdf" },
      { text: "AI CERTS: AI+ FOUNDATION CERTIFICATION", pillLabel: "ISSUER", pillValue: "AI CERTS", href: "/certs/aicerts.pdf" },
      { text: "HCL GUVI: CHATGPT FOR EVERYONE", pillLabel: "ISSUER", pillValue: "HCL GUVI", href: "/certs/hcl-chatgpt.pdf" },
    ],
  },
  {
    id: "strategy", label: "STRATEGY & LEADERSHIP", subtitle: "CRT 04 · STS VALID", barIcon: icon3, bars: 4, newBars: [0],
    stats: [
      { tag: "CRT", value: "04", color: "#ff5577" },
      { tag: "STS", value: "VALID", color: "#00c853" },
    ],
    links: [
      { text: "MCKINSEY & COMPANY: FORWARD PROGRAM", pillLabel: "ISSUER", pillValue: "McKINSEY", href: "/certs/mckinsey.pdf" },
      { text: "IBM: COLLABORATE EFFECTIVELY FOR PROFESSIONALS", pillLabel: "ISSUER", pillValue: "IBM", href: "/certs/ibm.pdf" },
      { text: "McLAREN RACING: UNLEASHING HIGH-PERF CULTURE", pillLabel: "ISSUER", pillValue: "McLAREN", href: "/certs/mclaren.pdf" },
      { text: "BRITISH COUNCIL: LEADERSHIP SKILLS WORKSHOP", pillLabel: "ISSUER", pillValue: "BR.COUNCIL", href: "/certs/british-council.pdf" },
    ],
  },
];

const VISIBLE = 6;

export default function Certs() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [activeInfoBar, setActiveInfoBar] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [focus, setFocus] = useState("left");
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Reset scroll when switching category
  useEffect(() => { setScrollOffset(0); setActiveInfoBar(0); }, [active]);

  useEffect(() => {
    const onKey = (e) => {
      if (focus === "left") {
        if (e.key === "ArrowUp") setActive(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));
        if (e.key === "ArrowRight") { setFocus("right"); setActiveInfoBar(0); setScrollOffset(0); }
        if (e.key === "Enter") window.open(ITEMS[active].links[0].href, "_blank");
      } else {
        const barCount = ITEMS[active].bars;
        if (e.key === "ArrowUp") {
          setActiveInfoBar(prev => {
            const next = Math.max(0, prev - 1);
            setScrollOffset(off => next < off ? next : off);
            return next;
          });
        }
        if (e.key === "ArrowDown") {
          setActiveInfoBar(prev => {
            const next = Math.min(barCount - 1, prev + 1);
            setScrollOffset(off => next >= off + VISIBLE ? next - VISIBLE + 1 : off);
            return next;
          });
        }
        if (e.key === "ArrowLeft") setFocus("left");
        if (e.key === "Enter") window.open(ITEMS[active].links[activeInfoBar].href, "_blank");
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
      if (focus === "right") {
        const barCount = ITEMS[active].bars;
        if (e.deltaY > 0) {
          setActiveInfoBar(prev => {
            const next = Math.min(barCount - 1, prev + 1);
            setScrollOffset(off => next >= off + VISIBLE ? next - VISIBLE + 1 : off);
            return next;
          });
        } else if (e.deltaY < 0) {
          setActiveInfoBar(prev => {
            const next = Math.max(0, prev - 1);
            setScrollOffset(off => next < off ? next : off);
            return next;
          });
        }
      } else {
        if (e.deltaY > 0) setActive(i => Math.min(ITEMS.length - 1, i + 1));
        else if (e.deltaY < 0) setActive(i => Math.max(0, i - 1));
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
        src={bgVideo} 
        poster={bgPoster} 
        autoPlay 
        loop 
        muted 
        playsInline 
        disablePictureInPicture
        controlsList="nodownload"
        onCanPlay={(e) => e.currentTarget.play()}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Anton&display=swap');

        .ct-root {
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
        }

        .ct-bar-outer {
          position: relative;
          flex-shrink: 0;
          transform: translateX(-100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ct-bar-outer.active .ct-bar { height: 90px; }
        .ct-bar-outer.active .ct-bar-red { height: 90px; }
        .ct-bar-outer.mounted { transform: translateX(0); }
        .ct-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .ct-bar-outer:nth-child(2) { transition-delay: 80ms; }
        .ct-bar-outer:nth-child(3) { transition-delay: 160ms; }

        .ct-bar {
          position: relative;
          width: 52vw;
          height: 64px;
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          background: #111;
          cursor: pointer;
          pointer-events: all;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65);
        }
        .ct-bar-red {
          position: absolute;
          top: 0; left: 0;
          width: 52vw;
          height: 64px;
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px);
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 0;
          pointer-events: none;
        }
        .ct-bar-outer.active .ct-bar-red { opacity: 1; }
        .ct-bar-fill {
          position: absolute;
          inset: 0;
          background: #ffffff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ct-bar-outer.active .ct-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }
        .ct-bar::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 6px;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
          z-index: 10;
          pointer-events: none;
        }
        .ct-bar-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px 0 20px;
        }
        .ct-role {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          font-family: 'Anton', sans-serif;
          font-size: 38px;
          letter-spacing: -1px;
          color: #ffffff;
          transform: rotate(-30deg);
          user-select: none;
          line-height: 1;
          padding: 0 12px 0 6px;
        }
        .ct-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          padding-left: 26%;
        }
        .ct-char {
          position: absolute;
          top: 0;
          left: 110px;
          height: 100%;
          width: auto;
          max-width: 160px;
          object-fit: cover;
          object-position: top;
          pointer-events: none;
          z-index: 3;
          clip-path: polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
        }
        .ct-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 2.5px;
          line-height: 1;
          color: rgba(255,255,255,0.85);
          transition: color 0.2s ease;
          user-select: none;
          white-space: nowrap;
        }
        .ct-bar-outer.active .ct-label { color: #111111; }
        .ct-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.45);
          user-select: none;
          transition: color 0.2s ease;
        }
        .ct-bar-outer.active .ct-subtitle { color: rgba(0,0,0,0.5); }
        .ct-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-right: 24px;
          flex-shrink: 0;
        }
        .ct-stat { display: flex; flex-direction: column; align-items: flex-start; }
        .ct-stat-top { display: flex; align-items: baseline; gap: 4px; }
        .ct-stat-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 9px; letter-spacing: 1.5px;
          padding: 1px 4px; border-width: 1px; border-style: solid;
          line-height: 1.4; user-select: none;
        }
        .ct-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px; font-style: italic; line-height: 1;
          color: #ffffff; letter-spacing: 1px; user-select: none;
          transition: color 0.2s ease;
        }
        .ct-bar-outer.active .ct-stat-num { color: #111111; }

        @keyframes ct-infobar-in {
          0%   { opacity: 0; transform: translateX(40px); }
          60%  { opacity: 1; transform: translateX(-4px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .ct-info-bar-wrap {
          position: fixed;
          right: 0;
          left: 62%;
          height: 48px;
          background: transparent;
          pointer-events: all;
          cursor: pointer;
          z-index: 50;
          animation: ct-infobar-in 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }
        .ct-info-bar-wrap.selected {
          background: #111;
          padding: 1.5px;
          border-radius: 8px;
        }
        .ct-info-bar {
          position: relative;
          width: 100%; height: 100%;
          background: transparent;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .ct-info-bar-wrap.selected .ct-info-bar {
          background: #fff;
          border-radius: 7px;
        }
        .ct-info-bar-wrap.selected .ct-info-bar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: #c4001a;
          z-index: 1;
        }
        .ct-info-bar-icon {
          height: 55%; width: auto;
          flex-shrink: 0;
          margin-left: 14px;
          object-fit: contain;
          pointer-events: none;
        }
        .ct-info-bar-new {
          position: absolute;
          left: -40px; bottom: 0;
          height: 65%; width: auto;
          pointer-events: none; z-index: 3;
        }
        .ct-info-bar-text {
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
        .ct-acc-badge {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px;
          letter-spacing: 1.5px;
          color: #fff;
          background: #c4001a;
          padding: 2px 8px;
          margin-left: 6px;
          clip-path: polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
          flex-shrink: 0;
          user-select: none;
        }
        .ct-info-bar-box {
          height: 65%;
          background: #000;
          display: flex;
          align-items: center;
          padding: 0 10px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          letter-spacing: 1px;
          color: #fff;
          flex-shrink: 0;
          border-radius: 4px;
          margin-right: 4px;
          user-select: none;
        }
        .ct-info-bar-count {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 15px;
          letter-spacing: 1px;
          color: #111;
          margin-right: 14px;
          flex-shrink: 0;
          user-select: none;
        }
        .ct-right-nav {
          position: fixed;
          top: 40px; right: 40px;
          display: flex; align-items: center; gap: 6px;
          pointer-events: none; z-index: 50;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 3px;
          color: #fff;
        }
        .ct-nav-label { color: #111; padding: 0 8px; font-size: 24px; }
        .ct-arrow { color: #c4001a; display: inline-block; }

        .ct-scroll-track {
          position: fixed;
          right: 12px;
          top: 155px;
          width: 3px;
          height: ${VISIBLE * 55}px;
          background: rgba(255,255,255,0.12);
          z-index: 60;
          border-radius: 2px;
        }
        .ct-scroll-thumb {
          position: absolute;
          left: 0;
          width: 3px;
          background: #c4001a;
          border-radius: 2px;
          transition: top 0.25s ease, height 0.25s ease;
        }
        .ct-scroll-hint-below {
          position: fixed;
          left: 62%;
          right: 20px;
          pointer-events: none;
          z-index: 61;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .ct-scroll-fade {
          width: 100%;
          height: 38px;
          background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.72));
        }
        .ct-scroll-arrow {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          letter-spacing: 2.5px;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 6px;
          animation: ct-bounce 1.2s ease-in-out infinite;
        }
        .ct-scroll-arrow span {
          display: inline-block;
          color: #c4001a;
          font-size: 16px;
        }
        @keyframes ct-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(4px); }
        }
        .ct-scroll-hint-above {
          position: fixed;
          left: 62%;
          right: 20px;
          pointer-events: none;
          z-index: 61;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .ct-scroll-fade-top {
          width: 100%;
          height: 30px;
          background: linear-gradient(to top, transparent, rgba(0,0,0,0.6));
        }
        .ct-scroll-arrow-top {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          letter-spacing: 2.5px;
          color: rgba(255,255,255,0.6);
          display: flex;
          align-items: center;
          gap: 6px;
          animation: ct-bounce-up 1.2s ease-in-out infinite;
        }
        .ct-scroll-arrow-top span { color: #c4001a; font-size: 16px; }
        @keyframes ct-bounce-up {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }
        .ct-footer {
          position: fixed;
          bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 50;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }
        .ct-footer.mounted { opacity: 1; }
        .ct-footer-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(255,255,255,0.85);
        }
        .ct-footer-key {
          border: 1px solid rgba(255,255,255,0.8);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }

        @media (max-width: 768px) {
          .ct-bar { width: 92vw; height: 52px; }
          .ct-bar-red { width: 92vw; }
          .ct-bar-outer.active .ct-bar { height: 68px; }
          .ct-bar-outer.active .ct-bar-red { height: 68px; }
          .ct-label { font-size: 15px; letter-spacing: 1.5px; }
          .ct-subtitle { font-size: 10px; }
          .ct-char { max-width: 90px; left: 70px; }
          .ct-main { padding-left: 40%; }
          .ct-role { font-size: 26px; }
          .ct-stat-num { font-size: 16px; }

          .ct-info-bar-wrap {
            left: 0;
            right: 0;
            height: 44px;
          }
          .ct-scroll-hint-below, .ct-scroll-hint-above {
            left: 0;
            right: 0;
          }
          .ct-info-bar-text { font-size: 13px; letter-spacing: 0.8px; }
          .ct-info-bar-box { font-size: 11px; padding: 0 6px; }
          .ct-info-bar-count { font-size: 13px; margin-right: 6px; }
          .ct-acc-badge { font-size: 10px; padding: 1px 5px; }

          .ct-right-nav { top: 16px; right: 10px; font-size: 18px; }
          .ct-nav-label { font-size: 14px; }
          .ct-footer { bottom: 8px; right: 8px; }
          .ct-footer-row { font-size: 10px; }
          .ct-scroll-track { right: 4px; }
          .sc-back-btn { bottom: 20px; left: 20px; font-size: 18px; }
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
        }
        .sc-back-btn:hover {
          background: #c4001a;
          transform: scale(1.1) skewX(-5deg);
        }

      `}</style>


      <div className="ct-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`ct-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onMouseEnter={() => { if (focus === "left") setActive(i); }}
          >
            <div className="ct-bar-red" />
            <div 
              className="ct-bar"
              onMouseEnter={() => { if (focus === "left") setActive(i); }}
              onClick={(e) => {
                e.stopPropagation();
                if (active !== i) {
                  setActive(i);
                  setFocus("left");
                } else if (focus === "left") {
                  setFocus("right");
                  setActiveInfoBar(0);
                  setScrollOffset(0);
                }
              }}
            >
              <img className="ct-char" src={CHARS[i]} alt="" />
              <div className="ct-bar-fill" />
              <div className="ct-bar-content">
                <div className="ct-role">{ROLES[i].text}</div>
                <div className="ct-main">
                  <div className="ct-label">{item.label}</div>
                  <div className="ct-subtitle">{item.subtitle}</div>
                </div>
                <div className="ct-stats">
                  {item.stats.map(s => (
                    <div className="ct-stat" key={s.tag}>
                      <div className="ct-stat-top">
                        <span className="ct-stat-tag" style={{ color: s.color, borderColor: s.color }}>{s.tag}</span>
                        <span className="ct-stat-num">{s.value}</span>
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
        <div className="ct-right-nav" key={active}>
          <span className="ct-arrow">◄</span>
          <span style={{ background: "#fff", border: "1px solid #000", padding: "1px 8px", fontSize: "14px", color: "#111" }}>LB</span>
          <span className="ct-nav-label">{ITEMS[active].label}</span>
          <span style={{ background: "#fff", border: "1px solid #000", padding: "1px 8px", fontSize: "14px", color: "#111" }}>RB</span>
          <span className="ct-arrow">►</span>
        </div>
      )}

      {/* Right panel: scrollable window of VISIBLE bars */}
      {(() => {
        const currentItem = ITEMS[active];
        const totalBars = currentItem.bars;
        const visibleLinks = currentItem.links.slice(scrollOffset, scrollOffset + VISIBLE);
        const thumbH = Math.round((VISIBLE / totalBars) * (VISIBLE * 55));
        const thumbTop = Math.round((scrollOffset / totalBars) * (VISIBLE * 55));
        const hasMore = totalBars > VISIBLE;
        return mounted ? (
          <>
            {hasMore && (
              <>
                <div className="ct-scroll-track">
                  <div className="ct-scroll-thumb" style={{ top: `${thumbTop}px`, height: `${thumbH}px` }} />
                </div>
                {/* More below indicator */}
                {scrollOffset + VISIBLE < totalBars && (
                  <div className="ct-scroll-hint-below" style={{ top: `${155 + VISIBLE * 55 - 38}px` }}>
                    <div className="ct-scroll-fade" />
                    <div className="ct-scroll-arrow">
                      <span>▼</span>
                      SCROLL ↓ · {totalBars - scrollOffset - VISIBLE} MORE CERT{totalBars - scrollOffset - VISIBLE > 1 ? "S" : ""}
                    </div>
                  </div>
                )}
                {/* More above indicator */}
                {scrollOffset > 0 && (
                  <div className="ct-scroll-hint-above" style={{ top: `${155}px` }}>
                    <div className="ct-scroll-arrow-top">
                      <span>▲</span>
                      {scrollOffset} MORE ABOVE
                    </div>
                    <div className="ct-scroll-fade-top" />
                  </div>
                )}
              </>
            )}
            {visibleLinks.map((link, vi) => {
              const realIdx = scrollOffset + vi;
              return (
                <div
                  className={`ct-info-bar-wrap${activeInfoBar === realIdx ? " selected" : ""}`}
                  key={`bar-${active}-${realIdx}`}
                  style={{ top: `${155 + vi * 55}px`, animationDelay: `${vi * 40}ms` }}
                  onClick={() => {
                    setActiveInfoBar(realIdx);
                    window.open(link.href, "_blank");
                  }}
                  onMouseEnter={() => setActiveInfoBar(realIdx)}
                >
                  {currentItem.newBars.includes(realIdx) && (
                    <img className="ct-info-bar-new" src={newsign} alt="" />
                  )}
                  <div className="ct-info-bar">
                    <img className="ct-info-bar-icon" src={currentItem.barIcon} alt="" />
                    <span className="ct-info-bar-text">{link.text}</span>
                    <span className="ct-acc-badge">▶ PDF</span>
                    <span className="ct-info-bar-box">{link.pillLabel}</span>
                    <span className="ct-info-bar-count">{link.pillValue}</span>
                  </div>
                </div>
              );
            })}
          </>
        ) : null;
      })()}

      <div className={`ct-footer${mounted ? " mounted" : ""}`}>
        <div className="ct-footer-row"><span className="ct-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="ct-footer-row"><span className="ct-footer-key">↵</span><span>OPEN PDF</span></div>
        <div className="ct-footer-row"><span className="ct-footer-key">ESC</span><span>BACK</span></div>
      </div>
      <div 
        className="sc-back-btn" 
        onClick={(e) => {
          e.stopPropagation();
          if (focus === "right") setFocus("left");
          else navigate('/');
        }}
      >
        <span>◄</span> BACK
      </div>
    </div>
  );
}
