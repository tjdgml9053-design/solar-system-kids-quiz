# 별빛 탐험대: 태양계 우주 탐험 퀴즈 (Space Solar Explorer) 🚀

7세 유치원 어린이를 위한 교육용 우주 탐험 인터랙티브 웹 게임입니다.  
귀여운 가이드 로봇 **삐뽀(Pippo)**와 함께 태양계 행성을 여행하며 단계별 특징을 듣고 알맞은 이름을 맞추는 퀴즈를 풀며 별과 우주 배지를 수집할 수 있습니다.

---

## 🌟 주요 기능

1. **7세 유아 맞춤형 UI & 오디오 지원**
   - **한국어 음성 힌트(Web Speech API)**: 글을 읽기 힘든 유아를 위해 로봇 삐뽀가 힌트를 직접 음성으로 읽어줍니다.
   - **무지연 Web Audio API 효과음**: 정답 팡파르, 차임벨, 실패음, 별 획득 소리, 로봇 삐뽀 비프음.
   - 귀엽고 큰 터치 버튼 및 친근한 `Jua` 한글 폰트 적용.

2. **10대 태양계 천체 탐험**
   - 태양(Sun), 수성(Mercury), 금성(Venus), 지구(Earth), 달(Moon), 화성(Mars), 목성(Jupiter), 토성(Saturn), 천왕성(Uranus), 해왕성(Neptune)
   - 각 천체별 고유한 비주얼 SVG 일러스트 및 행성 크기 비교 정보 제공.

3. **3단계 특징 듣기 퀴즈**
   - 1단계: 전체적 외형/온도 힌트
   - 2단계: 과학적 특징 (구덩이, 고리, 줄무늬, 대적점 등)
   - 3단계: 결정적 단서
   - 시도 횟수에 따라 별 1~3개 차등 획득.

4. **가이드 로봇 캐릭터 '삐뽀(Pippo)'**
   - 말할 때 반짝이는 안테나와 표정 변화 애니메이션.
   - 삐뽀를 터치하면 격려 칭찬 음성 출력.

5. **우주 배지 도감 & 어린이 우주 비행사 면허증**
   - 10종의 우주 탐험 공식 배지 수집.
   - 나만의 대원 사진(이모지)과 도장이 찍힌 공인 우주 비행사 면허증 발급 및 인쇄 기능.

6. **구글 파이어베이스(Firestore) 실시간 리더보드 & 첫 화면 바로가기**
   - 구글 파이어베이스 Firestore와 `onSnapshot` 실시간 리스너로 연결되어 전 세계/친구들의 점수와 랭킹이 실시간으로 동기화됩니다.
   - 첫 화면(메인 타이틀)에 **'🏆 실시간 명예의 전당 (리더보드)'** 바로가기 링크가 제공되어 게임 시작 전 언제든 확인할 수 있습니다.
   - 모든 대원 데이터 및 오프라인 상태 점수는 브라우저 캐시(`localStorage`)에도 안전하게 영구 저장됩니다.

7. **행성 퀴즈 랜덤 순서 진행 & 리셋 기능**
   - 태양계 고정 순서 대신 10개 행성이 매 탐험마다 **무작위(랜덤) 순서로 배정**되어 흥미를 높입니다.
   - 우측 상단 회전 화살표(🔄)를 누르면 게임 진행 상황이 초기화되고 **새로운 무작위 탐험 경로**가 셔플됩니다.

---

## 🛠️ 기술 스택

- **Framework**: React 19, TypeScript
- **Bundler**: Vite
- **Database & Cloud**: Google Firebase (Firestore 실시간 데이터베이스)
- **Styling**: Tailwind CSS
- **Animation & Confetti**: Motion, Canvas-Confetti
- **Icons**: Lucide React
- **Audio & Speech**: Web Audio API, Web Speech API (TTS)
- **Data Persistence**: Google Firebase Firestore + Browser Cache (LocalStorage)

---

## 🚀 로컬 실행 방법

```bash
# 1. 패키지 설치
npm install

# 2. 로컬 개발 서버 실행
npm run dev

# 3. 프로덕션 빌드
npm run build
```

---

## 📦 GitHub 저장소

- **Repository**: [https://github.com/tjdgml9053-design/solar-system-kids-quiz](https://github.com/tjdgml9053-design/solar-system-kids-quiz)
- **Branch**: `main`
