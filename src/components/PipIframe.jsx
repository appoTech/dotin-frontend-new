import React, { useState, useRef, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { X, Minus, Volume2 } from "lucide-react";
import "../css/pipIframe.css";

const PipIframe = ({ src }) => {
  const [minimized, setMinimized] = useState(true);
  const [visible, setVisible] = useState(true);
  const [showUnmute, setShowUnmute] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef(null);
  const dragControls = useDragControls();

  // Track window dimensions in real-time for responsive drag boundaries
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!visible) return null;

  // Convert Shorts or watch URLs → embed URL
  const toEmbedUrl = (url) => {
    try {
      if (url.includes("instagram.com/reel/")) {
        const cleanUrl = url.split("?")[0];
        const baseUrl = cleanUrl.endsWith("/") ? cleanUrl : `${cleanUrl}/`;
        return `${baseUrl}embed/`;
      }
      if (url.includes("youtube.com/shorts/")) {
        const id = url.split("shorts/")[1].split("?")[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      if (url.includes("watch?v=")) {
        const id = url.split("watch?v=")[1].split("&")[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      return url;
    } catch {
      return url;
    }
  };

  const isDirectVideo =
    src.endsWith(".mp4") ||
    src.includes(".mp4?") ||
    src.endsWith(".webm") ||
    src.includes(".webm?") ||
    src.endsWith(".ogg") ||
    src.includes(".ogg?");

  const isInstagram = src.includes("instagram.com");
  const embedSrc = toEmbedUrl(src);
  const videoSrc = isInstagram
    ? embedSrc
    : `${embedSrc}${
        embedSrc.includes("?") ? "&" : "?"
      }autoplay=1&mute=1&enablejsapi=1&controls=0&modestbranding=1&rel=0`;

  const handleUnmute = (e) => {
    e.stopPropagation();
    setShowUnmute(false);
    setIsMuted(false);
    if (!isDirectVideo) {
      iframeRef.current?.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: "unMute",
        }),
        "*"
      );
    }
  };

  // Determine current card size to calculate drag constraints dynamically
  const isMobile = windowSize.width < 640;
  const isTablet = windowSize.width >= 640 && windowSize.width < 768;
  const cardWidth = isMobile ? 155 : isTablet ? 190 : 220;
  const cardHeight = isMobile ? 250 : isTablet ? 305 : 350;
  const iconSize = isMobile ? 9 : 11;

  // snappy transition parameters (Instagram snap effect)
  const springTransition = {
    type: "spring",
    stiffness: 450,
    damping: 30,
  };

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.08}
      dragConstraints={{
        left: -windowSize.width + (minimized ? 80 : cardWidth + 30),
        right: 20,
        top: -windowSize.height + (minimized ? 100 : cardHeight + 35),
        bottom: 20,
      }}
      initial={{ opacity: 0, scale: 0.8, y: 100 }}
      animate={{
        opacity: 1,
        scale: minimized ? 0.55 : 1,
        x: minimized ? "65%" : "0%",
        y: minimized ? "15%" : "0%",
        rotate: minimized ? -8 : 0,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={springTransition}
      onClick={() => {
        if (minimized) {
          setMinimized(false);
        }
      }}
      className={`pip-container ${minimized ? "pip-minimized" : "pip-maximized"}`}
    >
      {/* ── CARD STACK CONTAINER ── */}
      <div className="pip-stack">
        {/* 1. BACKGROUND CARD (Ace of Clubs) */}
        <div className="pip-bg-card">
          {/* Top-Left Suit & A */}
          <div className="pip-card-suit">
            <span className="pip-card-suit-letter">A</span>
            <span className="pip-card-suit-symbol">♣</span>
          </div>
        </div>

        {/* 2. FOREGROUND CARD (Ace of Diamonds) */}
        <div 
          className="pip-fg-card"
          onPointerDown={(e) => {
            if (!minimized) {
              dragControls.start(e);
            }
          }}
          style={{
            touchAction: minimized ? "auto" : "none"
          }}
        >
          {/* Corner Decorations */}
          {/* Top-Left Red Suit & A */}
          <div className="pip-fg-corner-tl">
            <span className="pip-corner-letter">Å</span>
            <span className="pip-corner-symbol">♦</span>
          </div>

          {/* Bottom-Right Red Suit & A (Inverted) */}
          <div className="pip-fg-corner-br">
            <span className="pip-corner-letter">Å</span>
            <span className="pip-corner-symbol">♦</span>
          </div>

          {/* Sleek minimalist Hover Controls */}
          {!minimized && (
            <div 
              className="pip-controls"
              onPointerDown={(e) => e.stopPropagation()} // prevent dragging on control click
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMinimized(true);
                }}
                className="pip-btn"
              >
                <Minus size={iconSize} strokeWidth={2.5} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setVisible(false);
                }}
                className="pip-btn pip-btn-close"
              >
                <X size={iconSize} strokeWidth={2.5} />
              </button>
            </div>
          )}

          {/* Central Black Play Screen */}
          <div 
            className="pip-screen"
            onPointerDown={(e) => e.stopPropagation()} // prevent dragging on iframe interactions
            style={{
              touchAction: "auto"
            }}
          >
            {/* Unmute Overlay */}
            {showUnmute && !minimized && !isInstagram && (
              <button
                onClick={handleUnmute}
                className="pip-unmute-btn"
              >
                <Volume2 size={11} className="pip-bounce" />
                Unmute
              </button>
            )}

            {/* Video embed iframe or direct HTML5 video player */}
            {isDirectVideo ? (
              <video
                src={src}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                className="pip-media-element"
              />
            ) : (
              <iframe
                ref={iframeRef}
                src={videoSrc}
                title="pip-iframe"
                className="pip-iframe-element"
                allow="autoplay; fullscreen; encrypted-media"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PipIframe;
