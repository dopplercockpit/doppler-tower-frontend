
import { useEffect, useRef, useState } from 'react';
import { Map, MapPin, Locate } from 'lucide-react';

interface Props {
  location: string | undefined;
}

export default function WeatherMap({ location }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location || !mapRef.current) return;
    
    async function loadMap() {
      setLoading(true);
      setError(null);
      
      try {
        // In a real implementation, you'd load a map using a service like Google Maps or OpenStreetMap
        // For now, we'll just display a placeholder with the location name
        
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if component is still mounted
        if (!mapRef.current) return;
        
        // Clear any previous content
        mapRef.current.innerHTML = '';
        
        // Add map placeholder
        const mapElement = document.createElement('div');
        mapElement.className = 'relative w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-300 to-blue-500';
        
        const locationLabel = document.createElement('div');
        locationLabel.className = 'absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow flex items-center';
        locationLabel.innerHTML = `
          <span class="mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></span>
          <span class="font-medium">${location}</span>
        `;
        
        const centerPin = document.createElement('div');
        centerPin.className = 'absolute transform -translate-x-1/2 -translate-y-1/2';
        centerPin.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#FF5252" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        `;
        
        const weatherOverlay = document.createElement('div');
        weatherOverlay.className = 'absolute top-0 left-0 w-full h-full pointer-events-none opacity-50';
        weatherOverlay.style.backgroundImage = 'url("https://openweathermap.org/img/wn/10d@2x.png")';
        weatherOverlay.style.backgroundRepeat = 'repeat';
        
        mapElement.appendChild(weatherOverlay);
        mapElement.appendChild(centerPin);
        mapElement.appendChild(locationLabel);
        mapRef.current.appendChild(mapElement);
      } catch (err) {
        console.error('Error loading map:', err);
        setError('Failed to load map');
      } finally {
        setLoading(false);
      }
    }
    
    loadMap();
  }, [location]);

  if (!location) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 ff7-text ff7-purple flex items-center">
        <Map className="mr-2" />
        Weather Map
      </h2>
      <div className="weather-map h-80 rounded-lg overflow-hidden ff7-border relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-100 z-10">
            <div className="text-red-500 text-center p-4">{error}</div>
          </div>
        )}
        <div ref={mapRef} className="w-full h-full">
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <Locate className="animate-pulse text-gray-400" size={48} />
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-500 text-center mt-2">
        Weather radar data © OpenWeatherMap
      </div>
    </div>
  );
}
