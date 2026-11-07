import React from 'react';

interface PlanetVisualProps {
  planetId: string;
  size?: number;
  isSilhouette?: boolean;
  className?: string;
}

export const PlanetVisual: React.FC<PlanetVisualProps> = ({
  planetId,
  size = 160,
  isSilhouette = false,
  className = '',
}) => {
  // If in silhouette/mystery mode for guessing
  if (isSilhouette) {
    return (
      <div
        className={`relative flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <div
          className="rounded-full bg-slate-800/90 border-4 border-dashed border-indigo-400/50 flex items-center justify-center animate-pulse-glow shadow-2xl shadow-indigo-950/80"
          style={{ width: size * 0.85, height: size * 0.85 }}
        >
          <span className="text-4xl md:text-5xl font-black text-indigo-300 drop-shadow">?</span>
        </div>
      </div>
    );
  }

  // Visual SVG planets designed with vibrant child-friendly colors
  const renderPlanetSvg = () => {
    switch (planetId) {
      case 'sun':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(255,165,0,0.8)]">
            <defs>
              <radialGradient id="sunGrad" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#fffb91" />
                <stop offset="40%" stopColor="#ff9800" />
                <stop offset="100%" stopColor="#d32f2f" />
              </radialGradient>
              <filter id="sunGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Sun Rays */}
            <g className="animate-spin" style={{ transformOrigin: 'center', animationDuration: '30s' }}>
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <polygon
                  key={deg}
                  points="100,10 106,35 94,35"
                  fill="#ffb300"
                  transform={`rotate(${deg} 100 100)`}
                  opacity="0.85"
                />
              ))}
            </g>
            <circle cx="100" cy="100" r="70" fill="url(#sunGrad)" filter="url(#sunGlow)" />
            {/* Cute Sun face */}
            <circle cx="80" cy="90" r="7" fill="#5c1500" />
            <circle cx="120" cy="90" r="7" fill="#5c1500" />
            <circle cx="82" cy="88" r="2.5" fill="#fff" />
            <circle cx="122" cy="88" r="2.5" fill="#fff" />
            {/* Rosy cheeks */}
            <ellipse cx="70" cy="102" rx="8" ry="4" fill="#ff5252" opacity="0.6" />
            <ellipse cx="130" cy="102" rx="8" ry="4" fill="#ff5252" opacity="0.6" />
            {/* Smile */}
            <path d="M 86 108 Q 100 125 114 108" fill="none" stroke="#5c1500" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
        );

      case 'mercury':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(180,180,200,0.5)]">
            <defs>
              <radialGradient id="mercuryGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#d9dbdf" />
                <stop offset="60%" stopColor="#8d909b" />
                <stop offset="100%" stopColor="#484a54" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="70" fill="url(#mercuryGrad)" />
            {/* Craters */}
            <circle cx="75" cy="70" r="14" fill="#5f626c" opacity="0.7" />
            <circle cx="72" cy="67" r="12" fill="#464952" opacity="0.9" />
            <circle cx="125" cy="115" r="18" fill="#5f626c" opacity="0.7" />
            <circle cx="123" cy="113" r="15" fill="#464952" opacity="0.9" />
            <circle cx="110" cy="65" r="9" fill="#5f626c" opacity="0.6" />
            <circle cx="65" cy="120" r="10" fill="#5f626c" opacity="0.6" />
            {/* Cute eyes */}
            <circle cx="85" cy="95" r="6" fill="#1e2025" />
            <circle cx="115" cy="95" r="6" fill="#1e2025" />
            <circle cx="87" cy="93" r="2" fill="#fff" />
            <circle cx="117" cy="93" r="2" fill="#fff" />
            <path d="M 94 106 Q 100 114 106 106" fill="none" stroke="#1e2025" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );

      case 'venus':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]">
            <defs>
              <radialGradient id="venusGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#fff3b0" />
                <stop offset="50%" stopColor="#f3b43f" />
                <stop offset="100%" stopColor="#b86915" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="70" fill="url(#venusGrad)" />
            {/* Golden cloud swirls */}
            <path d="M 40 85 Q 100 65 160 85" fill="none" stroke="#fff8cc" strokeWidth="9" opacity="0.45" strokeLinecap="round" />
            <path d="M 35 110 Q 95 90 165 110" fill="none" stroke="#e08e1b" strokeWidth="7" opacity="0.4" strokeLinecap="round" />
            <path d="M 50 135 Q 110 120 150 135" fill="none" stroke="#fff8cc" strokeWidth="8" opacity="0.35" strokeLinecap="round" />
            {/* Cute sparkle and face */}
            <circle cx="82" cy="95" r="6" fill="#572e00" />
            <circle cx="118" cy="95" r="6" fill="#572e00" />
            <circle cx="84" cy="93" r="2.5" fill="#fff" />
            <circle cx="120" cy="93" r="2.5" fill="#fff" />
            <ellipse cx="72" cy="105" rx="7" ry="3.5" fill="#ff7043" opacity="0.6" />
            <ellipse cx="128" cy="105" rx="7" ry="3.5" fill="#ff7043" opacity="0.6" />
            <path d="M 92 108 Q 100 118 108 108" fill="none" stroke="#572e00" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );

      case 'earth':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_20px_rgba(66,165,245,0.7)]">
            <defs>
              <radialGradient id="earthGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#64b5f6" />
                <stop offset="70%" stopColor="#1976d2" />
                <stop offset="100%" stopColor="#0d47a1" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="70" fill="url(#earthGrad)" />
            {/* Green Continents */}
            <path
              d="M 55 75 Q 70 60 90 70 Q 105 80 110 95 Q 85 105 60 90 Z"
              fill="#4caf50"
              opacity="0.9"
            />
            <path
              d="M 115 65 Q 140 70 145 90 Q 130 115 110 110 Q 105 90 115 65 Z"
              fill="#43a047"
              opacity="0.9"
            />
            <path
              d="M 70 120 Q 95 115 110 130 Q 90 155 75 145 Z"
              fill="#388e3c"
              opacity="0.9"
            />
            {/* White Soft Clouds */}
            <path d="M 45 60 Q 80 50 115 60" fill="none" stroke="#ffffff" strokeWidth="8" opacity="0.6" strokeLinecap="round" />
            <path d="M 80 140 Q 120 135 155 145" fill="none" stroke="#ffffff" strokeWidth="7" opacity="0.6" strokeLinecap="round" />
            {/* Happy Earth Face */}
            <circle cx="86" cy="96" r="6" fill="#052247" />
            <circle cx="114" cy="96" r="6" fill="#052247" />
            <circle cx="88" cy="94" r="2" fill="#fff" />
            <circle cx="116" cy="94" r="2" fill="#fff" />
            <ellipse cx="76" cy="106" rx="6" ry="3" fill="#ff7675" opacity="0.7" />
            <ellipse cx="124" cy="106" rx="6" ry="3" fill="#ff7675" opacity="0.7" />
            <path d="M 94 107 Q 100 118 106 107" fill="none" stroke="#052247" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );

      case 'moon':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,200,0.6)]">
            <defs>
              <radialGradient id="moonGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#fffde7" />
                <stop offset="60%" stopColor="#e0e0e0" />
                <stop offset="100%" stopColor="#9e9e9e" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="70" fill="url(#moonGrad)" />
            {/* Moon Craters */}
            <circle cx="65" cy="75" r="12" fill="#bdbdbd" opacity="0.6" />
            <circle cx="130" cy="80" r="15" fill="#bdbdbd" opacity="0.6" />
            <circle cx="85" cy="130" r="14" fill="#bdbdbd" opacity="0.6" />
            <circle cx="120" cy="130" r="9" fill="#bdbdbd" opacity="0.5" />
            {/* Sleepy cute moon eyes */}
            <path d="M 80 94 Q 87 100 94 94" fill="none" stroke="#424242" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 106 94 Q 113 100 120 94" fill="none" stroke="#424242" strokeWidth="3.5" strokeLinecap="round" />
            <ellipse cx="75" cy="102" rx="6" ry="3" fill="#ffab91" opacity="0.7" />
            <ellipse cx="125" cy="102" rx="6" ry="3" fill="#ffab91" opacity="0.7" />
            <path d="M 97 106 Q 100 112 103 106" fill="none" stroke="#424242" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'mars':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_20px_rgba(244,81,30,0.7)]">
            <defs>
              <radialGradient id="marsGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ff8a65" />
                <stop offset="60%" stopColor="#e64a19" />
                <stop offset="100%" stopColor="#8d1f05" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="70" fill="url(#marsGrad)" />
            {/* Mars canyons and dust marks */}
            <path d="M 50 85 Q 90 95 130 80" fill="none" stroke="#bf360c" strokeWidth="7" opacity="0.6" strokeLinecap="round" />
            <path d="M 60 120 Q 110 110 150 125" fill="none" stroke="#8d1f05" strokeWidth="6" opacity="0.6" strokeLinecap="round" />
            <circle cx="130" cy="65" r="8" fill="#ffab91" opacity="0.8" /> {/* Olympus Mons peak */}
            {/* Cute Rover explorer antenna sticker on Mars */}
            <circle cx="85" cy="98" r="6" fill="#3e1307" />
            <circle cx="115" cy="98" r="6" fill="#3e1307" />
            <circle cx="87" cy="96" r="2" fill="#fff" />
            <circle cx="117" cy="96" r="2" fill="#fff" />
            <path d="M 94 110 Q 100 118 106 110" fill="none" stroke="#3e1307" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );

      case 'jupiter':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(230,138,46,0.7)]">
            <defs>
              <radialGradient id="jupGrad" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ffe0b2" />
                <stop offset="50%" stopColor="#e68a2e" />
                <stop offset="100%" stopColor="#873e04" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="74" fill="url(#jupGrad)" />
            {/* Colorful Gas Bands */}
            <path d="M 28 65 Q 100 55 172 65" fill="none" stroke="#b05d15" strokeWidth="9" opacity="0.6" strokeLinecap="round" />
            <path d="M 26 85 Q 100 78 174 85" fill="none" stroke="#fff3e0" strokeWidth="7" opacity="0.5" strokeLinecap="round" />
            <path d="M 26 115 Q 100 125 174 115" fill="none" stroke="#7a3400" strokeWidth="10" opacity="0.6" strokeLinecap="round" />
            <path d="M 32 135 Q 100 145 168 135" fill="none" stroke="#ffe0b2" strokeWidth="6" opacity="0.5" strokeLinecap="round" />
            {/* The Great Red Spot Eye */}
            <ellipse cx="135" cy="122" rx="16" ry="10" fill="#c62828" opacity="0.85" />
            <ellipse cx="135" cy="122" rx="11" ry="6" fill="#e53935" />
            {/* Giant friendly face */}
            <circle cx="80" cy="95" r="7" fill="#421f00" />
            <circle cx="112" cy="95" r="7" fill="#421f00" />
            <circle cx="82" cy="93" r="2.5" fill="#fff" />
            <circle cx="114" cy="93" r="2.5" fill="#fff" />
            <path d="M 90 108 Q 96 118 104 108" fill="none" stroke="#421f00" strokeWidth="4" strokeLinecap="round" />
          </svg>
        );

      case 'saturn':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_20px_rgba(255,224,130,0.7)]">
            <defs>
              <radialGradient id="satGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#fff9c4" />
                <stop offset="60%" stopColor="#ffd54f" />
                <stop offset="100%" stopColor="#b78103" />
              </radialGradient>
            </defs>
            {/* Back part of ring */}
            <g transform="rotate(-20 100 100)">
              <ellipse cx="100" cy="100" rx="95" ry="24" fill="none" stroke="#fbc02d" strokeWidth="12" opacity="0.45" />
              <ellipse cx="100" cy="100" rx="84" ry="20" fill="none" stroke="#fff176" strokeWidth="8" opacity="0.7" />
            </g>
            {/* Planet Body */}
            <circle cx="100" cy="100" r="58" fill="url(#satGrad)" />
            {/* Bands on Saturn */}
            <path d="M 44 88 Q 100 82 156 88" fill="none" stroke="#ffca28" strokeWidth="6" opacity="0.5" />
            <path d="M 46 110 Q 100 116 154 110" fill="none" stroke="#d79b00" strokeWidth="6" opacity="0.4" />
            {/* Front part of ring (overlapping planet) */}
            <g transform="rotate(-20 100 100)">
              <path
                d="M 5 100 A 95 24 0 0 0 195 100"
                fill="none"
                stroke="#fbc02d"
                strokeWidth="12"
                opacity="0.9"
              />
              <path
                d="M 16 100 A 84 20 0 0 0 184 100"
                fill="none"
                stroke="#fff9c4"
                strokeWidth="7"
                opacity="0.95"
              />
            </g>
            {/* Cute Face */}
            <circle cx="86" cy="96" r="6" fill="#4e342e" />
            <circle cx="114" cy="96" r="6" fill="#4e342e" />
            <circle cx="88" cy="94" r="2" fill="#fff" />
            <circle cx="116" cy="94" r="2" fill="#fff" />
            <ellipse cx="76" cy="105" rx="6" ry="3" fill="#ffb300" opacity="0.7" />
            <ellipse cx="124" cy="105" rx="6" ry="3" fill="#ffb300" opacity="0.7" />
            <path d="M 94 107 Q 100 116 106 107" fill="none" stroke="#4e342e" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );

      case 'uranus':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_20px_rgba(77,208,225,0.7)]">
            <defs>
              <radialGradient id="uraGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#e0f7fa" />
                <stop offset="60%" stopColor="#4dd0e1" />
                <stop offset="100%" stopColor="#00838f" />
              </radialGradient>
            </defs>
            {/* Vertical faint ring because Uranus rolls on its side! */}
            <ellipse cx="100" cy="100" rx="20" ry="85" fill="none" stroke="#b2ebf2" strokeWidth="4" opacity="0.6" transform="rotate(15 100 100)" />
            <circle cx="100" cy="100" r="65" fill="url(#uraGrad)" />
            {/* Cool crystal atmosphere */}
            <path d="M 40 85 Q 100 80 160 85" fill="none" stroke="#ffffff" strokeWidth="5" opacity="0.4" strokeLinecap="round" />
            <path d="M 45 115 Q 100 120 155 115" fill="none" stroke="#00acc1" strokeWidth="6" opacity="0.4" strokeLinecap="round" />
            {/* Playful side-tilted face (demonstrating it rolls on its side!) */}
            <g transform="rotate(25 100 100)">
              <circle cx="86" cy="96" r="6" fill="#004d40" />
              <circle cx="114" cy="96" r="6" fill="#004d40" />
              <circle cx="88" cy="94" r="2" fill="#fff" />
              <circle cx="116" cy="94" r="2" fill="#fff" />
              <path d="M 94 107 Q 100 117 106 107" fill="none" stroke="#004d40" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          </svg>
        );

      case 'neptune':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_20px_rgba(41,121,255,0.8)]">
            <defs>
              <radialGradient id="nepGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#82b1ff" />
                <stop offset="55%" stopColor="#2979ff" />
                <stop offset="100%" stopColor="#0d47a1" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="66" fill="url(#nepGrad)" />
            {/* High speed storm lines */}
            <path d="M 38 75 Q 90 65 162 75" fill="none" stroke="#e3f2fd" strokeWidth="6" opacity="0.6" strokeLinecap="round" />
            <path d="M 35 105 Q 100 95 165 105" fill="none" stroke="#1565c0" strokeWidth="8" opacity="0.5" strokeLinecap="round" />
            {/* Great Dark Spot storm */}
            <ellipse cx="70" cy="115" rx="13" ry="8" fill="#0a2a6e" opacity="0.8" />
            {/* Cool frosty eyes */}
            <circle cx="86" cy="94" r="6" fill="#051937" />
            <circle cx="114" cy="94" r="6" fill="#051937" />
            <circle cx="88" cy="92" r="2" fill="#fff" />
            <circle cx="116" cy="92" r="2" fill="#fff" />
            <ellipse cx="76" cy="103" rx="6" ry="3" fill="#80d8ff" opacity="0.7" />
            <ellipse cx="124" cy="103" rx="6" ry="3" fill="#80d8ff" opacity="0.7" />
            <path d="M 94 106 Q 100 115 106 106" fill="none" stroke="#051937" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );

      default:
        return (
          <div className="w-full h-full rounded-full bg-indigo-600 flex items-center justify-center">
            🪐
          </div>
        );
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center transition-transform hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
    >
      {renderPlanetSvg()}
    </div>
  );
};
