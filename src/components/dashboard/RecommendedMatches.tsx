
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MatchCard from "@/components/cards/MatchCard";
import { Sparkles } from "lucide-react";

const RecommendedMatches = () => {
  // Mock data for MVP
  const recentMatches = [
    {
      id: "match-1",
      name: "TechCorp",
      logo: "https://i.pravatar.cc/64?u=company1",
      industry: "Software",
      compatibility: 87,
      description: "TechCorp specializes in B2B software solutions with a focus on analytics and machine learning applications. Looking for partners to expand market reach."
    },
    {
      id: "match-2",
      name: "MarketBoom",
      logo: "https://i.pravatar.cc/64?u=company2",
      industry: "Digital Marketing",
      compatibility: 92,
      description: "Digital marketing agency with expertise in content creation, SEO, and social media management. Interested in software and tech partnerships."
    }
  ];

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">
            Recommended Matches
          </h2>
          <p className="text-sm text-muted-foreground">
            Partners that align with your marketing goals
          </p>
        </div>
        <Button asChild>
          <Link to="/matches" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Find More Matches
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recentMatches.map((match) => (
          <MatchCard 
            key={match.id} 
            company={match}
            onAccept={(id) => console.log("Accept", id)}
            onReject={(id) => console.log("Reject", id)}
            onMessage={(id) => console.log("Message", id)}
          />
        ))}
      </div>
    </section>
  );
};

export default RecommendedMatches;
