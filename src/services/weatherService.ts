
// Weather API integration (using OpenWeatherMap as an example)
// You'll need to replace 'YOUR_API_KEY' with your actual API key
const API_KEY = "YOUR_API_KEY";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  feels_like: number;
  condition: "sunny" | "cloudy" | "rainy" | "snowy" | "stormy";
  timezone: number;
  dt: number;
}

export interface ForecastData {
  date: string;
  day: string;
  temperature: {
    min: number;
    max: number;
  };
  description: string;
  icon: string;
  condition: "sunny" | "cloudy" | "rainy" | "snowy" | "stormy";
}

// Function to get weather condition class based on weather code
export const getWeatherCondition = (weatherId: number): "sunny" | "cloudy" | "rainy" | "snowy" | "stormy" => {
  if (weatherId >= 200 && weatherId < 300) return "stormy";
  if (weatherId >= 300 && weatherId < 600) return "rainy";
  if (weatherId >= 600 && weatherId < 700) return "snowy";
  if (weatherId >= 700 && weatherId < 800) return "cloudy";
  if (weatherId === 800) return "sunny";
  if (weatherId > 800) return "cloudy";
  return "sunny"; // Default
};

export const getCurrentWeather = async (location: string): Promise<WeatherData> => {
  try {
    // For demo purposes, let's simulate API call with mock data
    // In a real app, you would use:
    // const response = await fetch(`${BASE_URL}/weather?q=${location}&appid=${API_KEY}&units=metric`);
    
    // Mock data - replace with actual API call in production
    const weatherId = 800; // Clear sky (as an example)
    
    return {
      location,
      temperature: 22,
      description: "Clear sky",
      icon: "01d",
      humidity: 60,
      windSpeed: 5.2,
      pressure: 1012,
      feels_like: 23,
      condition: getWeatherCondition(weatherId),
      timezone: 0,
      dt: Date.now() / 1000
    };
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw error;
  }
};

export const getForecast = async (location: string): Promise<ForecastData[]> => {
  try {
    // For demo purposes, use mock data
    // In a real app, you would use:
    // const response = await fetch(`${BASE_URL}/forecast?q=${location}&appid=${API_KEY}&units=metric`);
    
    // Mock forecast data for next 5 days
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    
    return Array(5).fill(null).map((_, index) => {
      const date = new Date();
      date.setDate(today.getDate() + index + 1);
      
      // Randomize forecast conditions
      const conditions = ["sunny", "cloudy", "rainy"] as const;
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      
      return {
        date: date.toLocaleDateString(),
        day: days[date.getDay()],
        temperature: {
          min: 15 + Math.floor(Math.random() * 5),
          max: 20 + Math.floor(Math.random() * 10)
        },
        description: randomCondition === "sunny" ? "Clear sky" : 
                     randomCondition === "cloudy" ? "Partly cloudy" : "Light rain",
        icon: randomCondition === "sunny" ? "01d" : 
              randomCondition === "cloudy" ? "03d" : "10d",
        condition: randomCondition
      };
    });
  } catch (error) {
    console.error("Error fetching forecast:", error);
    throw error;
  }
};

// Get weather icon URL from OpenWeatherMap
export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
