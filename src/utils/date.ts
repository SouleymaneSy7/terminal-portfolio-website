export const getTimezone = (): string =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getGreeting = (hour: number): string => {
  if (hour < 12) return "Good morning! Hope the coffee is strong. ☕";
  if (hour < 18) return "Good afternoon! Hope the code is flowing. ☀️";

  return "Good evening! Late-night coding session? 🌙";
};
