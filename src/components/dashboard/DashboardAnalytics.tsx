
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardAnalytics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>Performance metrics for your partnerships</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
          <p className="text-muted-foreground text-sm">Analytics visualization</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardAnalytics;
