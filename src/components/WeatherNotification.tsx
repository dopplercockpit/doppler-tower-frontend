
import { AlertTriangle, Info } from "lucide-react";
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
      <h2 className="text-2xl font-bold mb-4">Weather Alerts</h2>
      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`notification-card ${notification.condition}-bg fade-in`}
          >
            <div className="flex items-start">
              {notification.type === "warning" || notification.type === "alert" ? (
                <AlertTriangle className="mr-2 h-5 w-5 flex-shrink-0" />
              ) : (
                <Info className="mr-2 h-5 w-5 flex-shrink-0" />
              )}
              <div>
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
