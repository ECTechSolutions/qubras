
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchesList from "@/components/matches/MatchesList";
import MatchFilters from "@/components/matches/MatchFilters";
import { Search } from "lucide-react";

const Matches = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Perfect Match</h1>
        <p className="text-muted-foreground">
          Discover companies that align with your marketing goals
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
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

      <Tabs defaultValue="all" className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="all">All Matches</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="connected">Connected</TabsTrigger>
          </TabsList>
          <MatchFilters />
        </div>

        <TabsContent value="all" className="mt-6">
          <MatchesList filter="all" searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="pending" className="mt-6">
          <MatchesList filter="pending" searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="connected" className="mt-6">
          <MatchesList filter="connected" searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Matches;
