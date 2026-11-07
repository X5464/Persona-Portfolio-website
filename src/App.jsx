import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import menuVideo from './assets/Mainn.mp4'
import menuPoster from './assets/Mainn_poster.jpg'
import P3Menu from './P3Menu'
import PageTransition from './PageTransition'
import WelcomeModal from './WelcomeModal'
import TouchNav from './TouchNav'
import './App.css'

const ResumePage = lazy(() => import('./ResumePage'))
const Socials = lazy(() => import('./Socials'))
const AboutMe = lazy(() => import('./AboutMe'))
const Certs = lazy(() => import('./Certs'))

function MenuScreen() {
  const navigate = useNavigate()

  return (
    <div id="menu-screen">
      <video 
        src={menuVideo}
        poster={menuPoster}
        autoPlay 
        loop 
        muted 
        playsInline
        preload="auto"
        fetchPriority="high"
      />

      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <Suspense fallback={<div style={{ width: '100%', height: '100%', background: '#08102e' }} />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition><MenuScreen /></PageTransition>
          } />
          <Route path="/about" element={
            <PageTransition variant="about"><AboutMe /></PageTransition>
          } />
          <Route path="/resume" element={
            <PageTransition variant="resume"><ResumePage /></PageTransition>
          } />
          <Route path="/socials" element={
            <PageTransition variant="socials"><Socials /></PageTransition>
          } />
          <Route path="/certs" element={
            <PageTransition variant="socials"><Certs /></PageTransition>
          } />
          <Route path="*" element={
            <PageTransition><MenuScreen /></PageTransition>
          } />
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}

export default function App() {
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [showRotateHint, setShowRotateHint] = useState(true);
  const [forceLandscape, setForceLandscape] = useState(() => {
    try {
      const saved = sessionStorage.getItem("force-landscape");
      if (saved !== null) return saved === "1";
    } catch {
      // ignore storage errors
    }
    // Default to true on mobile so NFC scans open directly in the full 16:9 Persona 3 game view!
    return true;
  });
  const [viewport, setViewport] = useState(() => ({
    w: typeof window !== "undefined" ? window.innerWidth : 1280,
    h: typeof window !== "undefined" ? window.innerHeight : 720,
  }));

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener("resize", updateViewport);
    window.addEventListener("orientationchange", updateViewport);
    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("orientationchange", updateViewport);
    };
  }, []);

  // Ensure background videos always play on iOS Safari & Android Chrome
  useEffect(() => {
    const playAllVideos = () => {
      document.querySelectorAll("video").forEach((v) => {
        v.muted = true;
        v.playsInline = true;
        v.setAttribute("playsinline", "");
        v.setAttribute("webkit-playsinline", "");
        if (v.paused) {
          v.play().catch(() => {});
        }
      });
    };
    playAllVideos();
    window.addEventListener("touchstart", playAllVideos, { passive: true });
    window.addEventListener("click", playAllVideos, { passive: true });
    return () => {
      window.removeEventListener("touchstart", playAllVideos);
      window.removeEventListener("click", playAllVideos);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowRotateHint(false), 5500);
    const prefetchTimer = setTimeout(() => {
      import('./AboutMe');
      import('./ResumePage');
      import('./Socials');
      import('./Certs');
    }, 2200);
    return () => {
      clearTimeout(timer);
      clearTimeout(prefetchTimer);
    };
  }, []);

  const handleCloseWelcome = () => {
    setIsWelcomeOpen(false);
    try {
      sessionStorage.setItem("welcome-dismissed", "1");
    } catch (e) {
      console.warn("Storage write failed:", e);
    }
  };

  const handleOpenWelcome = () => {
    setIsWelcomeOpen(true);
  };

  const toggleForceLandscape = (val) => {
    const next = typeof val === "boolean" ? val : !forceLandscape;
    setForceLandscape(next);
    try {
      sessionStorage.setItem("force-landscape", next ? "1" : "0");
    } catch (e) {
      console.warn("Storage write failed:", e);
    }
  };

  const isPortraitViewport = viewport.w < viewport.h;
  const isMobileOrTablet = Math.min(viewport.w, viewport.h) <= 900;
  const isSoftwareRotated = isPortraitViewport && forceLandscape;
  const isNativeMobileLandscape = !isPortraitViewport && viewport.h < 600;
  const isPcStageMode = isSoftwareRotated || isNativeMobileLandscape;

  useEffect(() => {
    if (isPcStageMode) {
      document.body.classList.add("pc-stage-mode");
    } else {
      document.body.classList.remove("pc-stage-mode");
    }
  }, [isPcStageMode]);

  let mainStyle = {};
  if (isSoftwareRotated) {
    const stageH = 780;
    const stageW = Math.round(stageH * (viewport.h / viewport.w));
    const scale = viewport.w / stageH;
    mainStyle = {
      position: "fixed",
      top: 0,
      left: `${viewport.w}px`,
      width: `${stageW}px`,
      height: `${stageH}px`,
      transformOrigin: "0 0",
      transform: `rotate(90deg) scale(${scale})`,
      overflow: "hidden",
    };
  } else if (isNativeMobileLandscape) {
    const stageH = 780;
    const stageW = Math.round(stageH * (viewport.w / viewport.h));
    const scale = viewport.h / stageH;
    mainStyle = {
      position: "fixed",
      top: 0,
      left: 0,
      width: `${stageW}px`,
      height: `${stageH}px`,
      transformOrigin: "0 0",
      transform: `scale(${scale})`,
      overflow: "hidden",
    };
  }

  return (
    <main className={isPcStageMode ? "pc-stage" : "portrait-stage"} style={mainStyle}>
      <TouchNav forceLandscape={isSoftwareRotated} />
      
      <div className="global-controls-bar">
        <button className="global-welcome-btn" onClick={handleOpenWelcome}>
          CONTROLS
        </button>
        {(isMobileOrTablet || forceLandscape) && isPortraitViewport && (
          <button
            className={`global-rotate-btn${forceLandscape ? " active" : ""}`}
            onClick={() => toggleForceLandscape(!forceLandscape)}
            title="Rotate website 90° for full 16:9 PC experience even with phone rotation lock on"
          >
            {forceLandscape ? "⟲ PORTRAIT VIEW" : "⟳ ROTATE 90° (PC VIEW)"}
          </button>
        )}
      </div>

      {isSoftwareRotated && isMobileOrTablet && showRotateHint && (
        <div
          className="p3-sideways-toast"
          onClick={() => setShowRotateHint(false)}
        >
          <span className="p3-sideways-icon">⟳</span>
          <span>TURN PHONE SIDEWAYS FOR FULL P3 VIEW — OR TAP &ldquo;⟲ PORTRAIT VIEW&rdquo; TOP BAR</span>
        </div>
      )}

      <WelcomeModal
        isOpen={isWelcomeOpen}
        onClose={handleCloseWelcome}
        onSetForceLandscape={(val) => {
          toggleForceLandscape(val);
          handleCloseWelcome();
        }}
        isPortraitMobile={isPortraitViewport && isMobileOrTablet}
      />
      <AnimatedRoutes />
    </main>
  );
}
