import type { ApiResponse } from "@/types/types";

export function filterCurrencies(data: ApiResponse): string[] {
  return Object.values(data.supportedCurrenciesMap)
    .filter(
      (c) =>
        c.countryCode !== "Crypto" &&
        c.countryCode !== "Metal" &&
        c.status !== "DEPRECIATED",
    )
    .map((c) => c.currencyCode)
    .sort();
}

const DEFAULT_FORMAT_OPTIONS: Intl.NumberFormatOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export function formatNumber(value: number, currency?: string) {
  // if no currency, format the number with the default options
  if (!currency) {
    return new Intl.NumberFormat("en-US", DEFAULT_FORMAT_OPTIONS).format(value);
  }
  // format the number with the currency
  try {
    return new Intl.NumberFormat("en-US", {
      ...DEFAULT_FORMAT_OPTIONS,
      style: "currency",
      currency,
    }).format(value);
  } catch {
    // Fallback for unsupported currency codes
    return `${value.toFixed(2)} ${currency}`;
  }
}

// Currency symbols mapping for common currencies
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CNY: "¥",
  INR: "₹",
  SYP: "£S",
  JOD: "د.ا",
  AED: "د.إ",
  SAR: "﷼",
  EGP: "£",
  TRY: "₺",
};

export function getCurrencySymbol(currencyCode: string): string {
  return CURRENCY_SYMBOLS[currencyCode] || currencyCode;
}
