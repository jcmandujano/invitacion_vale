import { gsap } from "gsap";

const DESKTOP_QUERY = "(min-width: 48rem)";

export const initNavigation = (copy = {}) => {
  const root = document.documentElement;
  const nav = document.querySelector("[data-site-nav]");
  const shell = nav?.querySelector("[data-nav-shell]");
  const menu = nav?.querySelector("[data-nav-menu]");
  const toggle = nav?.querySelector("[data-nav-toggle]");
  const backdrop = nav?.querySelector("[data-nav-close]");
  const links = [...(nav?.querySelectorAll("[data-nav-link]") ?? [])];

  if (!nav || !shell || !menu || !toggle || links.length === 0) {
    return;
  }

  const desktopMedia = window.matchMedia(DESKTOP_QUERY);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const menuLinks = [...menu.querySelectorAll("[data-nav-link]")];
  const sectionLinks = links.filter((link) => document.querySelector(link.hash));
  const sections = [...new Set(sectionLinks.map((link) => document.querySelector(link.hash)))];
  let isVisible = false;
  let isOpen = false;
  let focusTimerId;
  let activeUpdateId;

  const setActiveLink = (sectionId) => {
    for (const link of menuLinks) {
      if (link.hash === `#${sectionId}`) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    }
  };

  const closeMenu = ({ restoreFocus = false } = {}) => {
    window.clearTimeout(focusTimerId);

    if (!isOpen && !desktopMedia.matches) {
      menu.inert = true;
      return;
    }

    isOpen = false;
    nav.dataset.menuState = "closed";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", copy.openMenu ?? "Abrir menú");
    document.body.classList.remove("menu-open");

    if (!desktopMedia.matches) {
      menu.inert = true;
    }

    if (restoreFocus) {
      toggle.focus();
    }
  };

  const openMenu = () => {
    if (desktopMedia.matches || isOpen) {
      return;
    }

    isOpen = true;
    menu.inert = false;
    nav.dataset.menuState = "open";
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", copy.closeMenu ?? "Cerrar menú");
    document.body.classList.add("menu-open");

    focusTimerId = window.setTimeout(
      () => menuLinks[0]?.focus({ preventScroll: true }),
      reduceMotion.matches ? 0 : 230,
    );
  };

  const updateActiveSection = () => {
    activeUpdateId = undefined;

    const activationLine = Math.max(shell.getBoundingClientRect().bottom + 18, innerHeight * 0.22);
    let activeSection = sections[0];

    for (const section of sections) {
      if (section.getBoundingClientRect().top <= activationLine) {
        activeSection = section;
      } else {
        break;
      }
    }

    if (activeSection) {
      setActiveLink(activeSection.id);
    }
  };

  const requestActiveUpdate = () => {
    if (activeUpdateId) {
      return;
    }

    activeUpdateId = window.requestAnimationFrame(updateActiveSection);
  };

  const revealNavigation = () => {
    if (isVisible) {
      return;
    }

    isVisible = true;
    nav.inert = false;
    nav.removeAttribute("aria-hidden");
    nav.dataset.navState = "visible";
    menu.inert = !desktopMedia.matches;
    root.dataset.navigationState = "ready";
    requestActiveUpdate();

    if (reduceMotion.matches) {
      return;
    }

    gsap.fromTo(
      shell,
      { autoAlpha: 0, y: -12 },
      { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out", clearProps: "all" },
    );
  };

  const handleLinkClick = (event) => {
    const link = event.currentTarget;
    const target = document.querySelector(link.hash);

    if (
      !target ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    setActiveLink(target.id);
    closeMenu();
    target.tabIndex = -1;
    target.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
    window.requestAnimationFrame(() => target.focus({ preventScroll: true }));

    if (window.location.hash !== link.hash) {
      window.history.pushState(null, "", link.hash);
    }
  };

  toggle.addEventListener("click", (event) => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop?.addEventListener("click", () => closeMenu());

  document.addEventListener("keydown", (event) => {
    if (!isOpen) {
      return;
    }

    if (event.key === "Escape") {
      closeMenu({ restoreFocus: true });
      return;
    }

    if (event.key === "Tab") {
      const focusableItems = [links[0], toggle, ...menuLinks].filter(Boolean);
      const currentIndex = focusableItems.indexOf(document.activeElement);
      const direction = event.shiftKey ? -1 : 1;
      const nextIndex =
        currentIndex < 0
          ? 0
          : (currentIndex + direction + focusableItems.length) % focusableItems.length;

      event.preventDefault();
      focusableItems[nextIndex].focus({ preventScroll: true });
    }
  });

  for (const link of links) {
    link.addEventListener("click", handleLinkClick);
  }

  desktopMedia.addEventListener("change", ({ matches }) => {
    closeMenu();
    menu.inert = !matches;
    requestActiveUpdate();
  });

  window.addEventListener("scroll", requestActiveUpdate, { passive: true });
  window.addEventListener("resize", requestActiveUpdate, { passive: true });

  setActiveLink("inicio");
  nav.dataset.menuState = "closed";
  document.addEventListener("site:ready", revealNavigation, { once: true });

  if (root.dataset.siteState === "ready") {
    revealNavigation();
  }
};
