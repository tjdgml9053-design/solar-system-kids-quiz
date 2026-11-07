import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, MessageCircle } from 'lucide-react';
import { soundService } from '../services/sound';
import { ttsService } from '../services/tts';

export type RobotMood = 'idle' | 'speaking' | 'thinking' | 'cheering' | 'encouraging';

interface RobotGuideProps {
  message: string;
  mood?: RobotMood;
  ttsVoiceText?: string;
  autoSpeak?: boolean;
  onHearVoice?: () => void;
  className?: string;
}

export const RobotGuide: React.FC<RobotGuideProps> = ({
  message,
  mood = 'idle',
  ttsVoiceText,
  autoSpeak = true,
  onHearVoice,
  className = ''
}) => {
  const [isSpeakingState, setIsSpeakingState] = useState(false);
  const [currentPraise, setCurrentPraise] = useState<string | null>(null);

  const voiceToRead = ttsVoiceText || message;

  // Auto-speak when message changes if enabled
  useEffect(() => {
    if (autoSpeak && voiceToRead) {
      handleSpeak();
    }
    return () => {
      ttsService.stop();
    };
  }, [voiceToRead, autoSpeak]);

  const handleSpeak = () => {
    soundService.playRobotBoop();
    setIsSpeakingState(true);
    if (onHearVoice) onHearVoice();

    ttsService.speak(voiceToRead, () => {
      setIsSpeakingState(false);
    });
  };

  const handleRobotClick = () => {
    soundService.playRobotBoop();
    const praises = [
      '삐뽀삐뽀! 넌 최고의 우주 탐험가야!',
      '멋져! 다음 힌트도 척척 맞힐 수 있어!',
      '삐뽀가 옆에서 열심히 도와줄게!',
      '별빛 대원 출발! 태양계를 정복하자!'
    ];
    const picked = praises[Math.floor(Math.random() * praises.length)];
    setCurrentPraise(picked);
    setIsSpeakingState(true);
    ttsService.speak(picked, () => {
      setIsSpeakingState(false);
      setTimeout(() => setCurrentPraise(null), 3000);
    });
  };

  const currentMood = isSpeakingState ? 'speaking' : mood;

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-5 ${className}`}>
      {/* Robot Character Graphic */}
      <div
        onClick={handleRobotClick}
        className="relative group cursor-pointer flex-shrink-0 transition-transform active:scale-95 select-none"
        title="삐뽀를 콕 눌러보세요!"
      >
        <div className="w-24 h-28 sm:w-28 sm:h-32 relative animate-float">
          <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-xl">
            <defs>
              <linearGradient id="robotBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e0e7ff" />
                <stop offset="50%" stopColor="#c7d2fe" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
              <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <radialGradient id="antennaGlow">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#eab308" />
              </radialGradient>
            </defs>

            {/* Antenna Pole */}
            <line x1="60" y1="32" x2="60" y2="15" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />
            {/* Antenna Bulb */}
            <circle
              cx="60"
              cy="12"
              r={currentMood === 'speaking' || isSpeakingState ? '9' : '7'}
              fill={currentMood === 'cheering' ? '#f43f5e' : 'url(#antennaGlow)'}
              className={currentMood === 'speaking' || isSpeakingState ? 'animate-ping' : ''}
            />
            <circle cx="60" cy="12" r="7" fill={currentMood === 'cheering' ? '#f43f5e' : '#facc15'} />

            {/* Robot Head (Rounded Screen Box) */}
            <rect x="25" y="30" width="70" height="52" rx="16" fill="url(#robotBodyGrad)" stroke="#4f46e5" strokeWidth="3" />
            {/* Robot Ears / Side bolts */}
            <rect x="18" y="46" width="7" height="18" rx="3" fill="#6366f1" />
            <rect x="95" y="46" width="7" height="18" rx="3" fill="#6366f1" />

            {/* Visor / Face Screen */}
            <rect x="33" y="38" width="54" height="36" rx="10" fill="url(#screenGrad)" />

            {/* Robot Eyes by Mood */}
            {currentMood === 'cheering' ? (
              // Star / Heart Eyes
              <g fill="#f43f5e">
                <text x="40" y="62" fontSize="18" fontWeight="bold">★</text>
                <text x="66" y="62" fontSize="18" fontWeight="bold">★</text>
              </g>
            ) : currentMood === 'thinking' ? (
              // One curious eye, one blinking
              <g fill="#38bdf8">
                <circle cx="48" cy="54" r="6" />
                <circle cx="50" cy="52" r="2" fill="#fff" />
                <path d="M 68 56 Q 74 50 80 56" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none" />
              </g>
            ) : currentMood === 'speaking' ? (
              // Big round bright talking eyes
              <g fill="#38bdf8">
                <circle cx="48" cy="54" r="7" />
                <circle cx="72" cy="54" r="7" />
                <circle cx="50" cy="52" r="2.5" fill="#fff" />
                <circle cx="74" cy="52" r="2.5" fill="#fff" />
                {/* Talking mouth wave */}
                <ellipse cx="60" cy="65" rx="5" ry="3" fill="#facc15" className="animate-pulse" />
              </g>
            ) : (
              // Happy gentle smiling eyes
              <g>
                <circle cx="48" cy="54" r="6" fill="#38bdf8" />
                <circle cx="72" cy="54" r="6" fill="#38bdf8" />
                <circle cx="50" cy="52" r="2" fill="#fff" />
                <circle cx="74" cy="52" r="2" fill="#fff" />
                {/* Gentle Smile */}
                <path d="M 54 64 Q 60 69 66 64" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </g>
            )}

            {/* Robot Neck */}
            <rect x="52" y="82" width="16" height="7" rx="2" fill="#6366f1" />

            {/* Robot Body */}
            <rect x="30" y="89" width="60" height="38" rx="12" fill="url(#robotBodyGrad)" stroke="#4f46e5" strokeWidth="3" />

            {/* Body Chest Screen: Heart or Battery */}
            <rect x="42" y="96" width="36" height="20" rx="6" fill="#1e1b4b" />
            <path
              d="M 54 106 L 58 102 L 62 107 L 66 103"
              fill="none"
              stroke={currentMood === 'cheering' ? '#f43f5e' : '#4ade80'}
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Left Robotic Arm */}
            <path
              d={currentMood === 'cheering' ? "M 30 96 Q 16 80 18 68" : "M 30 98 Q 15 110 24 122"}
              fill="none"
              stroke="#6366f1"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Right Robotic Arm (Waving) */}
            <path
              d={currentMood === 'cheering' ? "M 90 96 Q 104 80 102 68" : "M 90 98 Q 108 92 104 78"}
              fill="none"
              stroke="#6366f1"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle cx={currentMood === 'cheering' ? "102" : "104"} cy={currentMood === 'cheering' ? "68" : "78"} r="5" fill="#facc15" />
          </svg>
        </div>

        {/* Floating Name Badge */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-indigo-900/90 text-yellow-300 text-xs px-2.5 py-0.5 rounded-full font-bold border border-yellow-400/50 shadow whitespace-nowrap flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-yellow-400" />
          가이드 로봇 삐뽀
        </div>
      </div>

      {/* Speech Bubble for Kids */}
      <div className="flex-1 w-full bg-gradient-to-r from-indigo-900/90 to-purple-900/90 border-2 border-indigo-400/60 rounded-3xl p-4 sm:p-5 shadow-xl relative backdrop-blur-md">
        {/* Pointer Arrow pointing toward robot */}
        <div className="hidden sm:block absolute -left-2.5 top-8 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-indigo-400/60" />

        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 font-extrabold text-sm flex items-center gap-1">
                <MessageCircle className="w-4 h-4" /> 삐뽀의 행성 탐험 안내:
              </span>
              {isSpeakingState && (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-300 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-400/40 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  말하는 중...
                </span>
              )}
            </div>

            <p className="text-white text-base sm:text-lg font-bold leading-relaxed tracking-wide">
              {currentPraise || message}
            </p>
          </div>

          {/* Voice button for 7yo kids to listen anytime */}
          <button
            onClick={handleSpeak}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-2xl font-black text-sm transition-all transform active:scale-95 shadow-md ${
              isSpeakingState
                ? 'bg-yellow-400 text-indigo-950 ring-4 ring-yellow-300/50 scale-105'
                : 'bg-indigo-600 hover:bg-indigo-500 text-yellow-200 border border-indigo-400/50 hover:shadow-indigo-500/50'
            }`}
            title="소리로 다시 듣기"
          >
            <Volume2 className={`w-5 h-5 ${isSpeakingState ? 'animate-bounce text-indigo-950' : 'text-yellow-300'}`} />
            <span className="hidden xs:inline">목소리 듣기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
