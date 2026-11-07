import { Badge } from '../types/game';

export const BADGES_DATA: Badge[] = [
  {
    id: 'first_flight',
    title: '첫 비행 우주대원',
    description: '첫 번째 행성 탐험을 씩씩하게 성공했어요!',
    icon: '🚀',
    category: 'progress',
    requirement: '1개 이상 행성 탐험 성공'
  },
  {
    id: 'earth_guardian',
    title: '푸른 지구 지킴이',
    description: '우리가 사는 소중한 지구 행성을 탐험했어요!',
    icon: '🌍',
    category: 'progress',
    requirement: '지구 탐험 완료'
  },
  {
    id: 'ring_master',
    title: '환상의 고리 탐험왕',
    description: '아름다운 얼음 고리를 가진 토성을 완벽히 맞혔어요!',
    icon: '🪐',
    category: 'progress',
    requirement: '토성 탐험 완료'
  },
  {
    id: 'giant_seeker',
    title: '거인 행성 정복자',
    description: '태양계 대왕 목성의 비밀을 척척 알아냈어요!',
    icon: '👑',
    category: 'progress',
    requirement: '목성 탐험 완료'
  },
  {
    id: 'star_collector',
    title: '반짝반짝 별 수집가',
    description: '우주를 여행하며 황금빛 별을 10개 이상 모았어요!',
    icon: '⭐',
    category: 'master',
    requirement: '별 10개 이상 획득'
  },
  {
    id: 'star_master',
    title: '황금 별빛 마스터',
    description: '엄청난 실력으로 별을 20개 이상 모았어요!',
    icon: '🌟',
    category: 'master',
    requirement: '별 20개 이상 획득'
  },
  {
    id: 'perfect_explorer',
    title: '퀴즈 만점 척척박사',
    description: '힌트를 듣고 첫 번째 시도에 연속으로 맞혔어요!',
    icon: '🏆',
    category: 'master',
    requirement: '3개 이상 행성에서 별 3개 만점 획득'
  },
  {
    id: 'robot_bestie',
    title: '로봇 삐뽀의 단짝',
    description: '가이드 로봇 삐뽀의 설명을 귀 기울여 5번 이상 들었어요!',
    icon: '🤖',
    category: 'social',
    requirement: '삐뽀의 힌트 듣기 5회 이상'
  },
  {
    id: 'solar_conqueror',
    title: '태양계 대통일 마스터',
    description: '모든 태양계 행성을 모두 정복한 최고의 우주 비행사!',
    icon: '🌌',
    category: 'master',
    requirement: '10개 모든 행성 탐험 완료'
  },
  {
    id: 'honor_astronaut',
    title: '명예 우주비행사 면허',
    description: '자신만의 우주 비행사 면허증을 멋지게 발급받았어요!',
    icon: '🎖️',
    category: 'social',
    requirement: '우주 비행사 면허증 발급'
  }
];
