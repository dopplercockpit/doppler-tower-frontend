
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
import { Clock, AlertTriangle } from "lucide-react";

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());
  const { toast } = useToast();

  // Update the current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

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

  // Simulated severe weather alert component
  const SevereWeatherAlert = () => {
    const hasSevereAlert = notifications.some(notif => notif.type === 'alert');
    if (!hasSevereAlert) return null;
    
    return (
      <div className="severe-alert mb-6 neon-pulse">
        <div className="flex items-center">
          <AlertTriangle className="mr-2 h-6 w-6 text-red-200" />
          <h3 className="text-xl font-bold">Severe Weather Alert</h3>
        </div>
        <p className="mt-2">
          Weather warnings are in effect for your area. Please check local authorities for more information.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <img 
              src="/lovable-uploads/9f5cebf3-e4c1-4f0d-9b8c-a53fee564106.png" 
              alt="Doppler Tower Logo" 
              className="h-12 mr-3"
            />
            <h1 className="text-5xl font-bold neon-text neon-purple">Doppler Tower</h1>
          </div>
          <p className="text-xl text-gray-200 mb-4">
            Advanced Weather Monitoring & Alert System
          </p>
          <div className="flex items-center justify-center text-white mb-6">
            <Clock className="mr-2" />
            <span>{currentTime}</span>
          </div>
          <div className="flex justify-center mb-8">
            <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>

        {error && (
          <div className="bg-red-800 border-l-4 border-red-500 text-white p-4 mb-6 rounded backdrop-blur-sm">
            <p>{error}</p>
          </div>
        )}

        <SevereWeatherAlert />

        {weatherData && (
          <div className="max-w-4xl mx-auto">
            <WeatherDisplay weatherData={weatherData} />
            <WeatherNotification notifications={notifications} />
            <WeatherForecast forecastData={forecastData} />
            
            {weatherData.hourlyForecast && weatherData.hourlyForecast.length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4 text-white neon-text neon-teal">The Next Few Hours</h2>
                <div className="bg-black bg-opacity-50 rounded-lg p-4 backdrop-blur-sm cyberpunk-border">
                  <div className="space-y-2 text-white">
                    {weatherData.hourlyForecast.map((hourly, index) => (
                      <div key={index} className="p-2 border-b border-gray-700 last:border-0">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{hourly.time}</span>
                          <div className="flex items-center">
                            <span>{hourly.temp}°C / {Math.round(hourly.temp * 9/5 + 32)}°F</span>
                            <span className="mx-2">|</span>
                            <span>{hourly.description}</span>
                            <span className="mx-2">|</span>
                            <span>Wind {hourly.windSpeed} km/h</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {weatherData.summary && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4 text-white neon-text neon-pink">AI Weather Summary</h2>
                <div className="bg-black bg-opacity-50 rounded-lg p-4 backdrop-blur-sm cyberpunk-border">
                  <p className="text-white">{weatherData.summary}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
