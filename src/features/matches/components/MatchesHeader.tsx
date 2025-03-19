
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface MatchesHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const MatchesHeader = ({ searchQuery, setSearchQuery }: MatchesHeaderProps) => {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold mb-2">Find Your Perfect Match</h1>
      <p className="text-muted-foreground">
        Discover companies that align with your marketing goals
      </p>

      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search companies by name, industry or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button>Advanced Search</Button>
      </div>
    </header>
  );
};

export default MatchesHeader;
