import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      { index: "01", title: "Jain University: BCA Cybersecurity  : 8.0/10.0 SGPA", status: "IN PROGRESS" },
      { index: "02", title: "IIT Mandi: CSE & Adv. Tech Minor  : 5.8/10.0 CGPA", status: "COMPLETED" },
      { index: "03", title: "HM Education Centre: Class 12 CBSE  : 70.20%", status: "COMPLETED" },
    ],
    details: [
      "* Maintaining an 8.0 SGPA while balancing dual-enrollment coursework.",
      "Merging core computer science fundamentals with advanced cybersecurity theory.",
      "Actively engaged as a Core Team Member in the AWS Cloud Club."
    ]
  },
  {
    index: "02",
    title: "SKILLS ARSENAL",
    progress: "4/4",
    rows: [
      { index: "01", title: "Offensive Tooling (Python, Bash, C)", status: "MASTERED" },
      { index: "02", title: "Infrastructure (AWS, Linux, Git)", status: "ACTIVE" },
      { index: "03", title: "Blue Team Triage (Threat Hunting)", status: "ACTIVE" },
      { index: "04", title: "Frontend (TypeScript, Web Dev)", status: "EQUIPPED" }
    ],
    details: [
      "* A balanced loadout of Red Team attack scripting and Blue Team defense mechanisms.",
      "Highly capable of bridging the gap between raw terminal environments and full-stack web deployments.",
      "Focused on automation, RESTful API integration, and secure systems architecture."
    ]
  },
  {
    index: "03",
    title: "PROJECTS DEPLOYED",
    progress: "3/5",
    rows: [
      { index: "01", title: "SENTINEL AI (Live CTI Dashboard)", status: "DEPLOYED" },
      { index: "02", title: "VARS AGRI NOVA (Offline IoT Hardware)", status: "AWARDED 2nd-runner up & 1ST" },
      { index: "03", title: "SPIDEY (Automated OSINT Crawler)", status: "OPERATIONAL" },
      { index: "04", title: "IC POKÉMON (Constitutional RPG)", status: "DEPLOYED" },
      { index: "05", title: "SPIDERWEB (Port Scanner, Subdomain, Hash, PDF CRACKER AND LOCKER) ALL IN ONE", status: "OPERATIONAL" }
    ],
    details: [
      "* Translating theoretical vulnerabilities into actionable, scalable architecture.",
      "Secured 2ND-runner Up & 1st Place at JAIN LaunchPad & Research Horizons 2025 for decentralized offline hardware integration."
    ]
  },
  {
    index: "04",
    title: "FIELD EXPERIENCE",
    progress: "5/5",
    rows: [
      { index: "01", title: "InLighnX (Offensive Cyber Intern)", status: "COMPLETE" },
      { index: "02", title: "Elevate Labs (Cyber Intern)", status: "COMPLETE" },
      { index: "03", title: "AIG, MASTERCARD, TATA GROUP & DELOITTE (Cybersecurity)", status: "COMPLETE" },
      { index: "04", title: "Teachnook / IIT Roorkee (Cyber Intern)", status: "COMPLETE" },
      { index: "05", title: "EDU-VERSITY & IIT GUWAHATI (Cyber Intern)", status: "COMPLETE" }
    ],
    details: [
      "* Over 4 active deployments in professional operational environments.",
      "Transitioned offensive hacking techniques into rigorous software triage, security auditing, and live threat feed management.",
      "Architected cohesive web suites and custom Python tools for enterprise use."
    ]
  }
];

export default function ResumePage({ src, poster }) {
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
    <div id="menu-screen">
      <video
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        controlsList="nodownload"
        onCanPlay={(e) => e.currentTarget.play()}
      />
      <div className="resume-entry-mask" aria-hidden="true">
        <video
          className="resume-entry-video"
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          controlsList="nodownload"
          onCanPlay={(e) => e.currentTarget.play()}
        />
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .resume-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          background: #0047FF;
          clip-path: circle(0 at 50% 50%);
          animation: resume-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: all;
        }

        .resume-entry-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: all;
        }

        .resume-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(47vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: all;
          transform: scale(0.9);
          transform-origin: top left;
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
        }
        .resume-card-wrap.active .resume-subtitle {
          color: #fff;
        }

        .resume-detail-panel {
          position: absolute;
          top: 9.5vh;
          right: 4.5vw;
          width: min(39vw, 620px);
          min-height: 74vh;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
        }
        .resume-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(133, 244, 255, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: all;
        }
        .resume-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 92px;
          padding: 0 18px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }
        .resume-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 46px;
          line-height: 1;
        }
        .resume-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .resume-detail-top-progress {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          letter-spacing: 2px;
          line-height: 1;
        }
        .resume-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 18px;
        }
        .resume-detail-row {
          display: grid;
          grid-template-columns: 50px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 56px;
          padding: 0 14px;
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .resume-detail-row:hover {
          transform: translateX(4px);
          background: rgba(12, 26, 94, 1);
        }
        .resume-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          color: #94f4ff;
        }
        .resume-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: 20px;
          line-height: 1.1;
          letter-spacing: 0.5px;
          color: #f2fcff;
        }
        .resume-detail-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #06133b;
          background: #8df6ff;
          padding: 5px 10px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .resume-detail-bottom {
          position: relative;
          margin-top: 22px;
          padding: 18px;
          background: rgba(5, 13, 57, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
        }
        .resume-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 14px;
        }
        .resume-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .resume-detail-bullet {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          line-height: 1.25;
          letter-spacing: 1px;
          color: #edfaff;
        }

        @media (max-width: 768px) {
          .resume-list-tag { font-size: 52px; }
          .resume-title { font-size: 14px; letter-spacing: 1px; }
          .resume-subtitle { font-size: 10px; }
          .resume-rank-number { font-size: 44px; }
          .resume-rank-label { font-size: 18px; }
          .resume-download-btn { font-size: 18px; padding: 4px 12px; }
          .resume-detail-row {
            grid-template-columns: 36px 1fr auto;
            gap: 8px;
            padding: 0 8px;
            min-height: 44px;
          }
          .resume-detail-row-title { font-size: 14px; }
          .resume-detail-row-index { font-size: 18px; }
          .resume-detail-status { font-size: 10px; letter-spacing: 0.5px; }
          .resume-detail-title { font-size: 28px; }
          .resume-card-wrap { margin-bottom: 4px; }
          .resume-detail-bullets { gap: 6px; }
          .resume-detail-bullet { font-size: 14px; }
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

        {active !== null && PANEL_CONTENT[active] && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">{PANEL_CONTENT[active].index}</div>
              <div className="resume-detail-top-title">{PANEL_CONTENT[active].title}</div>
              <div className="resume-detail-top-progress">{PANEL_CONTENT[active].progress}</div>
            </div>

            <div className="resume-detail-list">
              {PANEL_CONTENT[active].rows.map((row) => (
                <div className="resume-detail-row" key={row.index}>
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
