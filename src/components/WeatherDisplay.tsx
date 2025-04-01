
import { WeatherData, getWeatherIconUrl } from "../services/weatherService";
import { generateWeatherSummary } from "../utils/weatherUtils";
import { Cloud, Droplets, Thermometer, Wind, Sunrise, Sunset, CloudFog } from "lucide-react";

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
}

const WeatherDisplay = ({ weatherData }: WeatherDisplayProps) => {
  if (!weatherData) {
    return null;
  }

  const {
    location,
    temperature,
    description,
    icon,
    humidity,
    windSpeed,
    pressure,
    feels_like,
    condition,
    sunrise,
    sunset,
    airQuality,
    minTemp,
    maxTemp,
    timezone,
  } = weatherData;

  const summary = generateWeatherSummary(weatherData);
  
  // Format sunrise and sunset times
  const formatTime = (timestamp: number) => {
    if (!timestamp) return "--:--";
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Air quality indicator
  const getAirQualityElement = () => {
    if (!airQuality) return null;
    
    let className = "air-quality-moderate";
    let label = "Moderate";
    
    if (airQuality === "Good") {
      className = "air-quality-good";
      label = "Good";
    } else if (airQuality === "Poor") {
      className = "air-quality-poor";
      label = "Poor";
    }
    
    return (
      <div className="flex items-center">
        <CloudFog className="mr-2" />
        <span className="text-lg">Air Quality: <span className="ml-1 flex items-center">
          <div className={className}></div>
          <span className="ml-1">{label}</span>
        </span></span>
      </div>
    );
  };

  return (
    <div className={`weather-card ${condition}-bg p-6 mb-6`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-bold mb-1 neon-text neon-teal">{location}</h2>
          <div className="flex items-center mb-4">
            <img
              src={getWeatherIconUrl(icon)}
              alt={description}
              className="weather-icon mr-2"
            />
            <span className="text-5xl font-bold neon-text">{Math.round(temperature)}°C</span>
            <span className="text-2xl ml-2">/ {Math.round(temperature * 9/5 + 32)}°F</span>
          </div>
          <p className="text-xl capitalize mb-2 neon-text neon-blue">{description}</p>
          <p className="text-lg">Feels like: {Math.round(feels_like)}°C / {Math.round(feels_like * 9/5 + 32)}°F</p>
          
          <div className="flex items-center mt-4 gap-4">
            <div className="flex items-center">
              <Sunrise className="mr-1 text-yellow-300" />
              <span>{formatTime(sunrise)}</span>
            </div>
            <div className="flex items-center">
              <Sunset className="mr-1 text-orange-400" />
              <span>{formatTime(sunset)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-4 backdrop-blur-sm bg-black bg-opacity-30 p-4 rounded-lg">
          <div className="flex items-center">
            <Thermometer className="mr-2 text-red-400" />
            <span className="text-lg">Pressure: {pressure} hPa</span>
          </div>
          <div className="flex items-center">
            <Droplets className="mr-2 text-blue-400" />
            <span className="text-lg">Humidity: {humidity}%</span>
          </div>
          <div className="flex items-center">
            <Wind className="mr-2 text-cyan-400" />
            <span className="text-lg">Wind: {windSpeed} m/s / {Math.round(windSpeed * 2.237)} mph</span>
          </div>
          <div className="flex items-center">
            <Thermometer className="mr-2 text-blue-400" />
            <span className="text-lg">Min / Max: {minTemp}°C / {maxTemp}°C</span>
          </div>
          {getAirQualityElement()}
        </div>
      </div>

      <div className="mt-6 p-4 bg-black bg-opacity-50 rounded-lg backdrop-blur-sm text-white">
        <p className="text-lg">{summary}</p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
