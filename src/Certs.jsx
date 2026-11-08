import { useState, useEffect, useRef } from "react";
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
import arcanaCard from "./assets/card.png";
import circleRadar from "./assets/circletransition.mp4";

const CHARS = [char1, char2, char3];

const ROLES = [
  { text: "CYBER", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "DEV",   color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "STRAT", color: "#ff5577", bg: "rgba(255,85,119,0.12)", border: "rgba(255,85,119,0.5)" },
];

const ITEMS = [
  {
    id: "cyber", label: "CYBER & CLOUD", subtitle: "CRT 13 · STS VALID", barIcon: icon1, bars: 13, newBars: [0, 1],
    stats: [
      { tag: "CRT", value: "13", color: "#0077b5" },
      { tag: "STS", value: "VALID", color: "#00c853" },
    ],
    links: [
      { text: "GOOGLE: FOUNDATIONS OF CYBERSECURITY", pillLabel: "ISSUER", pillValue: "GOOGLE", href: "/certs/google.pdf" },
      { text: "COMPTIA: SECURITY+ (TRAINING COURSE)", pillLabel: "ISSUER", pillValue: "COMPTIA", href: "/resume.pdf" },
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
    id: "dev", label: "DEV & ENGINEERING", subtitle: "CRT 08 · STS VALID", barIcon: icon2, bars: 8, newBars: [0, 1],
    stats: [
      { tag: "CRT", value: "08", color: "#4a8fff" },
      { tag: "STS", value: "VALID", color: "#00c853" },
    ],
    links: [
      { text: "FREECODECAMP: INFOSEC PORT SCANNER PROJECT", pillLabel: "ISSUER", pillValue: "FCC", href: "https://github.com/X5464/InfoSec-Port-Scanner" },
      { text: "IIT MADRAS: PYTHON FOR BEGINNERS", pillLabel: "ISSUER", pillValue: "IIT MADRAS", href: "/certs/iit.pdf" },
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
  const [selectedCert, setSelectedCert] = useState(null);
  const navigate = useNavigate();
  const inCertPanelRef = useRef(false);
  const lastDragPosRef = useRef({ x: 0, y: 0 });
  const edgeScrollTimerRef = useRef(null);
  const activeCategoryRef = useRef(active);
  const scrollOffsetRef = useRef(scrollOffset);
  const panelRef = useRef(null);

  useEffect(() => {
    activeCategoryRef.current = active;
  }, [active]);

  useEffect(() => {
    scrollOffsetRef.current = scrollOffset;
  }, [scrollOffset]);

  const stepCertSelection = (delta) => {
    const barCount = ITEMS[activeCategoryRef.current].bars;
    const maxOff = Math.max(0, barCount - VISIBLE);
    setFocus("right");
    setActiveInfoBar((prev) => {
      const next = Math.max(0, Math.min(barCount - 1, prev + delta));
      setScrollOffset((off) => {
        if (delta > 0 && next >= off + VISIBLE - 1) {
          return Math.min(maxOff, next - (VISIBLE - 2));
        }
        if (delta < 0 && next <= off) {
          return Math.max(0, next - 1);
        }
        if (next < off) return next;
        if (next >= off + VISIBLE) return Math.min(maxOff, next - VISIBLE + 1);
        return off;
      });
      return next;
    });
  };

  const openCert = (link, categoryLabel) => {
    if (link.href && link.href.startsWith("http")) {
      window.open(link.href, "_blank");
      return;
    }
    setSelectedCert({ ...link, category: categoryLabel });
  };

  const selectCategory = (nextIdxOrUpdater) => {
    setActive(nextIdxOrUpdater);
    setScrollOffset(0);
    setActiveInfoBar(0);
  };

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (selectedCert) {
        if (e.key === "Escape" || e.key === "Backspace" || e.key === "Enter") {
          setSelectedCert(null);
        }
        return;
      }
      if (focus === "left") {
        if (e.key === "ArrowUp") selectCategory(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") selectCategory(i => Math.min(ITEMS.length - 1, i + 1));
        if (e.key === "ArrowRight") { setFocus("right"); setActiveInfoBar(0); setScrollOffset(0); }
        if (e.key === "Enter") openCert(ITEMS[active].links[0], ITEMS[active].label);
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
        if (e.key === "Enter") openCert(ITEMS[active].links[activeInfoBar], ITEMS[active].label);
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
      const isRightSide = e.clientX > window.innerWidth * 0.54;
      if (isRightSide || focus === "right") {
        setFocus("right");
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
        setFocus("left");
        if (e.deltaY > 0) selectCategory(i => Math.min(ITEMS.length - 1, i + 1));
        else if (e.deltaY < 0) selectCategory(i => Math.max(0, i - 1));
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });

    const clearEdgeScroll = () => {
      if (edgeScrollTimerRef.current) {
        clearInterval(edgeScrollTimerRef.current);
        edgeScrollTimerRef.current = null;
      }
    };

    const handleFingerAt = (clientX, clientY, isStart) => {
      const hit = document.elementFromPoint(clientX, clientY);
      const hitCategoryBar = hit ? hit.closest(".ct-bar-outer") : null;
      const hitPanelEl = hit ? hit.closest(".ct-info-panel-container") : null;

      // If finger touches a left Category bar, exit cert panel drag mode so Category bar selects immediately
      if (hitCategoryBar) {
        inCertPanelRef.current = false;
        clearEdgeScroll();
        return;
      }

      const panelEl = hitPanelEl || (inCertPanelRef.current ? panelRef.current : null);
      if (!panelEl) {
        inCertPanelRef.current = false;
        clearEdgeScroll();
        return;
      }

      const isRotated =
        document.body.classList.contains("pc-stage-mode") &&
        window.innerWidth < window.innerHeight;
      const barEl = hit ? hit.closest(".ct-info-bar-wrap[data-cert-idx]") : null;

      // Just entered the Certificates panel (either via direct touchstart or sliding in from left category bars)
      if (isStart || !inCertPanelRef.current) {
        inCertPanelRef.current = true;
        lastDragPosRef.current = { x: clientX, y: clientY };
        setFocus("right");
        if (barEl && barEl.dataset.certIdx !== undefined) {
          const idx = Number(barEl.dataset.certIdx);
          if (!Number.isNaN(idx)) {
            setActiveInfoBar(idx);
          }
        } else {
          const rect = panelEl.getBoundingClientRect();
          const relPos = isRotated
            ? (rect.right - clientX) / Math.max(1, rect.width)
            : (clientY - rect.top) / Math.max(1, rect.height);
          const slot = Math.max(0, Math.min(VISIBLE - 1, Math.floor(relPos * VISIBLE)));
          const maxIdx = ITEMS[activeCategoryRef.current].bars - 1;
          setActiveInfoBar(Math.min(maxIdx, scrollOffsetRef.current + slot));
        }
        return;
      }

      // Continuous vertical drag inside the Certificates panel:
      // Dragging finger downwards (visualDy > 0) selects next certificates & scrolls down;
      // Dragging finger upwards (visualDy < 0) selects previous certificates & scrolls up.
      const rawDx = clientX - lastDragPosRef.current.x;
      const rawDy = clientY - lastDragPosRef.current.y;
      const visualDy = isRotated ? -rawDx : rawDy;

      const STEP_PX = 18;
      if (Math.abs(visualDy) >= STEP_PX) {
        const steps = Math.trunc(visualDy / STEP_PX);
        stepCertSelection(steps);
        if (isRotated) {
          lastDragPosRef.current.x -= steps * STEP_PX;
          lastDragPosRef.current.y = clientY;
        } else {
          lastDragPosRef.current.y += steps * STEP_PX;
          lastDragPosRef.current.x = clientX;
        }
      }

      // Edge auto-scroll when holding finger at the bottom or top of the certificate list
      const rect = panelEl.getBoundingClientRect();
      const relY = isRotated
        ? (rect.right - clientX) / Math.max(1, rect.width)
        : (clientY - rect.top) / Math.max(1, rect.height);

      if (relY > 0.82) {
        if (!edgeScrollTimerRef.current) {
          edgeScrollTimerRef.current = setInterval(() => stepCertSelection(1), 155);
        }
      } else if (relY < 0.16) {
        if (!edgeScrollTimerRef.current) {
          edgeScrollTimerRef.current = setInterval(() => stepCertSelection(-1), 155);
        }
      } else {
        clearEdgeScroll();
      }
    };

    const onWindowTouchStart = (e) => {
      if (!e.touches || e.touches.length !== 1) return;
      handleFingerAt(e.touches[0].clientX, e.touches[0].clientY, true);
    };

    const onWindowTouchMove = (e) => {
      if (!e.touches || e.touches.length !== 1) return;
      handleFingerAt(e.touches[0].clientX, e.touches[0].clientY, false);
    };

    const onWindowTouchEnd = () => {
      inCertPanelRef.current = false;
      clearEdgeScroll();
    };

    window.addEventListener("touchstart", onWindowTouchStart, { passive: true });
    window.addEventListener("touchmove", onWindowTouchMove, { passive: true });
    window.addEventListener("touchend", onWindowTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onWindowTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onWindowTouchStart);
      window.removeEventListener("touchmove", onWindowTouchMove);
      window.removeEventListener("touchend", onWindowTouchEnd);
      window.removeEventListener("touchcancel", onWindowTouchEnd);
      clearEdgeScroll();
    };
  }, [active, navigate, focus, activeInfoBar, selectedCert]);

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
        disablePictureInPicture
        controlsList="nodownload"
        onCanPlay={(e) => e.currentTarget.play()}
      />
      <style>{`
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
          transition: opacity 0.3s ease;
        }
        .ct-root.dimmed { opacity: 0.94; }


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
          width: 52cqw;
          height: 64px;
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          background: #111;
          cursor: pointer;
          pointer-events: all;
          touch-action: manipulation;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65);
        }
        .ct-bar-red {
          position: absolute;
          top: 0; left: 0;
          width: 52cqw;
          height: 64px;
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px);
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 0;
          pointer-events: all;
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
          pointer-events: all;
        }
        .ct-bar-content {
          position: relative;
          z-index: 4;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 18px 0 14px;
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
          padding: 0 10px 0 4px;
        }
        .ct-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          padding-left: 112px;
        }
        .ct-char {
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
        .ct-info-panel-container {
          position: fixed;
          top: 155px;
          left: 62%;
          right: 0;
          bottom: 50px;
          z-index: 50;
          pointer-events: all;
        }
        .ct-info-bar-wrap {
          position: absolute;
          right: 0;
          left: 0;
          height: 46px;
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
          background: rgba(255, 255, 255, 0.86);
          border-radius: 7px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.22);
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .ct-info-bar-wrap.selected .ct-info-bar {
          background: #fff;
          border-radius: 7px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.45);
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
          pointer-events: all;
        }
        .ct-info-bar-new {
          position: absolute;
          left: -40px; bottom: 0;
          height: 65%; width: auto;
          pointer-events: all; z-index: 3;
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
          display: flex; align-items: center; gap: 8px;
          pointer-events: all; z-index: 50;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 3px;
          color: #fff;
          background: rgba(8, 16, 46, 0.84);
          border: 1px solid rgba(142, 245, 255, 0.38);
          padding: 6px 14px;
          clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          box-shadow: 6px 6px 0 #c4001a;
        }
        .ct-nav-arcana {
          width: 24px;
          height: 34px;
          object-fit: cover;
          border-radius: 2px;
          border: 1px solid #8ef5ff;
          flex-shrink: 0;
        }
        .ct-nav-radar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid #8ef5ff;
          flex-shrink: 0;
        }
        .ct-nav-label { color: #fff; padding: 0 6px; font-size: 24px; }
        .ct-arrow { color: #c4001a; display: inline-block; }

        .ct-scroll-track {
          position: absolute;
          right: 10px;
          top: 0;
          width: 3px;
          height: ${VISIBLE * 52}px;
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
          position: absolute;
          left: 0;
          right: 16px;
          pointer-events: all;
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
          position: absolute;
          left: 0;
          right: 16px;
          pointer-events: all;
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
          body:not(.pc-stage-mode) .ct-root {
            justify-content: flex-start;
            padding-top: 46px;
            gap: 5px;
          }
          body:not(.pc-stage-mode) .ct-root.dimmed {
            opacity: 1;
          }
          body:not(.pc-stage-mode) .ct-bar { width: 95cqw; height: 48px; }
          body:not(.pc-stage-mode) .ct-bar-red { width: 95cqw; height: 48px; }
          body:not(.pc-stage-mode) .ct-bar-outer.active .ct-bar { height: 58px; }
          body:not(.pc-stage-mode) .ct-bar-outer.active .ct-bar-red { height: 58px; }
          body:not(.pc-stage-mode) .ct-bar-content { padding: 0 12px 0 8px; }
          body:not(.pc-stage-mode) .ct-role { font-size: 26px; padding: 0 4px 0 2px; }
          body:not(.pc-stage-mode) .ct-char { width: 82px; max-width: 82px; left: 54px; object-position: 18% center; }
          body:not(.pc-stage-mode) .ct-main { padding-left: 72px; align-items: flex-start; }
          body:not(.pc-stage-mode) .ct-label { font-size: 16px; letter-spacing: 1.5px; }
          body:not(.pc-stage-mode) .ct-subtitle { font-size: 10px; }
          body:not(.pc-stage-mode) .ct-stats { padding-right: 6px; gap: 6px; }
          body:not(.pc-stage-mode) .ct-stat-num { font-size: 15px; }

          body:not(.pc-stage-mode) .ct-right-nav {
            top: 212px;
            left: 3%;
            right: 3%;
            justify-content: center;
            background: rgba(8, 16, 46, 0.88);
            border: 1px solid rgba(142, 245, 255, 0.35);
            border-radius: 6px;
            padding: 3px 10px;
            font-size: 16px;
            box-shadow: 4px 4px 0 #c4001a;
          }
          body:not(.pc-stage-mode) .ct-nav-arcana { width: 18px; height: 26px; }
          body:not(.pc-stage-mode) .ct-nav-radar { width: 24px; height: 24px; }
          body:not(.pc-stage-mode) .ct-nav-label { font-size: 16px; color: #fff; }

          body:not(.pc-stage-mode) .ct-info-panel-container {
            top: 254px;
            left: 3%;
            right: 3%;
            bottom: 58px;
          }
          body:not(.pc-stage-mode) .ct-info-bar-wrap {
            left: 0;
            right: 12px;
            height: 44px;
          }
          body:not(.pc-stage-mode) .ct-info-bar-new { left: -12px; height: 50%; }
          body:not(.pc-stage-mode) .ct-scroll-hint-below,
          body:not(.pc-stage-mode) .ct-scroll-hint-above {
            left: 0;
            right: 12px;
          }
          body:not(.pc-stage-mode) .ct-info-bar-text { font-size: 12.5px; letter-spacing: 0.8px; }
          body:not(.pc-stage-mode) .ct-info-bar-box { font-size: 10.5px; padding: 0 6px; }
          body:not(.pc-stage-mode) .ct-info-bar-count { font-size: 12.5px; margin-right: 6px; }
          body:not(.pc-stage-mode) .ct-acc-badge { font-size: 10px; padding: 1px 5px; }

          body:not(.pc-stage-mode) .ct-footer { bottom: 8px; right: 8px; }
          body:not(.pc-stage-mode) .ct-footer-row { font-size: 10px; }
          body:not(.pc-stage-mode) .ct-scroll-track { right: 2px; }
          body:not(.pc-stage-mode) .sc-back-btn { bottom: 12px; left: 14px; font-size: 18px; }
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


      <div className="ct-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`ct-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            data-p3-hover="true"
            ref={(el) => {
              if (el) {
                el.__p3Hover = () => {
                  if (active !== i) selectCategory(i);
                  setFocus("left");
                };
              }
            }}
            onMouseEnter={() => { if (active !== i) selectCategory(i); setFocus("left"); }}
          >
            <div className="ct-bar-red" />
            <div 
              className="ct-bar"
              onMouseEnter={() => { if (active !== i) selectCategory(i); setFocus("left"); }}
              onClick={(e) => {
                e.stopPropagation();
                if (active !== i) {
                  selectCategory(i);
                } else {
                  setFocus("right");
                  setActiveInfoBar(0);
                  setScrollOffset(0);
                }
              }}
            >
              <img className="ct-char" src={CHARS[i]} width="220" height="135" decoding="async" alt="" />
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
          <button
            type="button"
            style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              selectCategory((i) => (i - 1 + ITEMS.length) % ITEMS.length);
            }}
          >
            <span className="ct-arrow">◄</span>
            <span style={{ background: "#fff", border: "1px solid #000", padding: "1px 8px", fontSize: "14px", color: "#111" }}>LB</span>
          </button>
          <span className="ct-nav-label">{ITEMS[active].label}</span>
          <img className="ct-nav-arcana" src={arcanaCard} width="24" height="34" decoding="async" alt="" />
          <button
            type="button"
            style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              selectCategory((i) => (i + 1) % ITEMS.length);
            }}
          >
            <span style={{ background: "#fff", border: "1px solid #000", padding: "1px 8px", fontSize: "14px", color: "#111" }}>RB</span>
            <span className="ct-arrow">►</span>
          </button>
        </div>
      )}

      {/* Right panel: scrollable window of VISIBLE bars */}
      {(() => {
        const currentItem = ITEMS[active];
        const totalBars = currentItem.bars;
        const visibleLinks = currentItem.links.slice(scrollOffset, scrollOffset + VISIBLE);
        const thumbH = Math.round((VISIBLE / totalBars) * (VISIBLE * 52));
        const thumbTop = Math.round((scrollOffset / totalBars) * (VISIBLE * 52));
        const hasMore = totalBars > VISIBLE;

        const scrollByStep = (dir) => {
          setFocus("right");
          if (dir > 0) {
            setScrollOffset((off) => Math.min(Math.max(0, totalBars - VISIBLE), off + 1));
            setActiveInfoBar((prev) => Math.min(totalBars - 1, prev + 1));
          } else {
            setScrollOffset((off) => Math.max(0, off - 1));
            setActiveInfoBar((prev) => Math.max(0, prev - 1));
          }
        };

        return mounted ? (
          <div className="ct-info-panel-container" ref={panelRef}>
            {hasMore && (

              <>
                <div className="ct-scroll-track">
                  <div className="ct-scroll-thumb" style={{ top: `${thumbTop}px`, height: `${thumbH}px` }} />
                </div>
                {/* More below indicator */}
                {scrollOffset + VISIBLE < totalBars && (
                  <div
                    className="ct-scroll-hint-below"
                    style={{ top: `${VISIBLE * 52 - 34}px`, cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollByStep(1);
                    }}
                  >
                    <div className="ct-scroll-fade" />
                    <div className="ct-scroll-arrow">
                      <span>▼</span>
                      SCROLL ↓ · {totalBars - scrollOffset - VISIBLE} MORE CERT{totalBars - scrollOffset - VISIBLE > 1 ? "S" : ""}
                    </div>
                  </div>
                )}
                {/* More above indicator */}
                {scrollOffset > 0 && (
                  <div
                    className="ct-scroll-hint-above"
                    style={{ top: `0px`, cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollByStep(-1);
                    }}
                  >
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
                  data-p3-hover="true"
                  data-cert-idx={realIdx}
                  ref={(el) => {
                    if (el) {
                      el.__p3Hover = () => {
                        setFocus("right");
                        setActiveInfoBar(realIdx);
                      };
                    }
                  }}
                  style={{ top: `${vi * 52}px`, animationDelay: `${vi * 40}ms` }}
                  onClick={() => {
                    setFocus("right");
                    setActiveInfoBar(realIdx);
                    openCert(link, currentItem.label);
                  }}
                  onMouseEnter={() => { setFocus("right"); setActiveInfoBar(realIdx); }}
                >
                  {currentItem.newBars.includes(realIdx) && (
                    <img className="ct-info-bar-new" src={newsign} width="100" height="100" decoding="async" alt="" />
                  )}
                  <div className="ct-info-bar">
                    <img className="ct-info-bar-icon" src={currentItem.barIcon} width="48" height="28" decoding="async" alt="" />
                    <span className="ct-info-bar-text">{link.text}</span>
                    <span className="ct-acc-badge">▶ VIEW</span>
                    <span className="ct-info-bar-box">{link.pillLabel}</span>
                    <span className="ct-info-bar-count">{link.pillValue}</span>
                  </div>
                </div>
              );
            })}
            </div>
        ) : null;
      })()}

      {selectedCert && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            background: "rgba(0, 4, 24, 0.82)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            pointerEvents: "all",
          }}
          onClick={() => setSelectedCert(null)}
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              width: "min(520px, 92%)",
              background: "linear-gradient(180deg, #0d1958 0%, #060d38 100%)",
              border: "1px solid rgba(142, 245, 255, 0.35)",
              boxShadow: "0 0 0 3px #c4001a, 14px 14px 0 rgba(0,0,0,0.65)",
              transform: "skewX(-3deg)",
              padding: "22px 24px",
              color: "#fff",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={circleRadar}
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.28,
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Bebas Neue', sans-serif", fontSize: "16px", letterSpacing: "2.5px", color: "#8ef5ff", background: "rgba(142,245,255,0.12)", padding: "3px 10px" }}>
                <img src={arcanaCard} width="18" height="25" decoding="async" alt="" style={{ borderRadius: "2px" }} />
                {selectedCert.category} · CREDENTIAL RECORD
              </span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "15px", letterSpacing: "2px", background: "#00c853", color: "#041238", padding: "2px 10px", fontWeight: 700 }}>
                STATUS: VERIFIED
              </span>
            </div>
            <div style={{ position: "relative", zIndex: 2, fontFamily: "'Anton', sans-serif", fontSize: "28px", lineHeight: 1.1, letterSpacing: "1px", color: "#fff", marginBottom: "10px" }}>
              {selectedCert.text}
            </div>
            <div style={{ position: "relative", zIndex: 2, fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", letterSpacing: "1.5px", color: "#9cf7ff", marginBottom: "18px" }}>
              ISSUING AUTHORITY: <span style={{ color: "#fff" }}>{selectedCert.pillValue}</span> · HOLDER: <span style={{ color: "#fff" }}>RAJARSHI CHAKRABORTY</span>
            </div>
            <div style={{ position: "relative", zIndex: 2, display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <a
                href="https://www.linkedin.com/in/rajarshi-cybersecurity/details/certifications/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  minWidth: "170px",
                  textAlign: "center",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "20px",
                  letterSpacing: "2px",
                  color: "#fff",
                  background: "#c4001a",
                  padding: "9px 14px",
                  textDecoration: "none",
                  clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
                }}
              >
                ▶ VERIFY ON LINKEDIN
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  minWidth: "150px",
                  textAlign: "center",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "20px",
                  letterSpacing: "2px",
                  color: "#06133b",
                  background: "#8ef5ff",
                  padding: "9px 14px",
                  textDecoration: "none",
                  clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
                }}
              >
                ▶ VIEW RESUME PDF
              </a>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "20px",
                  letterSpacing: "2px",
                  color: "#fff",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  padding: "9px 18px",
                  cursor: "pointer",
                }}
              >
                ✕ CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`ct-footer${mounted ? " mounted" : ""}`}>
        <div className="ct-footer-row"><span className="ct-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="ct-footer-row"><span className="ct-footer-key">↵</span><span>VIEW</span></div>
        <div className="ct-footer-row"><span className="ct-footer-key">ESC</span><span>BACK</span></div>
      </div>
      <div 
        className="sc-back-btn" 
        onClick={(e) => {
          e.stopPropagation();
          if (selectedCert) setSelectedCert(null);
          else navigate('/');
        }}
      >
        <span>◄</span> BACK
      </div>
    </div>
  );
}
