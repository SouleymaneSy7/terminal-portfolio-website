/**
 * Weather Command - Fetch real-time weather for any city
 *
 * @example
 * ```bash
 * weather Conakry
 * weather New York
 * weather --help
 * ```
 */

import { weatherService } from "@/services";
import type { CommandHistoryOutputType } from "@/types";
import { parseArgs } from "@/utils/argParser";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createErrorOutput, createHtmlOutput } from "@/utils/output";
import { WEATHER_HELP } from "@/constants/help/info";

// ─────────────────────────────────────────────────────────────────
// OUTPUT BUILDERS
// ─────────────────────────────────────────────────────────────────

export const createWeatherOutput = (weather: string): CommandHistoryOutputType =>
  createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <pre class="whitespace-pre font-mono text-text-clr leading-tight overflow-x-auto">${weather}</pre>
      </div>

      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p class="text-text-clr opacity-dim"><span class="text-primary-clr">Source:</span> <span class="font-bold text-tertiary-clr">wttr.in</span> · Console-oriented weather service</p>
      </div>
    </div>`,
  );

export const weatherErrorOutput = (city: string, errorMessage?: string): CommandHistoryOutputType =>
  createErrorOutput(
    `Could not fetch weather for <span class="text-tertiary-clr">"${city}"</span>`,
    errorMessage ??
      `Please check the city name and try again. ${DT.decorators.bullet} e.g. ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">weather Conakry</span>${DT.decorators.quote}`,
  );

export const weatherUsageOutput = (): CommandHistoryOutputType =>
  createErrorOutput(
    `Usage: <span class="text-tertiary-clr font-bold">weather &lt;city&gt;</span>`,
    `Try ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">weather --help</span>${DT.decorators.quote} for more information.`,
  );

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

/**
 * Handle weather command execution
 *
 * @param args - Command arguments
 * @returns Command output blocks
 */
export const handleWeatherCommand = async (args: string[]): Promise<CommandHistoryOutputType> => {
  const { flags, positional } = parseArgs(args);

  if (flags.help) return WEATHER_HELP;

  const city = positional.join(" ").trim();
  if (!city) return weatherUsageOutput();

  try {
    const data = await weatherService.getWeather(city);
    return createWeatherOutput(data);
  } catch (error) {
    return weatherErrorOutput(city, error instanceof Error ? error.message : undefined);
  }
};
