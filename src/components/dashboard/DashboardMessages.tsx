
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardMessages = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Messages</CardTitle>
        <CardDescription>Your latest conversations with partners</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-md hover:bg-secondary/50 transition-colors">
            <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src="https://i.pravatar.cc/40?u=company1" 
                alt="TechCorp" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4 className="font-medium">TechCorp</h4>
                <span className="text-xs text-muted-foreground">2h ago</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                Hey, I've reviewed the partnership proposal and have a few suggestions...
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-md hover:bg-secondary/50 transition-colors">
            <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src="https://i.pravatar.cc/40?u=company2" 
                alt="MarketBoom" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4 className="font-medium">MarketBoom</h4>
                <span className="text-xs text-muted-foreground">1d ago</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                The partnership was a success! Let's schedule a call to discuss the next steps...
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardMessages;
