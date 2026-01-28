type ApiCurrency = {
  currencyCode: string;
  currencyName: string;
  countryCode: string;
  countryName: string;
  icon: string;
  status: "AVAILABLE" | "DEPRECIATED";
};

export type ApiResponseType = {
  supportedCurrenciesMap: Record<string, ApiCurrency>;
};

export type ConversionResultType = {
  rate: number;
  convertedAmount: number;
  isUsingFallback?: boolean;
};

export type ApiResponse = ApiResponseType;

// Required currencies that must always be available
export const REQUIRED_CURRENCIES = ["SYP", "USD", "JOD", "EUR"];

// Static fallback exchange rates (relative to USD) - used when API fails
export const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  SYP: 13000,
  JOD: 0.71,
  AED: 3.67,
  SAR: 3.75,
  TRY: 43.5,
};

// Fallback currency list when API fails
export const FALLBACK_CURRENCIES = Object.keys(FALLBACK_RATES);
