import { useState, useEffect, useCallback } from "react";

export default function WelcomeModal({
  isOpen,
  onClose,
  onSetForceLandscape,
  isPortraitMobile,
}) {
  const [animOut, setAnimOut] = useState(false);

  const dismiss = useCallback(() => {
    setAnimOut(true);
    setTimeout(() => {
      onClose();
      setAnimOut(false);
    }, 350);
  }, [onClose]);

  const selectModeAndDismiss = (landscapeVal) => {
    setAnimOut(true);
    setTimeout(() => {
      if (onSetForceLandscape) onSetForceLandscape(landscapeVal);
      else onClose();
      setAnimOut(false);
    }, 280);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        dismiss();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [isOpen, dismiss]);

  if (!isOpen && !animOut) return null;

  return (
    <>
      <style>{`
        .wm-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 12, 0.84);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: wm-fadein 0.4s ease both;
        }
        .wm-overlay.out {
          animation: wm-fadeout 0.35s ease both;
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
          from { opacity: 0; transform: translateY(24px) skewX(-2deg); }
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
          width: min(560px, 94%);
          max-height: 90%;
          overflow-y: auto;
          scrollbar-width: none;
          animation: wm-slidein 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both;
        }
        .wm-box::-webkit-scrollbar {
          display: none;
        }

        .wm-header {
          background: #c4001a;
          padding: 10px 22px;
          display: flex;
          align-items: center;
          gap: 12px;
          position: sticky;
          top: 0;
          z-index: 2;
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
          font-size: 21px;
          letter-spacing: 3.5px;
          color: #fff;
          line-height: 1;
        }

        .wm-body {
          padding: 20px 24px 18px;
        }

        .wm-warning {
          background: rgba(142, 245, 255, 0.08);
          border-left: 3px solid #8ef5ff;
          padding: 10px 14px;
          margin-bottom: 18px;
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
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.4px;
          color: #d6fbff;
          line-height: 1.45;
        }

        .wm-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 3px;
          color: #8ef5ff;
          margin-bottom: 10px;
        }

        .wm-keys {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 18px;
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
          font-size: 12.5px;
          font-weight: 400;
          color: rgba(255,255,255,0.78);
          letter-spacing: 0.3px;
        }
        .wm-key-desc strong {
          color: #fff;
          font-weight: 600;
        }

        .wm-divider {
          height: 1px;
          background: rgba(145, 245, 255, 0.12);
          margin: 14px 0;
        }

        .wm-btn-stack {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .wm-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 21px;
          letter-spacing: 2.5px;
          color: #fff;
          background: #c4001a;
          border: none;
          cursor: pointer;
          width: 100%;
          padding: 11px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
          transition: background 0.2s ease, transform 0.1s ease;
          touch-action: manipulation;
        }
        .wm-btn:hover {
          background: #e03d31;
          transform: translateY(-1px);
        }
        .wm-btn.secondary {
          background: #101e5a;
          border: 1px solid rgba(142, 245, 255, 0.4);
          color: #8ef5ff;
        }
        .wm-btn.secondary:hover {
          background: #172b7a;
        }
        .wm-btn-hint {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.65);
          letter-spacing: 1px;
          text-align: center;
          margin-top: 6px;
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
              <span className="wm-warning-icon">📱</span>
              <span className="wm-warning-text">
                ON MOBILE / NFC? Even with <strong>Rotation Lock ON</strong>, tap <strong>⟳ ROTATE 90° (PC VIEW)</strong> anytime at the top to flip the website sideways for the full 16:9 widescreen video &amp; Persona 3 UI—or stay in Portrait mode!
              </span>
            </div>

            <div className="wm-section-title">// TOUCH &amp; MOUSE CONTROLS</div>
            <div className="wm-keys">
              <div className="wm-key-row">
                <div className="wm-keys-group">
                  <span className="wm-key">TAP / CLICK</span>
                </div>
                <span className="wm-key-desc"><strong>Tap any item</strong> to select, reveal details, or open links</span>
              </div>
              <div className="wm-key-row">
                <div className="wm-keys-group">
                  <span className="wm-key">SWIPE / SCROLL</span>
                </div>
                <span className="wm-key-desc"><strong>Swipe or drag</strong> to navigate menus &amp; scroll certificates</span>
              </div>
              <div className="wm-key-row">
                <div className="wm-keys-group">
                  <span className="wm-key">⟳ ROTATE 90°</span>
                </div>
                <span className="wm-key-desc"><strong>Toggle sideways PC view</strong> on phones with rotation lock on</span>
              </div>
            </div>

            <div className="wm-section-title">// KEYBOARD CONTROLS</div>
            <div className="wm-keys">
              <div className="wm-key-row">
                <div className="wm-keys-group">
                  <span className="wm-key">↑</span>
                  <span className="wm-key">↓</span>
                  <span className="wm-key">←</span>
                  <span className="wm-key">→</span>
                </div>
                <span className="wm-key-desc"><strong>Arrow Keys</strong> to navigate items &amp; switch panels</span>
              </div>
              <div className="wm-key-row">
                <div className="wm-keys-group">
                  <span className="wm-key">↵</span>
                  <span className="wm-key">ESC</span>
                </div>
                <span className="wm-key-desc"><strong>Enter</strong> to confirm / open · <strong>Esc</strong> to go back</span>
              </div>
            </div>

            <div className="wm-divider" />
            {isPortraitMobile ? (
              <div className="wm-btn-stack">
                <button className="wm-btn" onClick={() => selectModeAndDismiss(true)}>
                  ⟳ ROTATE 90° — FULL 16:9 PC EXPERIENCE
                </button>
                <button className="wm-btn secondary" onClick={() => selectModeAndDismiss(false)}>
                  📱 CONTINUE IN PORTRAIT MOBILE VIEW
                </button>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <button className="wm-btn" onClick={dismiss}>ENTER THE SYSTEM</button>
                <div className="wm-btn-hint">PRESS ENTER OR TAP TO CONTINUE</div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
