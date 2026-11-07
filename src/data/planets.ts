import { PlanetData } from '../types/game';

export const PLANETS_DATA: PlanetData[] = [
  {
    id: 'sun',
    name: '태양',
    englishName: 'Sun',
    order: 1,
    themeColor: '#ff5500',
    secondaryColor: '#ffaa00',
    accentColor: '#ffee55',
    iconEmoji: '☀️',
    summary: '태양계의 중심에서 언제나 뜨겁고 밝게 빛나는 거대한 별이에요!',
    funFact: '태양은 너무너무 커서 지구 130만 개가 쏙 들어갈 수 있답니다!',
    sizeComparison: '지구보다 약 109배나 커요!',
    clues: [
      {
        step: 1,
        text: '스스로 활활 타오르는 아주아주 뜨거운 불덩어리 별이에요.',
        hintKey: '이글이글 뜨거운 불덩어리 🔥',
        robotVoice: '삐뽀삐뽀! 첫 번째 힌트! 스스로 활활 타오르는 아주 뜨거운 불덩어리 별이래!'
      },
      {
        step: 2,
        text: '모든 행성들이 이 별을 중심으로 빙글빙글 돌고 있어요.',
        hintKey: '태양계의 대장님 👑',
        robotVoice: '두 번째 힌트! 모든 행성 친구들이 이 대장님 별 주위를 맴돌며 돈대요!'
      },
      {
        step: 3,
        text: '낮을 환하게 비춰주고 따뜻한 햇빛을 보내주는 별이에요!',
        hintKey: '낮에 뜨는 햇님 ☀️',
        robotVoice: '마지막 힌트! 낮에 하늘을 밝게 비춰주고 따뜻한 햇살을 주는 별은 누구일까요?'
      }
    ],
    quizQuestion: '낮을 환하게 비추고 태양계 중심에서 활활 타오르는 이 별은 누구일까요?',
    quizWrongOptions: ['달', '화성', '금성']
  },
  {
    id: 'mercury',
    name: '수성',
    englishName: 'Mercury',
    order: 2,
    themeColor: '#8a8a9e',
    secondaryColor: '#5c5c6b',
    accentColor: '#cfd2dd',
    iconEmoji: '🪨',
    summary: '태양과 가장 가까이에 있는 제일 작은 꼬마 행성이에요!',
    funFact: '낮에는 프라이팬처럼 뜨겁고, 밤에는 냉동실보다 훨씬 차가워져요!',
    sizeComparison: '태양계 행성 중 가장 작아요 (달보다 조금 커요)',
    clues: [
      {
        step: 1,
        text: '태양에서 가장 가까운 첫 번째 꼬마 행성이에요.',
        hintKey: '태양과 1등으로 가까워요 🥇',
        robotVoice: '첫 번째 힌트야! 태양 할아버지와 가장 가까운 첫 번째 행성이래!'
      },
      {
        step: 2,
        text: '돌멩이와 쿵 부딪혀서 표면에 둥근 구덩이(크레이터)가 퐁퐁 뚫려 있어요.',
        hintKey: '구덩이가 퐁퐁 뚫린 얼굴 🕳️',
        robotVoice: '두 번째 힌트! 얼굴에 돌멩이 구덩이가 퐁퐁 뚫려 있어서 달과 닮았대!'
      },
      {
        step: 3,
        text: '태양계 8개 행성 중에서 몸집이 가장 작은 귀염둥이 행성이랍니다.',
        hintKey: '가장 작은 꼬마 행성 🐣',
        robotVoice: '마지막 결정적 힌트! 8개 행성 친구들 중 가장 작고 빠른 꼬마 행성의 이름은?'
      }
    ],
    quizQuestion: '태양과 제일 가깝고 구덩이가 퐁퐁 뚫린 가장 작은 행성은 누구일까요?',
    quizWrongOptions: ['목성', '해왕성', '토성']
  },
  {
    id: 'venus',
    name: '금성',
    englishName: 'Venus',
    order: 3,
    themeColor: '#e5a93b',
    secondaryColor: '#c2791d',
    accentColor: '#ffe596',
    iconEmoji: '✨',
    summary: '밤하늘에서 가장 밝게 반짝이는 샛별이자 가장 뜨거운 행성이에요!',
    funFact: '노란 두꺼운 구름 옷을 입고 있어서 열이 빠져나가지 못해 가장 뜨거워요!',
    sizeComparison: '지구와 크기가 거의 똑같아요 (지구의 쌍둥이)',
    clues: [
      {
        step: 1,
        text: '밤하늘이나 새벽 하늘에서 달 다음으로 반짝반짝 제일 밝게 빛나요.',
        hintKey: '반짝반짝 가장 밝은 별 ✨',
        robotVoice: '첫 번째 힌트! 새벽이나 저녁 하늘에서 가장 밝게 반짝이는 예쁜 별이래!'
      },
      {
        step: 2,
        text: '두꺼운 구름 이불을 덮고 있어서 온도가 400도가 넘는 가장 뜨거운 행성이에요!',
        hintKey: '구름 이불을 덮은 찜질방 ♨️',
        robotVoice: '두 번째 힌트! 두꺼운 구름 옷 때문에 태양계에서 온도가 가장 뜨겁대!'
      },
      {
        step: 3,
        text: '우리나라에서는 옛날부터 ‘샛별’이라는 예쁜 이름으로 불렀어요.',
        hintKey: '반짝이는 샛별 🌟',
        robotVoice: '마지막 힌트! 옛날부터 샛별이라고 부르던 노란 황금빛 행성은 누구일까요?'
      }
    ],
    quizQuestion: '노란 구름 옷을 입고 가장 뜨겁게 빛나는 샛별 행성은 누구일까요?',
    quizWrongOptions: ['수성', '지구', '천왕성']
  },
  {
    id: 'earth',
    name: '지구',
    englishName: 'Earth',
    order: 4,
    themeColor: '#2b82d9',
    secondaryColor: '#22a06b',
    accentColor: '#9fe1ff',
    iconEmoji: '🌍',
    summary: '푸른 바다와 공기, 그리고 우리가 살아가는 소중한 생명의 별이에요!',
    funFact: '우주에서 바라보면 맑은 바다와 하얀 구름 때문에 푸른 구슬처럼 보여요!',
    sizeComparison: '우리가 살고 있는 딱 알맞은 크기의 행성이에요!',
    clues: [
      {
        step: 1,
        text: '우주에서 바라보면 푸른 보석 구슬처럼 예쁘게 반짝여요.',
        hintKey: '푸른 바다가 가득 🌊',
        robotVoice: '첫 번째 힌트! 우주에서 보면 파란 물과 흰 구름이 가득한 보석 같대!'
      },
      {
        step: 2,
        text: '시원한 물과 숨 쉴 수 있는 맑은 공기가 풍부하게 있어요.',
        hintKey: '물과 공기가 있어요 💨',
        robotVoice: '두 번째 힌트! 동물과 식물, 사람이 숨 쉴 수 있는 공기와 물이 있대요!'
      },
      {
        step: 3,
        text: '지금 너와 나, 우리가 가족과 함께 살고 있는 바로 그 행성이야!',
        hintKey: '우리가 사는 우리 집 🏠',
        robotVoice: '마지막 힌트! 지금 우리가 발을 딛고 서 있는 바로 우리들의 고향 행성은?'
      }
    ],
    quizQuestion: '푸른 바다와 맑은 공기가 있고 우리가 살고 있는 소중한 행성은?',
    quizWrongOptions: ['화성', '금성', '목성']
  },
  {
    id: 'moon',
    name: '달',
    englishName: 'Moon',
    order: 5,
    themeColor: '#d6dbe6',
    secondaryColor: '#9ea5b8',
    accentColor: '#fff9bd',
    iconEmoji: '🌕',
    summary: '지구의 소중한 단짝 친구! 밤마다 모양이 바뀌는 신비한 달님이에요.',
    funFact: '모양이 초승달, 반달, 둥근 보름달로 매일 조금씩 변신해요!',
    sizeComparison: '지구의 약 4분의 1 크기예요',
    clues: [
      {
        step: 1,
        text: '지구 곁을 하루도 빠짐없이 빙글빙글 돌며 지켜주는 친구예요.',
        hintKey: '지구의 단짝 위성 🤝',
        robotVoice: '첫 번째 힌트! 지구 곁을 졸졸 따라다니며 지켜주는 단짝 친구래!'
      },
      {
        step: 2,
        text: '초승달 모양에서 반달, 둥글둥글한 보름달로 마법처럼 변신해요!',
        hintKey: '모양이 변하는 요술쟁이 🌙',
        robotVoice: '두 번째 힌트! 날마다 뾰족한 눈썹 모양, 둥근 모양으로 변신한대!'
      },
      {
        step: 3,
        text: '밤하늘을 노랗고 은은하게 밝혀주며, 토끼가 쿵덕쿵덕 방아를 찧는다는 전설이 있어요.',
        hintKey: '토끼가 사는 밤하늘 달님 🐇',
        robotVoice: '마지막 힌트! 둥근 보름달이 뜨면 소원을 비는 밤하늘의 주인공은?'
      }
    ],
    quizQuestion: '밤하늘에 동그랗게 떠서 모양을 바꾸며 지구 곁을 도는 친구는 누구일까요?',
    quizWrongOptions: ['태양', '수성', '금성']
  },
  {
    id: 'mars',
    name: '화성',
    englishName: 'Mars',
    order: 6,
    themeColor: '#d64527',
    secondaryColor: '#8a230f',
    accentColor: '#f79368',
    iconEmoji: '🔴',
    summary: '붉은 모래와 돌이 가득한 행성! 멋진 우주 로봇 탐사차가 달리고 있어요.',
    funFact: '태양계에서 가장 거대한 화산인 ‘올림포스 산’이 있답니다!',
    sizeComparison: '지구 크기의 절반 정도 크기예요',
    clues: [
      {
        step: 1,
        text: '붉은 흙과 녹슨 철이 섞여 있어서 온통 빨간색으로 보이는 붉은 행성이에요.',
        hintKey: '온통 붉은색 흙과 돌 🏜️',
        robotVoice: '첫 번째 힌트! 온 세상이 빨간 모래와 돌로 덮여 있는 붉은 행성이래!'
      },
      {
        step: 2,
        text: '우주 과학자들이 바퀴 달린 로봇 탐사차(로버)를 보내 사진을 찍고 있어요.',
        hintKey: '로봇 탐사차가 탐험 중 🤖',
        robotVoice: '두 번째 힌트! 지구에서 보낸 똑똑한 바퀴 로봇들이 땅을 탐사하고 있어!'
      },
      {
        step: 3,
        text: '태양계에서 가장 높은 거대한 화산이 있는 붉은 별의 이름은 무엇일까요?',
        hintKey: '영어로는 마스(Mars) 🚀',
        robotVoice: '마지막 힌트! 붉은 행성이라고도 부르는 이 행성의 이름은 무엇일까요?'
      }
    ],
    quizQuestion: '붉은 모래와 돌이 가득하고 로봇 탐사차가 달리고 있는 행성은?',
    quizWrongOptions: ['목성', '토성', '수성']
  },
  {
    id: 'jupiter',
    name: '목성',
    englishName: 'Jupiter',
    order: 7,
    themeColor: '#d48d48',
    secondaryColor: '#a65e23',
    accentColor: '#f3c78d',
    iconEmoji: '🌀',
    summary: '태양계 8개 행성 중 가장 큰 거인 대장 행성이에요!',
    funFact: '지구보다 1,300배나 크고, 커다란 소용돌이인 ‘대적점’ 눈이 있어요!',
    sizeComparison: '태양계에서 가장 거대해요 (지구 11배 지름)',
    clues: [
      {
        step: 1,
        text: '태양계 행성 친구들 중 덩치가 가장 크고 무거운 대왕 행성이에요.',
        hintKey: '태양계 최고의 거인 행성 👑',
        robotVoice: '첫 번째 힌트! 모든 행성을 다 합친 것보다 더 무겁고 큰 대왕 행성이래!'
      },
      {
        step: 2,
        text: '표면에 알록달록 가로 줄무늬 옷을 멋지게 입고 있어요.',
        hintKey: '알록달록 멋진 줄무늬 🧣',
        robotVoice: '두 번째 힌트! 겉모습에 커피와 크림을 섞은 듯한 예쁜 줄무늬가 있대!'
      },
      {
        step: 3,
        text: '지구도 쏙 들어갈 만큼 거대한 붉은 소용돌이 눈(대적점)을 가지고 있어요!',
        hintKey: '거대한 빨간 점 눈 👁️',
        robotVoice: '마지막 결정적 힌트! 커다란 빨간 눈 소용돌이가 있는 가장 큰 거인 행성은?'
      }
    ],
    quizQuestion: '태양계에서 가장 크고 거대한 붉은 점 소용돌이가 있는 대왕 행성은?',
    quizWrongOptions: ['금성', '화성', '수성']
  },
  {
    id: 'saturn',
    name: '토성',
    englishName: 'Saturn',
    order: 8,
    themeColor: '#deb059',
    secondaryColor: '#96742c',
    accentColor: '#ffebb0',
    iconEmoji: '🪐',
    summary: '얼음과 돌로 만들어진 반짝반짝 아름다운 고리를 가진 행성이에요!',
    funFact: '거대한 고리는 수많은 얼음 조각과 반짝이는 먼지로 이루어져 있어요!',
    sizeComparison: '목성 다음으로 큰 두 번째 거대 행성이에요',
    clues: [
      {
        step: 1,
        text: '우주에서 가장 아름다운 반짝이는 훌라후프 고리를 허리에 두르고 있어요.',
        hintKey: '신비한 훌라후프 고리 🪐',
        robotVoice: '첫 번째 힌트! 허리에 반짝반짝 아름다운 훌라후프 고리를 두르고 있대!'
      },
      {
        step: 2,
        text: '그 고리는 수많은 얼음 알갱이와 돌멩이들이 모여 반짝이는 거랍니다.',
        hintKey: '얼음과 먼지의 왕관 👑',
        robotVoice: '두 번째 힌트! 그 예쁜 고리는 반짝이는 얼음 조각들이 모여 만든 거래!'
      },
      {
        step: 3,
        text: '목성 다음으로 큰 두 번째 거인 행성이자 모자챙 같은 고리를 가진 행성은?',
        hintKey: '아름다운 고리 행성 💫',
        robotVoice: '마지막 힌트! 가장 유명하고 아름다운 고리를 뽐내는 이 행성은 누구일까요?'
      }
    ],
    quizQuestion: '신비롭고 아름다운 얼음 고리를 허리에 두른 행성은 누구일까요?',
    quizWrongOptions: ['해왕성', '지구', '화성']
  },
  {
    id: 'uranus',
    name: '천왕성',
    englishName: 'Uranus',
    order: 9,
    themeColor: '#45bfb8',
    secondaryColor: '#207872',
    accentColor: '#97f5ef',
    iconEmoji: '💎',
    summary: '청록색 보석처럼 예쁜 색깔로, 데굴데굴 누워서 자전하는 별이에요!',
    funFact: '다른 행성과 다르게 옆으로 90도 누워서 데굴데굴 구르며 돌아요!',
    sizeComparison: '지구의 약 4배 크기의 얼음 거인이에요',
    clues: [
      {
        step: 1,
        text: '예쁜 에메랄드 보석처럼 밝은 청록색 빛깔을 띠는 차가운 행성이에요.',
        hintKey: '청록색 보석빛깔 💎',
        robotVoice: '첫 번째 힌트! 민트초코처럼 상쾌한 청록색 보석빛깔을 띠고 있대!'
      },
      {
        step: 2,
        text: '다른 행성들처럼 똑바로 서서 돌지 않고, 옆으로 누워서 데굴데굴 굴러가요.',
        hintKey: '옆으로 누워서 데굴데굴 🛞',
        robotVoice: '두 번째 힌트! 바퀴처럼 옆으로 쿨쿨 누워서 데굴데굴 구르며 돈대!'
      },
      {
        step: 3,
        text: '영하 200도가 넘는 꽁꽁 얼어붙은 얼음 거인 행성이에요.',
        hintKey: '누워서 도는 얼음 거인 ❄️',
        robotVoice: '마지막 힌트! 청록색 보석 같고 누워서 데굴데굴 도는 이 행성의 이름은?'
      }
    ],
    quizQuestion: '청록색 보석처럼 빛나고 옆으로 누워서 데굴데굴 도는 행성은?',
    quizWrongOptions: ['목성', '토성', '금성']
  },
  {
    id: 'neptune',
    name: '해왕성',
    englishName: 'Neptune',
    order: 10,
    themeColor: '#2757d6',
    secondaryColor: '#122e7d',
    accentColor: '#6da0ff',
    iconEmoji: '🌀',
    summary: '태양에서 가장 멀리 떨어져 있고 차가운 초강풍 태풍이 부는 푸른 별이에요!',
    funFact: '바다의 신 ‘포세이돈(넵튠)’의 이름을 딴 깊고 푸른 바다 빛깔 행성이에요!',
    sizeComparison: '지구의 약 3.9배 크기의 푸른 거인이에요',
    clues: [
      {
        step: 1,
        text: '태양에서 가장 멀리 떨어져 있는 태양계의 8번째 막내 행성이에요.',
        hintKey: '태양에서 가장 먼 막내 🥶',
        robotVoice: '첫 번째 힌트! 태양에서 가장 멀리 떨어진 8번째 막내 행성이래!'
      },
      {
        step: 2,
        text: '깊고 짙은 푸른 바다처럼 아름다운 코발트 블루 색깔을 뽐내요.',
        hintKey: '깊은 바다 빛깔 🌊',
        robotVoice: '두 번째 힌트! 바다의 신 이름을 따서 깊고 푸른 바다색을 하고 있대요!'
      },
      {
        step: 3,
        text: '시속 2,000km가 넘는 태양계에서 가장 빠르고 차가운 바람 태풍이 불고 있어요.',
        hintKey: '초강풍 푸른 태풍 🌪️',
        robotVoice: '마지막 힌트! 태양계 가장자리에서 가장 차가운 강풍이 부는 푸른 행성은?'
      }
    ],
    quizQuestion: '태양계 가장 끝자락에서 거센 폭풍과 깊은 푸른빛을 뽐내는 행성은?',
    quizWrongOptions: ['천왕성', '수성', '지구']
  }
];
