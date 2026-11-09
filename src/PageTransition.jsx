// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const defaultBlocks = ["#0d1a3a", "#1a6aff", "#7dd4fc"];

function DefaultTransition() {
  return defaultBlocks.map((color, i) => (
    <motion.div
      key={i}
      style={{
        position: "fixed",
        inset: 0,
        background: color,
        zIndex: 999 - i,
        originX: 0,
        pointerEvents: "none",
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
      initial={{ scaleX: 1 }}
      animate={{ scaleX: 0 }}
      transition={{
        duration: 0.34,
        delay: i * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
    />
  ));
}

function AboutTransition() {
  const panels = [
    { color: "#00184c", top: "-12%", left: "-18%", width: "92%", delay: 0 },
    { color: "#53edff", top: "24%", left: "-10%", width: "78%", delay: 0.04 },
    { color: "#ffffff", top: "58%", left: "-14%", width: "88%", delay: 0.08 },
  ];

  return panels.map((panel, i) => (
    <motion.div
      key={i}
      style={{
        position: "fixed",
        top: panel.top,
        left: panel.left,
        width: panel.width,
        height: "28%",
        background: panel.color,
        zIndex: 999 - i,
        transformOrigin: "left center",
        pointerEvents: "none",
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
      }}
      initial={{ x: -320, rotate: -18, skewX: -14, opacity: 1 }}
      animate={{ x: [0, 60], rotate: -18, skewX: -14, opacity: [1, 0] }}
      transition={{
        duration: 0.38,
        delay: panel.delay,
        times: [0.55, 1],
        ease: [0.22, 1, 0.36, 1],
      }}
    />
  ));
}

function SocialsTransition() {
  const stripes = [
    { color: "#00184c", left: "70%", width: "26%", delay: 0 },
    { color: "#00dff7", left: "79%", width: "15%", delay: 0.04 },
    { color: "#ffffff", left: "87%", width: "9%", delay: 0.08 },
  ];

  return stripes.map((stripe, i) => (
    <motion.div
      key={i}
      style={{
        position: "fixed",
        top: "-8%",
        left: stripe.left,
        width: stripe.width,
        height: "116%",
        background: stripe.color,
        zIndex: 999 - i,
        transformOrigin: "top",
        pointerEvents: "none",
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
      }}
      initial={{ y: -600, skewX: -16, opacity: 1 }}
      animate={{ y: [0, 900], skewX: -16, opacity: [1, 0] }}
      transition={{
        duration: 0.4,
        delay: stripe.delay,
        times: [0.5, 1],
        ease: [0.22, 1, 0.36, 1],
      }}
    />
  ));
}

function ResumeTransition() {
  const cards = [
    { top: "14%", color: "#0f1760", delay: 0 },
    { top: "31%", color: "#7ff6ff", delay: 0.04 },
    { top: "48%", color: "#ffffff", delay: 0.08 },
    { top: "65%", color: "#0f1760", delay: 0.12 },
  ];

  return cards.map((card, i) => (
    <motion.div
      key={i}
      style={{
        position: "fixed",
        left: "-6%",
        top: card.top,
        width: "82%",
        height: "14%",
        background: card.color,
        zIndex: 999 - i,
        pointerEvents: "none",
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
      }}
      initial={{ x: -450, skewX: -12, opacity: 1 }}
      animate={{ x: [0, 1400], skewX: -12, opacity: [1, 0] }}
      transition={{
        duration: 0.42,
        delay: card.delay,
        times: [0.5, 1],
        ease: [0.22, 1, 0.36, 1],
      }}
    />
  ));
}

function TransitionOverlay({ variant }) {
  if (variant === "about") return <AboutTransition />;
  if (variant === "resume") return <ResumeTransition />;
  if (variant === "socials") return <SocialsTransition />;
  return <DefaultTransition />;
}

export default function PageTransition({ children, variant = "default" }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <TransitionOverlay variant={variant} />
      {children}
    </div>
  );
}
