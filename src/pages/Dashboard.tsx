
import { useAuth } from "@/context/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import DashboardMessages from "@/components/dashboard/DashboardMessages";
import DashboardAnalytics from "@/components/dashboard/DashboardAnalytics";
import RecommendedMatches from "@/components/dashboard/RecommendedMatches";

const Dashboard = () => {
  const { profile } = useAuth();
  
  return (
    <div className="container py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {profile?.name || "User"}</h1>
        <p className="text-muted-foreground">
          Here's an overview of your co-marketing activities
        </p>
      </header>
      
      <DashboardStats />
      
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <DashboardOverview />
        </TabsContent>
        
        <TabsContent value="messages" className="mt-6">
          <DashboardMessages />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <DashboardAnalytics />
        </TabsContent>
      </Tabs>
      
      <RecommendedMatches />
    </div>
  );
};

export default Dashboard;
