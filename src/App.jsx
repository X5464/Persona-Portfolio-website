import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import menuVideo from './assets/Mainn.mp4'
import main1 from './assets/main1.mp4'
import main2 from './assets/main2.mp4'
import main3 from './assets/main3.mp4'
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

function MenuScreen() {
  const navigate = useNavigate()

  return (
    <div id="menu-screen">
      <div 
        dangerouslySetInnerHTML={{ __html: `
          <video 
            src="${menuVideo}" 
            autoplay 
            loop 
            muted 
            playsinline
          ></video>
        `}} 
      />
      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition><ResumePage src={main2} /></PageTransition>
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
  return (
    <main>
      <TouchNav />
      <WelcomeModal />
      <AnimatedRoutes />
    </main>
  );
}
