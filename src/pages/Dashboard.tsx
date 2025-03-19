
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { BarChart4, MessageSquare, Sparkles, TrendingUp, Users } from "lucide-react";
import MatchCard from "@/components/cards/MatchCard";

const Dashboard = () => {
  const { user } = useAuth();
  
  // Mock data for MVP
  const recentMatches = [
    {
      id: "match-1",
      name: "TechCorp",
      logo: "https://i.pravatar.cc/64?u=company1",
      industry: "Software",
      compatibility: 87,
      description: "TechCorp specializes in B2B software solutions with a focus on analytics and machine learning applications. Looking for partners to expand market reach."
    },
    {
      id: "match-2",
      name: "MarketBoom",
      logo: "https://i.pravatar.cc/64?u=company2",
      industry: "Digital Marketing",
      compatibility: 92,
      description: "Digital marketing agency with expertise in content creation, SEO, and social media management. Interested in software and tech partnerships."
    }
  ];
  
  const stats = [
    {
      title: "Total Matches",
      value: "24",
      description: "+4 new this week",
      icon: <Users className="h-4 w-4 text-qubras-600" />
    },
    {
      title: "Messages",
      value: "12",
      description: "5 unread messages",
      icon: <MessageSquare className="h-4 w-4 text-qubras-600" />
    },
    {
      title: "ROI",
      value: "32%",
      description: "+8% from last month",
      icon: <TrendingUp className="h-4 w-4 text-qubras-600" />
    }
  ];
  
  return (
    <div className="container py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name || "User"}</h1>
        <p className="text-muted-foreground">
          Here's an overview of your co-marketing activities
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-all animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-qubras-50 dark:bg-qubras-900/20 flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
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
            </div>
            
            <div>
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
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="messages" className="mt-6">
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
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
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
        </TabsContent>
      </Tabs>
      
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">
              Recommended Matches
            </h2>
            <p className="text-sm text-muted-foreground">
              Partners that align with your marketing goals
            </p>
          </div>
          <Button asChild>
            <Link to="/matches" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Find More Matches
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentMatches.map((match) => (
            <MatchCard 
              key={match.id} 
              company={match}
              onAccept={(id) => console.log("Accept", id)}
              onReject={(id) => console.log("Reject", id)}
              onMessage={(id) => console.log("Message", id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
