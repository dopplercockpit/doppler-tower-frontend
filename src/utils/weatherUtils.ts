
import { WeatherData, ForecastData } from "../services/weatherService";

export interface NotificationData {
  message: string;
  type: "info" | "warning" | "alert";
  condition: "sunny" | "cloudy" | "rainy" | "snowy" | "stormy";
}

// Generate a natural language summary of the current weather
export const generateWeatherSummary = (data: WeatherData): string => {
  const { temperature, description, humidity, windSpeed } = data;
  const timeOfDay = getTimeOfDay(data);
  
  // Basic NLP template
  return `It's currently ${temperature}°C with ${description} in ${data.location}. 
          ${timeOfDay === "morning" ? "Good morning! " : timeOfDay === "evening" ? "Good evening! " : ""}
          The humidity is ${humidity}% and the wind speed is ${windSpeed} m/s.
          ${getComfortLevel(temperature, humidity)}`;
};

// Generate weather notifications based on conditions
export const generateWeatherNotifications = (
  currentWeather: WeatherData,
  forecast: ForecastData[]
): NotificationData[] => {
  const notifications: NotificationData[] = [];
  
  // Current weather notifications
  if (currentWeather.condition === "rainy") {
    notifications.push({
      message: "Don't forget your umbrella today!",
      type: "info",
      condition: "rainy"
    });
  }
  
  if (currentWeather.condition === "snowy") {
    notifications.push({
      message: "Roads might be slippery. Drive carefully!",
      type: "warning",
      condition: "snowy"
    });
  }
  
  if (currentWeather.temperature > 30) {
    notifications.push({
      message: "High temperature alert! Stay hydrated and seek shade when possible.",
      type: "warning",
      condition: "sunny"
    });
  }
  
  // Forecast notifications
  const tomorrowForecast = forecast[0];
  if (tomorrowForecast) {
    if (
      currentWeather.condition !== "rainy" && 
      tomorrowForecast.condition === "rainy"
    ) {
      notifications.push({
        message: `Rain is expected tomorrow. Plan accordingly!`,
        type: "info",
        condition: "rainy"
      });
    }
    
    if (
      tomorrowForecast.temperature.max - currentWeather.temperature > 5
    ) {
      notifications.push({
        message: `Temperature is expected to rise significantly tomorrow.`,
        type: "info",
        condition: "sunny"
      });
    }
    
    if (
      currentWeather.temperature - tomorrowForecast.temperature.max > 5
    ) {
      notifications.push({
        message: `Temperature drop expected tomorrow. Dress warmly!`,
        type: "info",
        condition: "cloudy"
      });
    }
  }
  
  return notifications;
};

// Get time of day based on timestamp and timezone
const getTimeOfDay = (data: WeatherData): "morning" | "afternoon" | "evening" | "night" => {
  const localTime = new Date((data.dt + data.timezone) * 1000);
  const hours = localTime.getUTCHours();
  
  if (hours >= 5 && hours < 12) return "morning";
  if (hours >= 12 && hours < 17) return "afternoon";
  if (hours >= 17 && hours < 21) return "evening";
  return "night";
};

// Get comfort level description based on temperature and humidity
const getComfortLevel = (temperature: number, humidity: number): string => {
  if (temperature > 28 && humidity > 70) {
    return "It feels quite humid and hot today.";
  }
  
  if (temperature > 28) {
    return "It's a hot day!";
  }
  
  if (temperature < 10) {
    return "It's a cold day, make sure to dress warmly.";
  }
  
  if (temperature >= 18 && temperature <= 24 && humidity < 60) {
    return "The weather conditions are very pleasant today.";
  }
  
  return "";
};

// Function to convert weather icon codes to appropriate icon names
export const getWeatherIcon = (iconCode: string): string => {
  // Map OpenWeatherMap icon codes to descriptive names (could be used with icon libraries)
  const iconMap: Record<string, string> = {
    "01d": "sun",
    "01n": "moon",
    "02d": "cloud-sun",
    "02n": "cloud-moon",
    "03d": "cloud",
    "03n": "cloud",
    "04d": "clouds",
    "04n": "clouds",
    "09d": "cloud-drizzle",
    "09n": "cloud-drizzle",
    "10d": "cloud-rain",
    "10n": "cloud-rain",
    "11d": "cloud-lightning",
    "11n": "cloud-lightning",
    "13d": "cloud-snow",
    "13n": "cloud-snow",
    "50d": "cloud-fog",
    "50n": "cloud-fog"
  };
  
  return iconMap[iconCode] || "cloud";
};
