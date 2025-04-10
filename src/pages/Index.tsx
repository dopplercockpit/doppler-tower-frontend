
// src/pages/Index.tsx
import { useState, useEffect } from "react";
import WeatherSearch from "@/components/WeatherSearch";
import WeatherDisplay from "@/components/WeatherDisplay";
import WeatherForecast from "@/components/WeatherForecast";
import WeatherNotification from "@/components/WeatherNotification";
import WeatherMap from "@/components/WeatherMap";
import { useWeatherPrompt } from "@/hooks/useWeatherPrompt";
import { getCurrentWeather, getForecast } from "@/services/weatherService";
import { Clock } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [latestPromptResult, setLatestPromptResult] = useState<any>(null);

  const handleSearch = async (location: string) => {
    try {
      const weather = await getCurrentWeather(location);
      const forecast = await getForecast(location);
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const handlePromptResponse = async (data: any) => {
    setLatestPromptResult(data);
    if (data?.parsed_location) {
      console.log("📍 Running handleSearch with:", data.parsed_location);
      await handleSearch(data.parsed_location);
    }
  };

  useWeatherPrompt(handlePromptResponse);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 ff7-text ff7-blue">Doppler Tower</h1>
        <p className="text-lg text-gray-700">Advanced Weather Monitoring & AI Prompt Agents</p>
        <div className="flex justify-center items-center gap-2 mt-2 text-gray-700">
          <Clock className="text-gray-700" />
          <span>{currentTime}</span>
        </div>
        <form id="weatherPromptForm" onSubmit={e => {
          e.preventDefault();
          const input = document.getElementById("weatherPromptInput") as HTMLInputElement;
          if (input?.value) {
            // Both submit to backend prompt endpoint and handle locally
            fetch(`${import.meta.env.VITE_BACKEND_URL}/prompt`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ prompt: input.value }),
            })
            .then(response => response.json())
            .then(data => handlePromptResponse(data))
            .catch(error => console.error("Error submitting prompt:", error));
          }
        }} className="flex justify-center mt-4">
          <input 
            id="weatherPromptInput" 
            placeholder="Ask about weather in a location..." 
            className="border px-4 py-2 rounded text-black w-full max-w-lg ff7-border" 
          />
          <button type="submit" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded ff7-border">Go</button>
        </form>
      </div>

      <WeatherSearch onSearch={handleSearch} />
      
      <WeatherDisplay data={weatherData} />
      
      <WeatherForecast data={forecastData} />
      
      <WeatherNotification data={forecastData} />
      
      <WeatherMap location={weatherData?.location} />
      
      {/* Ad Space */}
      <div className="mt-8 p-6 bg-gray-100 rounded-lg text-center ff7-border">
        <p className="text-gray-500">Advertisement Space</p>
      </div>
      
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>© 2025 Doppler Tower. All weather data provided by OpenWeatherMap.</p>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Index;
