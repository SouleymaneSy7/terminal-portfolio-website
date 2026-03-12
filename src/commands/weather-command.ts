export const createWeatherOutput = (weather: string) => ({
  id: crypto.randomUUID(),
  type: "text" as const,
  content: weather.split("\n"),
});

export const weatherErrorOutput = (city: string, errorMessage?: string) => ({
  id: crypto.randomUUID(),
  type: "text" as const,
  content: [
    `Error: Could not fetch weather for "${city}"`,
    errorMessage || "Please check the city name and try again.",
    "",
    "Tip: Try with major cities (e.g., Conakry, Paris, New York, Tokyo)",
  ],
});

export const weatherUsageOutput = () => ({
  id: crypto.randomUUID(),
  type: "text" as const,
  content: [
    "Usage: weather <city>",
    "",
    "Examples:",
    "  weather Conakry",
    "  weather Coyah",
    "  weather Paris",
  ],
});
