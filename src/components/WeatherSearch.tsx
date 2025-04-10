
import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  onSearch: (location: string) => void;
}

export default function WeatherSearch({ onSearch }: Props) {
  const [location, setLocation] = useState<string>("");
  const [useGeolocation, setUseGeolocation] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location);
    } else {
      toast({
        title: "Location required",
        description: "Please enter a location to search",
        variant: "destructive",
      });
    }
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      setUseGeolocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/geo/reverse`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              }),
            });
            
            const data = await response.json();
            if (data.city) {
              setLocation(data.city);
              onSearch(data.city);
              toast({
                title: "Location detected",
                description: `Found your location: ${data.city}`,
              });
            } else {
              throw new Error("Could not determine location");
            }
          } catch (error) {
            console.error("Error getting location:", error);
            toast({
              title: "Location error",
              description: "Could not determine your location",
              variant: "destructive",
            });
          } finally {
            setUseGeolocation(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setUseGeolocation(false);
          toast({
            title: "Geolocation error",
            description: error.message || "Failed to get your location",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Not supported",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search location or ask about weather..."
            className="w-full p-3 pl-10 border rounded-lg shadow-sm bg-white bg-opacity-90 ff7-border"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ff7-border"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleGeolocation}
          disabled={useGeolocation}
          className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 ff7-border"
          title="Use current location"
        >
          <MapPin size={24} className={useGeolocation ? "animate-pulse text-blue-500" : ""} />
        </button>
      </form>
    </div>
  );
}
