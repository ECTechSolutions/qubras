
import { useState } from "react";
import MatchesHeader from "@/features/matches/components/MatchesHeader";
import MatchesTabs from "@/features/matches/components/MatchesTabs";

const Matches = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container py-8">
      <MatchesHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <MatchesTabs searchQuery={searchQuery} />
    </div>
  );
};

export default Matches;
