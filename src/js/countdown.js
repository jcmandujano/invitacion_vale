const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const padTime = (value) => String(value).padStart(2, "0");

const getRemainingTime = (difference) => ({
  days: Math.floor(difference / DAY),
  hours: Math.floor((difference % DAY) / HOUR),
  minutes: Math.floor((difference % HOUR) / MINUTE),
  seconds: Math.floor((difference % MINUTE) / SECOND),
});

export const initCountdown = ({ date } = {}, copy = {}) => {
  const countdown = document.querySelector("[data-countdown]");

  if (!countdown) {
    return;
  }

  const eventTime = new Date(date).getTime();
  const title = countdown.querySelector("#countdown-title");
  const note = countdown.querySelector("[data-countdown-note]");
  const units = Object.fromEntries(
    [...countdown.querySelectorAll("[data-countdown-unit]")].map((element) => [
      element.dataset.countdownUnit,
      element,
    ]),
  );
  let timerId;

  const renderUnits = (values) => {
    for (const [unit, element] of Object.entries(units)) {
      element.textContent = unit === "days" ? String(values[unit]) : padTime(values[unit]);
    }
  };

  const showUnavailableState = () => {
    renderUnits({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    countdown.dataset.countdownState = "unavailable";
    countdown.setAttribute("aria-label", "La fecha de la celebración está por confirmar");

    if (title) title.textContent = copy.unavailableTitle ?? "Muy pronto";
    if (note) note.textContent = copy.unavailableNote ?? "La fecha de la celebración está por confirmar.";
  };

  const showCompletedState = () => {
    window.clearTimeout(timerId);
    renderUnits({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    countdown.dataset.countdownState = "complete";
    countdown.setAttribute("aria-label", "El Colegio ha abierto sus puertas llegado");

    if (title) title.textContent = copy.completeTitle ?? "El Colegio ha abierto sus puertas llegado";
    if (note) note.textContent = copy.completeNote ?? "Gracias.";
  };

  if (!Number.isFinite(eventTime)) {
    showUnavailableState();
    return;
  }

  const update = () => {
    const difference = Math.max(0, eventTime - Date.now());

    if (difference === 0) {
      showCompletedState();
      return;
    }

    const remaining = getRemainingTime(difference);

    renderUnits(remaining);
    countdown.dataset.countdownState = "active";
    countdown.setAttribute(
      "aria-label",
      `Faltan ${remaining.days} días, ${remaining.hours} horas, ${remaining.minutes} minutos y ${remaining.seconds} segundos`,
    );

    if (note) note.textContent = copy.activeNote ?? "Cada segundo nos acerca a una tarde inolvidable.";

    const delayToNextSecond = SECOND - (Date.now() % SECOND) + 20;
    timerId = window.setTimeout(update, delayToNextSecond);
  };

  update();

  document.addEventListener("visibilitychange", () => {
    window.clearTimeout(timerId);

    if (document.hidden || countdown.dataset.countdownState !== "active") {
      return;
    }

    update();
  });
};
