"use client";
import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@base-ui/react/button";

interface SwipeButtonProps {
  onSwap?: () => void;
}

export function SwipeButton({ onSwap }: SwipeButtonProps) {
  const [rotated, setRotated] = useState(false);

  const handleClick = () => {
    setRotated(!rotated);
    onSwap?.();
  };

  return (
    <Button
      onClick={handleClick}
      className="mb-3 h-10 w-10 shrink-0 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 text-white"
    >
      <ArrowUpDown
        className={`h-4 w-4 transition-transform duration-300 ${rotated ? "rotate-180" : ""}`}
      />
    </Button>
  );
}
