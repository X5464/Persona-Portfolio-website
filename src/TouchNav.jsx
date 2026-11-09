import { useEffect, useRef } from "react";

const SWIPE_THRESHOLD = 55; // px minimum swipe distance when swiping in empty space
const DRAG_CLICK_GUARD_PX = 12; // if finger moved more than 12px, treat as drag/scrub, not a tap

export default function TouchNav({ forceLandscape = false }) {
  const startX = useRef(0);
  const startY = useRef(0);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const totalMove = useRef(0);
  const wasTouchDrag = useRef(false);
  const dragGuardTimeout = useRef(null);
  const ignoreSwipe = useRef(false);
  const lastHoveredEl = useRef(null);
  const hoveredCount = useRef(0);
  const rafId = useRef(null);
  const pendingTouch = useRef(null);

  useEffect(() => {
    const dispatch = (key) => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
    };

    const isInsideScrollable = (el) => {
      while (el && el !== document.body) {
        if (
          el.classList?.contains("resume-detail-panel") ||
          el.classList?.contains("ct-info-panel-container") ||
          el.classList?.contains("sc-info-list-panel") ||
          el.classList?.contains("ab-reveal-upper-bar") ||
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

    const triggerTouchHover = (clientX, clientY, isMove = false) => {
      const hit = document.elementFromPoint(clientX, clientY);
      if (!hit) return;

      // If the user dragged into the Resume detail panel from anywhere (even starting on left Rank cards),
      // scroll the detail panel smoothly in the direction of finger movement while selecting rows
      if (isMove) {
        const resumePanel = hit.closest(".resume-detail-panel");
        if (resumePanel) {
          const rawDx = clientX - lastX.current;
          const rawDy = clientY - lastY.current;
          const visualDy = forceLandscape ? -rawDx : rawDy;
          resumePanel.scrollTop += visualDy * 1.45;
        }
        const aboutBio = hit.closest(".ab-reveal-upper-bar");
        if (aboutBio) {
          const rawDx = clientX - lastX.current;
          const rawDy = clientY - lastY.current;
          const visualDy = forceLandscape ? -rawDx : rawDy;
          aboutBio.scrollTop += visualDy * 1.25;
        }
      }

      // Certs.jsx has its own continuous finger-scrub + auto-scroll handler for .ct-info-panel-container
      if (hit.closest(".ct-info-panel-container")) {
        return;
      }

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
      lastX.current = t.clientX;
      lastY.current = t.clientY;
      totalMove.current = 0;
      wasTouchDrag.current = false;
      if (dragGuardTimeout.current) {
        clearTimeout(dragGuardTimeout.current);
        dragGuardTimeout.current = null;
      }
      lastHoveredEl.current = null;
      hoveredCount.current = 0;
      ignoreSwipe.current = isInsideScrollable(e.target);
      triggerTouchHover(t.clientX, t.clientY, false);
    };

    const onTouchMove = (e) => {
      if (!e.touches || e.touches.length !== 1) return;
      const t = e.touches[0];
      const stepDist = Math.hypot(t.clientX - lastX.current, t.clientY - lastY.current);
      totalMove.current += stepDist;
      if (totalMove.current > DRAG_CLICK_GUARD_PX) {
        wasTouchDrag.current = true;
      }
      pendingTouch.current = { x: t.clientX, y: t.clientY };
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          rafId.current = null;
          if (!pendingTouch.current) return;
          const { x, y } = pendingTouch.current;
          triggerTouchHover(x, y, true);
          lastX.current = x;
          lastY.current = y;
        });
      }
    };

    const onTouchEnd = (e) => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      pendingTouch.current = null;
      if (wasTouchDrag.current) {
        dragGuardTimeout.current = setTimeout(() => {
          wasTouchDrag.current = false;
        }, 380);
      }

      if (ignoreSwipe.current || !e.changedTouches || e.changedTouches.length !== 1) return;
      // If the user scrubbed across interactive hover items directly, keep their hovered selection
      if (hoveredCount.current > 1 || wasTouchDrag.current) return;

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
        // Dragging finger downwards (dy > 0) moves selection Down; dragging upwards (dy < 0) moves selection Up
        dispatch(dy > 0 ? "ArrowDown" : "ArrowUp");
      } else if (absDx > absDy && absDx > SWIPE_THRESHOLD) {
        dispatch(dx < 0 ? "ArrowLeft" : "ArrowRight");
      }
    };

    // Suppress accidental click/open when lifting finger after a drag-scrub gesture;
    // single taps (totalMove <= 12px) pass through normally to open details/links!
    const onClickCapture = (e) => {
      if (!wasTouchDrag.current) return;
      if (e.target && typeof e.target.closest === "function" && e.target.closest("[data-p3-hover]")) {
        e.stopPropagation();
        e.preventDefault();
        wasTouchDrag.current = false;
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("click", onClickCapture, { capture: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("click", onClickCapture, { capture: true });
      if (dragGuardTimeout.current) clearTimeout(dragGuardTimeout.current);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [forceLandscape]);

  return null;
}
