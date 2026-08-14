const fallbackConfig = {
  locale: "es-MX",
  timeZone: "America/Mexico_City",
  features: {
    navigation: true,
  },
  quinceanera: {
    name: "Vale Ruiz",
    firstName: "Valentina",
    initials: "VR",
    celebration: "XV",
  },
  event: {
    title: "Mis XV años",
    date: "2026-11-8T13:00:00-06:00",
    dateParts: { day: "8", month: "Noviembre", year: "2026", short: "8 · 11 · 26" },
    timeLabel: "13 Hrs",
    venue: "Jardín Centenario",
    address: "Av. Centenario 367 A, Nextengo, Azcapotzalco,",
    city: "Azcapotzalco, CDMX",
    mapsUrl: "https://www.google.com/maps/place/Centenario+Salones+De+Fiestas/@19.4730473,-99.1885,17z/data=!3m1!4b1!4m6!3m5!1s0x85d1f881eb5149f9:0xcd61a17e1edbd60!8m2!3d19.4730473!4d-99.1885!16s%2Fg%2F1tl1nssc?entry=tts&g_ep=EgoyMDI2MDgxMC4wIPu8ASoASAFQAw%3D%3D&skid=68980e0d-7e84-4e63-8c27-3765fbe086e1",
  },
  dressCode: { title: "Formal", women: "Vestido formal", men: "Traje o vestimenta formal" },
  giftRegistry: { url: "" },
  rsvp: {
    method: "google-forms",
    formUrl: "",
  },
};

const mergeConfig = (base, custom) => {
  if (!custom || typeof custom !== "object" || Array.isArray(custom)) return base;

  return Object.fromEntries(
    [...new Set([...Object.keys(base), ...Object.keys(custom)])].map((key) => {
      const baseValue = base[key];
      const customValue = custom[key];
      const canMerge =
        baseValue &&
        customValue &&
        typeof baseValue === "object" &&
        typeof customValue === "object" &&
        !Array.isArray(baseValue) &&
        !Array.isArray(customValue);

      return [key, canMerge ? mergeConfig(baseValue, customValue) : (customValue ?? baseValue)];
    }),
  );
};

export const loadEventConfig = async () => {
  try {
    const response = await fetch(new URL("invitacion.json", document.baseURI), {
      cache: "no-store",
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    return Object.freeze(mergeConfig(fallbackConfig, await response.json()));
  } catch (error) {
    console.warn("No se pudo cargar invitacion.json; se utilizará el contenido de respaldo.", error);
    return Object.freeze(fallbackConfig);
  }
};
