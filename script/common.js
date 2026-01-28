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
