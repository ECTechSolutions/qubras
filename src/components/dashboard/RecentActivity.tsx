
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart4 } from "lucide-react";

const RecentActivity = () => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent co-marketing activities</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <BarChart4 className="h-4 w-4" />
          View Report
        </Button>
      </CardHeader>
      <CardContent>
        {/* Chart would go here */}
        <div className="h-[280px] flex items-center justify-center bg-muted/30 rounded-md">
          <p className="text-muted-foreground text-sm">Activity chart visualization</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
