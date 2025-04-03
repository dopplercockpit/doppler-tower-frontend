import { useEffect } from "react";

// Utility function to detect if prompt is a weather agent request
function isAgentPrompt(prompt: string) {
  return prompt.toLowerCase().includes("set a weather agent");
}

// Utility to extract city and times from prompt
function extractAgentDetails(prompt: string) {
  const cityMatch = prompt.match(/for (\w+)/i);
  const timeMatches = prompt.match(/\d{1,2}:\d{2}/g);

  const city = cityMatch ? cityMatch[1] : null;
  const hours = timeMatches || [];

  return { city, hours };
}

export function useWeatherPrompt(onFallbackSearch: (location: string) => void) {
  useEffect(() => {
    const inputBox = document.querySelector("input[type='text']") as HTMLInputElement;
    const searchButton = inputBox?.nextElementSibling as HTMLElement;

    if (!inputBox || !searchButton) return;

    const handleSubmit = () => {
      const prompt = inputBox.value;
      if (!isAgentPrompt(prompt)) return;

      const { city, hours } = extractAgentDetails(prompt);

      if (!city || hours.length === 0) {
        console.warn("Could not parse a weather agent from the input.");
        onFallbackSearch(prompt); // ← This is where the fallback happens
        return;
      }

      // Send to backend
      fetch("/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city, hours })
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to set agent.");
          console.log("Agent set for", city, "at", hours.join(", "));
        })
        .catch((err) => {
          console.error(err);
        });
    };

    searchButton.addEventListener("click", handleSubmit);
    return () => searchButton.removeEventListener("click", handleSubmit);
  }, [onFallbackSearch]);
}
