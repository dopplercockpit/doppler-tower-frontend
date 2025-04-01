
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
  // New fields
  sunrise?: number;
  sunset?: number;
  airQuality?: "Good" | "Moderate" | "Poor";
  minTemp?: number;
  maxTemp?: number;
  summary?: string;
  hourlyForecast?: {
    time: string;
    temp: number;
    description: string;
    windSpeed: number;
    icon?: string;
  }[];
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
    const now = Date.now() / 1000;
    
    // Generate different weather based on location
    let mockData: Partial<WeatherData> = {};
    
    if (location.toLowerCase().includes('london')) {
      mockData = {
        temperature: 15,
        description: "Overcast clouds",
        icon: "04d",
        humidity: 75,
        windSpeed: 4.2,
        pressure: 1010,
        feels_like: 14,
        condition: "cloudy",
        minTemp: 13,
        maxTemp: 17,
        airQuality: "Good",
        summary: "The weather in London is mild with overcast skies. It's a typical day with high humidity, so it might feel a bit damp. Good conditions for indoor activities or a visit to museums.",
      };
    } else if (location.toLowerCase().includes('jakarta')) {
      mockData = {
        temperature: 28.3,
        description: "Scattered clouds",
        icon: "03d",
        humidity: 77,
        windSpeed: 2.5,
        pressure: 1008,
        feels_like: 32.3,
        condition: "cloudy",
        minTemp: 27.8,
        maxTemp: 28.5,
        airQuality: "Moderate",
        summary: "The weather in Jakarta is warm and pleasant, with a temperature of 28.3°C that feels like 32.3°C due to humidity. Scattered clouds are present, with no severe weather alerts in effect.",
      };
    } else if (location.toLowerCase().includes('milwaukee')) {
      mockData = {
        temperature: 5,
        description: "Wind advisory",
        icon: "50d",
        humidity: 45,
        windSpeed: 9.8,
        pressure: 998,
        feels_like: 1,
        condition: "stormy",
        minTemp: 3,
        maxTemp: 7,
        airQuality: "Good",
        summary: "Severe Weather Alert for Milwaukee: Wind Advisory issued with north winds 20 to 30 mph with gusts up to 45 to 50 mph. Expect potential impacts including blown tree limbs and possible power outages.",
      };
    } else if (location.toLowerCase().includes('lyon')) {
      mockData = {
        temperature: 4.0,
        description: "Overcast clouds",
        icon: "04d",
        humidity: 84,
        windSpeed: 5,
        pressure: 1012,
        feels_like: 2.1,
        condition: "cloudy",
        minTemp: 3.1,
        maxTemp: 4.7,
        airQuality: "Good",
        summary: "The weather in Lyon is cool with overcast skies. The temperature will gradually decrease over the next few hours, but it remains within a mild range. The wind speed is steady, and there are no indications of severe weather conditions.",
      };
    } else {
      mockData = {
        temperature: 22,
        description: "Clear sky",
        icon: "01d",
        humidity: 60,
        windSpeed: 5.2,
        pressure: 1012,
        feels_like: 23,
        condition: "sunny",
        minTemp: 18,
        maxTemp: 25,
        airQuality: "Good",
        summary: "Beautiful day with clear skies. Perfect weather for outdoor activities. The temperature is comfortable and the air quality is good.",
      };
    }
    
    // Add hourly forecast
    const hourlyForecast = [];
    for (let i = 0; i < 3; i++) {
      const hour = new Date();
      hour.setHours(hour.getHours() + i + 1);
      const timeString = hour.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      
      let tempDelta = Math.random() * 2 - 1; // Random temp change between -1 and +1
      let windDelta = Math.random() * 2 - 0.5; // Random wind change
      
      hourlyForecast.push({
        time: timeString,
        temp: Math.round((mockData.temperature as number + tempDelta) * 10) / 10,
        description: mockData.description,
        windSpeed: Math.round((mockData.windSpeed as number + windDelta) * 10) / 10
      });
    }
    
    return {
      location,
      ...mockData as WeatherData,
      timezone: 0,
      dt: now,
      sunrise: now - 10000, // Sunrise time (a few hours ago)
      sunset: now + 30000,  // Sunset time (a few hours from now)
      hourlyForecast
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
    
    // Create location-specific forecast data
    let conditions: any[] = [];
    let descriptions: string[] = [];
    
    if (location.toLowerCase().includes('milwaukee')) {
      conditions = ["stormy", "stormy", "cloudy", "cloudy", "rainy"];
      descriptions = ["Wind advisory", "Wind advisory", "Cloudy", "Partly cloudy", "Light rain"];
    } else if (location.toLowerCase().includes('jakarta')) {
      conditions = ["cloudy", "rainy", "rainy", "cloudy", "cloudy"];
      descriptions = ["Scattered clouds", "Moderate rain", "Moderate rain", "Few clouds", "Scattered clouds"];
    } else if (location.toLowerCase().includes('lyon')) {
      conditions = ["cloudy", "cloudy", "cloudy", "cloudy", "rainy"];
      descriptions = ["Overcast clouds", "Overcast clouds", "Broken clouds", "Scattered clouds", "Light rain"];
    } else {
      // Default/random conditions
      conditions = ["sunny", "cloudy", "rainy", "cloudy", "sunny"];
      descriptions = ["Clear sky", "Partly cloudy", "Light rain", "Scattered clouds", "Clear sky"];
    }
    
    return Array(5).fill(null).map((_, index) => {
      const date = new Date();
      date.setDate(today.getDate() + index + 1);
      
      const condition = conditions[index];
      
      // Create icons based on condition
      let icon = "01d"; // default sunny
      if (condition === "cloudy") icon = "03d";
      if (condition === "rainy") icon = "10d";
      if (condition === "stormy") icon = "11d";
      if (condition === "snowy") icon = "13d";
      
      return {
        date: date.toLocaleDateString(),
        day: days[date.getDay()],
        temperature: {
          min: 15 + Math.floor(Math.random() * 5),
          max: 20 + Math.floor(Math.random() * 10)
        },
        description: descriptions[index],
        icon: icon,
        condition: condition as any
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
