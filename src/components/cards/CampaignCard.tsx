
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Users } from "lucide-react";

interface CampaignCardProps {
  campaign: {
    id: string;
    title: string;
    status: "active" | "completed" | "planned";
    partners: {
      name: string;
      logo: string;
    }[];
    progress: number;
    startDate: string;
    endDate: string;
    daysLeft?: number;
  };
  onClick?: (id: string) => void;
}

const CampaignCard = ({ campaign, onClick }: CampaignCardProps) => {
  const statusColors = {
    active: "bg-green-500",
    completed: "bg-slate-500",
    planned: "bg-qubras-500",
  };
  
  const statusLabels = {
    active: "Active",
    completed: "Completed",
    planned: "Planned",
  };
  
  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer h-full flex flex-col"
      onClick={() => onClick?.(campaign.id)}
    >
      <div className="h-1.5 w-full bg-slate-100">
        <div 
          className={statusColors[campaign.status]}
          style={{ width: `${campaign.progress}%` }}
        />
      </div>
      
      <CardContent className="p-6 flex-1">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-lg font-medium line-clamp-2">{campaign.title}</h3>
          <Badge 
            variant="secondary" 
            className={`${campaign.status === 'active' ? 'bg-green-100 text-green-700' : campaign.status === 'completed' ? 'bg-slate-100 text-slate-700' : 'bg-qubras-100 text-qubras-700'}`}
          >
            {statusLabels[campaign.status]}
          </Badge>
        </div>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{campaign.startDate}</span>
          </div>
          
          {campaign.daysLeft !== undefined && campaign.status !== 'completed' && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{campaign.daysLeft} days left</span>
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5 text-sm">
            <span>Progress</span>
            <span>{campaign.progress}%</span>
          </div>
          <Progress value={campaign.progress} className="h-2" />
        </div>
        
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Partners</span>
          </div>
          <div className="flex -space-x-2">
            {campaign.partners.map((partner, index) => (
              <div 
                key={index} 
                className="h-8 w-8 rounded-full border-2 border-background overflow-hidden bg-muted"
              >
                <img 
                  src={partner.logo || "https://via.placeholder.com/32"} 
                  alt={partner.name} 
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignCard;
