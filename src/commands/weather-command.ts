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
import { createErrorOutput, createTextOutput } from "@/utils/output";
import { WEATHER_HELP } from "@/constants/help/info";

// ─────────────────────────────────────────────────────────────────
// OUTPUT BUILDERS
// ─────────────────────────────────────────────────────────────────

export const createWeatherOutput = (weather: string): CommandHistoryOutputType =>
  createTextOutput(weather.split("\n"));

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
