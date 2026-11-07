import React, { useState } from 'react';
import { X, Printer, Sparkles, Award, Star, CheckCircle, ShieldCheck } from 'lucide-react';
import { PlayerProfile } from '../types/game';
import { BADGES_DATA } from '../data/badges';
import { soundService } from '../services/sound';

interface AstronautLicenseModalProps {
  profile: PlayerProfile;
  onUpdateAvatar: (avatar: string) => void;
  onClose: () => void;
}

export const AstronautLicenseModal: React.FC<AstronautLicenseModalProps> = ({
  profile,
  onUpdateAvatar,
  onClose,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>(profile.avatar);
  const avatarChoices = ['🚀', '👨‍🚀', '👩‍🚀', '🐱', '🐶', '🐻', '🐰', '🤖', '⭐', '🪐'];

  const clearedCount = Object.values(profile.progress).filter(p => p.cleared).length;
  const userBadges = BADGES_DATA.filter(b => profile.badges.includes(b.id));

  const handleAvatarChange = (emoji: string) => {
    soundService.playClick();
    setSelectedAvatar(emoji);
    onUpdateAvatar(emoji);
  };

  const handlePrint = () => {
    soundService.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-indigo-950 via-slate-900 to-purple-950 border-3 border-yellow-400 rounded-3xl p-5 sm:p-7 max-w-xl w-full max-h-[95vh] overflow-y-auto shadow-2xl relative space-y-5">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-indigo-500/30 pb-3">
          <div className="flex items-center gap-2 text-yellow-300 font-black text-lg sm:text-xl">
            <Award className="w-6 h-6" />
            <span>우주 비행사 면허증 발급 센터</span>
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

        {/* The Official Printable Astronaut License Card */}
        <div
          id="printable-license"
          className="bg-gradient-to-br from-indigo-900 via-blue-950 to-slate-900 border-4 border-yellow-400 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden text-white"
        >
          {/* Subtle Galactic Watermark */}
          <div className="absolute -right-8 -bottom-8 opacity-10 text-9xl pointer-events-none select-none">
            🪐
          </div>

          {/* Card Header */}
          <div className="flex items-center justify-between border-b-2 border-yellow-400/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌌</span>
              <div>
                <h3 className="text-sm sm:text-base font-black text-yellow-300 tracking-wider">
                  은하수 우주탐험청 공인
                </h3>
                <h2 className="text-lg sm:text-2xl font-black tracking-tight text-white">
                  어린이 우주 비행사 면허증
                </h2>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-yellow-400 text-indigo-950 text-xs font-black shadow">
              공식 1급
            </span>
          </div>

          {/* Pilot Info Section */}
          <div className="flex flex-col sm:flex-row items-center gap-5 my-5">
            {/* Avatar Photo Frame */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-b from-yellow-300 to-amber-500 p-1.5 shadow-xl">
                <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center text-5xl sm:text-6xl border-2 border-yellow-200">
                  {selectedAvatar}
                </div>
              </div>
              <span className="text-[11px] font-bold text-yellow-300 mt-1">대원 사진</span>
            </div>

            {/* Details */}
            <div className="flex-1 space-y-2 text-center sm:text-left w-full">
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/10">
                <div className="text-[11px] text-indigo-300 font-bold">비행사 이름</div>
                <div className="text-xl sm:text-2xl font-black text-yellow-300">
                  {profile.name}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-black/30 p-2 rounded-xl border border-white/10">
                  <div className="text-[10px] text-indigo-300 font-semibold">탐험 칭호</div>
                  <div className="font-extrabold text-white text-xs truncate">{profile.title}</div>
                </div>

                <div className="bg-black/30 p-2 rounded-xl border border-white/10">
                  <div className="text-[10px] text-indigo-300 font-semibold">모은 황금별</div>
                  <div className="font-extrabold text-yellow-400 flex items-center justify-center sm:justify-start gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" />
                    <span>{profile.starsTotal} / 30개</span>
                  </div>
                </div>

                <div className="bg-black/30 p-2 rounded-xl border border-white/10">
                  <div className="text-[10px] text-indigo-300 font-semibold">정복한 행성</div>
                  <div className="font-extrabold text-cyan-300">
                    {clearedCount} / 10개 행성
                  </div>
                </div>

                <div className="bg-black/30 p-2 rounded-xl border border-white/10">
                  <div className="text-[10px] text-indigo-300 font-semibold">발급일</div>
                  <div className="font-extrabold text-slate-300">
                    {new Date().toISOString().split('T')[0]}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stamped Badges */}
          <div className="border-t border-white/10 pt-3">
            <div className="text-xs font-black text-yellow-300 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> 획득한 공식 탐험 배지 도장 ({userBadges.length}개):
            </div>
            <div className="flex flex-wrap gap-1.5">
              {userBadges.length > 0 ? (
                userBadges.map(badge => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-yellow-400/20 border border-yellow-300/40 text-xs font-bold text-yellow-200"
                    title={badge.title}
                  >
                    <span>{badge.icon}</span>
                    <span className="text-[11px]">{badge.title}</span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-indigo-300 italic">
                  퀴즈를 풀고 첫 번째 배지를 모아보세요!
                </div>
              )}
            </div>
          </div>

          {/* Seal Stamp */}
          <div className="mt-4 pt-3 border-t-2 border-dashed border-yellow-400/50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-indigo-200 font-bold">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>본 면허증은 은하수 태양계 탐험 연맹의 인증을 받았습니다.</span>
            </div>

            <div className="w-14 h-14 rounded-full border-2 border-red-500 bg-red-600/30 text-red-400 flex flex-col items-center justify-center rotate-12 text-[10px] font-black leading-tight border-double">
              <span>은하수</span>
              <span>인증인</span>
            </div>
          </div>
        </div>

        {/* Avatar Photo Selector */}
        <div className="bg-slate-900/80 p-3 rounded-2xl border border-indigo-400/30 space-y-2">
          <div className="text-xs font-extrabold text-indigo-200">
            사진 캐릭터 변경하기 (터치해보세요!)
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {avatarChoices.map(emoji => (
              <button
                key={emoji}
                onClick={() => handleAvatarChange(emoji)}
                className={`p-2 text-2xl rounded-xl border transition-all ${
                  selectedAvatar === emoji
                    ? 'bg-yellow-400/30 border-yellow-400 scale-110 shadow'
                    : 'bg-black/30 border-transparent hover:bg-white/10'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 text-slate-950 font-black text-sm rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>면허증 인쇄 / 저장하기</span>
          </button>

          <button
            onClick={() => {
              soundService.playClick();
              onClose();
            }}
            className="px-5 py-3 bg-indigo-900/80 hover:bg-indigo-800 text-indigo-200 font-black text-sm rounded-2xl border border-indigo-400/40"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
