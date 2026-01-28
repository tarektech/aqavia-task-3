"use client";
import { useEffect, useState } from "react";

export function useTimeAgo(date: Date | null): string {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    if (!date) return;

    const updateTimeAgo = () => {
      const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

      if (seconds < 5) {
        setTimeAgo("just now");
      } else if (seconds < 60) {
        setTimeAgo(`${seconds}s ago`);
      } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        setTimeAgo(`${minutes}m ago`);
      } else {
        const hours = Math.floor(seconds / 3600);
        setTimeAgo(`${hours}h ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 1000);
    return () => clearInterval(interval);
  }, [date]);

  return timeAgo;
}
