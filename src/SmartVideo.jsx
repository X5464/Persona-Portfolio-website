import { useEffect, useRef, useCallback } from "react";

/**
 * Safari (iOS & macOS) + Chrome hardware-accelerated background video component.
 * Fixes React's known `muted` attribute bug (#10389) where WebKit rejects initial
 * autoplay unless `defaultMuted`, `muted=""`, and `playsinline=""` are set
 * synchronously on the DOM node before WebKit evaluates autoplay.
 */
export default function SmartVideo({
  src,
  poster,
  className,
  style,
  preload = "auto",
  fetchPriority,
}) {
  const videoRef = useRef(null);

  const ensurePlay = useCallback((el) => {
    if (!el) return;
    el.defaultMuted = true;
    el.muted = true;
    el.playsInline = true;
    if (!el.hasAttribute("muted")) el.setAttribute("muted", "");
    if (!el.hasAttribute("playsinline")) el.setAttribute("playsinline", "");
    if (!el.hasAttribute("webkit-playsinline")) el.setAttribute("webkit-playsinline", "");
    if (!el.hasAttribute("autoplay")) el.setAttribute("autoplay", "");

    if (el.paused) {
      const p = el.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          // Retry muted play if WebKit transiently deferred during route mount
          el.defaultMuted = true;
          el.muted = true;
          el.play().catch(() => {});
        });
      }
    }
  }, []);

  const setRef = useCallback(
    (node) => {
      videoRef.current = node;
      if (node) {
        ensurePlay(node);
      }
    },
    [ensurePlay]
  );

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    ensurePlay(el);

    const onReady = () => ensurePlay(el);
    const onEnded = () => {
      el.currentTime = 0;
      ensurePlay(el);
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        ensurePlay(el);
      }
    };

    el.addEventListener("loadedmetadata", onReady);
    el.addEventListener("loadeddata", onReady);
    el.addEventListener("canplay", onReady);
    el.addEventListener("canplaythrough", onReady);
    el.addEventListener("suspend", onReady);
    el.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onReady);
    window.addEventListener("focus", onReady);

    // Staggered retries ensure WebKit plays even if initial mount coincided with a route transition
    const t1 = setTimeout(onReady, 40);
    const t2 = setTimeout(onReady, 160);
    const t3 = setTimeout(onReady, 380);
    const t4 = setTimeout(onReady, 750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      el.removeEventListener("loadedmetadata", onReady);
      el.removeEventListener("loadeddata", onReady);
      el.removeEventListener("canplay", onReady);
      el.removeEventListener("canplaythrough", onReady);
      el.removeEventListener("suspend", onReady);
      el.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onReady);
      window.removeEventListener("focus", onReady);
    };
  }, [src, ensurePlay]);

  return (
    <video
      ref={setRef}
      className={className}
      style={style}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload={preload}
      fetchPriority={fetchPriority}
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload nofullscreen noremoteplayback"
    />
  );
}
