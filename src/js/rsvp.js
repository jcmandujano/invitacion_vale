import { gsap } from "gsap";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const showConfirmation = (section, confirmation) => {
  if (!confirmation || section.dataset.rsvpState === "opened") {
    return;
  }

  section.dataset.rsvpState = "opened";
  confirmation.hidden = false;

  const stars = confirmation.querySelectorAll(".rsvp__confirmation-star");

  if (prefersReducedMotion()) {
    gsap.set([confirmation, stars], { clearProps: "all" });
    return;
  }

  gsap.fromTo(
    confirmation,
    { autoAlpha: 0, y: 14 },
    { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out", clearProps: "all" },
  );
  gsap.fromTo(
    stars,
    { autoAlpha: 0, scale: 0.25 },
    {
      autoAlpha: 1,
      scale: 1,
      duration: 0.45,
      stagger: 0.09,
      ease: "power2.out",
      clearProps: "all",
    },
  );
};

export const initRsvp = (rsvpConfig = {}) => {
  const formUrl = rsvpConfig.formUrl;
  const isAvailable =
    rsvpConfig.method === "google-forms" &&
    typeof formUrl === "string" &&
    /^https:\/\/docs\.google\.com\/forms\//i.test(formUrl);

  for (const link of document.querySelectorAll("[data-rsvp-link]")) {
    const section = link.closest("[data-rsvp]") ?? link.closest(".rsvp");
    const note = section?.querySelector("[data-rsvp-note]");
    const confirmation = section?.querySelector("[data-rsvp-confirmation]");

    if (!isAvailable) {
      link.removeAttribute("href");
      link.removeAttribute("target");
      link.removeAttribute("rel");
      link.setAttribute("aria-disabled", "true");
      link.classList.add("button--disabled");

      if (note) note.textContent = "El formulario de confirmación estará disponible muy pronto.";
      continue;
    }

    link.href = formUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    link.addEventListener("click", () => {
      if (!section) return;

      link.textContent = rsvpConfig.openedButton ?? "Abrir formulario de nuevo";
      if (note) {
        note.textContent =
          rsvpConfig.openedNote ??
          "Completa el formulario para reservar tu lugar en el Gran Comedor.";
      }
      showConfirmation(section, confirmation);
    });
  }
};
