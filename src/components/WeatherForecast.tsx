
import { ForecastData, getWeatherIconUrl } from "../services/weatherService";

interface WeatherForecastProps {
  forecastData: ForecastData[];
}

const WeatherForecast = ({ forecastData }: WeatherForecastProps) => {
  if (!forecastData.length) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {forecastData.map((day, index) => (
          <div key={index} className={`forecast-card ${day.condition}-bg`}>
            <div className="text-center">
              <p className="font-bold">{day.day}</p>
              <p className="text-sm mb-2">{day.date}</p>
              <img
                src={getWeatherIconUrl(day.icon)}
                alt={day.description}
                className="w-16 h-16 mx-auto"
              />
              <p className="capitalize text-sm mb-1">{day.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold">{Math.round(day.temperature.max)}°</span>
                <span className="text-sm opacity-80">{Math.round(day.temperature.min)}°</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
