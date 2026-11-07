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

6. **브라우저 로컬 캐시 영구 저장 리더보드**
   - 모든 점수, 모은 별, 새로 추가한 친구들의 기록이 브라우저 캐시(`localStorage`)에 영구 저장됩니다.
   - 친구의 이름과 점수를 새로 등록하여 함께 순위를 겨룰 수 있습니다.

---

## 🛠️ 기술 스택

- **Framework**: React 19, TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Animation & Confetti**: Motion, Canvas-Confetti
- **Icons**: Lucide React
- **Audio & Speech**: Web Audio API, Web Speech API (TTS)
- **Data Persistence**: Browser Cache (LocalStorage)

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

## 📦 GitHub 저장소에 올리는 방법 (How to Push)

```bash
# 1. 원격 저장소 연결 (GitHub에서 생성한 새 리포지토리 URL)
git remote add origin https://github.com/사용자이름/저장소이름.git

# 2. 메인 브랜치 설정 및 푸시
git branch -M main
git push -u origin main
```
