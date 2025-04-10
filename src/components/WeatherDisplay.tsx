
import { Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, Sun, Wind, Droplets, Thermometer } from 'lucide-react';
import { WeatherData } from '@/services/weatherService';
import { getWeatherIconUrl } from '@/services/weatherService';

interface WeatherDisplayProps {
  data: WeatherData | null;
}

export default function WeatherDisplay({ data }: WeatherDisplayProps) {
  if (!data) return null;

  // Function to get icon component based on condition
  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun size={48} className="text-yellow-400" />;
      case 'cloudy': return <Cloud size={48} className="text-gray-400" />;
      case 'rainy': return <CloudRain size={48} className="text-blue-400" />;
      case 'snowy': return <CloudSnow size={48} className="text-blue-100" />;
      case 'stormy': return <CloudLightning size={48} className="text-purple-400" />;
      default: return <Cloud size={48} className="text-gray-400" />;
    }
  };

  return (
    <div className="mb-8">
      <div className={`p-6 rounded-lg shadow-lg ff7-card ${data.condition}-bg`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Location and main weather info */}
          <div className="md:col-span-2">
            <div className="mb-2 flex justify-between items-center">
              <h2 className="text-2xl font-bold ff7-text">{data.location}</h2>
              {data.airQuality && (
                <div className="flex items-center gap-2">
                  <span>Air Quality:</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                    ${data.airQuality === 'Good' ? 'bg-green-100 text-green-800' : 
                      data.airQuality === 'Moderate' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {data.airQuality}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center mb-4">
              <div className="mr-4">
                {getConditionIcon(data.condition)}
              </div>
              <div>
                <div className="flex items-end">
                  <span className="text-5xl font-bold ff7-text">{Math.round(data.temperature)}</span>
                  <span className="text-2xl ml-1">°C</span>
                </div>
                <p className="text-lg capitalize">{data.description}</p>
              </div>
            </div>

            <div className="text-sm">
              <p>Feels like: {Math.round(data.feels_like)}°C</p>
              {data.minTemp !== undefined && data.maxTemp !== undefined && (
                <p>Min/Max: {Math.round(data.minTemp)}°C / {Math.round(data.maxTemp)}°C</p>
              )}
            </div>
          </div>

          {/* Weather details */}
          <div className="bg-gray-800 bg-opacity-70 text-white p-4 rounded-lg ff7-border">
            <h3 className="text-lg font-semibold mb-2 ff7-text ff7-teal">Weather Details</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <Wind className="mr-2" size={18} />
                <span>Wind</span>
              </div>
              <div>{data.windSpeed} m/s</div>
              
              <div className="flex items-center">
                <Droplets className="mr-2" size={18} />
                <span>Humidity</span>
              </div>
              <div>{data.humidity}%</div>
              
              <div className="flex items-center">
                <Thermometer className="mr-2" size={18} />
                <span>Pressure</span>
              </div>
              <div>{data.pressure} hPa</div>
            </div>
          </div>
        </div>

        {/* Hourly forecast if available */}
        {data.hourlyForecast && data.hourlyForecast.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 ff7-text">Next Few Hours</h3>
            <div className="grid grid-cols-3 gap-4">
              {data.hourlyForecast.map((hour, index) => (
                <div key={index} className="bg-white bg-opacity-30 p-3 rounded-lg text-center ff7-border">
                  <p className="font-medium">{hour.time}</p>
                  <p className="text-xl font-bold">{Math.round(hour.temp)}°C</p>
                  <p className="text-sm">{hour.windSpeed} m/s</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weather summary if available */}
        {data.summary && (
          <div className="mt-6 bg-black bg-opacity-40 p-4 rounded-lg ff7-border">
            <h3 className="text-lg font-semibold text-white mb-2 ff7-text ff7-teal">AI Weather Summary</h3>
            <p className="text-white">{data.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
