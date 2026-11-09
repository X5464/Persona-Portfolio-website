import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import main2 from "./assets/main2.mp4";
import main2Poster from "./assets/main2_poster.jpg";
import arcanaCard from "./assets/card.png";
import heroIcon from "./assets/hero.png";
import SmartVideo from "./SmartVideo";

const ITEMS = [
  { id: "i", badge: "I", title: "EDUCATION", subtitle: "ACADEMIC / THEORETICAL BASE", rank: 1 },
  { id: "ii", badge: "II", title: "SKILLS", subtitle: "OFFENSIVE / DEFENSIVE ARSENAL", rank: 2 },
  { id: "iii", badge: "III", title: "PROJECTS", subtitle: "DEPLOYED ARCHITECTURE", rank: 3 },
  { id: "iv", badge: "IV", title: "EXPERIENCE", subtitle: "FIELD OPERATIONS", rank: 4 },
];

const PANEL_CONTENT = [
  {
    index: "01",
    title: "EDUCATION LOG",
    progress: "3/4",
    rows: [
      { index: "01", title: "Jain University: BCA Cybersecurity : 9.08/10.0 SGPA (Sem 4) | Overall CGPA: 8.04/10", status: "IN PROGRESS" },
      { index: "02", title: "IIT Mandi: CSE & Adv. Tech Minor (2024 - 2025)", status: "COMPLETED" },
      { index: "03", title: "HM Education Centre: Class 12 CBSE : 70.20%", status: "COMPLETED" },
      { index: "04", title: "HINDMOTOR HIGH SCHOOL (KG1 to class 10)", status: "COMPLETED" },
    ],
    details: [
      "* Achieving a 9.08/10.0 SGPA in Semester 4 and Overall CGPA 8.04/10 (2024 - 2027) while balancing dual-enrollment coursework.",
      "* Merging core computer science fundamentals with hands-on offensive security, digital forensics, and threat intelligence.",
      "* Actively engaged as a Core Team Member (Social Media & Content) in the AWS Cloud Club at Jain University."
    ]
  },
  {
    index: "02",
    title: "SKILLS ARSENAL",
    progress: "5/5",
    rows: [
      { index: "01", title: "Security Domains (PenTesting, Forensics, OSINT, CTI, CVE Triage)", status: "MASTERED" },
      { index: "02", title: "Offensive Tools (Nmap, Metasploit, Burp Suite, Kali, SleuthKit, Tor OpSec)", status: "MASTERED" },
      { index: "03", title: "Forensics & Threat Intel (Wireshark, SIEM, VirusTotal v3, AbuseIPDB v2)", status: "ACTIVE" },
      { index: "04", title: "AI & AR Engineering (PyTorch, SignDETR, MediaPipe 3D, WebGL, Gemini AI)", status: "ACTIVE" },
      { index: "05", title: "Full-Stack & Cloud (Python, Flask, React 18, TypeScript, Node, MongoDB, AWS)", status: "EQUIPPED" }
    ],
    details: [
      "* Hands-on expertise in Network Log Analysis, Vulnerability Assessment, Phishing Simulation, and Legal Chain-of-Custody Audit Logging.",
      "* Builds custom Python & TypeScript security suites: 18-tool LEA OSINT consoles, TCP port scanners, CT-log subdomain finders, AES-256 PDF crackers, and on-device PyTorch/WebGL AI systems.",
      "* Experienced in real-time CTI dashboards (60+ VirusTotal engines & AbuseIPDB), Fernet encrypted vaults, and live digital forensics."
    ]
  },
  {
    index: "03",
    title: "PROJECTS DEPLOYED",
    progress: "8/8",
    rows: [
      { index: "01", title: "SENTINEL AI (Enterprise AI Scam Defense & CTI Engine — 51+ Patterns)", status: "▶ REPO / LIVE", href: "https://github.com/X5464/sentinel-ai" },
      { index: "02", title: "ARGUS OSINT (18-Tool LEA OSINT & Forensics Suite + Tor OpSec)", status: "▶ REPO", href: "https://github.com/X5464/argus-osint" },
      { index: "03", title: "ML SIGN LANGUAGE (On-Device SignDETR + Deep ISL 3D AR HUD)", status: "▶ REPO", href: "https://github.com/X5464/ml-sign-lang" },
      { index: "04", title: "SPIDERWEB (Full-Stack 6-Tool Offensive Cybersecurity Suite)", status: "▶ REPO", href: "https://github.com/X5464/Spiderweb" },
      { index: "05", title: "CTI DASHBOARD (VirusTotal 60+ Engines & AbuseIPDB Threat Portal)", status: "▶ REPO / LIVE", href: "https://github.com/X5464/Cti-dashboard" },
      { index: "06", title: "FLORAL AURA & INVISIBILITY CLOAK (60FPS WebGL + MediaPipe 3D AR)", status: "▶ REPO / LIVE", href: "https://github.com/X5464/floral-aura" },
      { index: "07", title: "IC-POKEMON-GAME (Gamified Indian Constitution AI RPG)", status: "▶ REPO", href: "https://github.com/X5464/IC-pokemon-game" },
      { index: "08", title: "VARS AGRI NOVA (IoT Hardware + Sarvam API — 1st & 3rd Place Winner)", status: "AWARD WINNER" }
    ],
    details: [
      "* Sentinel AI (sentinel-ai-lilac.vercel.app) & CTI Dashboard (cti-dashboard-frontend.onrender.com): Real-time 51+ pattern scam defense, VirusTotal v3 (60+ engines) & AbuseIPDB v2 threat hunting.",
      "* ARGUS OSINT & Spiderweb: 18-tool LEA OSINT/SleuthKit forensics suite with Tor routing & Fernet vault + 6-tool React/Flask security toolkit (TCP Scanner, Subdomain CT-Log, AES-256 PDF & Hash Cracker).",
      "* AI & WebGL AR: Sub-30ms PyTorch SignDETR + 5-Layer Deep ISL 3D Holographic HUD (ml-sign-lang), 60FPS WebGL + MediaPipe AR Studio (floral-aura.vercel.app), & Gemini AI RPG (IC-pokemon-game)."
    ]
  },
  {
    index: "04",
    title: "FIELD EXPERIENCE",
    progress: "7/7",
    rows: [
      { index: "01", title: "Amroha District Police, UP Govt (Cyber Security Police Intern - APCSIP '26)", status: "COMPLETE" },
      { index: "02", title: "InLighnX Global (Penetration Testing Intern - Offensive Security)", status: "COMPLETE" },
      { index: "03", title: "Elevate Labs (Cyber Security Intern - 50+ Host Audits & CTI)", status: "COMPLETE" },
      { index: "04", title: "Forage: AIG, Mastercard, Tata, Deloitte (Security Analyst Sims)", status: "COMPLETE" },
      { index: "05", title: "Teachnook / IIT Roorkee Cognizance '24 (Cyber Security Intern)", status: "COMPLETE" },
      { index: "06", title: "Eduversity / Wipro DICE ID (Cyber Security Intern - LOR Awarded)", status: "COMPLETE" },
      { index: "07", title: "AWS Cloud Club, Jain University (Core Team: Social Media & Content)", status: "ACTIVE" }
    ],
    details: [
      "* Selected from 10,000+ national applicants for UP Police APCSIP 2026; performed live digital forensics & network log analysis on active cybercrime cases.",
      "* Engineered a unified 6-tool offensive platform (InLighnX), audited 50+ hosts & deployed CTI dashboards (Elevate Labs), and earned an Academic Head LOR (Eduversity)."
    ]
  }
];

export default function ResumePage({ src = main2, poster = main2Poster }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [activeRow, setActiveRow] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "ArrowLeft") navigate('/');
      if (e.key === "Escape" || e.key === "Backspace") navigate('/');
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen" style={{ background: "#0047FF" }}>
      <SmartVideo
        className="resume-bg-video"
        src={src}
        poster={poster}
      />
      <style>{`
        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: all;
        }

        .resume-stack {
          position: absolute;
          top: 9%;
          left: 2.8%;
          width: min(47%, 720px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: all;
          transform: scale(0.9);
          transform-origin: top left;
        }

        .resume-cards-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .resume-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 92px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .resume-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-download-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 1.5px;
          color: #f6fbff;
          text-decoration: none;
          padding: 6px 18px;
          margin-bottom: 12px;
          background: #c4001a;
          clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0% 100%);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.2), 6px 6px 0 rgba(0,0,0,0.4);
          transition: transform 0.2s ease, background 0.2s ease;
          opacity: 0;
          transform: translateX(20px);
          pointer-events: all;
        }
        .resume-download-btn.mounted {
          opacity: 1;
          transform: translateX(0);
          transition: opacity 0.4s ease 0.1s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.1s;
        }
        .resume-download-btn:hover {
          background: #e03d31;
          transform: translateX(0) translateY(-2px);
        }

        .resume-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
          touch-action: none;
        }
        .resume-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card {
          position: relative;
          height: 112px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }

        .resume-card-inner {
          position: absolute;
          inset: 0;
          padding: 14px 22px 14px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .resume-badge {
          position: absolute;
          top: 10px;
          left: -10px;
          width: 56px;
          height: 70px;
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
          z-index: 2;
        }
        .resume-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #d2fdff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge {
          background: #000;
          border-color: #000;
        }
        .resume-card-wrap.active .resume-badge-text {
          color: #fff;
        }

        .resume-title {
          font-family: 'Anton', sans-serif;
          font-size: 56px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-title {
          color: #000;
        }

        .resume-rank {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .resume-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: 70px;
          line-height: 0.82;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-rank-label,
        .resume-card-wrap.active .resume-rank-number {
          color: #000;
        }

        .resume-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 12px;
          height: 34px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar {
          background: #000;
        }

        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          line-height: 1;
          letter-spacing: 1px;
          color: #041238;
          transition: color 0.22s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .resume-card-wrap.active .resume-subtitle {
          color: #fff;
        }

        .resume-detail-panel {
          position: absolute;
          top: 7%;
          right: 4%;
          width: min(42%, 650px);
          min-height: 74%;
          max-height: 87%;
          z-index: 12;
          padding: 18px 22px 20px 22px;
          background: linear-gradient(180deg, rgba(10, 22, 86, 0.86) 0%, rgba(5, 11, 50, 0.90) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.22),
            16px 16px 0 rgba(0, 6, 30, 0.45);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          touch-action: none;
          scrollbar-width: none;
        }
        .resume-detail-panel::-webkit-scrollbar {
          display: none;
        }
        .resume-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(133, 244, 255, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }
        .resume-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: auto 56px 1fr auto;
          align-items: center;
          gap: 10px;
          min-height: 76px;
          padding: 0 16px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }
        .resume-arcana-card {
          width: 34px;
          height: 48px;
          object-fit: cover;
          border-radius: 3px;
          border: 1.5px solid #08153f;
          box-shadow: 2px 2px 0 rgba(8, 21, 63, 0.5);
        }
        .resume-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 1;
        }
        .resume-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 38px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .resume-detail-top-progress {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 38px;
          letter-spacing: 2px;
          line-height: 1;
        }
        .resume-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 14px;
        }
        @keyframes resume-row-in {
          from { opacity: 0; transform: translateX(28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .resume-detail-row {
          display: grid;
          grid-template-columns: 44px 1fr auto;
          align-items: center;
          gap: 12px;
          min-height: 46px;
          padding: 6px 14px;
          background: rgba(6, 14, 58, 0.72);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.16);
          transition: transform 0.16s ease, background 0.16s ease;
          animation: resume-row-in 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
          touch-action: none;
        }
        .resume-detail-row.clickable {
          cursor: pointer;
          touch-action: none;
        }
        .resume-detail-row.clickable .resume-detail-status {
          background: #c4001a;
          color: #fff;
        }
        .resume-detail-row:hover,
        .resume-detail-row.selected {
          transform: translateX(6px);
          background: rgba(16, 38, 128, 0.95);
          box-shadow: inset 3px 0 0 #c4001a, inset 0 0 0 1px rgba(142, 245, 255, 0.55);
        }
        .resume-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 1px;
          color: #94f4ff;
        }
        .resume-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: 18px;
          line-height: 1.15;
          letter-spacing: 0.5px;
          color: #f2fcff;
        }
        .resume-detail-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #06133b;
          background: #8df6ff;
          padding: 5px 10px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
          white-space: nowrap;
        }
        .resume-detail-bottom {
          position: relative;
          margin-top: 16px;
          padding: 14px 16px;
          background: rgba(5, 13, 57, 0.76);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.16);
        }
        .resume-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 10px;
        }
        .resume-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .resume-detail-bullet {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          line-height: 1.25;
          letter-spacing: 1px;
          color: #edfaff;
        }

        /* Portrait Mobile Stacked Layout (when not in rotated PC stage mode) */
        @media (max-width: 768px) {
          body:not(.pc-stage-mode) .resume-stack {
            top: 38px;
            left: 3.5%;
            width: 93%;
            transform: none;
            gap: 4px;
            z-index: 15;
          }
          body:not(.pc-stage-mode) .resume-list-tag {
            font-size: 32px;
            margin: 0 0 2px 4px;
          }
          body:not(.pc-stage-mode) .resume-download-btn {
            font-size: 14px;
            padding: 4px 12px;
            margin-bottom: 2px;
          }
          body:not(.pc-stage-mode) .resume-cards-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px;
          }
          body:not(.pc-stage-mode) .resume-card {
            height: 50px;
            box-shadow: 0 4px 0 rgba(5, 13, 59, 0.85);
          }
          body:not(.pc-stage-mode) .resume-card-wrap.active .resume-card {
            box-shadow: 4px 4px 0 #d63232;
            transform: translateX(2px);
          }
          body:not(.pc-stage-mode) .resume-badge {
            top: 4px;
            left: -4px;
            width: 26px;
            height: 32px;
            border-width: 2px;
          }
          body:not(.pc-stage-mode) .resume-badge-text {
            font-size: 16px;
          }
          body:not(.pc-stage-mode) .resume-card-inner {
            padding: 5px 8px 5px 28px;
          }
          body:not(.pc-stage-mode) .resume-title {
            font-size: 18px;
            letter-spacing: 0.5px;
          }
          body:not(.pc-stage-mode) .resume-rank {
            gap: 3px;
          }
          body:not(.pc-stage-mode) .resume-rank-label {
            font-size: 11px;
          }
          body:not(.pc-stage-mode) .resume-rank-number {
            font-size: 22px;
          }
          body:not(.pc-stage-mode) .resume-subtitle-bar {
            left: 28px;
            right: 6px;
            bottom: 4px;
            height: 15px;
            padding: 0 6px;
          }
          body:not(.pc-stage-mode) .resume-subtitle {
            font-size: 10px;
          }
          body:not(.pc-stage-mode) .resume-detail-panel {
            top: 192px;
            left: 3.5%;
            right: 3.5%;
            width: 93%;
            min-height: 0;
            max-height: calc(100% - 238px);
            padding: 10px 12px 12px 12px;
            clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          }
          body:not(.pc-stage-mode) .resume-detail-top {
            grid-template-columns: auto 30px 1fr auto;
            min-height: 42px;
            padding: 0 10px;
            gap: 8px;
          }
          body:not(.pc-stage-mode) .resume-arcana-card {
            width: 22px;
            height: 30px;
          }
          body:not(.pc-stage-mode) .resume-detail-top-index { font-size: 24px; }
          body:not(.pc-stage-mode) .resume-detail-top-title { font-size: 20px; }
          body:not(.pc-stage-mode) .resume-detail-top-progress { font-size: 22px; }
          body:not(.pc-stage-mode) .resume-detail-list {
            gap: 5px;
            margin-top: 8px;
          }
          body:not(.pc-stage-mode) .resume-detail-row {
            grid-template-columns: 24px 1fr auto;
            gap: 6px;
            padding: 5px 8px;
            min-height: 36px;
          }
          body:not(.pc-stage-mode) .resume-detail-row-title { font-size: 12px; line-height: 1.15; }
          body:not(.pc-stage-mode) .resume-detail-row-index { font-size: 15px; }
          body:not(.pc-stage-mode) .resume-detail-status { font-size: 10px; padding: 3px 6px; letter-spacing: 0.5px; }
          body:not(.pc-stage-mode) .resume-detail-bottom { margin-top: 8px; padding: 8px 10px; }
          body:not(.pc-stage-mode) .resume-detail-bottom-title { font-size: 18px; margin-bottom: 4px; }
          body:not(.pc-stage-mode) .resume-detail-bullets { gap: 4px; }
          body:not(.pc-stage-mode) .resume-detail-bullet { font-size: 13px; }
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



      <div className="resume-overlay">
        <div className="resume-stack">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingRight: '12px' }}>
            <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>LIST</div>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`resume-download-btn${mounted ? " mounted" : ""}`}
            >
              DOWNLOAD RESUME
            </a>
          </div>
          <div className="resume-cards-grid">
            {ITEMS.map((item, index) => (
              <div
                key={item.id}
                className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
                data-p3-hover="true"
                ref={(el) => {
                  if (el) {
                    el.__p3Hover = () => {
                      if (active !== index) {
                        setActive(index);
                        setActiveRow(0);
                      }
                    };
                  }
                }}
                style={{ transitionDelay: `${index * 55}ms` }}
                onMouseEnter={() => {
                  setActive(index);
                  setActiveRow(0);
                }}
                onClick={() => {
                  setActive(index);
                  setActiveRow(0);
                }}
              >
                <div className="resume-card">
                  <div className="resume-badge">
                    <div className="resume-badge-text">{item.badge}</div>
                  </div>
                  <div className="resume-card-inner">
                    <div className="resume-title">{item.title}</div>
                    <div className="resume-rank">
                      <div className="resume-rank-label">RANK</div>
                      <div className="resume-rank-number">{item.rank}</div>
                    </div>
                  </div>
                  <div className="resume-subtitle-bar">
                    <div className="resume-subtitle">{item.subtitle}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {active !== null && PANEL_CONTENT[active] && (
          <div className="resume-detail-panel" key={active}>
            <div className="resume-detail-top">
              <img className="resume-arcana-card" src={arcanaCard} width="34" height="48" decoding="async" alt="" />
              <div className="resume-detail-top-index">{PANEL_CONTENT[active].index}</div>
              <div className="resume-detail-top-title">{PANEL_CONTENT[active].title}</div>
              <div className="resume-detail-top-progress">{PANEL_CONTENT[active].progress}</div>
            </div>

            <div className="resume-detail-list">
              {PANEL_CONTENT[active].rows.map((row, idx) => (
                <div
                  className={`resume-detail-row${row.href ? " clickable" : ""}${activeRow === idx ? " selected" : ""}`}
                  key={row.index}
                  data-p3-hover="true"
                  ref={(el) => {
                    if (el) el.__p3Hover = () => setActiveRow(idx);
                  }}
                  style={{ animationDelay: `${idx * 45}ms` }}
                  onMouseEnter={() => setActiveRow(idx)}
                  onClick={() => {
                    setActiveRow(idx);
                    if (row.href) window.open(row.href, "_blank");
                  }}
                >
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <div className="resume-detail-status">{row.status}</div>
                </div>
              ))}
            </div>

            {PANEL_CONTENT[active].details && PANEL_CONTENT[active].details.length > 0 && (
              <div className="resume-detail-bottom">
                <div className="resume-detail-bottom-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <img src={heroIcon} width="22" height="22" decoding="async" alt="" style={{ objectFit: "contain" }} />
                  <span>DETAILS</span>
                </div>
                <div className="resume-detail-bullets">
                  {PANEL_CONTENT[active].details.map((bullet, i) => (
                    <div className="resume-detail-bullet" key={i}>{bullet}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

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
