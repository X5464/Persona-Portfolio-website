import { useEffect, useRef } from "react";

const SWIPE_THRESHOLD = 50; // px minimum swipe distance

export default function TouchNav({ forceLandscape = false }) {
  const startX = useRef(0);
  const startY = useRef(0);
  const ignoreSwipe = useRef(false);

  useEffect(() => {
    const dispatch = (key) => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
    };

    const isInsideScrollable = (el) => {
      while (el && el !== document.body) {
        if (
          el.classList?.contains("resume-detail-panel") ||
          el.classList?.contains("ct-info-panel-container") ||
          el.classList?.contains("wm-box")
        ) {
          return true;
        }
        el = el.parentElement;
      }
      return false;
    };

    const onTouchStart = (e) => {
      if (!e.touches || e.touches.length !== 1) return;
      const t = e.touches[0];
      startX.current = t.clientX;
      startY.current = t.clientY;
      ignoreSwipe.current = isInsideScrollable(e.target);
    };

    const onTouchEnd = (e) => {
      if (ignoreSwipe.current || !e.changedTouches || e.changedTouches.length !== 1) return;
      const t = e.changedTouches[0];
      const rawDx = t.clientX - startX.current;
      const rawDy = t.clientY - startY.current;

      // If screen is rotated 90deg clockwise in software:
      // Visual X is +rawDy, Visual Y is -rawDx
      const dx = forceLandscape ? rawDy : rawDx;
      const dy = forceLandscape ? -rawDx : rawDy;

      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      // Note: Do NOT synthesize "Enter" on tap; native onClick handles taps accurately.
      if (absDy > absDx && absDy > SWIPE_THRESHOLD) {
        dispatch(dy < 0 ? "ArrowDown" : "ArrowUp");
      } else if (absDx > absDy && absDx > SWIPE_THRESHOLD) {
        dispatch(dx < 0 ? "ArrowLeft" : "ArrowRight");
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [forceLandscape]);

  return null;
}
