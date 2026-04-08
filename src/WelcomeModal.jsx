import { useState, useEffect } from "react";

export default function WelcomeModal() {
  const [visible, setVisible] = useState(false);
  const [animOut, setAnimOut] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("welcome-dismissed");
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    setAnimOut(true);
    setTimeout(() => {
      setVisible(false);
      setAnimOut(false);
      sessionStorage.setItem("welcome-dismissed", "1");
    }, 400);
  };

  const reopen = () => {
    sessionStorage.removeItem("welcome-dismissed");
    setAnimOut(false);
    setVisible(true);
  };

  useEffect(() => {
    if (!visible) return;
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        dismiss();
      }
    };
    window.addEventListener("keydown", onKey, true); // capture phase so it fires first
    return () => window.removeEventListener("keydown", onKey, true);
  }, [visible]);

  if (!visible) return (
    <button className="wm-trigger" onClick={reopen} title="Navigation Guide">
      <style>{`
        .wm-trigger {
          position: fixed;
          top: 14px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9000;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.75);
          background: rgba(8, 16, 46, 0.85);
          border: 1px solid rgba(145,245,255,0.25);
          border-bottom: 2px solid #c4001a;
          padding: 5px 16px;
          cursor: pointer;
          clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
          transition: color 0.2s ease, background 0.2s ease;
          backdrop-filter: blur(4px);
        }
        .wm-trigger:hover {
          color: #fff;
          background: rgba(196,0,26,0.6);
        }
      `}</style>
      ? CONTROLS
    </button>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;600&display=swap');

        .wm-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 12, 0.82);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: wm-fadein 0.5s ease both;
        }
        .wm-overlay.out {
          animation: wm-fadeout 0.4s ease both;
        }

        @keyframes wm-fadein {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes wm-fadeout {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes wm-slidein {
          from { opacity: 0; transform: translateY(30px) skewX(-2deg); }
          to   { opacity: 1; transform: translateY(0) skewX(-2deg); }
        }

        .wm-box {
          transform: skewX(-2deg);
          background: #08102e;
          border: 1px solid rgba(145, 245, 255, 0.15);
          box-shadow:
            0 0 0 3px #c4001a,
            0 0 60px rgba(0,0,0,0.9),
            0 0 40px rgba(196, 0, 26, 0.2);
          width: min(560px, 90vw);
          overflow: hidden;
          animation: wm-slidein 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
        }

        .wm-header {
          background: #c4001a;
          padding: 10px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }
        .wm-close {
          position: absolute;
          top: 50%;
          right: 14px;
          transform: translateY(-50%);
          background: rgba(0,0,0,0.25);
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #fff;
          font-size: 15px;
          line-height: 1;
          transition: background 0.2s ease;
          flex-shrink: 0;
        }
        .wm-close:hover {
          background: rgba(255,255,255,0.25);
        }
        .wm-header-dot {
          width: 10px; height: 10px;
          background: #fff;
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          flex-shrink: 0;
        }
        .wm-header-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 4px;
          color: #fff;
          line-height: 1;
        }

        .wm-body {
          padding: 28px 28px 20px;
        }

        .wm-warning {
          background: rgba(196, 0, 26, 0.12);
          border-left: 3px solid #c4001a;
          padding: 10px 14px;
          margin-bottom: 22px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .wm-warning-icon {
          font-size: 20px;
          line-height: 1.2;
          flex-shrink: 0;
        }
        .wm-warning-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: #ffb8c1;
          line-height: 1.5;
        }

        .wm-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 3px;
          color: #8ef5ff;
          margin-bottom: 12px;
        }

        .wm-keys {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
        }
        .wm-key-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .wm-keys-group {
          display: flex;
          gap: 5px;
          flex-shrink: 0;
        }
        .wm-key {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          letter-spacing: 1px;
          color: #fff;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(145, 245, 255, 0.3);
          border-bottom: 3px solid rgba(145, 245, 255, 0.6);
          border-radius: 4px;
          padding: 4px 10px;
          min-width: 34px;
          text-align: center;
          line-height: 1;
        }
        .wm-key-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: rgba(255,255,255,0.75);
          letter-spacing: 0.3px;
        }
        .wm-key-desc strong {
          color: #fff;
          font-weight: 600;
        }

        .wm-divider {
          height: 1px;
          background: rgba(145, 245, 255, 0.1);
          margin: 18px 0;
        }

        .wm-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 3px;
          color: #fff;
          background: #c4001a;
          border: none;
          cursor: pointer;
          width: 100%;
          padding: 12px 0;
          clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
          transition: background 0.2s ease, transform 0.1s ease;
        }
        .wm-btn:hover {
          background: #e03d31;
          transform: translateY(-1px);
        }
        .wm-btn:active {
          transform: translateY(1px);
        }
        .wm-btn-hint {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.7);
          letter-spacing: 1px;
          text-align: center;
          margin-top: 8px;
        }
      `}</style>

      <div className={`wm-overlay${animOut ? " out" : ""}`} onClick={dismiss}>
        <div className="wm-box" onClick={e => e.stopPropagation()}>

          <div className="wm-header">
            <div className="wm-header-dot" />
            <div className="wm-header-title">SYSTEM NOTICE — NAVIGATION GUIDE</div>
            <div className="wm-header-dot" />
            <button className="wm-close" onClick={dismiss} aria-label="Close">✕</button>
          </div>

          <div className="wm-body">

            <div className="wm-warning">
              <span className="wm-warning-icon">🖥️</span>
              <span className="wm-warning-text">
                BEST EXPERIENCED ON DESKTOP OR LAPTOP.<br />
                Mobile devices are not fully supported — keyboard navigation required.
              </span>
            </div>

            <div className="wm-section-title">// KEYBOARD CONTROLS</div>

            <div className="wm-keys">
              <div className="wm-key-row">
                <div className="wm-keys-group">
                  <span className="wm-key">↑</span>
                  <span className="wm-key">↓</span>
                </div>
                <span className="wm-key-desc"><strong>Navigate</strong> between menu items</span>
              </div>
              <div className="wm-key-row">
                <div className="wm-keys-group">
                  <span className="wm-key">↵</span>
                </div>
                <span className="wm-key-desc"><strong>Confirm</strong> / Open selected item</span>
              </div>
              <div className="wm-key-row">
                <div className="wm-keys-group">
                  <span className="wm-key">←</span>
                  <span className="wm-key">→</span>
                </div>
                <span className="wm-key-desc"><strong>Switch focus</strong> between panels (Socials / Certs)</span>
              </div>
              <div className="wm-key-row">
                <div className="wm-keys-group">
                  <span className="wm-key">ESC</span>
                </div>
                <span className="wm-key-desc"><strong>Go back</strong> to previous screen</span>
              </div>
            </div>

            <div className="wm-section-title">// MOBILE / TOUCH CONTROLS</div>

            <div className="wm-keys">
              <div className="wm-key-row">
                <div className="wm-keys-group">
                  <span className="wm-key">↕</span>
                </div>
                <span className="wm-key-desc"><strong>Swipe Up/Down</strong> to navigate items</span>
              </div>
              <div className="wm-key-row">
                <div className="wm-keys-group">
                  <span className="wm-key">↔</span>
                </div>
                <span className="wm-key-desc"><strong>Swipe Left</strong> to go back · <strong>Right</strong> to enter panel</span>
              </div>
              <div className="wm-key-row">
                <div className="wm-keys-group">
                  <span className="wm-key">TAP</span>
                </div>
                <span className="wm-key-desc"><strong>Tap</strong> to confirm / open selected item</span>
              </div>
            </div>

            <div className="wm-divider" />
            <div style={{ textAlign: "center" }}>
              <button className="wm-btn" onClick={dismiss}>ENTER THE SYSTEM</button>
              <div className="wm-btn-hint">PRESS ENTER OR CLICK TO CONTINUE</div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
