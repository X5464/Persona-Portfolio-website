import { useEffect, useRef } from "react";

const SWIPE_THRESHOLD = 55; // px minimum swipe distance when swiping in empty space

export default function TouchNav({ forceLandscape = false }) {
  const startX = useRef(0);
  const startY = useRef(0);
  const ignoreSwipe = useRef(false);
  const lastHoveredEl = useRef(null);
  const hoveredCount = useRef(0);

  useEffect(() => {
    const dispatch = (key) => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
    };

    const isInsideScrollable = (el) => {
      while (el && el !== document.body) {
        if (
          el.classList?.contains("resume-detail-panel") ||
          el.classList?.contains("ct-info-panel-container") ||
          el.classList?.contains("sc-info-panel-container") ||
          el.classList?.contains("sc-reveal-upper-bar") ||
          el.classList?.contains("wm-box")
        ) {
          return true;
        }
        el = el.parentElement;
      }
      return false;
    };

    const findHoverTarget = (clientX, clientY) => {
      const hit = document.elementFromPoint(clientX, clientY);
      if (!hit) return null;
      return hit.closest("[data-p3-hover]");
    };

    const triggerTouchHover = (clientX, clientY) => {
      const target = findHoverTarget(clientX, clientY);
      if (target && target !== lastHoveredEl.current) {
        lastHoveredEl.current = target;
        hoveredCount.current += 1;
        if (typeof target.__p3Hover === "function") {
          target.__p3Hover();
        }
        target.dispatchEvent(new CustomEvent("p3hover", { bubbles: true }));
      }
    };

    const onTouchStart = (e) => {
      if (!e.touches || e.touches.length !== 1) return;
      const t = e.touches[0];
      startX.current = t.clientX;
      startY.current = t.clientY;
      lastHoveredEl.current = null;
      hoveredCount.current = 0;
      ignoreSwipe.current = isInsideScrollable(e.target);
      triggerTouchHover(t.clientX, t.clientY);
    };

    const onTouchMove = (e) => {
      if (!e.touches || e.touches.length !== 1) return;
      const t = e.touches[0];
      triggerTouchHover(t.clientX, t.clientY);
    };

    const onTouchEnd = (e) => {
      if (ignoreSwipe.current || !e.changedTouches || e.changedTouches.length !== 1) return;
      // If the user scrubbed across interactive hover items directly, keep their hovered selection instead of firing a conflicting arrow key
      if (hoveredCount.current > 1) return;

      const t = e.changedTouches[0];
      const rawDx = t.clientX - startX.current;
      const rawDy = t.clientY - startY.current;

      // If screen is rotated 90deg clockwise in software:
      // Visual X is +rawDy, Visual Y is -rawDx
      const dx = forceLandscape ? rawDy : rawDx;
      const dy = forceLandscape ? -rawDx : rawDy;

      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (absDy > absDx && absDy > SWIPE_THRESHOLD) {
        dispatch(dy < 0 ? "ArrowDown" : "ArrowUp");
      } else if (absDx > absDy && absDx > SWIPE_THRESHOLD) {
        dispatch(dx < 0 ? "ArrowLeft" : "ArrowRight");
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [forceLandscape]);

  return null;
}
