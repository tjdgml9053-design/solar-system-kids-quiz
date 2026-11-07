import React from 'react';
import {
  Star,
  Trophy,
  Award,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { PlayerProfile } from '../types/game';
import { soundService } from '../services/sound';
import { ttsService } from '../services/tts';

interface HeaderNavProps {
  profile: PlayerProfile;
  soundEnabled: boolean;
  ttsEnabled: boolean;
  onToggleSound: () => void;
  onToggleTTS: () => void;
  onOpenBadges: () => void;
  onOpenLeaderboard: () => void;
  onOpenLicense: () => void;
  onResetProgress: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  profile,
  soundEnabled,
  ttsEnabled,
  onToggleSound,
  onToggleTTS,
  onOpenBadges,
  onOpenLeaderboard,
  onOpenLicense,
  onResetProgress,
}) => {
  const badgeCount = profile.badges.length;

  return (
    <header className="w-full bg-slate-950/80 backdrop-blur-md border-b border-indigo-500/30 sticky top-0 z-40 px-3 sm:px-6 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo and Brand */}
        <div
          onClick={onOpenLicense}
          className="flex items-center gap-2 cursor-pointer group select-none"
          title="내 우주비행사 면허증 보기"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 p-0.5 shadow-lg group-hover:scale-105 transition-transform flex-shrink-0">
            <div className="w-full h-full bg-indigo-950 rounded-[14px] flex items-center justify-center text-xl sm:text-2xl">
              {profile.avatar}
            </div>
          </div>

          <div className="hidden xs:block">
            <div className="flex items-center gap-1.5">
              <span className="text-sm sm:text-base font-black text-white group-hover:text-yellow-300 transition-colors">
                {profile.name}
              </span>
              <span className="text-[10px] bg-yellow-400 text-indigo-950 font-black px-1.5 py-0.2 rounded-full">
                대원
              </span>
            </div>
            <div className="text-[11px] text-indigo-300 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-400" />
              <span>별빛 우주 탐험대</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Star Counter Pill */}
          <div className="flex items-center gap-1.5 bg-indigo-950/90 border border-yellow-400/40 px-2.5 py-1.5 rounded-2xl shadow-inner">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-pulse" />
            <span className="text-yellow-300 font-black text-sm">
              {profile.starsTotal}
            </span>
          </div>

          {/* Badges Button */}
          <button
            onClick={() => {
              soundService.playClick();
              onOpenBadges();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-2xl bg-gradient-to-r from-indigo-800 to-purple-800 hover:from-indigo-700 hover:to-purple-700 border border-indigo-400/40 text-yellow-300 font-black text-xs sm:text-sm shadow transition-transform active:scale-95"
            title="배지 도감"
          >
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="hidden sm:inline">배지</span>
            <span className="bg-yellow-400 text-indigo-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
              {badgeCount}
            </span>
          </button>

          {/* Leaderboard Button */}
          <button
            onClick={() => {
              soundService.playClick();
              onOpenLeaderboard();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-2xl bg-indigo-900/90 hover:bg-indigo-800 border border-indigo-400/40 text-indigo-100 font-black text-xs sm:text-sm shadow transition-transform active:scale-95"
            title="친구 랭킹"
          >
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="hidden md:inline">명예의 전당</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-2xl border transition-all active:scale-95 ${
              soundEnabled
                ? 'bg-indigo-900/90 text-yellow-300 border-indigo-400/40'
                : 'bg-slate-900/80 text-slate-500 border-slate-700'
            }`}
            title={soundEnabled ? '효과음 끄기' : '효과음 켜기'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* TTS Voice Reading Toggle */}
          <button
            onClick={onToggleTTS}
            className={`p-2 rounded-2xl border transition-all active:scale-95 ${
              ttsEnabled
                ? 'bg-indigo-900/90 text-cyan-300 border-cyan-400/40'
                : 'bg-slate-900/80 text-slate-500 border-slate-700'
            }`}
            title={ttsEnabled ? '삐뽀 음성 끄기' : '삐뽀 음성 켜기'}
          >
            {ttsEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          {/* Reset progress button */}
          <button
            onClick={onResetProgress}
            className="p-2 rounded-2xl bg-indigo-950/80 hover:bg-rose-950 text-indigo-400 hover:text-rose-300 border border-indigo-500/30 transition-all active:scale-95"
            title="탐험 처음부터 다시하기"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
