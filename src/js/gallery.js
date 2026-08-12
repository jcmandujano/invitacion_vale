import { gsap } from "gsap";

export const initGallery = () => {
  const root = document.documentElement;
  const items = [...document.querySelectorAll("[data-gallery-item]")];
  const dialog = document.querySelector("[data-gallery-lightbox]");
  const panel = dialog?.querySelector("[data-lightbox-panel]");
  const closeButton = dialog?.querySelector("[data-lightbox-close]");
  const lightboxImage = dialog?.querySelector("[data-lightbox-image]");
  const caption = dialog?.querySelector("[data-lightbox-caption]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lastTrigger;
  let lightboxTween;
  let isClosing = false;

  if (
    items.length === 0 ||
    !dialog ||
    !panel ||
    !closeButton ||
    !lightboxImage ||
    !caption ||
    typeof dialog.showModal !== "function"
  ) {
    root.dataset.galleryState = "fallback";
    return () => {};
  }

  root.dataset.galleryState = "ready";

  for (const item of items) {
    const previewImage = item.querySelector("img");
    const resolvedImageUrl = previewImage?.currentSrc || previewImage?.src;

    if (resolvedImageUrl) {
      item.href = resolvedImageUrl;
    }
  }

  const finishClose = () => {
    document.body.classList.remove("lightbox-open");
    root.dataset.galleryState = "ready";
    isClosing = false;
    lightboxTween?.kill();
    gsap.set(panel, { clearProps: "opacity,visibility,transform" });
    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";
    caption.textContent = "";
    window.requestAnimationFrame(() => lastTrigger?.focus({ preventScroll: true }));
  };

  const closeLightbox = () => {
    if (!dialog.open || isClosing) {
      return;
    }

    isClosing = true;

    if (reduceMotion) {
      dialog.close();
      return;
    }

    lightboxTween?.kill();
    lightboxTween = gsap.to(panel, {
      autoAlpha: 0,
      y: 8,
      scale: 0.985,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => dialog.close(),
    });
  };

  const openLightbox = (event) => {
    if (
      event instanceof MouseEvent &&
      (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
    ) {
      return;
    }

    event.preventDefault();
    const trigger = event.currentTarget;
    const previewImage = trigger.querySelector("img");

    lastTrigger = trigger;
    lightboxImage.src = trigger.href;
    lightboxImage.alt = previewImage?.alt ?? "Imagen ampliada";
    caption.textContent = trigger.dataset.galleryCaption ?? "";
    dialog.showModal();
    closeButton.focus({ preventScroll: true });
    document.body.classList.add("lightbox-open");
    root.dataset.galleryState = "open";

    if (reduceMotion) {
      return;
    }

    lightboxTween?.kill();
    lightboxTween = gsap.fromTo(
      panel,
      { autoAlpha: 0, y: 10, scale: 0.97 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.32, ease: "power2.out" },
    );
  };

  const handleBackdropClick = (event) => {
    if (event.target === dialog) {
      closeLightbox();
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    closeLightbox();
  };

  const handleDialogKeydown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      closeButton.focus({ preventScroll: true });
    }
  };

  items.forEach((item) => item.addEventListener("click", openLightbox));
  closeButton.addEventListener("click", closeLightbox);
  dialog.addEventListener("click", handleBackdropClick);
  dialog.addEventListener("cancel", handleCancel);
  dialog.addEventListener("keydown", handleDialogKeydown);
  dialog.addEventListener("close", finishClose);

  return () => {
    items.forEach((item) => item.removeEventListener("click", openLightbox));
    closeButton.removeEventListener("click", closeLightbox);
    dialog.removeEventListener("click", handleBackdropClick);
    dialog.removeEventListener("cancel", handleCancel);
    dialog.removeEventListener("keydown", handleDialogKeydown);
    dialog.removeEventListener("close", finishClose);
    lightboxTween?.kill();

    if (dialog.open) {
      dialog.close();
    }
  };
};
