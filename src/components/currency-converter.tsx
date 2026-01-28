"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Label,
} from "./ui";
import { SwipeButton } from "./swipe-button";
import { ConversionResult } from "./conversion-result";
import { CurrencySelect } from "./currency-select";
import { useCurrencyConverter } from "@/hooks/useCurrencyConverter";
import { getCurrencySymbol } from "@/utils/currency-helper";
import { AlertCircle } from "lucide-react";

export function CurrencyConverter() {
  const {
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
  } = useCurrencyConverter();

  const currencySymbol = getCurrencySymbol(fromCurrency);

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold">Convert Currency</CardTitle>
        <CardDescription className="text-blue-400">
          {isUsingFallback ? "Offline exchange rates" : "Real-time exchange rates"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <p className="text-sm text-amber-700 dark:text-amber-300">{error}</p>
          </div>
        )}

        {/* Amount Input */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Amount
          </Label>
          <div className="relative ">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg mr-5">
              {currencySymbol}
            </span>
            <Input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-10 h-14 text-xl font-semibold border-2"
              placeholder="0"
            />
          </div>
        </div>

        {/* Currency Selects with Swap Button */}
        <div className="flex items-end gap-3">
          <CurrencySelect
            label="From"
            value={fromCurrency}
            onChange={setFromCurrency}
            currencies={currencies}
          />
          <SwipeButton onSwap={handleSwap} />
          <CurrencySelect
            label="To"
            value={toCurrency}
            onChange={setToCurrency}
            currencies={currencies}
          />
        </div>

        {/* Conversion Result */}
        <ConversionResult
          fromAmount={Number.parseFloat(amount || "0")}
          fromCurrency={fromCurrency}
          toAmount={convertedAmount}
          toCurrency={toCurrency}
          exchangeRate={exchangeRate}
        />
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          {isLoading ? "Fetching rates..." : "Rates are for reference only."}
        </p>
      </CardFooter>
    </Card>
  );
}
