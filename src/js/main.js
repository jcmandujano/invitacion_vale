import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../scss/main.scss";
import { initIntro } from "./animations/intro.js";
import { initMapAnimation } from "./animations/map.js";
import { initScrollReveals } from "./animations/scroll-reveals.js";
import { initSiteTransition } from "./animations/site-transition.js";
import { loadEventConfig } from "./config.js";
import { initCountdown } from "./countdown.js";
import { initGallery } from "./gallery.js";
import { initNavigation } from "./navigation.js";
import { initRsvp } from "./rsvp.js";

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;

root.classList.add("js");

const eventConfig = await loadEventConfig();

const readConfigValue = (path) =>
  path.split(".").reduce((value, key) => value?.[key], eventConfig);

for (const element of document.querySelectorAll("[data-config]")) {
  const value = readConfigValue(element.dataset.config);

  if (typeof value === "string") {
    element.textContent = value;
  }
}

for (const element of document.querySelectorAll("[data-config-attr]")) {
  const [attribute, path] = element.dataset.configAttr.split(":");
  const value = readConfigValue(path);

  if (attribute && typeof value === "string") {
    element.setAttribute(attribute, value);
  }
}

if (eventConfig.locale) document.documentElement.lang = eventConfig.locale;
if (eventConfig.meta?.title) document.title = eventConfig.meta.title;

const description = document.querySelector('meta[name="description"]');
if (description && eventConfig.meta?.description) {
  description.content = eventConfig.meta.description;
}

for (const element of document.querySelectorAll("[data-event-datetime]")) {
  element.dateTime = eventConfig.event.date;
}

for (const element of document.querySelectorAll("[data-event-date]")) {
  element.dateTime = eventConfig.event.date.slice(0, 10);
}

for (const link of document.querySelectorAll("[data-map-link]")) {
  if (eventConfig.event.mapsUrl && eventConfig.event.mapsUrl !== "#") {
    link.href = eventConfig.event.mapsUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    continue;
  }

  link.removeAttribute("href");
  link.setAttribute("aria-disabled", "true");
  link.classList.add("button--disabled");
}

for (const link of document.querySelectorAll("[data-gift-registry-link]")) {
  const note = document.querySelector("[data-gift-registry-note]");
  const url = eventConfig.giftRegistry?.url;

  if (typeof url === "string" && /^https?:\/\//i.test(url)) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    continue;
  }

  link.setAttribute("aria-disabled", "true");
  link.classList.add("button--disabled");
  if (note) {
    note.hidden = false;
    note.textContent = "La mesa de regalos estará disponible muy pronto.";
  }
}

initScrollReveals();
initMapAnimation();
initGallery();
initCountdown(eventConfig.event, eventConfig.countdown);
initRsvp(eventConfig.rsvp);

const navigation = document.querySelector("[data-site-nav]");
if (eventConfig.features?.navigation !== false) {
  initNavigation(eventConfig.navigation);
} else if (navigation) {
  navigation.hidden = true;
  navigation.inert = true;
  navigation.dataset.navState = "disabled";
  root.dataset.navigationState = "disabled";
}

const siteTransition = initSiteTransition();
const skipLink = document.querySelector(".skip-link");

skipLink?.addEventListener("click", () => {
  if (root.dataset.siteState !== "ready") {
    siteTransition.revealImmediately();
  }
});

initIntro(eventConfig.intro).catch(() => {
  root.classList.add("intro-fallback");
  siteTransition.revealImmediately();
});

root.dataset.appReady = "true";

export { gsap, ScrollTrigger };
