
import MatchCard from "@/components/cards/MatchCard";
import { Match, MatchFilter } from "../types";
import { useMatches } from "../hooks/useMatches";
import { useMatchActions } from "../hooks/useMatchActions";

interface MatchesListProps {
  filter: MatchFilter;
  searchQuery: string;
}

const MatchesList = ({ filter, searchQuery }: MatchesListProps) => {
  const { matches } = useMatches(searchQuery, filter);
  const { handleAccept, handleReject, handleMessage } = useMatchActions();

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground mb-2">No matches found</p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search criteria or explore more companies
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {matches.map((match) => (
        <MatchCard 
          key={match.id} 
          company={match}
          onAccept={handleAccept}
          onReject={handleReject}
          onMessage={handleMessage}
        />
      ))}
    </div>
  );
};

export default MatchesList;
