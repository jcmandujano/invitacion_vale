import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const REVEAL_PRESETS = {
  text: { autoAlpha: 0, y: 22 },
  image: { autoAlpha: 0, y: 18, scale: 0.965 },
  ornament: { autoAlpha: 0, scale: 0.84 },
  stagger: { autoAlpha: 0, y: 26 },
};

const toElements = (root, selectors) =>
  selectors.flatMap((selector) => [...root.querySelectorAll(selector)]);

export const initScrollReveals = () => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animations = [];
  const revealElements = [];
  let hasInitialized = false;

  root.dataset.scrollMotion = reduceMotion ? "reduced" : "pending";

  const createReveal = ({
    trigger,
    targets,
    preset = "text",
    start = "top 78%",
    stagger = 0.09,
    duration = 0.78,
  }) => {
    const triggerElement = document.querySelector(trigger);
    const elements = toElements(document, targets);

    if (!triggerElement || elements.length === 0) {
      return;
    }

    revealElements.push(...elements);
    gsap.set(elements, REVEAL_PRESETS[preset]);

    const animation = gsap.to(elements, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration,
      ease: "power2.out",
      stagger,
      clearProps: "opacity,visibility,transform",
      scrollTrigger: {
        trigger: triggerElement,
        start,
        once: true,
        invalidateOnRefresh: true,
      },
    });

    animations.push(animation);
  };

  const setupReveals = () => {
    if (hasInitialized) {
      return;
    }

    hasInitialized = true;

    if (reduceMotion) {
      root.dataset.scrollMotion = "reduced";
      return;
    }

    createReveal({
      trigger: ".event-date__heading",
      targets: [
        ".event-date__heading > .section-icon",
        ".event-date__heading > .eyebrow",
        ".date-display > span",
        ".event-date__time",
        ".event-date__venue",
        ".event-date__separator",
      ],
      stagger: 0.085,
    });

    createReveal({
      trigger: ".countdown",
      targets: [".countdown > .eyebrow", ".countdown__item", ".countdown__note"],
      preset: "stagger",
      start: "top 84%",
      stagger: 0.07,
    });

    createReveal({
      trigger: ".venue__copy",
      targets: [".venue__copy > *"],
      stagger: 0.1,
    });

    createReveal({
      trigger: ".venue__illustration",
      targets: [".venue__illustration"],
      preset: "image",
      start: "top 84%",
      duration: 0.9,
    });

    createReveal({
      trigger: ".dress-code",
      targets: [
        ".dress-code > .section__inner > .section-icon",
        ".dress-code > .section__inner > .eyebrow",
        ".dress-code > .section__inner > h2",
        ".dress-code > .section__inner > .section-intro",
      ],
      stagger: 0.08,
    });

    createReveal({
      trigger: ".dress-code__virtues",
      targets: [".dress-code__virtues > li"],
      preset: "stagger",
      start: "top 84%",
      stagger: 0.08,
    });

    createReveal({
      trigger: ".dress-code__cards",
      targets: [".dress-card"],
      preset: "image",
      start: "top 84%",
      stagger: 0.12,
    });

    createReveal({
      trigger: ".map-transition",
      targets: [
        ".map-transition .eyebrow",
        ".map-transition h2",
        ".map-transition__footprints",
        ".map-transition__compass",
      ],
      preset: "ornament",
      stagger: 0.11,
      duration: 0.9,
    });

    createReveal({
      trigger: ".map-section",
      targets: [".map-section > .section__inner > .eyebrow", ".map-section h2"],
      stagger: 0.1,
    });

    createReveal({
      trigger: ".gallery",
      targets: [".gallery .section-icon", ".gallery .eyebrow", ".gallery h2", ".gallery__intro"],
      stagger: 0.08,
    });

    createReveal({
      trigger: ".gallery-grid",
      targets: [".photo-card"],
      preset: "image",
      start: "top 84%",
      stagger: 0.12,
      duration: 0.9,
    });

    createReveal({
      trigger: ".rsvp",
      targets: [".rsvp__inner > *"],
      stagger: 0.085,
    });

    createReveal({
      trigger: ".closing",
      targets: [".closing__inner > *"],
      preset: "stagger",
      stagger: 0.09,
    });

    root.dataset.scrollMotion = "ready";
    window.requestAnimationFrame(() => ScrollTrigger.refresh());
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  };

  document.addEventListener("site:ready", setupReveals, { once: true });

  if (root.dataset.siteState === "ready") {
    setupReveals();
  }

  return () => {
    document.removeEventListener("site:ready", setupReveals);
    animations.forEach((animation) => {
      animation.scrollTrigger?.kill();
      animation.kill();
    });
    gsap.set(revealElements, { clearProps: "opacity,visibility,transform" });
  };
};
