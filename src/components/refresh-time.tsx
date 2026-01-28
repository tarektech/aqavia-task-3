import { useTimeAgo } from "@/hooks/useTimeAgo";
import { Button } from "./ui/button";
import { RefreshCw } from "lucide-react";
import { useCurrencyConverter } from "@/hooks/useCurrencyConverter";

export function RefreshTime() {
  const { isLoading, lastUpdated, refreshRate } = useCurrencyConverter();

  const timeAgo = useTimeAgo(lastUpdated);

  return (
    <div className="flex items-center justify-center gap-2 pt-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={refreshRate}
        disabled={isLoading}
        className="h-7 px-2 text-muted-foreground hover:text-primary"
      >
        <RefreshCw
          className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`}
        />
      </Button>
      {lastUpdated && (
        <span className="text-xs text-muted-foreground">Updated {timeAgo}</span>
      )}
    </div>
  );
}
