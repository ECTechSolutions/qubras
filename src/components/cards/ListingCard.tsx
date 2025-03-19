
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

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
  };
  onContact?: (id: string) => void;
  onView?: (id: string) => void;
}

const ListingCard = ({ listing, onContact, onView }: ListingCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col">
      <CardContent className="p-6 pb-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge variant="secondary" className="mb-2">
              {listing.budget}
            </Badge>
            <h3 className="text-lg font-medium line-clamp-1">{listing.title}</h3>
          </div>
          
          <div className="h-10 w-10 rounded bg-muted flex-shrink-0 overflow-hidden">
            <img 
              src={listing.companyLogo || "https://via.placeholder.com/40"} 
              alt={listing.company} 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-1 mt-2 mb-3">
          <span className="text-sm text-muted-foreground">{listing.company}</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground" />
          <span className="text-sm text-muted-foreground">{listing.duration}</span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {listing.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {listing.categories.map((category, index) => (
            <Badge key={index} variant="outline" className="bg-secondary/50">
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
