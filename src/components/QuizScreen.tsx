import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Volume2,
  Star,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  RotateCcw,
  Trophy,
  HelpCircle,
  Award
} from 'lucide-react';
import { PlanetData, Badge } from '../types/game';
import { PlanetVisual } from './PlanetVisual';
import { RobotGuide, RobotMood } from './RobotGuide';
import { soundService } from '../services/sound';
import { ttsService } from '../services/tts';

interface QuizScreenProps {
  planet: PlanetData;
  onBackToMap: () => void;
  onSuccess: (planetId: string, stars: number, score: number) => { newBadges: Badge[] };
  onNextPlanet?: () => void;
  hasNextPlanet: boolean;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  planet,
  onBackToMap,
  onSuccess,
  onNextPlanet,
  hasNextPlanet
}) => {
  const [currentClueStep, setCurrentClueStep] = useState<number>(1);
  const [attempts, setAttempts] = useState<number>(0);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState<boolean>(false);
  const [selectedWrongOptions, setSelectedWrongOptions] = useState<string[]>([]);
  const [robotMood, setRobotMood] = useState<RobotMood>('speaking');
  const [robotMessage, setRobotMessage] = useState<string>(
    `안녕! 이번에 탐험할 행성이야! 힌트를 잘 듣고 어떤 행성인지 맞혀봐!`
  );
  const [ttsVoiceText, setTtsVoiceText] = useState<string>(
    planet.clues[0]?.robotVoice || ''
  );
  const [earnedStars, setEarnedStars] = useState<number>(0);
  const [unlockedBadgesModal, setUnlockedBadgesModal] = useState<Badge[]>([]);

  // Shuffle quiz options once when stage starts
  const options = useMemo(() => {
    const list = [planet.name, ...planet.quizWrongOptions];
    return list.sort(() => Math.random() - 0.5);
  }, [planet.id]);

  // Reset quiz state whenever a new planet is selected or Next Planet is clicked
  useEffect(() => {
    setCurrentClueStep(1);
    setAttempts(0);
    setIsAnsweredCorrectly(false);
    setSelectedWrongOptions([]);
    setEarnedStars(0);
    setUnlockedBadgesModal([]);
    setRobotMood('speaking');
    const firstClue = planet.clues.find(c => c.step === 1);
    setRobotMessage('안녕! 이번에 탐험할 행성이야! 힌트를 잘 듣고 어떤 행성인지 맞혀봐!');
    setTtsVoiceText(firstClue?.robotVoice || '');
  }, [planet.id]);

  // When step changes, update robot clue and speak
  useEffect(() => {
    const clue = planet.clues.find(c => c.step === currentClueStep);
    if (clue && !isAnsweredCorrectly) {
      setRobotMood('speaking');
      setRobotMessage(`${currentClueStep}단계 힌트: ${clue.text}`);
      setTtsVoiceText(clue.robotVoice);
    }
  }, [currentClueStep, planet, isAnsweredCorrectly]);

  const handleClueStepSelect = (step: number) => {
    soundService.playClick();
    setCurrentClueStep(step);
  };

  const handleHearClue = (step: number) => {
    soundService.playRobotBoop();
    const clue = planet.clues.find(c => c.step === step);
    if (clue) {
      setRobotMood('speaking');
      setTtsVoiceText(clue.robotVoice);
      ttsService.speak(clue.robotVoice, () => {
        setRobotMood('idle');
      });
    }
  };

  const handleOptionSelect = (optionName: string) => {
    if (isAnsweredCorrectly || selectedWrongOptions.includes(optionName)) {
      return;
    }

    soundService.playClick();
    const isCorrect = optionName === planet.name;
    const currentAttempt = attempts + 1;
    setAttempts(currentAttempt);

    if (isCorrect) {
      // Correct!
      setIsAnsweredCorrectly(true);
      setRobotMood('cheering');
      soundService.playCorrect();

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore if confetti fails
      }

      // Calculate Stars (1st try: 3 stars, 2nd try: 2 stars, 3+: 1 star)
      let stars = 3;
      if (currentAttempt === 2) stars = 2;
      else if (currentAttempt >= 3) stars = 1;
      setEarnedStars(stars);

      const stageScore = stars * 100 + (3 - Math.min(2, currentClueStep - 1)) * 20;

      // Praise message
      const victoryMsg = `정답이야! 딩동댕! 바로 ‘${planet.name}’이었어! ${planet.funFact}`;
      setRobotMessage(victoryMsg);
      setTtsVoiceText(`정답이야! 바로 ${planet.name}이었어! ${planet.funFact}`);

      // Call parent on success
      const result = onSuccess(planet.id, stars, stageScore);
      if (result && result.newBadges && result.newBadges.length > 0) {
        soundService.playBadgeUnlock();
        setUnlockedBadgesModal(result.newBadges);
      }
    } else {
      // Wrong attempt
      soundService.playWrong();
      setSelectedWrongOptions(prev => [...prev, optionName]);
      setRobotMood('encouraging');

      const encouragingMsg = `‘${optionName}’은(는) 아니에요~ 괜찮아! 다른 힌트를 더 듣고 다시 골라볼까?`;
      setRobotMessage(encouragingMsg);
      setTtsVoiceText(`‘${optionName}’은 아니에요. 괜찮아! 힌트를 다시 잘 들어봐!`);

      // Automatically advance to next clue if available
      if (currentClueStep < 3) {
        setTimeout(() => {
          setCurrentClueStep(prev => Math.min(3, prev + 1));
        }, 1200);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-5 space-y-6">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => {
            soundService.playClick();
            onBackToMap();
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-400/40 text-indigo-200 font-extrabold text-sm transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>우주 지도로</span>
        </button>

        <div className="flex items-center gap-2 bg-indigo-950/70 border border-indigo-400/30 px-3.5 py-1.5 rounded-2xl">
          <span className="text-xs text-yellow-300 font-bold">{planet.order}단계 행성 탐험</span>
          <span className="text-white font-black text-sm">
            {isAnsweredCorrectly ? planet.name : '?? 수수께끼 별'}
          </span>
        </div>

        {/* Retry Button */}
        <button
          onClick={() => {
            soundService.playClick();
            setAttempts(0);
            setIsAnsweredCorrectly(false);
            setSelectedWrongOptions([]);
            setCurrentClueStep(1);
            setRobotMood('idle');
          }}
          className="p-2.5 rounded-2xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-400/40 text-indigo-200 transition-all active:scale-95"
          title="처음부터 다시 풀기"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Guide Robot Speech Banner */}
      <RobotGuide
        message={robotMessage}
        mood={robotMood}
        ttsVoiceText={ttsVoiceText}
        autoSpeak={true}
      />

      {/* Main Exploration Area */}
      <div className="bg-gradient-to-b from-slate-900/90 to-indigo-950/90 border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10">
          {/* Planet Visual (Silhouette or Revealed) */}
          <div className="relative flex flex-col items-center">
            <div className="relative">
              <PlanetVisual
                planetId={planet.id}
                size={180}
                isSilhouette={!isAnsweredCorrectly}
                className="transition-all duration-700"
              />

              {/* Sparkle effect when cleared */}
              {isAnsweredCorrectly && (
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-indigo-950 p-2 rounded-full shadow-lg animate-bounce">
                  <Sparkles className="w-6 h-6" />
                </div>
              )}
            </div>

            {/* Revealed Name & Size Info */}
            <div className="mt-4 text-center">
              {isAnsweredCorrectly ? (
                <div className="space-y-1">
                  <div className="text-3xl font-black text-yellow-300 drop-shadow">
                    {planet.name} ({planet.englishName})
                  </div>
                  <div className="text-xs sm:text-sm text-cyan-200 font-bold bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-400/30">
                    📏 {planet.sizeComparison}
                  </div>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-600 text-slate-300 text-xs font-bold">
                  <HelpCircle className="w-3.5 h-3.5 text-yellow-400" />
                  힌트를 듣고 이름을 맞혀보세요!
                </div>
              )}
            </div>
          </div>

          {/* Clues Card Stack */}
          <div className="flex-1 w-full space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                삐뽀의 3단계 수수께끼 단서:
              </span>
              <span className="text-xs text-yellow-400 font-bold">
                {currentClueStep} / 3 힌트 공개됨
              </span>
            </div>

            <div className="space-y-2.5">
              {planet.clues.map((clue) => {
                const isStepUnlocked = clue.step <= currentClueStep || isAnsweredCorrectly;
                const isCurrent = clue.step === currentClueStep;

                return (
                  <div
                    key={clue.step}
                    onClick={() => isStepUnlocked && handleClueStepSelect(clue.step)}
                    className={`p-3.5 rounded-2xl border-2 transition-all flex items-start justify-between gap-3 ${
                      isCurrent
                        ? 'bg-indigo-900/90 border-yellow-400 shadow-md scale-[1.01]'
                        : isStepUnlocked
                        ? 'bg-slate-900/80 border-indigo-400/30 hover:border-indigo-400/60 cursor-pointer'
                        : 'bg-slate-900/40 border-slate-800 opacity-60'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                            isCurrent
                              ? 'bg-yellow-400 text-indigo-950'
                              : 'bg-indigo-950 text-indigo-300 border border-indigo-500/30'
                          }`}
                        >
                          {clue.step}단계 힌트
                        </span>
                        <span className="text-xs font-extrabold text-yellow-300">
                          {clue.hintKey}
                        </span>
                      </div>

                      <p
                        className={`text-sm sm:text-base font-bold leading-relaxed ${
                          isStepUnlocked ? 'text-white' : 'text-slate-500'
                        }`}
                      >
                        {isStepUnlocked
                          ? clue.text
                          : '‘다음 힌트 열기’ 버튼을 누르면 열려요!'}
                      </p>
                    </div>

                    {isStepUnlocked ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleHearClue(clue.step);
                        }}
                        className="p-2 rounded-xl bg-indigo-700/80 hover:bg-indigo-600 text-yellow-300 transition-transform active:scale-95 flex-shrink-0"
                        title="이 힌트 다시 듣기"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          soundService.playClick();
                          setCurrentClueStep(clue.step);
                        }}
                        className="text-xs font-black text-indigo-300 bg-indigo-950 px-2.5 py-1.5 rounded-xl border border-indigo-400/30 hover:border-yellow-400 flex items-center gap-1"
                      >
                        열기 <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quiz Answer Buttons (4 Big Kid-Friendly Touch Choices) */}
        {!isAnsweredCorrectly ? (
          <div className="mt-8 space-y-3">
            <div className="text-center">
              <span className="text-base sm:text-lg font-black text-yellow-300">
                👇 이 행성의 알맞은 이름을 터치하세요! 👇
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {options.map((option) => {
                const isSelectedWrong = selectedWrongOptions.includes(option);

                return (
                  <button
                    key={option}
                    disabled={isSelectedWrong}
                    onClick={() => handleOptionSelect(option)}
                    className={`py-4 px-3 sm:py-5 sm:px-6 rounded-2xl font-black text-lg sm:text-2xl transition-all border-3 flex items-center justify-center gap-2 select-none shadow-lg transform active:scale-95 ${
                      isSelectedWrong
                        ? 'bg-rose-950/40 border-rose-900/60 text-rose-400/50 cursor-not-allowed line-through'
                        : 'bg-gradient-to-r from-indigo-700 to-purple-700 hover:from-indigo-600 hover:to-purple-600 border-indigo-400/60 hover:border-yellow-300 text-white hover:shadow-indigo-500/40'
                    }`}
                  >
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Success Victory Card */
          <div className="mt-8 bg-gradient-to-r from-emerald-950/90 to-teal-950/90 border-2 border-emerald-400 rounded-3xl p-6 text-center space-y-4 animate-in fade-in duration-500">
            <div className="inline-flex items-center gap-2 bg-emerald-400 text-slate-950 px-4 py-1.5 rounded-full font-black text-sm">
              <CheckCircle2 className="w-5 h-5" /> 탐험 대성공! 별 획득!
            </div>

            {/* Glowing Stars Display */}
            <div className="flex items-center justify-center gap-3 py-1">
              {[1, 2, 3].map((starIdx) => (
                <div key={starIdx} className="relative">
                  <Star
                    className={`w-12 h-12 sm:w-14 sm:h-14 transition-all transform ${
                      starIdx <= earnedStars
                        ? 'text-yellow-400 fill-yellow-400 scale-110 drop-shadow-[0_0_12px_rgba(250,204,21,0.9)] animate-bounce'
                        : 'text-slate-600'
                    }`}
                  />
                </div>
              ))}
            </div>

            <p className="text-white text-base sm:text-lg font-bold max-w-lg mx-auto">
              {earnedStars === 3
                ? '🌟 대단해요! 한 번에 맞혀서 황금별 3개를 모두 받았어요!'
                : earnedStars === 2
                ? '⭐ 멋져요! 힌트를 듣고 지혜롭게 맞혀서 별 2개를 얻었어요!'
                : '✨ 포기하지 않고 끝까지 맞혀서 자랑스러워요!'}
            </p>

            {/* Next Steps Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {hasNextPlanet && onNextPlanet ? (
                <button
                  onClick={() => {
                    soundService.playRocket();
                    onNextPlanet();
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-base rounded-2xl shadow-xl transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>다음 행성으로 출발!</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={onBackToMap}
                  className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-base rounded-2xl shadow-xl transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <Trophy className="w-5 h-5" />
                  <span>모든 행성 정복! 우주 지도 보기</span>
                </button>
              )}

              <button
                onClick={() => {
                  soundService.playClick();
                  onBackToMap();
                }}
                className="w-full sm:w-auto px-5 py-3.5 bg-indigo-900/80 hover:bg-indigo-800 text-indigo-200 font-black text-sm rounded-2xl border border-indigo-400/40 transition-transform active:scale-95"
              >
                우주 지도로 나가기
              </button>
            </div>
          </div>
        )}
      </div>

      {/* New Badge Unlocked Modal Notification */}
      {unlockedBadgesModal.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-indigo-900 to-purple-950 border-3 border-yellow-400 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="w-20 h-20 mx-auto rounded-full bg-yellow-400/20 border-2 border-yellow-300 flex items-center justify-center text-4xl shadow-inner animate-pulse">
              {unlockedBadgesModal[0].icon}
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1 text-xs font-black text-yellow-300 bg-yellow-950/80 px-3 py-1 rounded-full border border-yellow-400/40">
                <Award className="w-3.5 h-3.5" /> 새로운 우주 배지 획득!
              </div>
              <h3 className="text-2xl font-black text-white">
                {unlockedBadgesModal[0].title}
              </h3>
              <p className="text-sm text-indigo-200 font-bold">
                {unlockedBadgesModal[0].description}
              </p>
            </div>

            <button
              onClick={() => {
                soundService.playClick();
                setUnlockedBadgesModal([]);
              }}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 text-slate-950 font-black text-base rounded-2xl shadow-lg transition-transform active:scale-95"
            >
              신난다! 배지함에 쏙 넣기 ✨
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
