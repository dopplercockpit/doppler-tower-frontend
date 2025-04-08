// src/hooks/useWeatherPrompt.ts
import { useEffect } from "react";

export function useWeatherPrompt(handleSearch: (query: string) => void) {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch("http://localhost:5000/prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: document.getElementById("weatherPromptInput")?.value || ""
          }),
        });
    
        const data = await response.json();
    
        console.log("💡 Prompt result:", data);
    
        if (data?.parsed_location) {
          console.log("📍 Running handleSearch with:", data.parsed_location);
          handleSearch(data.parsed_location);
        }
      } catch (err) {
        console.error("❌ Failed to fetch app prompt", err);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [handleSearch]);
}

