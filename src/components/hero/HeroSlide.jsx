// src/components/hero/HeroSlide.jsx
// Individual slide component with image, title, description, and CTAs

export default function HeroSlide({ slide }) {
  return (
    <>
      <style>{`
        .hs-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .hs-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%);
        }
        .hs-content {
          position: absolute;
          top: 50%;
          left: 40px;
          transform: translateY(-50%);
          max-width: 600px;
          z-index: 3;
          color: #fff;
        }
        @media (max-width: 768px) {
          .hs-content {
            bottom: 40px;
            top: auto;
            left: 20px;
            right: 20px;
            transform: none;
            max-width: 100%;
          }
        }
        .hs-title {
          font-size: 48px;
          font-weight: 900;
          margin-bottom: 12px;
          line-height: 1.1;
          letter-spacing: -1px;
        }
        @media (max-width: 768px) {
          .hs-title { font-size: 32px; }
        }
        .hs-subtitle {
          font-size: 18px;
          color: rgba(255,255,255,0.9);
          margin-bottom: 24px;
          line-height: 1.5;
        }
        @media (max-width: 768px) {
          .hs-subtitle { font-size: 15px; margin-bottom: 16px; }
        }
        .hs-description {
          font-size: 14px;
          color: rgba(255,255,255,0.8);
          margin-bottom: 24px;
          line-height: 1.6;
        }
        .hs-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .hs-buttons { flex-direction: column; }
        }
        .hs-btn {
          padding: 14px 28px;
          border-radius: 10px;
          border: none;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
          text-align: center;
        }
        .hs-btn-primary {
          background: #16a34a;
          color: #fff;
          box-shadow: 0 4px 14px rgba(22, 163, 74, 0.4);
        }
        .hs-btn-primary:hover {
          background: #15803d;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(22, 163, 74, 0.6);
        }
        .hs-btn-secondary {
          background: rgba(255,255,255,0.15);
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.3);
          backdrop-filter: blur(10px);
        }
        .hs-btn-secondary:hover {
          background: rgba(255,255,255,0.25);
          border-color: rgba(255,255,255,0.5);
          transform: translateY(-2px);
        }
      `}</style>

      <div 
        className="hs-slide"
        style={{
          backgroundImage: `url(${slide.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hs-overlay" />
        
        <div className="hs-content">
          <h2 className="hs-title">{slide.title}</h2>
          
          {slide.subtitle && (
            <p className="hs-subtitle">{slide.subtitle}</p>
          )}
          
          {slide.description && (
            <p className="hs-description">{slide.description}</p>
          )}
          
          {slide.features && slide.features.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: 8,
              }}>
                {slide.features.map((feature, idx) => (
                  <div key={idx} style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.85)",
                    padding: "6px 0",
                  }}>
                    ✓ {feature}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {slide.cta && (
            <div className="hs-buttons">
              <a 
                href={slide.cta.primary.href}
                className="hs-btn hs-btn-primary"
              >
                {slide.cta.primary.label}
              </a>
              {slide.cta.secondary && (
                <a 
                  href={slide.cta.secondary.href}
                  className="hs-btn hs-btn-secondary"
                >
                  {slide.cta.secondary.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
