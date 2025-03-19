
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const UpcomingTasks = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Upcoming Tasks</CardTitle>
        <CardDescription>Tasks requiring your attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-3 rounded-md bg-secondary/50">
            <div className="h-2 w-2 mt-1.5 rounded-full bg-qubras-600" />
            <div>
              <p className="text-sm font-medium">Review partnership proposal</p>
              <p className="text-xs text-muted-foreground mt-1">Due in 2 days</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-3 rounded-md bg-secondary/50">
            <div className="h-2 w-2 mt-1.5 rounded-full bg-qubras-600" />
            <div>
              <p className="text-sm font-medium">Schedule meeting with MarketBoom</p>
              <p className="text-xs text-muted-foreground mt-1">Due tomorrow</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-3 rounded-md bg-secondary/50">
            <div className="h-2 w-2 mt-1.5 rounded-full bg-qubras-600" />
            <div>
              <p className="text-sm font-medium">Prepare content assets</p>
              <p className="text-xs text-muted-foreground mt-1">Due in 5 days</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingTasks;
