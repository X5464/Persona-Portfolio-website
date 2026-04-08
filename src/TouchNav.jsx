import { useEffect, useRef } from "react";

const SWIPE_THRESHOLD = 40; // px minimum swipe distance
const TAP_MAX_MOVE = 10;    // px max movement to count as a tap

export default function TouchNav() {
  const startX = useRef(0);
  const startY = useRef(0);
  const startTime = useRef(0);

  useEffect(() => {
    const dispatch = (key) => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
    };

    const onTouchStart = (e) => {
      const t = e.touches[0];
      startX.current = t.clientX;
      startY.current = t.clientY;
      startTime.current = Date.now();
    };

    const onTouchEnd = (e) => {
      const t = e.changedTouches[0];
      const dx = t.clientX - startX.current;
      const dy = t.clientY - startY.current;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      const elapsed = Date.now() - startTime.current;

      // Tap: barely moved, fast touch
      if (absDx < TAP_MAX_MOVE && absDy < TAP_MAX_MOVE && elapsed < 300) {
        dispatch("Enter");
        return;
      }

      // Swipe: dominant axis
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
  }, []);

  return null;
}
