import { useState } from "react";

export function useWeatherPrompt() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [rawData, setRawData] = useState<any>(null);

  const sendPrompt = async (prompt: string) => {
    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      const response = await fetch("/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }

      const data = await response.json();
      setSummary(data.summary || data.gpt_summary || "No summary available.");
      setRawData(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return {
    sendPrompt,
    loading,
    error,
    summary,
    rawData,
  };
}
