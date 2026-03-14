import { format, getHours } from "date-fns";

const getTimezone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

const getGreeting = (): string => {
  const hour = getHours(new Date());

  if (hour < 12) return "Good morning! Hope the coffee is strong. ☕";
  if (hour < 18) return "Good afternoon! Hope the code is flowing. ☀️";
  return "Good evening! Late-night coding session? 🌙";
};

const getDate = (): string[] => {
  const now = new Date();

  const longDate = format(now, "EEEE, MMMM dd, yyyy");
  const time = format(now, "hh:mm a");
  const timezone = getTimezone();
  const greeting = getGreeting();

  const W =
    Math.max(
      "  ● LIVE".length,
      `  ${longDate}`.length,
      `  ${time}  ·  ${timezone}`.length,
    ) + 4;

  const top = `╭${"─".repeat(W)}╮`;
  const empty = `│${" ".repeat(W)}│`;
  const bot = `╰${"─".repeat(W)}╯`;

  const liveSpaces = " ".repeat(W - "  ● LIVE".length);
  const dateSpaces = " ".repeat(W - `  ${longDate}`.length);
  const timeSpaces = " ".repeat(W - `  ${time}  ·  ${timezone}`.length);

  return [
    `<div class="py-1 space-y-3">
      <div class="space-y-0">
        <p class="whitespace-pre text-text-clr opacity-60">${top}</p>

        <p class="whitespace-pre"><span class="text-text-clr opacity-60">│</span>  <span class="text-tertiary-clr animate-pulse-live">●</span> <span class="text-tertiary-clr font-bold uppercase tracking-wide">LIVE</span>${liveSpaces}<span class="text-text-clr opacity-60">│</span></p>

        <p class="whitespace-pre text-text-clr opacity-60">${empty}</p>

        <p class="whitespace-pre"><span class="text-text-clr opacity-60">│</span>  <span class="text-text-clr font-bold">${longDate}</span>${dateSpaces}<span class="text-text-clr opacity-60">│</span></p>

        <p class="whitespace-pre"><span class="text-text-clr opacity-60">│</span>  <span class="text-primary-clr font-bold">${time}</span><span class="text-text-clr opacity-60">  ·  </span><span class="text-secondary-clr">${timezone}</span>${timeSpaces}<span class="text-text-clr opacity-60">│</span></p>

        <p class="whitespace-pre text-text-clr opacity-60">${empty}</p>

        <p class="whitespace-pre text-text-clr opacity-60">${bot}</p>
      </div>

      <p class="text-secondary-clr">${greeting}</p>
    </div>`,
  ];
};

const getTime = (): string[] => getDate();

export { getDate, getTime };
