import React, { useState, useEffect } from 'react';
import {
  X,
  Trophy,
  Star,
  UserPlus,
  Trash2,
  Sparkles,
  Rocket,
  Edit3,
  Check,
  Radio
} from 'lucide-react';
import { LeaderboardEntry, PlayerProfile } from '../types/game';
import { StorageService } from '../services/storage';
import { FirestoreLeaderboardService } from '../services/firestoreLeaderboard';
import { soundService } from '../services/sound';

interface LeaderboardModalProps {
  currentProfile: PlayerProfile;
  onUpdateProfile: (updated: PlayerProfile) => void;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  currentProfile,
  onUpdateProfile,
  onClose,
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(() =>
    StorageService.getLeaderboard()
  );
  const [isLive, setIsLive] = useState<boolean>(false);
  const [showAddFriend, setShowAddFriend] = useState<boolean>(false);
  const [newFriendName, setNewFriendName] = useState<string>('');
  const [newFriendAvatar, setNewFriendAvatar] = useState<string>('🚀');
  const [newFriendScore, setNewFriendScore] = useState<number>(1800);
  const [newFriendStars, setNewFriendStars] = useState<number>(18);

  const [isEditingMyName, setIsEditingMyName] = useState<boolean>(false);
  const [myEditedName, setMyEditedName] = useState<string>(currentProfile.name);

  const avatarOptions = ['🚀', '👨‍🚀', '👩‍🚀', '⭐', '🪐', '🤖', '🐱', '🐶', '🐻', '🐰'];

  // Subscribe to real-time Google Firebase Firestore leaderboard updates
  useEffect(() => {
    const unsubscribe = FirestoreLeaderboardService.subscribeLeaderboard((liveList, liveStatus) => {
      setEntries(liveList);
      setIsLive(liveStatus);
    });
    return () => unsubscribe();
  }, []);

  const handleSaveMyName = () => {
    if (!myEditedName.trim()) return;
    soundService.playClick();
    const updated = { ...currentProfile, name: myEditedName.trim() };
    onUpdateProfile(updated);
    setIsEditingMyName(false);

    const clearedCount = Object.values(updated.progress).filter(p => p.cleared).length;
    const playerEntry: LeaderboardEntry = {
      id: updated.id,
      name: updated.name,
      avatar: updated.avatar,
      badgeTitle: updated.title,
      score: updated.scoreTotal,
      stars: updated.starsTotal,
      clearedCount: clearedCount,
      date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
      isCurrentPlayer: true
    };
    FirestoreLeaderboardService.saveEntry(playerEntry);
  };

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFriendName.trim()) return;
    soundService.playCorrect();

    const newEntry: LeaderboardEntry = {
      id: 'friend_' + Date.now().toString(36),
      name: newFriendName.trim(),
      avatar: newFriendAvatar,
      badgeTitle: newFriendStars >= 20 ? '황금 별빛 마스터' : newFriendStars >= 10 ? '우주 비행 베테랑' : '새싹 우주대원',
      score: Number(newFriendScore) || 500,
      stars: Number(newFriendStars) || 5,
      clearedCount: Math.min(10, Math.ceil(newFriendStars / 3)),
      date: new Date().toISOString().split('T')[0].replace(/-/g, '.')
    };

    FirestoreLeaderboardService.saveEntry(newEntry);
    setNewFriendName('');
    setShowAddFriend(false);
  };

  const handleDeleteEntry = (id: string, name: string) => {
    if (confirm(`'${name}' 친구 기록을 삭제할까요?`)) {
      soundService.playClick();
      FirestoreLeaderboardService.deleteEntry(id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-indigo-950 via-slate-900 to-purple-950 border-3 border-yellow-400/70 rounded-3xl p-5 sm:p-7 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-indigo-500/30 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center text-yellow-300">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  우주 탐험가 명예의 전당 🏆
                </h2>
                {isLive ? (
                  <span className="hidden xs:inline-flex items-center gap-1 text-[11px] font-black text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-400/40 animate-pulse">
                    <Radio className="w-3 h-3 text-emerald-400" />
                    파이어베이스 실시간
                  </span>
                ) : (
                  <span className="hidden xs:inline-flex items-center gap-1 text-[11px] font-bold text-yellow-300 bg-yellow-950/80 px-2 py-0.5 rounded-full border border-yellow-400/30">
                    캐시 저장 모드
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-indigo-300 font-bold">
                구글 파이어베이스 실시간 DB & 브라우저 영구 캐시 연동 랭킹!
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

        {/* Current Player Status Bar */}
        <div className="bg-gradient-to-r from-indigo-900/90 to-purple-900/90 border-2 border-indigo-400/60 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{currentProfile.avatar}</span>
            <div>
              <div className="flex items-center gap-2">
                {isEditingMyName ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={myEditedName}
                      onChange={(e) => setMyEditedName(e.target.value)}
                      maxLength={10}
                      className="bg-black/60 border border-yellow-400 text-white font-black text-sm px-2.5 py-1 rounded-lg focus:outline-none"
                    />
                    <button
                      onClick={handleSaveMyName}
                      className="p-1 bg-yellow-400 text-indigo-950 rounded-lg hover:bg-yellow-300"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="text-base font-black text-white">
                      {currentProfile.name}
                    </span>
                    <button
                      onClick={() => setIsEditingMyName(true)}
                      className="text-xs text-yellow-300 hover:text-yellow-200 underline flex items-center gap-0.5"
                    >
                      <Edit3 className="w-3 h-3" /> 수정
                    </button>
                  </>
                )}
                <span className="text-[11px] font-bold text-yellow-400 bg-yellow-950/80 px-2 py-0.5 rounded-full border border-yellow-400/30">
                  나의 기록
                </span>
              </div>
              <p className="text-xs text-indigo-300 font-semibold">{currentProfile.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-yellow-300 font-black text-sm bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
              <Star className="w-4 h-4 fill-yellow-400" />
              <span>{currentProfile.starsTotal}개</span>
            </div>
            <div className="text-sm font-black text-white bg-indigo-800/80 px-3 py-1.5 rounded-xl border border-indigo-400/30">
              {currentProfile.scoreTotal}점
            </div>
          </div>
        </div>

        {/* Add Friend Toggle Button */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-indigo-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            친구들의 우주 탐험 기록
          </span>

          <button
            onClick={() => {
              soundService.playClick();
              setShowAddFriend(!showAddFriend);
            }}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow transition-transform active:scale-95 flex items-center gap-1.5 border border-indigo-400/40"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{showAddFriend ? '입력창 닫기' : '새로운 친구 기록 추가'}</span>
          </button>
        </div>

        {/* Add Friend Form */}
        {showAddFriend && (
          <form
            onSubmit={handleAddFriend}
            className="bg-slate-900/90 border-2 border-indigo-500/50 rounded-2xl p-4 space-y-3 animate-in fade-in"
          >
            <h4 className="text-sm font-black text-yellow-300 flex items-center gap-1.5">
              <Rocket className="w-4 h-4" /> 친구 우주대원 기록 등록하기
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-indigo-200 font-bold block mb-1">친구 이름</label>
                <input
                  type="text"
                  placeholder="예: 박하람, 민지"
                  value={newFriendName}
                  onChange={(e) => setNewFriendName(e.target.value)}
                  maxLength={10}
                  required
                  className="w-full bg-black/50 border border-indigo-400/40 rounded-xl px-3 py-2 text-white text-sm font-bold focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-xs text-indigo-200 font-bold block mb-1">캐릭터 아이콘</label>
                <div className="flex gap-1 overflow-x-auto pb-1">
                  {avatarOptions.map((emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() => setNewFriendAvatar(emoji)}
                      className={`text-xl p-1.5 rounded-lg border transition-all ${
                        newFriendAvatar === emoji
                          ? 'bg-yellow-400/30 border-yellow-400 scale-110'
                          : 'bg-black/30 border-transparent hover:bg-white/10'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-indigo-200 font-bold block mb-1">
                  모은 별 개수 ({newFriendStars}개)
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={newFriendStars}
                  onChange={(e) => {
                    const stars = Number(e.target.value);
                    setNewFriendStars(stars);
                    setNewFriendScore(stars * 100);
                  }}
                  className="w-full accent-yellow-400 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs text-indigo-200 font-bold block mb-1">점수 ({newFriendScore}점)</label>
                <input
                  type="number"
                  min="0"
                  max="5000"
                  value={newFriendScore}
                  onChange={(e) => setNewFriendScore(Number(e.target.value))}
                  className="w-full bg-black/50 border border-indigo-400/40 rounded-xl px-3 py-1.5 text-white text-sm font-bold focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 text-slate-950 font-black text-sm rounded-xl shadow transition-transform active:scale-95"
            >
              캐시에 저장하고 랭킹 올리기 💾
            </button>
          </form>
        )}

        {/* Leaderboard Entries List */}
        <div className="space-y-2.5">
          {entries.map((entry, index) => {
            const isMe = entry.id === currentProfile.id || entry.isCurrentPlayer;
            const rank = index + 1;

            return (
              <div
                key={entry.id}
                className={`p-3 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  isMe
                    ? 'bg-indigo-900/90 border-yellow-400 ring-2 ring-yellow-400/30 shadow-lg'
                    : rank === 1
                    ? 'bg-amber-950/40 border-amber-400/50'
                    : 'bg-slate-900/70 border-indigo-400/20'
                }`}
              >
                {/* Rank & Avatar */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0">
                    {rank === 1 ? (
                      <span className="text-xl">🥇</span>
                    ) : rank === 2 ? (
                      <span className="text-xl">🥈</span>
                    ) : rank === 3 ? (
                      <span className="text-xl">🥉</span>
                    ) : (
                      <span className="text-indigo-300 font-bold text-sm">#{rank}</span>
                    )}
                  </div>

                  <span className="text-2xl sm:text-3xl flex-shrink-0">{entry.avatar}</span>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm sm:text-base font-black text-white">
                        {entry.name}
                      </span>
                      {isMe && (
                        <span className="text-[10px] font-black text-yellow-300 bg-yellow-950 px-1.5 py-0.5 rounded border border-yellow-400/30">
                          나
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-indigo-300 font-semibold">
                      {entry.badgeTitle} • {entry.date}
                    </div>
                  </div>
                </div>

                {/* Score & Stars & Actions */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm sm:text-base font-black text-yellow-300">
                      {entry.score.toLocaleString()}점
                    </div>
                    <div className="flex items-center justify-end gap-1 text-[11px] text-indigo-200 font-bold">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span>{entry.stars}개</span>
                    </div>
                  </div>

                  {!isMe && !entry.id.startsWith('friend_1') && (
                    <button
                      onClick={() => handleDeleteEntry(entry.id, entry.name)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                      title="기록 지우기"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
