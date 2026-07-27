// src/components/hero/HeroControls.jsx
// Navigation controls: prev/next buttons and dot indicators

export default function HeroControls({ onPrev, onNext, onDotClick, currentSlide, totalSlides }) {
  return (
    <>
      <style>{`
        .hc-controls {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 16px;
          z-index: 4;
        }
        @media (max-width: 768px) {
          .hc-controls { bottom: 12px; gap: 12px; }
        }
        .hc-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(0,0,0,0.5);
          border: 1.5px solid rgba(255,255,255,0.3);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: all 0.2s;
          backdrop-filter: blur(10px);
        }
        .hc-btn:hover {
          background: rgba(0,0,0,0.7);
          border-color: rgba(255,255,255,0.5);
          transform: scale(1.05);
        }
        .hc-dots {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .hc-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          border: 1.5px solid rgba(255,255,255,0.4);
          cursor: pointer;
          transition: all 0.2s;
        }
        .hc-dot:hover {
          background: rgba(255,255,255,0.5);
          transform: scale(1.1);
        }
        .hc-dot.active {
          background: #16a34a;
          border-color: #16a34a;
          width: 28px;
          border-radius: 6px;
        }
        @media (max-width: 640px) {
          .hc-btn { width: 36px; height: 36px; font-size: 16px; }
          .hc-dot { width: 8px; height: 8px; }
          .hc-dot.active { width: 24px; }
        }
      `}</style>

      <div className="hc-controls">
        <button 
          className="hc-btn"
          onClick={onPrev}
          aria-label="Previous slide"
          title="Previous"
        >
          ‹
        </button>

        <div className="hc-dots">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              className={`hc-dot ${idx === currentSlide ? "active" : ""}`}
              onClick={() => onDotClick(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === currentSlide ? "true" : "false"}
            />
          ))}
        </div>

        <button 
          className="hc-btn"
          onClick={onNext}
          aria-label="Next slide"
          title="Next"
        >
          ›
        </button>
      </div>
    </>
  );
}
