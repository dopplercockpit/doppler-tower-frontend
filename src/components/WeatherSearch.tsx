
import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle } from "lucide-react";

interface WeatherSearchProps {
  onSearch: (location: string) => void;
  isLoading: boolean;
}

const WeatherSearch = ({ onSearch, isLoading }: WeatherSearchProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="backdrop-blur-sm bg-black bg-opacity-30 p-4 rounded-lg cyberpunk-border">
      <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
        <div className="relative flex-1">
          <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Ask about the weather in any location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 bg-black bg-opacity-50 text-white border-gray-600 focus:border-cyan-400 focus:ring-cyan-400"
          />
        </div>
        <Button 
          type="submit" 
          disabled={isLoading || !query.trim()}
          className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white"
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default WeatherSearch;
