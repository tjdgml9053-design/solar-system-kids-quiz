import React from 'react';
import { Star, Lock, CheckCircle2, Rocket, Sparkles, Trophy } from 'lucide-react';
import { PlanetData, StageProgress } from '../types/game';
import { PLANETS_DATA } from '../data/planets';
import { PlanetVisual } from './PlanetVisual';
import { soundService } from '../services/sound';

interface SolarSystemMapProps {
  progress: Record<string, StageProgress>;
  currentPlanetId: string | null;
  onSelectPlanet: (planet: PlanetData) => void;
  onOpenBadges: () => void;
  onOpenLeaderboard: () => void;
}

export const SolarSystemMap: React.FC<SolarSystemMapProps> = ({
  progress,
  onSelectPlanet,
  onOpenBadges,
  onOpenLeaderboard,
}) => {
  const totalStars = Object.values(progress).reduce((acc, p) => acc + (p.stars || 0), 0);
  const clearedStages = Object.values(progress).filter(p => p.cleared).length;

  const handleStageClick = (planet: PlanetData, isUnlocked: boolean) => {
    if (!isUnlocked) {
      soundService.playWrong();
      return;
    }
    soundService.playRocket();
    onSelectPlanet(planet);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Top Welcome & Mission Banner for Kindergarten */}
      <div className="bg-gradient-to-r from-purple-900/80 via-indigo-900/80 to-blue-900/80 rounded-3xl p-6 border-2 border-indigo-500/40 shadow-2xl backdrop-blur-md relative overflow-hidden">
        {/* Decorative Space Dust */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-5 relative z-10">
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-300/40 text-yellow-300 text-xs sm:text-sm font-extrabold">
              <Sparkles className="w-4 h-4" /> 7세 우주 탐험대 본부
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow">
              태양계 우주 탐험 지도 🚀
            </h2>
            <p className="text-indigo-200 text-sm sm:text-base font-bold">
              행성을 하나씩 콕 터치해서 퀴즈를 풀고, 반짝이는 별과 배지를 모아보세요!
            </p>
          </div>

          {/* Quick Counters */}
          <div className="flex items-center gap-3 bg-black/40 p-3 rounded-2xl border border-white/10 backdrop-blur">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-yellow-500/20 border border-yellow-400/40">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />
              <div>
                <div className="text-[11px] text-yellow-200 font-bold">모은 별</div>
                <div className="text-xl font-black text-yellow-300">{totalStars} / 30</div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/20 border border-blue-400/40">
              <Rocket className="w-6 h-6 text-cyan-400" />
              <div>
                <div className="text-[11px] text-cyan-200 font-bold">탐험 성공</div>
                <div className="text-xl font-black text-cyan-300">{clearedStages} / 10</div>
              </div>
            </div>

            <button
              onClick={() => {
                soundService.playClick();
                onOpenBadges();
              }}
              className="p-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-xl shadow-lg transition-transform active:scale-95 flex flex-col items-center justify-center text-xs"
              title="배지 도감 보기"
            >
              <Trophy className="w-5 h-5 mb-0.5" />
              <span>배지함</span>
            </button>
          </div>
        </div>
      </div>

      {/* Orbit Stages Grid / Path */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 pt-2">
        {PLANETS_DATA.map((planet, index) => {
          const stageProg = progress[planet.id] || {
            unlocked: index === 0,
            cleared: false,
            stars: 0
          };
          const isUnlocked = stageProg.unlocked || index === 0;
          const isCleared = stageProg.cleared;
          const starsCount = stageProg.stars || 0;

          return (
            <div
              key={planet.id}
              onClick={() => handleStageClick(planet, isUnlocked)}
              className={`group relative rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-between transition-all duration-300 border-2 select-none cursor-pointer ${
                isUnlocked
                  ? 'bg-gradient-to-b from-slate-900/90 to-indigo-950/90 border-indigo-500/50 hover:border-yellow-400 hover:shadow-2xl hover:shadow-indigo-500/30 hover:-translate-y-2'
                  : 'bg-slate-900/50 border-slate-700/50 opacity-60 cursor-not-allowed'
              }`}
            >
              {/* Order Step Badge */}
              <div className="w-full flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-800/80 text-indigo-200 border border-indigo-400/30">
                  {planet.order}단계
                </span>
                {isCleared ? (
                  <span className="flex items-center gap-1 text-xs font-black text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-400/40">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 성공!
                  </span>
                ) : !isUnlocked ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full">
                    <Lock className="w-3.5 h-3.5" /> 잠김
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-black text-yellow-300 bg-yellow-950/60 px-2 py-0.5 rounded-full border border-yellow-400/30 animate-pulse">
                    <Rocket className="w-3 h-3 text-yellow-400" /> 출발 대기
                  </span>
                )}
              </div>

              {/* Planet Graphic */}
              <div className="my-2 relative flex items-center justify-center">
                {isUnlocked ? (
                  <PlanetVisual
                    planetId={planet.id}
                    size={95}
                    isSilhouette={!isCleared}
                    className="group-hover:scale-110 transition-transform"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-slate-800/90 flex flex-col items-center justify-center border-2 border-dashed border-slate-600">
                    <Lock className="w-8 h-8 text-slate-500 mb-1" />
                    <span className="text-[10px] text-slate-400 font-bold">다음 행성</span>
                  </div>
                )}
              </div>

              {/* Planet Name */}
              <div className="text-center mt-2 w-full">
                <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-yellow-300 transition-colors">
                  {isCleared ? planet.name : '?? 수수께끼 별'}
                </h3>
                <p className="text-xs text-indigo-300 font-semibold">
                  {isCleared ? planet.englishName : '퀴즈를 풀고 맞혀보세요!'}
                </p>
              </div>

              {/* Stars Earned */}
              <div className="flex items-center justify-center gap-1 mt-3 bg-black/40 px-3 py-1.5 rounded-full w-full border border-white/5">
                {[1, 2, 3].map((starIdx) => (
                  <Star
                    key={starIdx}
                    className={`w-4 h-4 transition-all ${
                      starIdx <= starsCount
                        ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]'
                        : 'text-slate-600'
                    }`}
                  />
                ))}
              </div>

              {/* Subtle hover prompt */}
              {isUnlocked && (
                <div className="mt-2 text-[11px] text-yellow-300/80 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  탐험하러 가기 &gt;
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Fun Tip Card */}
      <div className="bg-indigo-950/60 border border-indigo-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💡</span>
          <div>
            <div className="text-sm font-extrabold text-yellow-300">우주 탐험 꿀팁!</div>
            <div className="text-xs text-slate-200">
              힌트를 잘 듣고 첫 번째에 맞히면 황금 별 3개를 모두 얻을 수 있어요!
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            soundService.playClick();
            onOpenLeaderboard();
          }}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs sm:text-sm rounded-xl border border-indigo-400/40 shadow transition-all active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
        >
          <Trophy className="w-4 h-4 text-yellow-300" />
          친구들 랭킹 보러가기
        </button>
      </div>
    </div>
  );
};
