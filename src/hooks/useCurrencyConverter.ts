import { useEffect, useState } from "react";
import { getCurrenciesSymbols, convertCurrency } from "@/app/actions/currencyaction";

export function useCurrencyConverter() {
    const [amount, setAmountState] = useState("100");
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [exchangeRate, setExchangeRate] = useState<number>(0);
    const [convertedAmount, setConvertedAmount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isUsingFallback, setIsUsingFallback] = useState(false);

    // Validate and set amount - only allow numeric values
    function setAmount(value: string) { 
        // Allow empty string, digits, and single decimal point
        const sanitized = value.replace(/[^\d.]/g, "");
        // Ensure only one decimal point
        const parts = sanitized.split(".");
        const validValue = parts.length > 2 
            ? `${parts[0]}.${parts.slice(1).join("")}`
            : sanitized;
        setAmountState(validValue);
    }

    useEffect(() => {
        getCurrenciesSymbols().then(setCurrencies);
    }, []);

    useEffect(() => {
        async function fetchRate() {
            if (!fromCurrency || !toCurrency) return;

            setIsLoading(true);
            setError(null);
            
            try {
                const result = await convertCurrency(
                    fromCurrency,
                    toCurrency,
                    Number.parseFloat(amount || "0")
                );
                setExchangeRate(result.rate);
                setConvertedAmount(result.convertedAmount);
                setIsUsingFallback(result.isUsingFallback ?? false);
                
                if (result.isUsingFallback) {
                    setError("Using offline rates. Live rates unavailable.");
                }
            } catch (err) {
                const message = err instanceof Error ? err.message : "Conversion failed";
                setError(message);
                setExchangeRate(0);
                setConvertedAmount(0);
            } finally {
                setIsLoading(false);
            }
        }
        // clear timeout on unmount
        const debounceTimer = setTimeout(fetchRate, 300);
        return () => clearTimeout(debounceTimer);
    }, [fromCurrency, toCurrency]);

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };


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
    };
}