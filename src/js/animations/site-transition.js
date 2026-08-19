import { gsap } from "gsap";

const setContentAvailability = (elements, isAvailable) => {
  for (const element of elements) {
    element.inert = !isAvailable;

    if (isAvailable) {
      element.removeAttribute("aria-hidden");
    } else {
      element.setAttribute("aria-hidden", "true");
    }
  }
};

export const initSiteTransition = () => {
  const root = document.documentElement;
  const intro = document.querySelector("[data-intro]");
  const main = document.querySelector("#main-content");
  const footer = document.querySelector(".closing");
  const welcome = document.querySelector("#inicio");
  const letter = intro?.querySelector("[data-letter]");
  const letterContent = intro?.querySelector("[data-letter-content]");
  const paperSurface = intro?.querySelector("[data-paper-surface]");
  const atmosphere = intro?.querySelector("[data-intro-atmosphere]");
  const particles = intro?.querySelector("[data-particles]");
  const envelope = intro?.querySelector("[data-envelope]");
  const introCopy = intro?.querySelectorAll("[data-intro-copy]");
  const envelopeLayers = intro?.querySelectorAll(
    ".envelope__back, .envelope__front, .envelope__flap, [data-recipient], [data-seal-magic]",
  );
  const welcomeContent = welcome?.querySelectorAll(
    ".welcome__content > *",
  );

  if (
    !intro ||
    !main ||
    !footer ||
    !welcome ||
    !letter ||
    !letterContent ||
    !paperSurface ||
    !envelope
  ) {
    throw new Error("The site transition markup is incomplete.");
  }

  const siteContent = [main, footer];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let transitionTimeline;
  let welcomeTimeline;
  let hasRevealedSite = false;

  root.dataset.siteState = "intro";
  setContentAvailability(siteContent, false);
  gsap.set(welcomeContent, { autoAlpha: 0, y: reduceMotion ? 0 : 18 });

  const revealWelcome = () => {
    welcomeTimeline = gsap.timeline();

    if (reduceMotion) {
      welcomeTimeline.set(welcomeContent, { autoAlpha: 1, y: 0 });
      return;
    }

    welcomeTimeline.to(welcomeContent, {
      autoAlpha: 1,
      y: 0,
      duration: 0.75,
      ease: "power2.out",
      stagger: 0.1,
    });
  };

  const revealSite = () => {
    if (hasRevealedSite) {
      return;
    }

    hasRevealedSite = true;
    intro.inert = true;
    intro.setAttribute("aria-hidden", "true");
    intro.hidden = true;
    document.body.classList.remove("intro-active");
    setContentAvailability(siteContent, true);
    root.dataset.siteState = "ready";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    revealWelcome();
    document.dispatchEvent(new CustomEvent("site:ready"));
    window.requestAnimationFrame(() => main.focus({ preventScroll: true }));
  };

  const runTransition = () => {
    if (intro.dataset.introState !== "opened" || hasRevealedSite) {
      return;
    }

    intro.dataset.introState = "transitioning";

    if (reduceMotion) {
      transitionTimeline = gsap
        .timeline({ delay: 0.18, onComplete: revealSite })
        .to([letterContent, introCopy], { autoAlpha: 0, duration: 0.16 })
        .to(paperSurface, { autoAlpha: 1, duration: 0.24 }, "<")
        .to(intro, { autoAlpha: 0, duration: 0.18 });
      return;
    }

    const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
    const letterRect = letter.getBoundingClientRect();
    const letterCenterX = letterRect.left + letterRect.width / 2;
    const letterCenterY = letterRect.top + letterRect.height / 2;
    const currentX = Number(gsap.getProperty(letter, "x")) || 0;
    const currentY = Number(gsap.getProperty(letter, "y")) || 0;
    const targetX = currentX + viewportWidth / 2 - letterCenterX;
    const targetY = currentY + viewportHeight / 2 - letterCenterY;
    const coverScale =
      Math.max(
        (viewportWidth * 1.08) / letter.offsetWidth,
        (viewportHeight * 1.08) / letter.offsetHeight,
      ) * 1.02;

    transitionTimeline = gsap
      .timeline({ delay: 0.55, onComplete: revealSite })
      .to(introCopy, {
        autoAlpha: 0,
        y: -10,
        duration: 0.35,
        ease: "power2.in",
      })
      .addLabel("expand", "<+=0.12")
      .to(
        envelopeLayers,
        {
          autoAlpha: 0,
          y: 54,
          duration: 0.7,
          ease: "power2.in",
          stagger: 0.025,
        },
        "expand",
      )
      .to(
        [atmosphere, particles],
        { autoAlpha: 0, duration: 1.05, ease: "sine.inOut" },
        "expand+=0.18",
      )
      .to(
        envelope,
        { filter: "drop-shadow(0 0 0 rgb(0 0 0 / 0%))", duration: 0.75 },
        "expand+=0.18",
      )
      .to(
        letter,
        {
          x: targetX,
          y: targetY,
          scale: coverScale,
          borderRadius: 0,
          boxShadow: "0 0 0 rgb(32 29 24 / 0%)",
          duration: 1.5,
          ease: "power3.inOut",
          force3D: true,
        },
        "expand",
      )
      .to(
        letterContent,
        { autoAlpha: 0, scale: 0.94, duration: 0.42, ease: "power2.in" },
        "expand+=0.82",
      )
      .to(
        paperSurface,
        { autoAlpha: 1, duration: 0.42, ease: "sine.inOut" },
        "expand+=1.08",
      );
  };

  intro.addEventListener("intro:opened", runTransition, { once: true });

  return {
    revealImmediately: revealSite,
    destroy: () => {
      intro.removeEventListener("intro:opened", runTransition);
      transitionTimeline?.kill();
      welcomeTimeline?.kill();
    },
  };
};
