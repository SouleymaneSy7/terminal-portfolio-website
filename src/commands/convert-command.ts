/**
 * Currency conversion powered by frankfurter.dev.
 * Supports 164 world currencies. No API key required.
 *
 */

import { createHtmlOutput } from "@/constants";
import { convertService } from "@/services/convert.service";

// ─────────────────────────────────────────────────────────────────
// SUPPORTED CURRENCIES (static list for offline fallback + display)
// ─────────────────────────────────────────────────────────────────

const KNOWN_CURRENCIES: Record<string, string> = {
  AUD: "Australian Dollar",
  BGN: "Bulgarian Lev",
  BRL: "Brazilian Real",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Renminbi Yuan",
  CZK: "Czech Koruna",
  DKK: "Danish Krone",
  EUR: "Euro",
  GBP: "British Pound",
  HKD: "Hong Kong Dollar",
  HUF: "Hungarian Forint",
  IDR: "Indonesian Rupiah",
  ILS: "Israeli New Sheqel",
  INR: "Indian Rupee",
  ISK: "Icelandic Króna",
  JPY: "Japanese Yen",
  KRW: "South Korean Won",
  MXN: "Mexican Peso",
  MYR: "Malaysian Ringgit",
  NOK: "Norwegian Krone",
  NZD: "New Zealand Dollar",
  PHP: "Philippine Peso",
  PLN: "Polish Zloty",
  RON: "Romanian Leu",
  SEK: "Swedish Krona",
  SGD: "Singapore Dollar",
  THB: "Thai Baht",
  TRY: "Turkish Lira",
  USD: "United States Dollar",
  ZAR: "South African Rand",
};

// ─────────────────────────────────────────────────────────────────
// HANDLERS
// ─────────────────────────────────────────────────────────────────

const convertCurrency = async (amountStr: string, from: string, to: string) => {
  const amount = parseFloat(amountStr);

  if (isNaN(amount) || amount <= 0) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Invalid amount: <span class="text-tertiary-clr">"${amountStr}"</span></p>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Usage: <span class="text-tertiary-clr font-bold">convert &lt;amount&gt; &lt;from&gt; &lt;to&gt;</span>  ·  e.g. <span class="text-tertiary-clr">convert 100 USD EUR</span></p>
        </div>
      </div>`,
    );
  }

  const fromUpper = from.toUpperCase();
  const toUpper = to.toUpperCase();

  try {
    const result = await convertService.convert(fromUpper, toUpper);

    const convertedAmount = amount * result.rate;
    const fromName = KNOWN_CURRENCIES[fromUpper] ?? fromUpper;
    const toName = KNOWN_CURRENCIES[toUpper] ?? toUpper;
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
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>
            <span class="text-primary-clr font-bold">${amountFormatted} ${fromUpper}</span>
            <span class="text-text-clr opacity-sep">  →  </span>
            <span class="text-tertiary-clr font-bold">${formatted} ${toUpper}</span>
          </p>
        </div>
        <div class="space-y-t-group">
          <p><span class="text-secondary-clr">From      </span> - ${fromName}</p>
          <p><span class="text-secondary-clr">To        </span> - ${toName}</p>
          <p><span class="text-secondary-clr">Rate      </span> - 1 ${fromUpper} = ${rate} ${toUpper}</p>
          <p><span class="text-secondary-clr">Date      </span> - ${result.date}</p>
        </div>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p class="text-text-clr opacity-sep">Source: frankfurter.dev · Rates from European Central Bank</p>
        </div>
      </div>`,
    );
  } catch (error: any) {
    console.error(error);
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> ${error.message || "Currency not found or service unavailable."}</p>
          <p>Make sure both codes are valid ISO 4217 currency codes.</p>
        </div>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Type <span class="text-tertiary-clr font-bold">convert list</span> to see supported currencies.</p>
        </div>
      </div>`,
    );
  }
};

const listCurrencies = () => {
  const rows = Object.entries(KNOWN_CURRENCIES)
    .map(
      ([code, name]) =>
        `<p>
          <span class="text-tertiary-clr font-bold">${code}</span>
          <span class="text-text-clr opacity-sep">  ·  </span>
          <span>${name}</span>
        </p>`,
    )
    .join("\n");

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Supported Currencies <span class="text-text-clr opacity-sep">(${Object.keys(KNOWN_CURRENCIES).length})</span></p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        ${rows}
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Rates provided by the European Central Bank via frankfurter.dev.</p>
        <p>Usage: <span class="text-tertiary-clr font-bold">convert &lt;amount&gt; &lt;from&gt; &lt;to&gt;</span>  ·  e.g. <span class="text-tertiary-clr">convert 100 USD EUR</span></p>
      </div>
    </div>`,
  );
};

const showConvertHelp = () =>
  createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">convert — Command Reference</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-tertiary-clr font-bold">convert &lt;amount&gt; &lt;from&gt; &lt;to&gt; </span> - Convert between currencies</p>
        <p><span class="text-tertiary-clr font-bold">convert list                    </span> - List all supported currencies</p>
      </div>
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Examples</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  convert 100 USD EUR</p>
        <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  convert 50 EUR GBP</p>
        <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  convert 1000 JPY USD</p>
        <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  convert 200 CHF CAD</p>
      </div>
    </div>`,
  );

const showConvertUsage = () =>
  createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">convert</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Real-time currency conversion powered by the European Central Bank.</p>
        <p>Usage: <span class="text-tertiary-clr font-bold">convert &lt;amount&gt; &lt;from&gt; &lt;to&gt;</span></p>
      </div>
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Examples</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  convert 100 USD EUR</p>
        <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  convert 50 EUR GBP</p>
        <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  convert 1000 JPY USD</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Type <span class="text-tertiary-clr font-bold">convert list</span> to see all supported currencies.</p>
      </div>
    </div>`,
  );

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

export const handleConvertCommand = async (args: string[]) => {
  const first = args[0]?.toLowerCase();

  if (!first) return showConvertUsage();
  if (first === "list") return listCurrencies();
  if (first === "help") return showConvertHelp();

  // convert <amount> <from> <to>
  if (args.length < 3) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Not enough arguments.</p>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Usage: <span class="text-tertiary-clr font-bold">convert &lt;amount&gt; &lt;from&gt; &lt;to&gt;</span>  ·  e.g. <span class="text-tertiary-clr">convert 100 USD EUR</span></p>
        </div>
      </div>`,
    );
  }

  return convertCurrency(args[0], args[1], args[2]);
};
