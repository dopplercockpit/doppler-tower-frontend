
import { useEffect, useState } from 'react';
import { AlertTriangle, Info, Bell } from 'lucide-react';
import { ForecastData } from '@/services/weatherService';
import { generateWeatherNotifications, NotificationData } from '@/utils/weatherUtils';
import { useToast } from '@/hooks/use-toast';

interface Props {
  data: ForecastData[];
}

export default function WeatherNotification({ data }: Props) {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (data && data.length > 0) {
      // Simulate current weather data from the first forecast item
      const currentWeather = {
        location: "Current Location",
        temperature: (data[0].temperature.max + data[0].temperature.min) / 2,
        description: data[0].description,
        icon: data[0].icon,
        humidity: 70, // Mock value
        windSpeed: 5, // Mock value
        pressure: 1015, // Mock value
        feels_like: (data[0].temperature.max + data[0].temperature.min) / 2, // Mock value
        condition: data[0].condition,
        timezone: 0,
        dt: Date.now() / 1000
      };

      const newNotifications = generateWeatherNotifications(currentWeather, data);
      setNotifications(newNotifications);
      
      // Show toast for important notifications
      newNotifications.forEach(notification => {
        if (notification.type === 'alert' || notification.type === 'warning') {
          toast({
            title: `Weather ${notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}`,
            description: notification.message,
            variant: notification.type === 'alert' ? 'destructive' : 'default',
          });
        }
      });
    }
  }, [data, toast]);

  if (notifications.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 ff7-text ff7-purple flex items-center">
        <Bell className="mr-2" />
        Weather Notifications
      </h2>
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <div 
            key={index} 
            className={`notification-card ${notification.type}-bg`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                {notification.type === 'alert' ? (
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                ) : notification.type === 'warning' ? (
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                ) : (
                  <Info className="h-6 w-6 text-blue-600" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-1">
                  {notification.location ? `${notification.location} Alert` : 'Weather Alert'}
                </h3>
                <p>{notification.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
