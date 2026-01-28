"use client";
import { useEffect, useRef, useState } from "react";
import {
  getCurrenciesSymbols,
  convertCurrency,
} from "@/app/actions/currencyaction";

export function useCurrencyConverter() {
  const [amount, setAmountState] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const fetchRateRef = useRef<(() => Promise<void>) | null>(null);

  // Derived State: The compiler optimizes this calculation
  const numAmount = parseFloat(amount) || 0;
  const convertedAmount = numAmount * exchangeRate;

  // Actions
  function setAmount(value: string) {
    const sanitized = value.replace(/[^0-9.]/g, "");
    const parts = sanitized.split(".");
    setAmountState(
      parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : sanitized,
    );
  }

  function handleSwap() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  function refreshRate() {
    fetchRateRef.current?.();
  }

  // Data Fetching
  useEffect(() => {
    getCurrenciesSymbols().then(setCurrencies);
  }, []);

  useEffect(() => {
    async function fetchRate() {
      if (!fromCurrency || !toCurrency) return;

      setIsLoading(true);
      setError(null);

      try {
        const result = await convertCurrency(fromCurrency, toCurrency, 1);

        setExchangeRate(result.rate);
        setIsUsingFallback(!!result.isUsingFallback);
        setLastUpdated(new Date());

        if (result.isUsingFallback) {
          setError("Using offline rates.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Conversion failed");
        setExchangeRate(0);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRateRef.current = fetchRate;

    const debounceTimer = setTimeout(fetchRate, 400);
    return () => clearTimeout(debounceTimer);
  }, [fromCurrency, toCurrency]);

  return {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    currencies,
    exchangeRate,
    convertedAmount,
    isLoading,
    error,
    isUsingFallback,
    handleSwap,
    lastUpdated,
    refreshRate,
  };
}
