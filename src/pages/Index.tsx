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

const Index = () => {
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any[]>([]);

  const handleSearch = async (location: string) => {
    const weather = await getCurrentWeather(location);
    const forecast = await getForecast(location);
    setWeatherData(weather);
    setForecastData(forecast);
  };

  useWeatherPrompt(handleSearch);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Doppler Tower</h1>
        <p className="text-lg text-gray-700">Advanced Weather Monitoring & AI Prompt Agents</p>
        <div className="flex justify-center items-center gap-2 mt-2">
          <Clock />
          <span>{currentTime}</span>
        </div>
        <form id="weatherPromptForm" onSubmit={e => {
          e.preventDefault();
          const input = document.getElementById("weatherPromptInput") as HTMLInputElement;
          if (input?.value) handleSearch(input.value);
        }} className="flex justify-center mt-4">
          <input id="weatherPromptInput" placeholder="Ask the donkey anything..." className="border px-4 py-2 rounded text-black w-full max-w-lg" />
          <button type="submit" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">Go</button>
        </form>
      </div>

      <WeatherSearch onSearch={handleSearch} />
      <WeatherDisplay data={weatherData} />
      <WeatherForecast data={forecastData} />
      <WeatherNotification data={forecastData} />
      <WeatherMap location={weatherData?.location} />
    </div>
  );
};

export default Index;