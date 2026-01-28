"use client";

import { useState, useMemo } from "react";
import { Label } from "./ui";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "./ui/combobox";

type CurrencySelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  currencies: string[];
};

export function CurrencySelect({
  label,
  value,
  onChange,
  currencies,
}: CurrencySelectProps) {
  const [search, setSearch] = useState("");

  const filteredCurrencies = useMemo(() => {
    if (!search) return currencies;
    return currencies.filter((code) =>
      code.toLowerCase().includes(search.toLowerCase()),
    );
  }, [currencies, search]);

  return (
    <div className="flex-1 space-y-2">
      <Label className="text-sm font-medium text-muted-foreground">
        {label}
      </Label>
      <Combobox
        value={value}
        onValueChange={(value) => value && onChange(value)}
        onInputValueChange={setSearch}
      >
        <ComboboxInput
          placeholder="Search currency..."
          className="h-12 w-full"
          showClear
        />
        <ComboboxContent>
          <ComboboxList>
            {filteredCurrencies.map((code) => (
              <ComboboxItem key={code} value={code}>
                {code}
              </ComboboxItem>
            ))}
          </ComboboxList>
          <ComboboxEmpty>No currency found</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
