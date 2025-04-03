// src/hooks/useWeatherPrompt.ts
import { useEffect } from "react";

export function useWeatherPrompt(handleSearch: (query: string) => void) {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch("http://localhost:5000/app/prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        const data = await response.json();

        if (data?.parsed_location) {
          console.log("🚀 Prompt returned location:", data.parsed_location);
          handleSearch(data.parsed_location);
        }
      } catch (err) {
        console.error("🛑 Failed to fetch app prompt:", err);
      }
    }, 5000); // Every 5 seconds (you can change this!)

    return () => clearInterval(interval);
  }, [handleSearch]);
}
