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
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p><span aria-hidden="true" class="text-secondary-clr">⚠</span>  Could not fetch weather for <span class="text-tertiary-clr">"${city}"</span></p>
          <p>${errorMessage ?? "Please check the city name and try again."}</p>
        </div>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>
            Try major cities — e.g.
            <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">weather Conakry</span><span aria-hidden="true">'</span>
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
      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Weather</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Get real-time weather for any city.</p>
          <p><span class="text-secondary-clr">Usage:</span>  weather &lt;city&gt;</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  weather Conakry</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  weather Coyah</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  weather Paris</p>
        </div>

      </div>`,
    ],
  },
];
