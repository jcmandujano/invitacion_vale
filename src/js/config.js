const fallbackConfig = {
  locale: "es-MX",
  timeZone: "America/Mexico_City",
  features: {
    navigation: true,
  },
  quinceanera: {
    name: "Valeria Ramírez",
    firstName: "Valeria",
    initials: "VR",
    celebration: "XV",
  },
  event: {
    title: "Mis XV años",
    date: "2026-10-18T19:00:00-06:00",
    dateParts: { day: "18", month: "Octubre", year: "2026", short: "18 · 10 · 26" },
    timeLabel: "7:00 PM",
    venue: "Salón Encantado",
    address: "Av. de la Luna 123, Bosque Mágico",
    city: "Guadalajara, Jalisco",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Guadalajara%2C%20Jalisco",
  },
  dressCode: { title: "Formal", women: "Vestido formal", men: "Traje o vestimenta formal" },
  rsvp: {
    method: "whatsapp",
    phone: "5210000000000",
    message: "Hola, quiero confirmar mi asistencia a los XV años de Valeria.",
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
