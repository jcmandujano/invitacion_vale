import type { CeremonyPhase } from '../domain/types';

const orbitSparks = Array.from({ length: 9 }, (_, index) => index);

export function MagicHat({ phase }: { phase: CeremonyPhase }) {
  return (
    <div className="magic-hat" data-phase={phase} aria-hidden="true">
      <div className="hat-aura hat-aura-outer" />
      <div className="hat-aura hat-aura-inner" />
      <div className="hat-ritual-ring">
        <span>✦</span><span>·</span><span>◇</span><span>·</span><span>✦</span><span>·</span><span>◇</span><span>·</span>
      </div>
      <div className="hat-orbit-sparks">
        {orbitSparks.map((spark) => <i className="hat-spark" key={spark} />)}
      </div>
      <div className="hat-bob">
        <svg className="hat-svg" viewBox="0 0 360 330">
          <defs>
            <linearGradient id="hat-crown" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#9a7145" /><stop offset=".34" stopColor="#69462b" />
              <stop offset=".72" stopColor="#452b1c" /><stop offset="1" stopColor="#24170f" />
            </linearGradient>
            <linearGradient id="hat-brim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#805a3a" /><stop offset=".55" stopColor="#503220" /><stop offset="1" stopColor="#281810" />
            </linearGradient>
            <radialGradient id="hat-highlight" cx="38%" cy="28%" r="70%">
              <stop offset="0" stopColor="#d5aa6d" stopOpacity=".48" /><stop offset="1" stopColor="#6d452a" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="mouth-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2a0f10" /><stop offset="1" stopColor="#0e0707" />
            </linearGradient>
            <filter id="hat-shadow" x="-35%" y="-35%" width="170%" height="190%">
              <feDropShadow dx="0" dy="14" stdDeviation="13" floodColor="#05030a" floodOpacity=".72" />
            </filter>
            <filter id="eye-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="2.8" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <ellipse className="hat-floor-shadow" cx="181" cy="286" rx="112" ry="18" fill="#050308" opacity=".62" />
          <g className="hat-character" filter="url(#hat-shadow)">
            <g className="hat-brim-group">
              <path className="hat-brim" d="M23 247c28-22 70-26 103-29 34-3 58 4 87 2 38-3 59-17 97-4 17 6 31 18 27 29-5 15-40 19-72 23-51 7-90 18-145 12-42-5-82-8-102-20-8-5-6-10 5-13Z" fill="url(#hat-brim)" stroke="#a77c46" strokeWidth="3" />
              <path className="hat-brim-light" d="M39 247c54-10 83-4 122-8 46-5 83-17 142-10" fill="none" stroke="#d1a467" strokeWidth="4" strokeLinecap="round" opacity=".25" />
              <path className="hat-brim-rim" d="M80 267c54 12 145 9 218-16" fill="none" stroke="#c09655" strokeWidth="4" strokeLinecap="round" opacity=".38" />
            </g>
            <g className="hat-crown-group">
              <path className="hat-crown" d="M92 232c20-37 35-77 42-119 5-32-5-49 11-77 7-12 18-25 27-20 12 7 8 39 26 45 19 7 46-20 56-11 11 10-15 40-15 69 0 41 27 71 40 105-36 15-67 17-94 12-34-6-64 7-93-4Z" fill="url(#hat-crown)" stroke="#a77c46" strokeWidth="3" strokeLinejoin="round" />
              <path className="hat-crown-highlight" d="M151 37c14 31 11 61 5 90-8 42-27 69-36 96 14-4 29-6 43-4 13-39 30-70 28-106-1-25-12-42-21-69-5-15-10-18-19-7Z" fill="url(#hat-highlight)" />
              <path className="hat-tip-fold" d="M145 37c14 24 20 36 53 25" fill="none" stroke="#c2955b" strokeWidth="5" strokeLinecap="round" opacity=".5" />
              <path className="hat-side-fold" d="M237 77c-15 22-19 42-14 68M132 94c15 10 27 13 42 12" fill="none" stroke="#2d1a11" strokeWidth="6" strokeLinecap="round" opacity=".55" />
              <g className="hat-stitches" fill="none" stroke="#d1a467" strokeWidth="2.4" strokeLinecap="round" opacity=".62">
                <path d="M109 205l8 4m-3-13 8 4m-3-14 8 4m-2-14 7 4" /><path d="M252 183l9-3m-11-7 8-4m-12-6 8-5" />
              </g>
            </g>
            <g className="hat-face">
              <g className="hat-brows">
                <path className="hat-brow hat-brow-left" d="M127 128c24-16 46-17 64-5" fill="none" stroke="#28160e" strokeWidth="10" strokeLinecap="round" />
                <path className="hat-brow hat-brow-right" d="M203 121c16-9 30-7 40 3" fill="none" stroke="#28160e" strokeWidth="9" strokeLinecap="round" />
              </g>
              <g className="hat-eyes" filter="url(#eye-glow)">
                <g className="hat-eye hat-eye-left"><path d="M137 131c18 12 36 12 49-2" fill="#1b120c" stroke="#d7b66a" strokeWidth="4" strokeLinecap="round" /><circle className="hat-pupil" cx="164" cy="136" r="3.2" fill="#ffe8a5" /></g>
                <g className="hat-eye hat-eye-right"><path d="M208 128c11 8 22 8 30-1" fill="#1b120c" stroke="#d7b66a" strokeWidth="4" strokeLinecap="round" /><circle className="hat-pupil" cx="225" cy="132" r="2.8" fill="#ffe8a5" /></g>
              </g>
              <path className="hat-nose" d="M184 136c-8 21-3 30 12 34" fill="none" stroke="#27160f" strokeWidth="7" strokeLinecap="round" />
              <g className="hat-mouth-group">
                <path className="hat-mouth" d="M150 185c26 19 54 20 80-1-22 36-54 42-80 1Z" fill="url(#mouth-glow)" stroke="#9b6c3d" strokeWidth="3" />
                <path className="hat-mouth-line" d="M163 198c17 8 35 8 52-2" fill="none" stroke="#c48b5a" strokeWidth="2" strokeLinecap="round" opacity=".48" />
              </g>
              <path className="hat-cheek-folds" d="M110 219c24-10 43-10 61-4M222 212c17-4 29-2 42 4" fill="none" stroke="#b17b43" strokeWidth="4" opacity=".55" strokeLinecap="round" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
