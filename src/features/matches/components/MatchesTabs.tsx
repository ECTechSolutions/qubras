
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchesList from "./MatchesList";
import MatchFilters from "@/components/matches/MatchFilters";
import { MatchFilter } from "../types";

interface MatchesTabsProps {
  searchQuery: string;
}

const MatchesTabs = ({ searchQuery }: MatchesTabsProps) => {
  return (
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
  );
};

export default MatchesTabs;
