// 1) 내비게이션 앵커 스무스 스크롤
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {      // href가 #으로 시작하는 모든 a 태그 선택
  anchor.addEventListener("click", function (e) {                    // 클릭 이벤트 등록
    e.preventDefault()                                               // 기본 이동 막기
    const target = document.querySelector(this.getAttribute("href")) // href에 해당하는 DOM 요소 찾기
    if (target) {                                                    // 대상이 존재하면
      target.scrollIntoView({ behavior: "smooth", block: "start" })  // 스무스 스크롤 이동
    }
  })
})


// // 2) .character 요소 호버 애니메이션
// document.querySelectorAll(".character").forEach((character) => {     // .character 요소 모두 선택 (HTML엔 없음)
//   character.addEventListener("mouseenter", function () {             // 마우스 진입 시
//     this.style.transform = "translateY(-15px) scale(1.05)"           // 살짝 위로 & 확대
//   })
//   character.addEventListener("mouseleave", function () {             // 마우스 이탈 시
//     this.style.transform = "translateY(0) scale(1)"                  // 원래 상태 복귀
//   })
// })


// // 3) .control-item 클릭 상호작용
// document.querySelectorAll(".control-item").forEach((item) => {       // .control-item 요소 모두 선택 (HTML엔 없음)
//   item.addEventListener("click", function () {                       
//     document.querySelectorAll(".control-item").forEach((i) => i.classList.remove("active")) // 모든 active 제거
//     this.classList.add("active")                                     // 클릭한 것만 active
//     this.style.background = "#ff6b35"                                // 임시로 배경 강조
//     setTimeout(() => { this.style.background = "#333" }, 200)        // 0.2초 뒤 원래색 복귀
//   })
// })


// 4) 비디오 재생 버튼 클릭 안내
document.querySelector(".play-button")?.addEventListener("click", () => { // .play-button 존재하면 실행
  alert("비디오 재생 기능은 실제 비디오 파일이 필요합니다.")              // 알림창 띄움
})


// 5) 스크롤 위치 따라 .scroll-dot 활성화
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY                               // 현재 스크롤 Y값
  const windowHeight = window.innerHeight                             // 브라우저 높이
  const dots = document.querySelectorAll(".scroll-dot")               // .scroll-dot 요소들 (HTML엔 없음)
  const sections = document.querySelectorAll("section")               // 모든 section 요소

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop                              // 섹션 시작 위치
    const sectionHeight = section.offsetHeight                        // 섹션 높이
    if (
      scrollPosition >= sectionTop - windowHeight / 2 &&              // 뷰포트 절반 이상 올라왔을 때
      scrollPosition < sectionTop + sectionHeight - windowHeight / 2
    ) {
      dots.forEach((dot) => dot.classList.remove("active"))           // 모든 dot 비활성화
      if (dots[index]) dots[index].classList.add("active")            // 현재 섹션 대응 dot 활성화
    }
  })
})


// 6) 스크롤 시 내비게이션 배경 투명도 조절
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")                    // 네비게이션 바 선택
  if (window.scrollY > 100) {                                         // 스크롤 100px 넘으면
    navbar.style.background = "rgba(0, 0, 0, 0.95)"                   // 더 진하게
  } else {
    navbar.style.background = "rgba(0, 0, 0, 0.9)"                    // 기본 배경
  }
})


// 7) 페이지 로드 시 페이드인 효과
window.addEventListener("load", () => {
  document.body.style.opacity = "0"                                   // body 투명화
  document.body.style.transition = "opacity 0.5s"                     // 트랜지션 설정
  setTimeout(() => { document.body.style.opacity = "1" }, 100)        // 0.1초 뒤 서서히 나타남
})


// 8) 캐릭터 카드(.character-card) 호버 효과
document.querySelectorAll(".character-card").forEach((card) => {      // .character-card 선택 (HTML엔 없음)
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px) rotateY(5deg)"          // 떠오르고 약간 회전
  })
  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) rotateY(0deg)"              // 원위치
  })
})


// 9) 멤버 카드(.member-card) 호버 효과
document.querySelectorAll(".member-card").forEach((card) => {         // .member-card 선택 (HTML엔 없음)
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"            // 살짝 떠오르고 확대
  })
  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"                   // 원위치
  })
})


// 10) 히어로 이미지 슬라이더
let currentSlide = 0
const slides = document.querySelectorAll(".slide")                    // .slide 이미지들
const dots = document.querySelectorAll(".dot")                        // 하단 dot 네비게이션
const totalSlides = slides.length                                     // 총 슬라이드 개수

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"))          // 모든 슬라이드 비활성화
  dots.forEach((dot) => dot.classList.remove("active"))                // 모든 dot 비활성화
  slides[index].classList.add("active")                               // 해당 슬라이드 활성화
  dots[index].classList.add("active")                                 // 해당 dot 활성화
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides                     // 다음 슬라이드 인덱스
  showSlide(currentSlide)                                             // 보여주기
}

dots.forEach((dot, index) => {                                        // dot 클릭 시
  dot.addEventListener("click", () => {
    currentSlide = index                                              // 클릭한 dot 인덱스로 이동
    showSlide(currentSlide)
  })
})

setInterval(nextSlide, 3000)                                          // 3초마다 자동 전환
showSlide(0)                                                          // 첫 슬라이드 표시



// 1) 캐릭터 데이터: 썸네일과 큰 이미지를 분리
const characterData = {
  ghost: {
    name: "GHOST",
    description: "튜토리얼 가이드",
    thumb: "/images/GHOST.png",      // role-item 썸네일
    display: "./images/ghost.png"      // 우측 큰 이미지
  },
  mare: {
    name: "MARE",
    description: "긴 팔을 이용한 공격",
    thumb: "/images/MARE.png",
    display: "./images/CH_01.png"
  },
  golem: {
    name: "GOLEM",
    description: "돌을 이용한 공격",
    thumb: "/images/GOLEM.png",
    display: "./images/CH_02.png"
  },
  professor: {
    name: "PROFESSOR",
    description: "마법을 이용한 공격",
    thumb: "/images/PROFESSOR.png",
    display: "./images/CH_03.png"
  }
};

// 2) DOMContentLoaded 때 role-item 썸네일을 데이터로 동기화 (선택사항)
//   - 이미 HTML에 썸네일 src가 들어가 있으면 이 블록은 생략 가능
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".role-item").forEach((item) => {
    const key = item.getAttribute("data-character");       // ghost/mare/...
    const iconImg = item.querySelector(".role-icon img");  // 썸네일 <img>
    const data = characterData[key];
    if (data && iconImg) {
      iconImg.src = data.thumb;                            // 썸네일로 교체
      iconImg.alt = data.name;
    }
  });

  // 초기 활성화 & 우측 큰 이미지도 세팅
  const firstKey = "ghost";
  const firstRole = document.querySelector(`.role-item[data-character="${firstKey}"]`);
  if (firstRole) {
    firstRole.classList.add("active");
    const img = document.getElementById("character-image");
    const name = document.getElementById("character-name");
    const desc = document.getElementById("character-description");
    img.src = characterData[firstKey].display;
    img.alt = characterData[firstKey].name;
    name.textContent = characterData[firstKey].name;
    desc.textContent = characterData[firstKey].description;
  }
});

// 3) 클릭 시 우측 큰 이미지를 display로만 바꿔 줌 (썸네일은 그대로 유지)
document.querySelectorAll(".role-item").forEach((roleItem) => {
  roleItem.addEventListener("click", function () {
    document.querySelectorAll(".role-item").forEach((i) => i.classList.remove("active"));
    this.classList.add("active");

    const key = this.getAttribute("data-character");
    const data = characterData[key];
    if (!data) return;

    const img = document.getElementById("character-image");
    const name = document.getElementById("character-name");
    const desc = document.getElementById("character-description");

    img.style.opacity = name.style.opacity = desc.style.opacity = "0";
    setTimeout(() => {
      img.src = data.display;           // ← 큰 이미지로 교체
      img.alt = data.name;
      name.textContent = data.name;
      desc.textContent = data.description;
      img.style.opacity = name.style.opacity = desc.style.opacity = "1";
    }, 250);
  });
});



