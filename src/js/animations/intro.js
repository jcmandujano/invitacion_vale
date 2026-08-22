import { gsap } from "gsap";

const PARTICLE_COLORS = [
  "rgba(230, 201, 138, 0.82)",
  "rgba(183, 154, 219, 0.68)",
  "rgba(243, 233, 214, 0.62)",
];

const SEAL_SPARK_COLORS = [
  "rgba(230, 201, 138, 0.96)",
  "rgba(183, 154, 219, 0.9)",
  "rgba(243, 233, 214, 0.9)",
];

const createParticles = (container, count) => {
  if (!container || container.childElementCount > 0) {
    return;
  }

  const fragment = document.createDocumentFragment();

  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement("span");
    const isFeaturedStar = index % 4 === 0;
    particle.className = isFeaturedStar
      ? "magic-particle magic-particle--star"
      : "magic-particle";
    particle.style.setProperty("--particle-x", `${(index * 37 + 11) % 96}%`);
    particle.style.setProperty("--particle-y", `${(index * 61 + 7) % 94}%`);
    particle.style.setProperty(
      "--particle-size",
      `${isFeaturedStar ? 7 + (index % 3) * 2 : 1.5 + (index % 3)}px`,
    );
    particle.style.setProperty(
      "--particle-color",
      PARTICLE_COLORS[index % PARTICLE_COLORS.length],
    );
    fragment.append(particle);
  }

  container.append(fragment);
};

const waitForCriticalAssets = async (intro) => {
  const images = [...intro.querySelectorAll("[data-intro-critical]")];
  const decodeImages = Promise.allSettled(images.map((image) => image.decode?.()));
  const timeout = new Promise((resolve) => window.setTimeout(resolve, 2200));

  await Promise.race([decodeImages, timeout]);
};

const createSealSparkles = (container, count = 8) => {
  if (!container) {
    return [];
  }

  if (container.childElementCount === 0) {
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < count; index += 1) {
      const sparkle = document.createElement("span");
      sparkle.className = "envelope__seal-spark";
      sparkle.style.setProperty(
        "--spark-color",
        SEAL_SPARK_COLORS[index % SEAL_SPARK_COLORS.length],
      );
      fragment.append(sparkle);
    }

    container.append(fragment);
  }

  return [...container.querySelectorAll(".envelope__seal-spark")];
};

export const initIntro = async (introText = {}) => {
  document.documentElement.classList.remove("intro-booting");

  const intro = document.querySelector("[data-intro]");

  if (!intro) {
    return;
  }

  const atmosphere = intro.querySelector("[data-intro-atmosphere]");
  const content = intro.querySelector("[data-intro-content]");
  const envelope = intro.querySelector("[data-envelope]");
  const flap = intro.querySelector("[data-flap]");
  const letter = intro.querySelector("[data-letter]");
  const letterContent = intro.querySelector("[data-letter-content]");
  const loader = intro.querySelector("[data-intro-loader]");
  const particleContainer = intro.querySelector("[data-particles]");
  const seal = intro.querySelector("[data-seal]");
  const sealMagic = intro.querySelector("[data-seal-magic]");
  const recipient = intro.querySelector("[data-recipient]");
  const hint = intro.querySelector("[data-intro-hint]");
  const copy = intro.querySelectorAll("[data-intro-copy]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (
    !content ||
    !envelope ||
    !flap ||
    !letter ||
    !letterContent ||
    !loader ||
    !seal ||
    !sealMagic ||
    !recipient ||
    !hint
  ) {
    throw new Error("The intro markup is incomplete.");
  }

  document.body.classList.add("intro-active");
  createParticles(particleContainer, reduceMotion ? 14 : 34);

  const particles = intro.querySelectorAll(".magic-particle");
  const featuredStars = intro.querySelectorAll(".magic-particle--star");
  const sealSparkles = createSealSparkles(sealMagic);
  let arrival;
  let idleTimeline;
  let starTimeline;
  let openingTimeline;
  const setState = (state) => {
    intro.dataset.introState = state;
  };

  gsap.set(content, { autoAlpha: 1 });
  gsap.set([atmosphere, envelope, ...copy].filter(Boolean), { autoAlpha: 0 });
  gsap.set(particles, { autoAlpha: 0, scale: 0.45 });
  gsap.set(letterContent, { autoAlpha: 0.12, y: 6 });
  gsap.set(sealMagic, { autoAlpha: 0, scale: 0.55 });
  gsap.set(sealSparkles, { autoAlpha: 0, scale: 0.4, x: 0, y: 0 });

  const loaderPulse = reduceMotion
    ? null
    : gsap.to(loader, {
        autoAlpha: 0.5,
        duration: 0.7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

  const stopIntroMotion = () => {
    loaderPulse?.kill();
    arrival?.kill();
    idleTimeline?.kill();
    starTimeline?.kill();
    openingTimeline?.kill();
  };

  document.addEventListener("site:ready", stopIntroMotion, { once: true });

  await waitForCriticalAssets(intro);
  loaderPulse?.kill();

  if (document.documentElement.dataset.siteState === "ready") {
    return () => document.removeEventListener("site:ready", stopIntroMotion);
  }

  const startStarTwinkle = () => {
    if (reduceMotion || featuredStars.length === 0) {
      return;
    }

    starTimeline = gsap
      .timeline({ repeat: -1, repeatDelay: 0.8 })
      .to(featuredStars, {
        autoAlpha: (index) => 0.82 + (index % 3) * 0.07,
        scale: (index) => 1.18 + (index % 2) * 0.14,
        duration: 1.35,
        ease: "sine.inOut",
        stagger: { each: 0.3, from: "random" },
      })
      .to(featuredStars, {
        autoAlpha: (index) => 0.52 + (index % 3) * 0.08,
        scale: 1,
        duration: 1.65,
        ease: "sine.inOut",
        stagger: { each: 0.24, from: "end" },
      });
  };

  const enableSeal = () => {
    setState("ready");
    seal.disabled = false;
    startStarTwinkle();

    if (!reduceMotion) {
      idleTimeline = gsap.to(seal, {
        scale: 1.025,
        duration: 1.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  };

  arrival = gsap.timeline({ onComplete: enableSeal });

  if (reduceMotion) {
    arrival
      .set(atmosphere, { autoAlpha: 1 })
      .set(particles, {
        autoAlpha: (index, particle) =>
          particle.classList.contains("magic-particle--star") ? 0.72 : 0.48,
        scale: 1,
      })
      .to(loader, { autoAlpha: 0, duration: 0.2 })
      .fromTo(
        envelope,
        { autoAlpha: 0, y: -8 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
      )
      .to(copy, { autoAlpha: 1, duration: 0.25, stagger: 0.05 });
  } else {
    const travelX = Math.min(window.innerWidth * 0.22, 170);
    const travelY = -Math.min(window.innerHeight * 0.3, 260);

    arrival
      .to(loader, { autoAlpha: 0, duration: 0.35 })
      .to(atmosphere, { autoAlpha: 1, duration: 0.9, ease: "sine.inOut" }, 0.1)
      .to(
        particles,
        {
          autoAlpha: (index, particle) =>
            particle.classList.contains("magic-particle--star")
              ? 0.66 + (index % 3) * 0.09
              : 0.42 + (index % 4) * 0.08,
          scale: 1,
          duration: 0.65,
          ease: "sine.out",
          stagger: { each: 0.025, from: "random" },
        },
        0.2,
      )
      .fromTo(
        envelope,
        {
          autoAlpha: 0,
          x: travelX,
          y: travelY,
          rotation: 8,
          scale: 0.82,
        },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1.45,
          ease: "power3.out",
        },
        0.35,
      )
      .fromTo(
        copy,
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.1, ease: "power2.out" },
        1.35,
      );
  }

  const openEnvelope = () => {
    if (intro.dataset.introState !== "ready") {
      return;
    }

    setState("opening");
    seal.disabled = true;
    seal.blur();
    idleTimeline?.kill();
    hint.textContent = introText.hintOpening ?? "Abriendo la invitación…";

    const envelopeHeight = envelope.getBoundingClientRect().height;
    const letterLift = -Math.min(envelopeHeight * (reduceMotion ? 0.3 : 0.52), 130);

    const completeOpening = () => {
      letter.removeAttribute("aria-hidden");
      hint.textContent = introText.hintOpened ?? "La carta ha sido revelada";
      setState("opened");
      intro.dispatchEvent(new CustomEvent("intro:opened", { bubbles: true }));
    };

    if (reduceMotion) {
      openingTimeline = gsap
        .timeline({ onComplete: completeOpening })
        .to(seal, { scale: 0.95, duration: 0.1 })
        .to([seal, recipient], { autoAlpha: 0, duration: 0.15 })
        .set(flap, { zIndex: 0 })
        .to(flap, { rotationX: -165, duration: 0.25, ease: "power2.out" })
        .to(
          letter,
          { y: letterLift, scale: 1.01, duration: 0.3, ease: "power2.out" },
          "-=0.08",
        )
        .to(letterContent, { autoAlpha: 1, y: 0, duration: 0.2 }, "<");
      return;
    }

    const sparkleCount = sealSparkles.length;

    openingTimeline = gsap
      .timeline({
        onComplete: completeOpening,
      })
      .to(seal, { scale: 0.9, duration: 0.14, ease: "power2.in" })
      .set(sealMagic, { autoAlpha: 1, scale: 0.55 }, "<")
      .to(sealMagic, { autoAlpha: 0.95, scale: 1.15, duration: 0.28, ease: "power2.out" })
      .to(
        sealSparkles,
        { autoAlpha: 1, scale: 1, duration: 0.16, stagger: 0.025 },
        "<",
      )
      .to(
        sealSparkles,
        {
          x: (index) => {
            const angle = (index / sparkleCount) * Math.PI * 2;
            return Math.cos(angle) * (34 + (index % 3) * 7);
          },
          y: (index) => {
            const angle = (index / sparkleCount) * Math.PI * 2;
            return Math.sin(angle) * (34 + (index % 3) * 7);
          },
          autoAlpha: 0,
          scale: 0.6,
          duration: 0.52,
          ease: "power2.out",
          stagger: 0.018,
        },
        "<+=0.08",
      )
      .to([seal, recipient], { autoAlpha: 0, y: 12, duration: 0.42, ease: "power2.in" }, "<")
      .to(sealMagic, { autoAlpha: 0, scale: 1.4, duration: 0.4 }, "<")
      .addLabel("flapOpen", ">-0.02")
      .to(
        flap,
        { rotationX: -175, duration: 1.05, ease: "power2.inOut" },
        "flapOpen",
      )
      .set(flap, { zIndex: 0 }, "flapOpen+=0.56")
      .to(envelope, { y: 18, duration: 0.8, ease: "power2.out" }, "flapOpen+=0.5")
      .to(
        letter,
        { y: letterLift, scale: 1.03, duration: 1.05, ease: "power3.out" },
        "flapOpen+=0.62",
      )
      .to(
        letterContent,
        { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out" },
        "flapOpen+=0.76",
      );
  };

  const handleSealKeydown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    openEnvelope();
  };

  seal.addEventListener("click", openEnvelope);
  seal.addEventListener("keydown", handleSealKeydown);

  return () => {
    document.removeEventListener("site:ready", stopIntroMotion);
    seal.removeEventListener("click", openEnvelope);
    seal.removeEventListener("keydown", handleSealKeydown);
    stopIntroMotion();
  };
};
