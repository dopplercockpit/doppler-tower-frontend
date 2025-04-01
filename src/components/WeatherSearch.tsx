
import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface WeatherSearchProps {
  onSearch: (location: string) => void;
  isLoading: boolean;
}

const WeatherSearch = ({ onSearch, isLoading }: WeatherSearchProps) => {
  const [location, setLocation] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
      <Input
        type="text"
        placeholder="Enter city name..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading || !location.trim()}>
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <Search className="h-5 w-5" />
        )}
      </Button>
    </form>
  );
};

export default WeatherSearch;
