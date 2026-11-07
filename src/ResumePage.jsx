import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import main2 from "./assets/main2.mp4";
import main2Poster from "./assets/main2_poster.jpg";

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
    progress: "2/3",
    rows: [
      { index: "01", title: "Jain University: BCA Cybersecurity : 9.08/10.0 SGPA (Sem 4)", status: "IN PROGRESS" },
      { index: "02", title: "IIT Mandi: CSE & Adv. Tech Minor (2024 - 2025)", status: "COMPLETED" },
      { index: "03", title: "HM Education Centre: Class 12 CBSE : 70.20%", status: "COMPLETED" },
    ],
    details: [
      "* Achieving a 9.08/10.0 SGPA in Semester 4 (2024 - 2027) while balancing dual-enrollment coursework.",
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
      { index: "02", title: "Offensive Tools (Nmap, Metasploit, Burp Suite, Kali, Hash Cracking)", status: "MASTERED" },
      { index: "03", title: "Forensics & Monitoring (Wireshark, SIEM, VirusTotal, AbuseIPDB)", status: "ACTIVE" },
      { index: "04", title: "Programming & Cloud (Python, C, REST APIs, Git, AWS, Sarvam API)", status: "ACTIVE" },
      { index: "05", title: "Frameworks & Defense (OWASP Top 10, IAM, Linux, Zero-Day Response)", status: "EQUIPPED" }
    ],
    details: [
      "* Hands-on expertise in Network Log Analysis, Vulnerability Assessment, Phishing Simulation, and Chain-of-Custody Logging.",
      "* Builds custom Python security tooling: TCP port scanners, subdomain enumerators, MD5/SHA-1/SHA-256 hash crackers, and Tor-routed OSINT suites.",
      "* Experienced in CTI dashboards, IP reputation scoring, and live digital forensics."
    ]
  },
  {
    index: "03",
    title: "PROJECTS DEPLOYED",
    progress: "6/6",
    rows: [
      { index: "01", title: "SENTINEL AI (CTI Platform: VirusTotal & AbuseIPDB Enrichment)", status: "▶ LIVE DEMO", href: "https://sentinel-frontend-rpzi.onrender.com" },
      { index: "02", title: "ARGUS OSINT (18-Tool OSINT & Forensics Suite + Tor Routing)", status: "▶ REPO", href: "https://github.com/X5464/argus-osint" },
      { index: "03", title: "VARS AGRI NOVA (IoT Hardware + Sarvam API Voice Alerts)", status: "1ST & 3RD PLACE" },
      { index: "04", title: "SPIDERWEB (Unified 6-Tool Offensive Security Platform)", status: "▶ REPO", href: "https://github.com/X5464/Spiderweb" },
      { index: "05", title: "INFOSEC PORT SCANNER (Custom TCP Vulnerability Scanner)", status: "▶ REPO", href: "https://github.com/X5464/InfoSec-Port-Scanner" },
      { index: "06", title: "AD SHIELD PRO (Privacy & Ad-Blocking Browser Extension)", status: "▶ REPO", href: "https://github.com/X5464/Ad-Shield-Pro" }
    ],
    details: [
      "* ARGUS OSINT: Local-first intelligence suite with CLI/GUI consoles, 18 OSINT & forensics tools, automated Tor routing, encrypted key vault & chain-of-custody logging.",
      "* VARS Agri Nova: 1st Place at Research Horizons 2025 & 3rd Place overall among 1,000+ teams at JAIN Launchpad 2025 Glitch Pitch.",
      "* Completed 60-hour CTF endurance event at Hck4G CTF Con 2025 International (Melbourne, Australia)."
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
      <video
        className="resume-bg-video"
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        controlsList="nodownload"
        onCanPlay={(e) => e.currentTarget.play().catch(() => {})}
      />
      <style>{`
        .resume-bg-video {
          clip-path: circle(0 at 50% 50%);
          animation: resume-entry-reveal 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to { clip-path: circle(150% at 50% 50%); }
        }

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
          touch-action: manipulation;
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
          background: linear-gradient(180deg, rgba(12, 24, 92, 0.68) 0%, rgba(6, 12, 54, 0.74) 100%);
          backdrop-filter: blur(3px);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.22),
            16px 16px 0 rgba(0, 6, 30, 0.45);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-y;
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
          grid-template-columns: 64px 1fr auto;
          align-items: center;
          gap: 12px;
          min-height: 76px;
          padding: 0 16px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
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
        }
        .resume-detail-row.clickable {
          cursor: pointer;
          touch-action: manipulation;
        }
        .resume-detail-row.clickable .resume-detail-status {
          background: #c4001a;
          color: #fff;
        }
        .resume-detail-row:hover {
          transform: translateX(4px);
          background: rgba(12, 26, 94, 1);
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
            top: 42px;
            left: 4%;
            width: 92%;
            transform: none;
            gap: 6px;
            z-index: 15;
          }
          body:not(.pc-stage-mode) .resume-list-tag {
            font-size: 36px;
            margin: 0 0 2px 4px;
          }
          body:not(.pc-stage-mode) .resume-download-btn {
            font-size: 16px;
            padding: 5px 14px;
            margin-bottom: 4px;
          }
          body:not(.pc-stage-mode) .resume-cards-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
          body:not(.pc-stage-mode) .resume-card {
            height: 58px;
            box-shadow: 0 4px 0 rgba(5, 13, 59, 0.85);
          }
          body:not(.pc-stage-mode) .resume-card-wrap.active .resume-card {
            box-shadow: 5px 4px 0 #d63232;
            transform: translateX(2px);
          }
          body:not(.pc-stage-mode) .resume-badge {
            top: 5px;
            left: -4px;
            width: 30px;
            height: 36px;
            border-width: 2px;
          }
          body:not(.pc-stage-mode) .resume-badge-text {
            font-size: 18px;
          }
          body:not(.pc-stage-mode) .resume-card-inner {
            padding: 6px 10px 6px 32px;
          }
          body:not(.pc-stage-mode) .resume-title {
            font-size: 20px;
            letter-spacing: 0.5px;
          }
          body:not(.pc-stage-mode) .resume-rank {
            gap: 4px;
          }
          body:not(.pc-stage-mode) .resume-rank-label {
            font-size: 12px;
          }
          body:not(.pc-stage-mode) .resume-rank-number {
            font-size: 26px;
          }
          body:not(.pc-stage-mode) .resume-subtitle-bar {
            left: 32px;
            right: 8px;
            bottom: 5px;
            height: 17px;
            padding: 0 8px;
          }
          body:not(.pc-stage-mode) .resume-subtitle {
            font-size: 11px;
          }
          body:not(.pc-stage-mode) .resume-detail-panel {
            top: 220px;
            left: 4%;
            right: 4%;
            width: 92%;
            min-height: 0;
            max-height: calc(100% - 275px);
            padding: 12px 14px 14px 14px;
            clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          }
          body:not(.pc-stage-mode) .resume-detail-top {
            grid-template-columns: 38px 1fr auto;
            min-height: 48px;
            padding: 0 12px;
            gap: 8px;
          }
          body:not(.pc-stage-mode) .resume-detail-top-index { font-size: 26px; }
          body:not(.pc-stage-mode) .resume-detail-top-title { font-size: 22px; }
          body:not(.pc-stage-mode) .resume-detail-top-progress { font-size: 24px; }
          body:not(.pc-stage-mode) .resume-detail-list {
            gap: 6px;
            margin-top: 10px;
          }
          body:not(.pc-stage-mode) .resume-detail-row {
            grid-template-columns: 28px 1fr auto;
            gap: 8px;
            padding: 6px 10px;
            min-height: 40px;
          }
          body:not(.pc-stage-mode) .resume-detail-row-title { font-size: 13px; }
          body:not(.pc-stage-mode) .resume-detail-row-index { font-size: 16px; }
          body:not(.pc-stage-mode) .resume-detail-status { font-size: 11px; padding: 3px 7px; letter-spacing: 0.5px; }
          body:not(.pc-stage-mode) .resume-detail-bottom { margin-top: 10px; padding: 10px 12px; }
          body:not(.pc-stage-mode) .resume-detail-bottom-title { font-size: 20px; margin-bottom: 6px; }
          body:not(.pc-stage-mode) .resume-detail-bullets { gap: 5px; }
          body:not(.pc-stage-mode) .resume-detail-bullet { font-size: 14px; }
          body:not(.pc-stage-mode) .sc-back-btn { bottom: 14px; left: 16px; font-size: 18px; }
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
                style={{ transitionDelay: `${index * 55}ms` }}
                onMouseEnter={() => {
                  setActive(index);
                }}
                onClick={() => {
                  setActive(index);
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
              <div className="resume-detail-top-index">{PANEL_CONTENT[active].index}</div>
              <div className="resume-detail-top-title">{PANEL_CONTENT[active].title}</div>
              <div className="resume-detail-top-progress">{PANEL_CONTENT[active].progress}</div>
            </div>

            <div className="resume-detail-list">
              {PANEL_CONTENT[active].rows.map((row, idx) => (
                <div
                  className={`resume-detail-row${row.href ? " clickable" : ""}`}
                  key={row.index}
                  style={{ animationDelay: `${idx * 45}ms` }}
                  onClick={() => {
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
                <div className="resume-detail-bottom-title">DETAILS</div>
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
