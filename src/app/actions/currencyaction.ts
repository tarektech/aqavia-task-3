"use server";

import {
  FALLBACK_CURRENCIES,
  FALLBACK_RATES,
  REQUIRED_CURRENCIES,
  type ApiResponseType,
  type ConversionResultType,
} from "@/types/types";
import { filterCurrencies } from "@/utils/currency-helper";

// the api key
const EXCHANGE_RATES_API_KEY = process.env.EXCHANGE_RATES_API_KEY;
// the url for the currencies symbols
const EXCHANGE_CURRENCY_URL = `https://api.currencyfreaks.com/v2.0/supported-currencies?apikey=${EXCHANGE_RATES_API_KEY}`;
// the url for the exchange symbols
const EXCHANGE_SYMBOLS_URL = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${EXCHANGE_RATES_API_KEY}`;

export async function getCurrenciesSymbols(): Promise<string[]> {
  try {
    const response = await fetch(EXCHANGE_CURRENCY_URL);
    if (!response.ok) {
      throw new Error("API response not ok");
    }
    const data: ApiResponseType = await response.json();
    const currencies = filterCurrencies(data);

    // Ensure required currencies are at the top
    const prioritized = REQUIRED_CURRENCIES.filter((c) =>
      currencies.includes(c),
    );
    const others = currencies.filter((c) => !REQUIRED_CURRENCIES.includes(c));
    //for priority currencies
    return [...prioritized, ...others];
  } catch (error) {
    console.error("Failed to fetch currencies, using fallback:", error);
    return FALLBACK_CURRENCIES;
  }
}

function convertWithFallback(
  from: string,
  to: string,
  amount: number,
): ConversionResultType {
  const fromRate = FALLBACK_RATES[from];
  const toRate = FALLBACK_RATES[to];

  if (!fromRate || !toRate) {
    throw new Error(`Fallback rate not available for ${from} or ${to}`);
  }

  const rate = toRate / fromRate;
  const convertedAmount = amount * rate;

  return { rate, convertedAmount, isUsingFallback: true };
}

export async function convertCurrency(
  from: string,
  to: string,
  amount: number,
): Promise<ConversionResultType> {
  try {
    const url = `${EXCHANGE_SYMBOLS_URL}&symbols=${from},${to}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("API response not ok");
    }

    const data = await response.json();

    if (!data.rates) {
      throw new Error(`API error: ${JSON.stringify(data)}`);
    }

    // API returns rates relative to USD
    const fromRate = from === "USD" ? 1 : Number.parseFloat(data.rates[from]);
    const toRate = to === "USD" ? 1 : Number.parseFloat(data.rates[to]);

    if (Number.isNaN(fromRate) || Number.isNaN(toRate)) {
      throw new Error(`Invalid rate for ${from} or ${to}`);
    }

    // Calculate cross rate: from -> USD -> to
    const rate = toRate / fromRate;
    const convertedAmount = amount * rate;

    return { rate, convertedAmount, isUsingFallback: false };
  } catch (error) {
    console.error("API conversion failed, using fallback rates:", error);
    return convertWithFallback(from, to, amount);
  }
}
