/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { PlanetData, PlayerProfile, Badge, StageProgress } from './types/game';
import { PLANETS_DATA } from './data/planets';
import { BADGES_DATA } from './data/badges';
import { StorageService } from './services/storage';
import { soundService } from './services/sound';
import { ttsService } from './services/tts';
import { HeaderNav } from './components/HeaderNav';
import { TitleScreen } from './components/TitleScreen';
import { SolarSystemMap } from './components/SolarSystemMap';
import { QuizScreen } from './components/QuizScreen';
import { BadgeBook } from './components/BadgeBook';
import { LeaderboardModal } from './components/LeaderboardModal';
import { AstronautLicenseModal } from './components/AstronautLicenseModal';

export default function App() {
  const [profile, setProfile] = useState<PlayerProfile>(() => StorageService.getProfile());
  const [activeView, setActiveView] = useState<'title' | 'map' | 'quiz'>('title');
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);

  // Modals
  const [showBadges, setShowBadges] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showLicense, setShowLicense] = useState(false);

  // Sound and TTS toggles
  const [soundEnabled, setSoundEnabled] = useState(profile.soundEnabled ?? true);
  const [ttsEnabled, setTtsEnabled] = useState(profile.ttsEnabled ?? true);

  // Sync settings with services on load
  useEffect(() => {
    soundService.setEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    ttsService.setEnabled(ttsEnabled);
  }, [ttsEnabled]);

  // Save profile to browser cache whenever it changes
  const updateProfile = useCallback((updated: PlayerProfile) => {
    setProfile(updated);
    StorageService.saveProfile(updated);
  }, []);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundService.setEnabled(next);
    if (next) soundService.playClick();
    updateProfile({ ...profile, soundEnabled: next });
  };

  const handleToggleTTS = () => {
    const next = !ttsEnabled;
    setTtsEnabled(next);
    ttsService.setEnabled(next);
    if (next) soundService.playClick();
    updateProfile({ ...profile, ttsEnabled: next });
  };

  const handleSelectPlanet = (planet: PlanetData) => {
    setSelectedPlanet(planet);
    setActiveView('quiz');
  };

  const handleBackToMap = () => {
    setActiveView('map');
    setSelectedPlanet(null);
  };

  // Check and grant badges based on current game state
  const checkBadges = useCallback((updatedProfile: PlayerProfile, lastClearedPlanetId?: string): Badge[] => {
    const currentBadgeIds = new Set(updatedProfile.badges);
    const newBadges: Badge[] = [];

    const clearedCount = Object.values(updatedProfile.progress).filter(p => p.cleared).length;
    const totalStars = updatedProfile.starsTotal;
    const perfectCount = Object.values(updatedProfile.progress).filter(p => p.stars === 3).length;

    // 1. First Flight (1 planet cleared)
    if (clearedCount >= 1 && !currentBadgeIds.has('first_flight')) {
      newBadges.push(BADGES_DATA.find(b => b.id === 'first_flight')!);
    }
    // 2. Earth Guardian
    if (updatedProfile.progress['earth']?.cleared && !currentBadgeIds.has('earth_guardian')) {
      newBadges.push(BADGES_DATA.find(b => b.id === 'earth_guardian')!);
    }
    // 3. Ring Master (Saturn)
    if (updatedProfile.progress['saturn']?.cleared && !currentBadgeIds.has('ring_master')) {
      newBadges.push(BADGES_DATA.find(b => b.id === 'ring_master')!);
    }
    // 4. Giant Seeker (Jupiter)
    if (updatedProfile.progress['jupiter']?.cleared && !currentBadgeIds.has('giant_seeker')) {
      newBadges.push(BADGES_DATA.find(b => b.id === 'giant_seeker')!);
    }
    // 5. Star Collector (10+ stars)
    if (totalStars >= 10 && !currentBadgeIds.has('star_collector')) {
      newBadges.push(BADGES_DATA.find(b => b.id === 'star_collector')!);
    }
    // 6. Star Master (20+ stars)
    if (totalStars >= 20 && !currentBadgeIds.has('star_master')) {
      newBadges.push(BADGES_DATA.find(b => b.id === 'star_master')!);
    }
    // 7. Perfect Explorer (3+ perfect 3-star clears)
    if (perfectCount >= 3 && !currentBadgeIds.has('perfect_explorer')) {
      newBadges.push(BADGES_DATA.find(b => b.id === 'perfect_explorer')!);
    }
    // 8. Solar Conqueror (All 10 planets cleared)
    if (clearedCount >= 10 && !currentBadgeIds.has('solar_conqueror')) {
      newBadges.push(BADGES_DATA.find(b => b.id === 'solar_conqueror')!);
    }

    if (newBadges.length > 0) {
      const addedIds = newBadges.map(b => b.id);
      updatedProfile.badges = [...updatedProfile.badges, ...addedIds];
    }

    return newBadges;
  }, []);

  // Handle stage completion
  const handleStageSuccess = (planetId: string, earnedStars: number, stageScore: number) => {
    const currentProgress = { ...profile.progress };
    const prevStage = currentProgress[planetId] || {
      planetId,
      unlocked: true,
      cleared: false,
      stars: 0,
      bestScore: 0,
      attempts: 0
    };

    const bestStars = Math.max(prevStage.stars, earnedStars);
    const bestScore = Math.max(prevStage.bestScore, stageScore);

    currentProgress[planetId] = {
      ...prevStage,
      cleared: true,
      stars: bestStars,
      bestScore: bestScore,
      attempts: (prevStage.attempts || 0) + 1
    };

    // Unlock next planet in sequence
    const currentIndex = PLANETS_DATA.findIndex(p => p.id === planetId);
    if (currentIndex >= 0 && currentIndex + 1 < PLANETS_DATA.length) {
      const nextPlanet = PLANETS_DATA[currentIndex + 1];
      if (!currentProgress[nextPlanet.id]) {
        currentProgress[nextPlanet.id] = {
          planetId: nextPlanet.id,
          unlocked: true,
          cleared: false,
          stars: 0,
          bestScore: 0,
          attempts: 0
        };
      } else {
        currentProgress[nextPlanet.id].unlocked = true;
      }
    }

    // Recalculate totals
    const newTotalStars = Object.values(currentProgress).reduce(
      (sum, p) => sum + (p.stars || 0),
      0
    );
    const newTotalScore = Object.values(currentProgress).reduce(
      (sum, p) => sum + (p.bestScore || 0),
      0
    );

    const updatedProfile: PlayerProfile = {
      ...profile,
      starsTotal: newTotalStars,
      scoreTotal: newTotalScore,
      progress: currentProgress
    };

    // Evaluate badges
    const newBadges = checkBadges(updatedProfile, planetId);

    // Save immediately to browser cache
    updateProfile(updatedProfile);

    return { newBadges };
  };

  const handleNextPlanet = () => {
    if (!selectedPlanet) return;
    const currentIndex = PLANETS_DATA.findIndex(p => p.id === selectedPlanet.id);
    if (currentIndex >= 0 && currentIndex + 1 < PLANETS_DATA.length) {
      setSelectedPlanet(PLANETS_DATA[currentIndex + 1]);
    } else {
      setActiveView('map');
    }
  };

  const handleOpenLicense = () => {
    // Grant honor_astronaut badge if not already unlocked
    if (!profile.badges.includes('honor_astronaut')) {
      const updated = {
        ...profile,
        badges: [...profile.badges, 'honor_astronaut']
      };
      updateProfile(updated);
    }
    setShowLicense(true);
  };

  const handleResetProgress = () => {
    if (confirm('탐험 기록과 모은 별을 처음부터 다시 시작할까요? (친구 랭킹 기록은 유지돼요!)')) {
      soundService.playWrong();
      const fresh = StorageService.resetCurrentProfile();
      setProfile(fresh);
      setActiveView('map');
    }
  };

  const hasNextPlanet =
    selectedPlanet !== null &&
    PLANETS_DATA.findIndex(p => p.id === selectedPlanet.id) < PLANETS_DATA.length - 1;

  return (
    <div className="min-h-screen bg-[#070913] text-white flex flex-col relative selection:bg-yellow-400 selection:text-indigo-950">
      {/* Background Twinkling Stars Canvas Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle decorative glowing nebulas */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-[130px]" />

        {/* Distributed static star dots */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
      </div>

      {/* Main App Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <HeaderNav
          profile={profile}
          soundEnabled={soundEnabled}
          ttsEnabled={ttsEnabled}
          onToggleSound={handleToggleSound}
          onToggleTTS={handleToggleTTS}
          onOpenBadges={() => setShowBadges(true)}
          onOpenLeaderboard={() => setShowLeaderboard(true)}
          onOpenLicense={handleOpenLicense}
          onResetProgress={handleResetProgress}
          onGoHome={() => setActiveView('title')}
        />

        {/* View Switcher: Title Screen vs Solar System Map vs Quiz Screen */}
        <main className="flex-1 flex flex-col items-center justify-start pb-10">
          {activeView === 'title' ? (
            <TitleScreen
              profile={profile}
              onUpdateProfile={updateProfile}
              onStartGame={() => setActiveView('map')}
              onOpenLeaderboard={() => setShowLeaderboard(true)}
              onOpenBadges={() => setShowBadges(true)}
              soundEnabled={soundEnabled}
              onToggleSound={handleToggleSound}
            />
          ) : activeView === 'map' ? (
            <SolarSystemMap
              progress={profile.progress}
              currentPlanetId={selectedPlanet?.id || null}
              onSelectPlanet={handleSelectPlanet}
              onOpenBadges={() => setShowBadges(true)}
              onOpenLeaderboard={() => setShowLeaderboard(true)}
            />
          ) : selectedPlanet ? (
            <QuizScreen
              planet={selectedPlanet}
              onBackToMap={handleBackToMap}
              onSuccess={handleStageSuccess}
              onNextPlanet={handleNextPlanet}
              hasNextPlanet={hasNextPlanet}
            />
          ) : null}
        </main>

        {/* Footer info */}
        <footer className="w-full border-t border-indigo-950/80 py-4 text-center text-xs text-indigo-400/80 relative z-10 backdrop-blur-sm">
          <p>🌟 7세 어린이 우주 탐험 학습용 게임 • 모든 데이터는 브라우저 캐시에 안전하게 보관됩니다 🚀</p>
        </footer>
      </div>

      {/* Modals */}
      {showBadges && (
        <BadgeBook
          unlockedBadgeIds={profile.badges}
          onClose={() => setShowBadges(false)}
          onOpenLicense={() => {
            setShowBadges(false);
            handleOpenLicense();
          }}
        />
      )}

      {showLeaderboard && (
        <LeaderboardModal
          currentProfile={profile}
          onUpdateProfile={updateProfile}
          onClose={() => setShowLeaderboard(false)}
        />
      )}

      {showLicense && (
        <AstronautLicenseModal
          profile={profile}
          onUpdateAvatar={(newAvatar) => {
            updateProfile({ ...profile, avatar: newAvatar });
          }}
          onClose={() => setShowLicense(false)}
        />
      )}
    </div>
  );
}
