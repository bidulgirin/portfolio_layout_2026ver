let shapes = gsap.utils.toArray(".shape");

let tl = gsap.timeline({
  defaults: { duration: 2, ease: "expo.inOut" },
  repeat: -1,
});

shapes.forEach((shape, i) => {
  tl.to("#morph", { morphSVG: shapes[i] });
});

gsap.set("#svg-stage", { opacity: 1 });

const tl2 = gsap
  .timeline({ repeat: -1, repeatDelay: 0.5 })

  .fromTo(
    ".group1",
    { scale: 0.1, transformOrigin: "124 124" },
    { duration: 0.35, scale: 0.5, ease: "expo.inOut" },
  )
  .to(".group1", { duration: 1.2, rotate: 15, ease: "none" }, 0.1)
  .to(
    ".group1 image",
    {
      scale: (i) => [0.4, 0.2, 0.3][i],
      x: (i) => [0, 135, 100][i],
      y: (i) => [90, 24, 124][i],
      ease: "back",
    },
    0.4,
  )
  .to(".group1 image", { duration: 0.01, opacity: 0, stagger: 0.06 }, 1.1)

  .to("#g2_mask circle", { duration: 1, attr: { r: "124" }, ease: "circ" }, 1.3)
  .fromTo(
    ".group2",
    { scale: 1, transformOrigin: "124 124" },
    { duration: 1.5, scale: 0.9, ease: "none" },
    1.3,
  )
  .to(
    "#g2_mask circle",
    {
      duration: 0.3,
      attr: { cx: (i) => ["+=248", "-=248"][i] },
      ease: "sine.in",
    },
    2.45,
  )

  .fromTo(
    ".group3",
    { transformOrigin: "124 124", rotate: -90 },
    { duration: 0.9, rotate: 0, ease: "expo" },
    2.6,
  )
  .fromTo(
    "#g3_mask rect",
    {
      transformOrigin: (i) => ["0 124", "124 0", "124 124", "248 124"][i],
      scale: 0,
    },
    { duration: 0.4, scale: 1, ease: "expo", stagger: -0.03 },
    2.6,
  )
  .to(".group3", { duration: 0.01, scale: 0 }, 3.7)

  .from(".group4 image", { duration: 0.01, opacity: 0 }, 3.8)
  .fromTo(
    ".group4",
    { transformOrigin: "83 124", rotate: 15, scale: 0.2 },
    { duration: 0.5, rotate: 0, scale: 0.85, ease: "bounce" },
    3.8,
  )
  .to(".group4 image", { duration: 0.01, opacity: 0 }, 4.7)

  .fromTo(
    "#g5_mask path",
    { transformOrigin: "124 124", scale: 0 },
    { duration: 0.8, scale: 1, ease: "expo" },
    4.7,
  )
  .fromTo(
    "#g5_mask circle",
    { transformOrigin: "83 0", scale: 0 },
    { scale: 1, ease: "expo" },
    4.7,
  );

//GSDevTools.create({animation: tl2});

// 자동 하이픈
function addHyphenToPhoneNumber(phoneNumberInput) {
  const phoneNumber = phoneNumberInput.value;
  const length = phoneNumber.length;

  if (length >= 9) {
    let numbers = phoneNumber
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    phoneNumberInput.value = numbers;
  }
}

const phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", () => {
  addHyphenToPhoneNumber(phoneInput);
});

// 로딩화면
gsap.set("#loading", { opacity: 1 });

const mm = gsap.matchMedia();

mm.add(
  {
    isSmall: "(max-width: 10vw)",
    isLarge: "(min-width: 20vw)",
  },
  (c) => {
    if (c.conditions.isSmall) {
      gsap.set(".large", { display: "none" });
      gsap.from(".small", { scale: 0, ease: "back.out" });
      gsap.to(".small img", {
        rotation: 360,
        repeat: -1,
        ease: "none",
        duration: 1,
      });
    }
    if (c.conditions.isLarge) {
      gsap.set(".small", { display: "none" });
      gsap.from(".large", { scale: 0, ease: "back.out" });
      gsap.to(".large img", {
        rotation: -360,
        repeat: -1,
        ease: "none",
        duration: 1,
      });
    }
  },
);

// 실제 모든 문서와 이미지가 불러왔을때 사라지거라
window.addEventListener("load", function () {
  const loading = document.getElementById("loading");
  loading.classList.add("fade-out");
  loading.addEventListener("transitionend", function () {
    loading.style.display = "none";
  });
});

// 커서 움직임
const bigBall = document.querySelector(".cursor__ball--big");
const smallBall = document.querySelector(".cursor__ball--small");
const hoverables = document.querySelectorAll(".hoverable");

let mouseX = 0,
  mouseY = 0;
let bigX = 0,
  bigY = 0;
let smallX = 0,
  smallY = 0;

const BIG_OFFSET_X = 15;
const BIG_OFFSET_Y = 15;
const SMALL_OFFSET_X = 5;
const SMALL_OFFSET_Y = 7;

// “따라오는 속도” (0~1, 클수록 빨리 따라옴)
const BIG_EASE = 0.02; // TweenMax 0.4s 느낌
const SMALL_EASE = 0.35; // TweenMax 0.1s 느낌

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// hover scale
hoverables.forEach((el) => {
  console.log("el", el);
  el.addEventListener("mouseenter", () => bigBall.classList.add("is-hover"));
  el.addEventListener("mouseleave", () => bigBall.classList.remove("is-hover"));
});

// RAF로 부드럽게 추적
function animate() {
  const targetBigX = mouseX - BIG_OFFSET_X;
  const targetBigY = mouseY - BIG_OFFSET_Y;
  const targetSmallX = mouseX - SMALL_OFFSET_X;
  const targetSmallY = mouseY - SMALL_OFFSET_Y;

  bigX += (targetBigX - bigX) * BIG_EASE;
  bigY += (targetBigY - bigY) * BIG_EASE;

  smallX += (targetSmallX - smallX) * SMALL_EASE;
  smallY += (targetSmallY - smallY) * SMALL_EASE;

  bigBall.style.transform = `translate3d(${bigX}px, ${bigY}px, 0)`;
  smallBall.style.transform = `translate3d(${smallX}px, ${smallY}px, 0)`;

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// 마우스 효과

const bg = document.querySelector(".parallax-bg");

let mx = 0,
  my = 0; // target
let cx = 0,
  cy = 0; // current (smooth)

const MAX_MOVE = 80; // 움직임 강도(px) - 숫자 키우면 더 크게 움직임
const EASE = 0.12; // 부드러움(0~1) - 작을수록 더 느리게 따라옴

document.addEventListener("mousemove", (e) => {
  // -0.5 ~ 0.5 (화면 중앙 기준)
  mx = e.clientX / window.innerWidth - 0.5;
  my = e.clientY / window.innerHeight - 0.5;
});

function mainAnimate() {
  // 부드럽게 따라오기
  cx += (mx - cx) * EASE;
  cy += (my - cy) * EASE;

  // 배경은 보통 "반대 방향"으로 움직이면 깊이감이 더 좋아서 - 붙임
  const x = -cx * MAX_MOVE;
  const y = -cy * MAX_MOVE;

  bg.style.transform = `translate3d(${x}px, ${y}px, 0)`;

  requestAnimationFrame(mainAnimate);
}
requestAnimationFrame(mainAnimate);

// 기술 스택 애니메이션
document.addEventListener("DOMContentLoaded", () => {
  const marquee = document.querySelector(".marquee");
  if (!marquee) return;

  const track = marquee.querySelector(".marquee__track");
  const list = marquee.querySelector(".marquee__list");

  if (!track || !list) {
    console.error(
      "Marquee 요소를 찾지 못했습니다. .marquee / .marquee__track / .marquee__list 확인",
    );
    return;
  }

  // 이미 복제했는지 체크(중복 방지)
  if (!track.dataset.cloned) {
    const clone = list.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
    track.dataset.cloned = "true";
  }

  const SPEED = 80; // px/s

  let x = 0;
  let last = performance.now();
  let loopWidth = 0;

  function measureAndFixX() {
    const newWidth = list.scrollWidth || 0;
    if (newWidth <= 0) return;

    // loopWidth가 바뀌어도 현재 위치가 자연스럽게 유지되도록 보정
    // x는 음수 방향으로 움직이므로 (-x) % width 형태로 정규화
    const progressed = loopWidth > 0 ? -x % loopWidth : 0;
    loopWidth = newWidth;
    x = -progressed; // 같은 진행률로 유지

    track.style.transform = `translate3d(${x}px,0,0)`;
  }

  // resize 디바운스 (RAF)
  let resizeRaf = 0;
  function onResize() {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(measureAndFixX);
  }

  function tick(now) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dt = (now - last) / 1000;
    last = now;

    x -= SPEED * dt;

    if (loopWidth > 0 && -x >= loopWidth) {
      x += loopWidth;
    }

    track.style.transform = `translate3d(${x}px,0,0)`;
    requestAnimationFrame(tick);
  }

  // 최초 측정(이미지 로딩 전/후 둘 다 대응)
  measureAndFixX();

  window.addEventListener("resize", onResize);
  window.addEventListener("orientationchange", onResize);

  // 이미지/폰트 로딩 끝나면 폭이 달라질 수 있어서 재측정
  window.addEventListener("load", () => {
    measureAndFixX();
    last = performance.now();
  });

  // 웹폰트 로딩으로 폭 바뀌는 케이스 보강(지원 브라우저에서만)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => measureAndFixX());
  }

  requestAnimationFrame(tick);
});

// container 효과
const containers = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-active", entry.isIntersecting);
    });
  },
  {
    threshold: 0.7, // 70%만 보여도 활성화
    rootMargin: "0px 0px -10% 0px", // 살짝 “들어왔을 때”를 앞당기거나 늦출 수 있음
  },
);

containers.forEach((el) => observer.observe(el));

// 클릭 물결
document.querySelectorAll("body").forEach((wrap) => {
  wrap.addEventListener("click", (e) => {
    const rect = wrap.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 가장 큰 반지름(대각선) 기준으로 ripple 크기 잡기
    const size = Math.hypot(rect.width, rect.height) * 2;

    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x - size / 2}px`;
    ripple.style.top = `${y - size / 2}px`;

    // 원하는 색 (예: 흰색 물결)
    ripple.style.background = "white";

    wrap.appendChild(ripple);

    ripple.addEventListener("animationend", () => ripple.remove());
  });
});

// 서버로 전송
const form = document.getElementById("contactForm");
const lightbox = document.getElementById("lightbox");
const lbClose = document.getElementById("lbClose");
const backdrop = lightbox.querySelector(".lightbox__backdrop");

function openLightbox() {
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
}

lbClose.addEventListener("click", closeLightbox);
backdrop.addEventListener("click", closeLightbox);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fd = new FormData(form);
  const payload = Object.fromEntries(fd.entries());

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err?.message || "전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    // 성공
    openLightbox();
    form.reset();
  } catch (err) {
    alert("네트워크 오류가 발생했습니다.");
  }
});
