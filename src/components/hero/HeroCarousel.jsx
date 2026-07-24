// src/components/hero/HeroCarousel.jsx
// Reusable Hero Carousel component with auto-play, manual controls, and smooth transitions

import { useState, useEffect, useRef } from "react";
import HeroSlide from "./HeroSlide";
import HeroProgress from "./HeroProgress";
import HeroControls from "./HeroControls";

export default function HeroCarousel({ slides, autoPlayInterval = 7000 }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);

  // Auto-play logic
  useEffect(() => {
    if (isHovered || slides.length <= 1) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(autoPlayRef.current);
  }, [isHovered, slides.length, autoPlayInterval]);

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  if (!slides || slides.length === 0) {
    return <div style={{ height: 400, background: "#f3f4f6" }} />;
  }

  return (
    <>
      <style>{`
        .hc-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #000;
        }
        .hc-slides-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          background: #000;
        }
        .hc-slides {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hc-slide-container {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.6s ease-in-out;
          z-index: 1;
        }
        .hc-slide-container.active {
          opacity: 1;
          z-index: 2;
        }
        .hc-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%);
          z-index: 2;
        }
        .hc-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 40px 20px;
          z-index: 3;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          color: #fff;
        }
        @media (min-width: 768px) {
          .hc-content {
            padding: 60px 40px;
            bottom: auto;
            top: 50%;
            transform: translateY(-50%);
            left: 40px;
            right: auto;
            width: 50%;
            background: none;
          }
        }
        .hc-counter {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0,0,0,0.6);
          color: #fff;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          z-index: 4;
          backdrop-filter: blur(10px);
        }
      `}</style>

      <div 
        className="hc-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="hc-slides-wrapper">
          <div className="hc-slides">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`hc-slide-container ${index === currentSlide ? "active" : ""}`}
              >
                <HeroSlide slide={slide} />
              </div>
            ))}
          </div>
        </div>

        {/* Counter */}
        {slides.length > 1 && (
          <div className="hc-counter">
            {currentSlide + 1} / {slides.length}
          </div>
        )}

        {/* Progress Bar */}
        {slides.length > 1 && (
          <HeroProgress 
            current={currentSlide}
            total={slides.length}
            isHovered={isHovered}
          />
        )}

        {/* Controls */}
        {slides.length > 1 && (
          <HeroControls
            onPrev={prevSlide}
            onNext={nextSlide}
            onDotClick={goToSlide}
            currentSlide={currentSlide}
            totalSlides={slides.length}
          />
        )}
      </div>
    </>
  );
}
