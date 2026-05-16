/**
 * Currency conversion powered by frankfurter.dev.
 * Supports 168 world currencies. No API key required.
 *
 * Flags:
 *   --json / -j   Output raw JSON instead of formatted table
 */

import { CONVERT_HELP } from "@/constants/help/utils";
import { convertService } from "@/services";
import { parseArgs } from "@/utils/argParser";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createErrorOutput, createHtmlOutput } from "@/utils/output";
import { createJsonOutput } from "@/utils/output/createJsonOutput";

// ─────────────────────────────────────────────────────────────────
// HANDLERS
// ─────────────────────────────────────────────────────────────────

const convertCurrency = async (amountStr: string, from: string, to: string, jsonMode: boolean) => {
  const amount = parseFloat(amountStr);

  if (isNaN(amount) || amount <= 0) {
    return createErrorOutput(
      `Invalid amount: <span class="text-tertiary-clr">"${amountStr}"</span>`,
      `<span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">convert &lt;amount&gt; &lt;from&gt; &lt;to&gt;</span>  ·  e.g. <span class="text-tertiary-clr font-bold">convert 100 USD EUR</span>`,
    );
  }

  const fromUpper = from.toUpperCase();
  const toUpper = to.toUpperCase();

  try {
    const [result, currencies] = await Promise.all([
      convertService.convert(fromUpper, toUpper),
      convertService.getCurrencies(),
    ]);

    const convertedAmount = amount * result.rate;
    const fromInfo = currencies[fromUpper];
    const toInfo = currencies[toUpper];

    // ── JSON mode ──────────────────────────────────────────────
    if (jsonMode) {
      return createJsonOutput(
        {
          amount,
          from: {
            code: fromUpper,
            name: fromInfo?.name ?? fromUpper,
            symbol: fromInfo?.symbol ?? null,
          },
          to: {
            code: toUpper,
            name: toInfo?.name ?? toUpper,
            symbol: toInfo?.symbol ?? null,
          },
          rate: result.rate,
          result: convertedAmount,
          date: result.date,
        },
        `convert ${amount} ${fromUpper} ${toUpper} --json`,
      );
    }

    // ── Formatted output (default) ─────────────────────────────
    const fromName = fromInfo?.name ?? fromUpper;
    const toName = toInfo?.name ?? toUpper;
    const fromSymbol = fromInfo?.symbol ?? "";
    const toSymbol = toInfo?.symbol ?? "";
    const rate = result.rate.toFixed(6);

    const formatted = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(convertedAmount);

    const amountFormatted = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Currency Conversion</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p>
            <span class="text-primary-clr font-bold">${amountFormatted} ${fromUpper}${fromSymbol ? ` (${fromSymbol})` : ""}</span>
            <span class="text-text-clr opacity-dim">  →  </span>
            <span class="text-tertiary-clr font-bold">${formatted} ${toUpper}${toSymbol ? ` (${toSymbol})` : ""}</span>
          </p>
        </div>

        <div class="space-y-t-group">
          <p><span class="text-secondary-clr">From      </span> - ${fromName}${fromSymbol ? ` (${fromSymbol})` : ""}</p>
          <p><span class="text-secondary-clr">To        </span> - ${toName}${toSymbol ? ` (${toSymbol})` : ""}</p>
          <p><span class="text-secondary-clr">Rate      </span> - 1 ${fromUpper} = ${rate} ${toUpper}</p>
          <p><span class="text-secondary-clr">Rate date </span> - ${result.date}</p>
        </div>

        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p class="text-text-clr"><span class="text-primary-clr">Tip:</span> type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">convert ${amount} ${fromUpper} ${toUpper} --json</span>${DT.decorators.quote} for raw JSON.</p>
          <p class="text-text-clr opacity-dim"><span class="text-primary-clr">Source:</span> <span class="font-bold text-tertiary-clr">frankfurter.dev</span> · Daily reference rates published by the European Central Bank</p>
        </div>
      </div>`,
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Currency not found or service unavailable.";
    return createErrorOutput(
      message,
      `Type <span class="text-tertiary-clr font-bold">convert list</span> to see supported currencies.`,
    );
  }
};

const listCurrencies = async () => {
  const currencies = await convertService.getCurrencies();

  const rows = Object.entries(currencies)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(
      ([code, info]) =>
        `<p>
          <span class="text-tertiary-clr font-bold">${code}</span>
          <span class="text-text-clr opacity-dim">  ·  </span>
          <span>${info.name}</span>
          ${info.symbol ? `<span class="text-secondary-clr"> (${info.symbol})</span>` : ""}
        </p>`,
    )
    .join("\n");

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Supported Currencies <span class="text-text-clr opacity-dim">(${Object.keys(currencies).length})</span></p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        ${rows}
      </div>

      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Rates provided by the European Central Bank via frankfurter.dev.</p>
        <p><span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">convert &lt;amount&gt; &lt;from&gt; &lt;to&gt;</span>  ·  e.g. <span class="text-tertiary-clr">convert 100 USD EUR</span></p>
      </div>
    </div>`,
  );
};

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

export const handleConvertCommand = async (args: string[]) => {
  const { flags, subcommand, positional } = parseArgs(args);

  if (flags.help) return CONVERT_HELP;

  const sub = subcommand?.toLowerCase();

  if (!sub) {
    return createErrorOutput(
      "Not enough arguments.",
      `<span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">convert &lt;amount&gt; &lt;from&gt; &lt;to&gt;</span>  ·  e.g. <span class="text-tertiary-clr font-bold">convert 100 USD EUR</span>`,
    );
  }

  if (sub === "list") return listCurrencies();
  if (sub === "help") return CONVERT_HELP;

  if (positional.length < 3) {
    return createErrorOutput(
      "Not enough arguments.",
      `<span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">convert &lt;amount&gt; &lt;from&gt; &lt;to&gt;</span>  ·  e.g. <span class="text-tertiary-clr font-bold">convert 100 USD EUR</span>`,
    );
  }

  const jsonMode = flags.json === true || flags.j === true;

  return convertCurrency(positional[0], positional[1], positional[2], jsonMode);
};
