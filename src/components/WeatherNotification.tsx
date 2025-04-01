
import { AlertTriangle, Info, Bell, AlertCircle } from "lucide-react";
import { NotificationData } from "../utils/weatherUtils";

interface WeatherNotificationProps {
  notifications: NotificationData[];
}

const WeatherNotification = ({ notifications }: WeatherNotificationProps) => {
  if (!notifications.length) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Weather Alerts</h2>
      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`notification-card ${notification.type}-bg fade-in`}
          >
            <div className="flex items-start">
              {notification.type === "warning" ? (
                <AlertTriangle className="mr-2 h-5 w-5 flex-shrink-0 text-yellow-700" />
              ) : notification.type === "alert" ? (
                <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0 text-red-700" />
              ) : (
                <Info className="mr-2 h-5 w-5 flex-shrink-0 text-blue-700" />
              )}
              <div>
                <div className="flex items-center mb-1">
                  {notification.location && (
                    <span className="text-sm font-bold mr-2">
                      {notification.location && `Weather Change Alert for ${notification.location}:`}
                    </span>
                  )}
                </div>
                <p className="text-lg">{notification.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherNotification;
