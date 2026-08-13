import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const initMapAnimation = () => {
  const root = document.documentElement;
  const map = document.querySelector("[data-map]");
  const frame = map?.querySelector(".map-preview__frame");
  const compass = map?.querySelector(".map-preview__compass");
  const constellation = map?.querySelector(".map-preview__constellation");
  const routeReveal = map?.querySelector("[data-map-route-reveal]");
  const origin = map?.querySelector("[data-map-origin]");
  const arrival = map?.querySelector("[data-map-arrival]");
  const footprints = map?.querySelectorAll(".map-preview__footprints img");
  const pin = map?.querySelector(".map-preview__pin");
  const destination = map?.querySelector(".map-preview__destination");
  const spark = map?.querySelector(".map-preview__arrival-spark");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let timeline;
  let hasInitialized = false;

  if (
    !map ||
    !compass ||
    !constellation ||
    !routeReveal ||
    !origin ||
    !arrival ||
    !footprints?.length ||
    !pin ||
    !destination ||
    !spark
  ) {
    root.dataset.mapMotion = "fallback";
    return () => {};
  }

  const animatedElements = [
    frame,
    compass,
    constellation,
    origin,
    arrival,
    ...footprints,
    pin,
    destination,
    spark,
  ].filter(Boolean);

  const showCompleteMap = () => {
    gsap.set(animatedElements, { clearProps: "opacity,visibility,transform,filter" });
    gsap.set(routeReveal, { clearProps: "strokeDasharray,strokeDashoffset" });
    map.dataset.mapState = "complete";
    root.dataset.mapMotion = reduceMotion ? "reduced" : "complete";
  };

  const setupMap = () => {
    if (hasInitialized) {
      return;
    }

    hasInitialized = true;

    if (reduceMotion) {
      showCompleteMap();
      return;
    }

    const routeLength = routeReveal.getTotalLength();

    root.dataset.mapMotion = "ready";
    map.dataset.mapState = "waiting";
    gsap.set(routeReveal, {
      strokeDasharray: routeLength,
      strokeDashoffset: routeLength,
    });
    gsap.set(frame, { autoAlpha: 0 });
    gsap.set(compass, { autoAlpha: 0, scale: 0.78, rotation: -12 });
    gsap.set(constellation, { autoAlpha: 0, scale: 0.94 });
    gsap.set([origin, arrival], { autoAlpha: 0, scale: 0.6, transformOrigin: "center" });
    gsap.set(footprints, { autoAlpha: 0, scale: 0.65, transformOrigin: "center" });
    gsap.set(pin, { autoAlpha: 0, scale: 0.72, y: -10 });
    gsap.set(destination, { autoAlpha: 0, y: 12 });
    gsap.set(spark, { autoAlpha: 0, scale: 0.3, rotation: -20 });

    timeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: map,
          start: "top 80%",
          once: true,
          invalidateOnRefresh: true,
        },
        onStart: () => {
          map.dataset.mapState = "revealing";
          root.dataset.mapMotion = "playing";
        },
        onComplete: showCompleteMap,
      })
      .to(frame, { autoAlpha: 0.72, duration: 0.55, ease: "sine.out" })
      .to(
        compass,
        { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.72, ease: "power2.out" },
        "-=0.28",
      )
      .to(
        constellation,
        { autoAlpha: 0.36, scale: 1, duration: 0.58, ease: "sine.out" },
        "-=0.42",
      )
      .to(origin, { autoAlpha: 1, scale: 1, duration: 0.28, ease: "power2.out" })
      .addLabel("route")
      .to(routeReveal, { strokeDashoffset: 0, duration: 1.75, ease: "power1.inOut" }, "route")
      .to(
        footprints,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.28,
          ease: "power2.out",
          stagger: 0.24,
        },
        "route+=0.28",
      )
      .to(arrival, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power2.out" }, ">-0.08")
      .to(
        pin,
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          filter: "drop-shadow(0 0 0.75rem rgb(183 154 219 / 58%))",
          duration: 0.55,
          ease: "power3.out",
        },
        "<",
      )
      .to(
        spark,
        { autoAlpha: 1, scale: 1.4, rotation: 0, duration: 0.34, ease: "power2.out" },
        "<+=0.08",
      )
      .to(spark, { autoAlpha: 0.78, scale: 1, duration: 0.38, ease: "sine.inOut" })
      .to(
        destination,
        { autoAlpha: 1, y: 0, duration: 0.58, ease: "power2.out" },
        "<-=0.22",
      );
  };

  document.addEventListener("site:ready", setupMap, { once: true });

  if (root.dataset.siteState === "ready") {
    setupMap();
  }

  return () => {
    document.removeEventListener("site:ready", setupMap);
    timeline?.scrollTrigger?.kill();
    timeline?.kill();
    showCompleteMap();
  };
};
