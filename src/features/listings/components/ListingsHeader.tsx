
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

interface ListingsHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onCreateClick: () => void;
}

const ListingsHeader = ({ searchQuery, setSearchQuery, onCreateClick }: ListingsHeaderProps) => {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Co-Marketing Listings</h1>
        <p className="text-muted-foreground">
          Discover opportunities or create your own listing to find partners
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search listings by title, description or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button 
          onClick={() => {
            console.log("Create button clicked in header");
            onCreateClick();
          }} 
          className="gap-1 bg-qubras-600 hover:bg-qubras-700"
        >
          <Plus className="h-4 w-4" />
          Create Listing
        </Button>
      </div>
    </>
  );
};

export default ListingsHeader;
