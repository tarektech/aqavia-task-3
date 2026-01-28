import { formatNumber } from "@/utils/currency-helper";

type ConversionResultProps = {
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  exchangeRate: number;
};

export function ConversionResult({
  fromAmount,
  fromCurrency,
  toAmount,
  toCurrency,
  exchangeRate,
}: ConversionResultProps) {
  return (
    <div className="bg-background  rounded-xl p-6 space-y-4 text-wra">
      {/* From Amount */}
      <div className="text-lg text-slate-600 dark:text-white">
        {formatNumber(fromAmount, fromCurrency)}{" "}
        <span className="text-sm uppercase">{fromCurrency}</span>
      </div>

      {/* Equals Sign */}
      <div className="flex justify-center">
        <span className="text-slate-400 dark:text-white text-xl">=</span>
      </div>

      {/* To Amount */}
      <div className="text-3xl font-bold text-blue-900 dark:text-white wrap-break-word max-w-full">
        {formatNumber(toAmount, toCurrency)}{" "}
        <span className="text-lg font-normal uppercase">{toCurrency}</span>
      </div>

      {/* Exchange Rate */}
      <div className="text-sm text-slate-500 dark:text-white pt-2">
        1 {fromCurrency} = {formatNumber(exchangeRate)} {toCurrency}
      </div>
    </div>
  );
}
