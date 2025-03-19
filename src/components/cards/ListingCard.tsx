
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MessageSquare, MapPin, Users, Calendar, Building } from "lucide-react";

interface ListingCardProps {
  listing: {
    id: string;
    title: string;
    company: string;
    companyLogo: string;
    description: string;
    budget: string;
    duration: string;
    categories: string[];
    postedAt: string;
    partnership_type: string;
    location?: string;
    target_audience?: string;
    business_type?: string;
  };
  onContact?: (id: string) => void;
  onView?: (id: string) => void;
}

const ListingCard = ({ listing, onContact, onView }: ListingCardProps) => {
  const isOffering = listing.partnership_type === "offering";
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col">
      <div className={`px-4 py-2 text-white text-sm font-medium ${isOffering ? 'bg-emerald-600' : 'bg-blue-600'}`}>
        {isOffering ? 'Offering Partnership' : 'Seeking Partnership'}
      </div>
      
      <CardContent className="p-6 pb-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold line-clamp-2 mb-2">{listing.title}</h3>
            <div className="flex items-center gap-1 mb-3">
              <span className="text-sm text-muted-foreground font-medium">{listing.company}</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              <Badge variant="outline" className="bg-secondary/30 text-xs">
                {listing.budget}
              </Badge>
            </div>
          </div>
          
          <div className="h-12 w-12 rounded-full bg-muted flex-shrink-0 overflow-hidden border">
            <img 
              src={listing.companyLogo || "https://via.placeholder.com/48"} 
              alt={listing.company} 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {listing.description}
        </p>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
          {listing.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-xs text-muted-foreground">{listing.location}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-xs text-muted-foreground">{listing.duration}</span>
          </div>
          
          {listing.target_audience && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-xs text-muted-foreground line-clamp-1">{listing.target_audience}</span>
            </div>
          )}
          
          {listing.business_type && (
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-gray-500" />
              <span className="text-xs text-muted-foreground">{listing.business_type}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {listing.categories.map((category, index) => (
            <Badge key={index} variant="outline" className="bg-secondary/50 text-xs">
              {category}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-6 flex gap-2 justify-between border-t mt-4">
        <span className="text-xs text-muted-foreground">
          Posted {listing.postedAt}
        </span>
        
        <div className="flex gap-2">
          {onView && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onView(listing.id)}
            >
              View Details
            </Button>
          )}
          
          {onContact && (
            <Button 
              variant="default" 
              size="sm" 
              className="gap-1 bg-qubras-600 hover:bg-qubras-700"
              onClick={() => onContact(listing.id)}
            >
              <MessageSquare className="h-4 w-4" />
              Contact
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ListingCard;
