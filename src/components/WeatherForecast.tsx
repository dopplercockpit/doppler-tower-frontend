
import { ForecastData, getWeatherIconUrl } from '@/services/weatherService';

interface Props {
  data: ForecastData[];
}

export default function WeatherForecast({ data }: Props) {
  if (!data || data.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 ff7-text ff7-blue">5-Day Forecast</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {data.map((day, index) => (
          <div key={index} className={`forecast-card ${day.condition}-bg`}>
            <div className="text-center">
              <h3 className="font-semibold">{day.day}</h3>
              <p className="text-sm text-gray-700">{day.date}</p>
              <div className="my-3 flex justify-center">
                <img 
                  src={getWeatherIconUrl(day.icon)} 
                  alt={day.description} 
                  className="w-16 h-16"
                />
              </div>
              <p className="capitalize text-sm">{day.description}</p>
              <div className="flex justify-between mt-2">
                <span>{Math.round(day.temperature.min)}°</span>
                <span className="font-bold">{Math.round(day.temperature.max)}°</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
