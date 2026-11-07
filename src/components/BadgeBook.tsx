import React from 'react';
import { X, Award, Sparkles, Lock, CheckCircle2, FileBadge } from 'lucide-react';
import { BADGES_DATA } from '../data/badges';
import { soundService } from '../services/sound';

interface BadgeBookProps {
  unlockedBadgeIds: string[];
  onClose: () => void;
  onOpenLicense: () => void;
}

export const BadgeBook: React.FC<BadgeBookProps> = ({
  unlockedBadgeIds,
  onClose,
  onOpenLicense,
}) => {
  const unlockedCount = unlockedBadgeIds.length;
  const totalCount = BADGES_DATA.length;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-indigo-950 via-slate-900 to-purple-950 border-3 border-indigo-400/60 rounded-3xl p-5 sm:p-7 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-indigo-500/30 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center text-yellow-300">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                우주 탐험 배지 도감 🎖️
              </h2>
              <p className="text-xs sm:text-sm text-indigo-300 font-bold">
                수집한 우주 배지: <span className="text-yellow-400 font-black">{unlockedCount}</span> / {totalCount}개
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundService.playClick();
              onClose();
            }}
            className="p-2 rounded-2xl bg-indigo-900/80 hover:bg-indigo-800 text-indigo-200 border border-indigo-400/40 transition-transform active:scale-95"
            title="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Banner: Astronaut License */}
        <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-2 border-yellow-400/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-3xl">👨‍🚀</div>
            <div>
              <div className="text-sm font-black text-yellow-300">
                은하수 본부 공식 우주 비행사 면허증
              </div>
              <div className="text-xs text-indigo-200 font-semibold">
                나만의 탐험가 사진과 모은 배지가 찍힌 면허증을 확인해보세요!
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              soundService.playClick();
              onOpenLicense();
            }}
            className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow transition-transform active:scale-95 flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <FileBadge className="w-4 h-4" />
            <span>내 면허증 보기</span>
          </button>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {BADGES_DATA.map((badge) => {
            const isUnlocked = unlockedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center relative select-none ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-indigo-900/90 to-purple-900/90 border-yellow-400/80 shadow-lg shadow-indigo-950'
                    : 'bg-slate-900/50 border-slate-800 opacity-60'
                }`}
              >
                {/* Status Icon */}
                <div className="absolute top-2.5 right-2.5">
                  {isUnlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </div>

                {/* Badge Icon */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl my-1 border transition-transform ${
                    isUnlocked
                      ? 'bg-yellow-400/20 border-yellow-300 shadow-inner animate-float'
                      : 'bg-slate-800 border-slate-700 grayscale opacity-60'
                  }`}
                >
                  {badge.icon}
                </div>

                {/* Badge Details */}
                <h4 className="text-sm sm:text-base font-black text-white mt-1">
                  {badge.title}
                </h4>

                <p className="text-[11px] sm:text-xs text-indigo-200 mt-1 line-clamp-2">
                  {badge.description}
                </p>

                {/* Requirement Hint */}
                <div className="mt-2.5 pt-2 border-t border-white/10 w-full text-[10px] text-yellow-300/90 font-bold flex items-center justify-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-yellow-400" />
                  <span>{badge.requirement}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
