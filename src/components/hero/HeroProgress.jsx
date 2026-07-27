// src/components/hero/HeroProgress.jsx
// Progress bar showing current slide position

export default function HeroProgress({ current, total, isHovered }) {
  return (
    <>
      <style>{`
        .hp-container {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: rgba(255,255,255,0.1);
          z-index: 4;
        }
        .hp-bar {
          height: 100%;
          background: linear-gradient(90deg, #16a34a, #4ade80);
          transition: width 0.3s ease;
          box-shadow: 0 0 10px rgba(22, 163, 74, 0.5);
        }
      `}</style>

      <div className="hp-container">
        <div 
          className="hp-bar"
          style={{
            width: `${((current + 1) / total) * 100}%`,
          }}
        />
      </div>
    </>
  );
}
