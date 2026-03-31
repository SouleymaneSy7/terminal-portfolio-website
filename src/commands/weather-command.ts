export const createWeatherOutput = (weather: string) => [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: weather.split("\n"),
  },
];

export const weatherErrorOutput = (city: string, errorMessage?: string) => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-3 py-1">
        <div class="space-y-1">
          <p><span class="text-secondary-clr">⚠</span>  Could not fetch weather for <span class="text-tertiary-clr">"${city}"</span></p>
          <p>${errorMessage ?? "Please check the city name and try again."}</p>
        </div>
        <div class="space-y-0.5">
          <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
          <p>Try major cities — e.g.
            <span> '</span><span class="text-tertiary-clr font-bold">weather Conakry</span><span>'</span>
          </p>
        </div>
      </div>`,
    ],
  },
];

export const weatherUsageOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-3 py-1">
        <div class="space-y-1">
          <p><span class="text-secondary-clr font-bold">Weather</span></p>
          <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
          <p>Get real-time weather for any city.</p>
        </div>
        <div class="space-y-1">
          <p><span class="text-secondary-clr">Usage:  </span>  weather &lt;city&gt;</p>
          <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
          <p><span class="text-tertiary-clr"> •</span>  weather Conakry</p>
          <p><span class="text-tertiary-clr"> •</span>  weather Coyah</p>
          <p><span class="text-tertiary-clr"> •</span>  weather Paris</p>
        </div>
      </div>`,
    ],
  },
];
