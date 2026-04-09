import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import menuVideo from './assets/Mainn.mp4'
import menuPoster from './assets/Mainn_poster.jpg'
import main2 from './assets/main2.mp4'
import main2Poster from './assets/main2_poster.jpg'
import P3Menu from './P3Menu'
import VideoPage from './VideoPage'
import ResumePage from './ResumePage'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import Certs from './Certs'
import WelcomeModal from './WelcomeModal'
import TouchNav from './TouchNav'
import './App.css'

function MenuScreen({ onOpenWelcome }) {
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
      />
      <div className="menu-top-bar">
        <button className="menu-welcome-btn" onClick={onOpenWelcome}>
          CONTROLS GUIDE
        </button>
      </div>
      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}

function AnimatedRoutes({ onOpenWelcome }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen onOpenWelcome={onOpenWelcome} /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition><ResumePage src={main2} poster={main2Poster} /></PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />
        <Route path="/certs" element={
          <PageTransition variant="socials"><Certs /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("welcome-dismissed");
    if (!dismissed) setIsWelcomeOpen(true);
  }, []);

  const handleCloseWelcome = () => {
    setIsWelcomeOpen(false);
    sessionStorage.setItem("welcome-dismissed", "1");
  };

  const handleOpenWelcome = () => {
    setIsWelcomeOpen(true);
  };

  return (
    <main>
      <TouchNav />
      <WelcomeModal isOpen={isWelcomeOpen} onClose={handleCloseWelcome} />
      <AnimatedRoutes onOpenWelcome={handleOpenWelcome} />
    </main>
  );
}
