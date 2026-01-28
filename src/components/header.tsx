"use client";

import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isDarkModeState, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newValue = !isDarkModeState;
    setIsDarkMode(newValue);
    document.documentElement.classList.toggle("dark", newValue);
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-6 py-4 rounded-full  bg-background drop-shadow-lg border-b-2 border-b-primary  ">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <h1 className="text-xl font-semibold text-primary">Currency Converter</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="rounded-full text-primary hover:bg-primary/20"
        >
          {isDarkModeState ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
}
