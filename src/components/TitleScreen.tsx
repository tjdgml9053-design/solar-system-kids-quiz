import React, { useState } from 'react';
import { Rocket, Trophy, Award, Sparkles, Volume2, VolumeX, HelpCircle, Star } from 'lucide-react';
import { PlayerProfile } from '../types/game';
import { RobotGuide } from './RobotGuide';
import { soundService } from '../services/sound';

interface TitleScreenProps {
  profile: PlayerProfile;
  onUpdateProfile: (updated: PlayerProfile) => void;
  onStartGame: () => void;
  onOpenLeaderboard: () => void;
  onOpenBadges: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  profile,
  onUpdateProfile,
  onStartGame,
  onOpenLeaderboard,
  onOpenBadges,
  soundEnabled,
  onToggleSound,
}) => {
  const [pilotName, setPilotName] = useState<string>(profile.name);
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);

  const handleNameBlur = () => {
    if (pilotName.trim() && pilotName !== profile.name) {
      onUpdateProfile({ ...profile, name: pilotName.trim() });
    }
  };

  const handleStart = () => {
    soundService.playRocket();
    soundService.playCorrect();
    onStartGame();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[82vh] space-y-7 relative select-none">
      {/* Floating Space Objects in Background */}
      <div className="absolute top-6 left-6 text-4xl animate-float opacity-80 pointer-events-none">
        🪐
      </div>
      <div className="absolute bottom-10 right-8 text-4xl animate-float opacity-80 pointer-events-none" style={{ animationDelay: '1.5s' }}>
        🌕
      </div>
      <div className="absolute top-12 right-12 text-3xl animate-bounce opacity-70 pointer-events-none" style={{ animationDuration: '4s' }}>
        ⭐
      </div>

      {/* Main Title Badge */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border-2 border-yellow-400/60 text-yellow-300 text-xs sm:text-sm font-extrabold shadow-lg backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>7세 어린이를 위한 신나는 태양계 탐험</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-cyan-300 drop-shadow-[0_4px_15px_rgba(250,204,21,0.5)] tracking-tight">
          별빛 우주 탐험대 🚀
        </h1>
        <p className="text-sm sm:text-lg font-bold text-indigo-200">
          가이드 로봇 삐뽀와 함께 10개 행성의 수수께끼를 풀고 별을 모아보세요!
        </p>
      </div>

      {/* Robot Welcome Mascot */}
      <div className="w-full max-w-xl">
        <RobotGuide
          message="안녕 친구야! 난 우주 탐험 가이드 로봇 삐뽀야! 나와 함께 신비한 태양계로 탐험을 떠나볼까?"
          mood="cheering"
          ttsVoiceText="안녕 친구야! 난 우주 탐험 가이드 로봇 삐뽀야! 나와 함께 신비한 태양계로 탐험을 떠나볼까?"
          autoSpeak={true}
        />
      </div>

      {/* Pilot Card (Quick Name & Character Setup) */}
      <div className="bg-indigo-950/70 border-2 border-indigo-500/40 rounded-3xl p-4 sm:p-5 w-full max-w-md shadow-xl backdrop-blur-md space-y-3">
        <div className="flex items-center justify-between text-xs text-indigo-200 font-bold">
          <span>👨‍🚀 탐험대원 프로필</span>
          <span className="text-yellow-300 flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400" /> 모은 별: {profile.starsTotal}개
          </span>
        </div>

        <div className="flex items-center gap-3 bg-black/40 p-2.5 rounded-2xl border border-white/10">
          <div className="w-12 h-12 rounded-xl bg-yellow-400/20 border border-yellow-300/40 flex items-center justify-center text-3xl shadow-inner">
            {profile.avatar}
          </div>

          <div className="flex-1">
            <label className="text-[10px] text-indigo-300 font-semibold block">대원 이름 (터치해서 수정)</label>
            <input
              type="text"
              value={pilotName}
              onChange={(e) => setPilotName(e.target.value)}
              onBlur={handleNameBlur}
              maxLength={10}
              placeholder="이름을 적어주세요"
              className="w-full bg-transparent text-white font-black text-base sm:text-lg focus:outline-none border-b border-indigo-400/40 focus:border-yellow-400 pb-0.5"
            />
          </div>
        </div>
      </div>

      {/* Giant Start Button */}
      <div className="w-full max-w-md flex flex-col items-center gap-3">
        <button
          onClick={handleStart}
          className="w-full py-5 sm:py-6 px-8 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-slate-950 font-black text-2xl sm:text-3xl rounded-3xl shadow-[0_0_30px_rgba(250,204,21,0.6)] transition-all transform hover:scale-105 active:scale-95 border-4 border-yellow-200 flex items-center justify-center gap-3"
        >
          <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-950 animate-bounce" />
          <span>게임 시작하기!</span>
        </button>

        {/* Real-time Firebase Leaderboard Link Button */}
        <button
          onClick={() => {
            soundService.playClick();
            onOpenLeaderboard();
          }}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-900/90 via-purple-900/90 to-indigo-900/90 hover:from-indigo-800 hover:to-purple-800 border-2 border-yellow-400/70 text-yellow-300 font-black text-sm sm:text-base rounded-2xl shadow-xl transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span>실시간 친구 리더보드 (명예의 전당)</span>
          </div>
          <span className="text-xs bg-yellow-400 text-indigo-950 font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
            순위 보기 &gt;
          </span>
        </button>

        {/* Secondary Navigation Buttons */}
        <div className="grid grid-cols-2 gap-2 w-full pt-1">
          <button
            onClick={() => {
              soundService.playClick();
              onOpenBadges();
            }}
            className="py-3 px-2 rounded-2xl bg-indigo-900/80 hover:bg-indigo-800 border border-indigo-400/40 text-indigo-100 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow"
          >
            <Award className="w-4 h-4 text-yellow-400" />
            <span>내 배지 도감</span>
          </button>

          <button
            onClick={() => {
              soundService.playClick();
              setShowHowToPlay(!showHowToPlay);
            }}
            className="py-3 px-2 rounded-2xl bg-indigo-900/80 hover:bg-indigo-800 border border-indigo-400/40 text-indigo-100 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>게임 방법 안내</span>
          </button>
        </div>
      </div>

      {/* How to Play Guide Modal */}
      {showHowToPlay && (
        <div className="w-full max-w-md bg-slate-900/95 border-2 border-indigo-400/60 rounded-3xl p-5 space-y-3 shadow-2xl animate-in fade-in">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h3 className="text-base font-black text-yellow-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> 우주 탐험 게임 방법
            </h3>
            <button
              onClick={() => setShowHowToPlay(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              닫기
            </button>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-indigo-200">
            <p>1. 🚀 <strong>1단계(태양)</strong>부터 차례대로 탐험해요.</p>
            <p>2. 🤖 로봇 삐뽀가 들려주는 <strong>3단계 힌트</strong>를 귀 기울여 들어요.</p>
            <p>3. ⭐ 정답을 맞히면 행성의 이름이 공개되고 <strong>황금별과 우주 배지</strong>를 모을 수 있어요!</p>
            <p>4. 🏆 모든 점수는 브라우저에 안전하게 저장되어 친구들과 랭킹을 겨룰 수 있어요.</p>
          </div>
        </div>
      )}

      {/* Sound toggle at corner */}
      <div className="flex items-center gap-2 pt-2">
        <button
          onClick={onToggleSound}
          className="flex items-center gap-1.5 text-xs text-indigo-300 hover:text-white bg-black/40 px-3 py-1.5 rounded-full border border-white/10"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-yellow-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          <span>소리 효과 {soundEnabled ? '켜짐' : '꺼짐'}</span>
        </button>
      </div>
    </div>
  );
};
