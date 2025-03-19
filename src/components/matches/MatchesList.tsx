
import MatchCard from "@/components/cards/MatchCard";
import { toast } from "@/components/ui/use-toast";

interface MatchesListProps {
  filter: "all" | "pending" | "connected";
  searchQuery: string;
}

const MatchesList = ({ filter, searchQuery }: MatchesListProps) => {
  // Mock data for MVP - in a real application, this would come from an API
  const allMatches = [
    {
      id: "match-1",
      name: "TechCorp",
      logo: "https://i.pravatar.cc/64?u=company1",
      industry: "Software",
      compatibility: 87,
      status: "pending",
      description: "TechCorp specializes in B2B software solutions with a focus on analytics and machine learning applications. Looking for partners to expand market reach."
    },
    {
      id: "match-2",
      name: "MarketBoom",
      logo: "https://i.pravatar.cc/64?u=company2",
      industry: "Digital Marketing",
      compatibility: 92,
      status: "connected",
      description: "Digital marketing agency with expertise in content creation, SEO, and social media management. Interested in software and tech partnerships."
    },
    {
      id: "match-3",
      name: "DesignHub",
      logo: "https://i.pravatar.cc/64?u=company3",
      industry: "Design",
      compatibility: 78,
      status: "pending",
      description: "Award-winning design studio specializing in UI/UX design, branding, and digital experiences. Looking to partner with tech companies for joint projects."
    },
    {
      id: "match-4",
      name: "EcoSolutions",
      logo: "https://i.pravatar.cc/64?u=company4",
      industry: "Sustainability",
      compatibility: 83,
      status: "pending",
      description: "Eco-friendly product company looking to partner with marketing agencies to promote sustainable lifestyles and products to a wider audience."
    },
    {
      id: "match-5",
      name: "FinTechGrow",
      logo: "https://i.pravatar.cc/64?u=company5",
      industry: "Financial Technology",
      compatibility: 75,
      status: "connected",
      description: "Financial technology startup providing innovative payment solutions. Seeking partnerships with complementary businesses to create integrated offerings."
    }
  ];

  // Filter matches based on the selected tab
  const filteredMatches = allMatches.filter(match => {
    if (filter !== "all" && match.status !== filter) return false;
    
    // Apply search query filter if it exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        match.name.toLowerCase().includes(query) ||
        match.industry.toLowerCase().includes(query) ||
        match.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const handleAccept = (id: string) => {
    toast({
      title: "Connection request sent",
      description: "You've sent a connection request to this company",
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: "Match rejected",
      description: "This company will no longer appear in your matches",
    });
  };

  const handleMessage = (id: string) => {
    toast({
      title: "Message center opened",
      description: "Start a conversation with this company",
    });
  };

  if (filteredMatches.length === 0) {
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
      {filteredMatches.map((match) => (
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
