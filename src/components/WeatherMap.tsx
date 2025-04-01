
import React from "react";

interface WeatherMapProps {
  location: string;
}

const WeatherMap = ({ location }: WeatherMapProps) => {
  return (
    <div className="weather-map ff7-card p-2">
      <div className="relative">
        <img 
          src="/lovable-uploads/ef8b97c7-cc69-4c39-b0dc-9dcfd753fcfd.png" 
          alt={`Weather Map for ${location}`} 
          className="w-full h-auto rounded-lg"
        />
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white p-2 rounded-br-lg rounded-tl-lg backdrop-blur-sm">
          <div className="flex items-center">
            <span className="font-bold">Weather for {location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherMap;
