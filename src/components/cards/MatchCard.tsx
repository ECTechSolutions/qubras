
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, MessageSquare, X } from "lucide-react";

interface MatchCardProps {
  company: {
    id: string;
    name: string;
    logo: string;
    industry: string;
    compatibility: number;
    description: string;
  };
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onMessage?: (id: string) => void;
}

const MatchCard = ({ company, onAccept, onReject, onMessage }: MatchCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="aspect-[4/1] relative">
        <div className="absolute inset-0 bg-gradient-to-r from-qubras-500/20 to-qubras-700/30" />
      </div>
      
      <CardContent className="p-6 pb-0 -mt-6 relative">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full bg-white border-4 border-white shadow-sm overflow-hidden">
            <img 
              src={company.logo || "https://via.placeholder.com/64"} 
              alt={company.name} 
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium truncate">{company.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground gap-2">
              <span>{company.industry}</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span>Match: {company.compatibility}%</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Marketing goals compatibility</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        
        <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
          {company.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-6 flex gap-2 justify-end">
        {onReject && (
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full" 
            onClick={() => onReject(company.id)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Reject</span>
          </Button>
        )}
        
        {onMessage && (
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full" 
            onClick={() => onMessage(company.id)}
          >
            <MessageSquare className="h-4 w-4" />
            <span className="sr-only">Message</span>
          </Button>
        )}
        
        {onAccept && (
          <Button 
            variant="default" 
            size="icon" 
            className="rounded-full bg-qubras-600 hover:bg-qubras-700" 
            onClick={() => onAccept(company.id)}
          >
            <Check className="h-4 w-4" />
            <span className="sr-only">Accept</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MatchCard;
