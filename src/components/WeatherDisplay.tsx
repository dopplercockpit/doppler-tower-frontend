
import { WeatherData, getWeatherIconUrl } from "../services/weatherService";
import { generateWeatherSummary } from "../utils/weatherUtils";
import { Cloud, Droplets, Thermometer, Wind } from "lucide-react";

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
  } = weatherData;

  const summary = generateWeatherSummary(weatherData);

  return (
    <div className={`weather-card ${condition}-bg p-6 mb-6`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-bold mb-1">{location}</h2>
          <div className="flex items-center mb-4">
            <img
              src={getWeatherIconUrl(icon)}
              alt={description}
              className="weather-icon mr-2"
            />
            <span className="text-5xl font-bold">{Math.round(temperature)}°C</span>
          </div>
          <p className="text-xl capitalize mb-2">{description}</p>
          <p className="text-lg">Feels like: {Math.round(feels_like)}°C</p>
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <div className="flex items-center">
            <Thermometer className="mr-2" />
            <span className="text-lg">Pressure: {pressure} hPa</span>
          </div>
          <div className="flex items-center">
            <Droplets className="mr-2" />
            <span className="text-lg">Humidity: {humidity}%</span>
          </div>
          <div className="flex items-center">
            <Wind className="mr-2" />
            <span className="text-lg">Wind: {windSpeed} m/s</span>
          </div>
          <div className="flex items-center">
            <Cloud className="mr-2" />
            <span className="text-lg capitalize">Condition: {condition}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg">
        <p className="text-lg">{summary}</p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
