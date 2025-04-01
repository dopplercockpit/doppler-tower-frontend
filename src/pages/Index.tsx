
import { useState, useEffect } from "react";
import WeatherSearch from "@/components/WeatherSearch";
import WeatherDisplay from "@/components/WeatherDisplay";
import WeatherForecast from "@/components/WeatherForecast";
import WeatherNotification from "@/components/WeatherNotification";
import { 
  getCurrentWeather, 
  getForecast, 
  WeatherData, 
  ForecastData 
} from "@/services/weatherService";
import { generateWeatherNotifications, NotificationData } from "@/utils/weatherUtils";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = async (location: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch current weather
      const weatherResult = await getCurrentWeather(location);
      setWeatherData(weatherResult);
      
      // Fetch forecast
      const forecastResult = await getForecast(location);
      setForecastData(forecastResult);
      
      // Generate weather notifications
      const notificationResult = generateWeatherNotifications(weatherResult, forecastResult);
      setNotifications(notificationResult);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Failed to fetch weather data. Please try again.");
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load default location on initial render
  useEffect(() => {
    handleSearch("London");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">SkyBot Weather</h1>
          <p className="text-xl text-gray-600 mb-6">
            Real-time weather updates with natural language notifications
          </p>
          <div className="flex justify-center mb-8">
            <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}

        {weatherData && (
          <div className="max-w-4xl mx-auto">
            <WeatherDisplay weatherData={weatherData} />
            <WeatherNotification notifications={notifications} />
            <WeatherForecast forecastData={forecastData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
