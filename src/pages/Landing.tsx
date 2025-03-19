
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuroraBackground from "@/components/ui/aurora-background";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Hero } from "@/components/ui/animated-hero";
import { WorldMap } from "@/components/ui/world-map";
import DisplayCards from "@/components/ui/display-cards";

const Landing = () => {
  const navigate = useNavigate();
  
  const features = [
    "Smart partner matching algorithm",
    "Post and browse collaboration opportunities",
    "Real-time messaging with potential partners",
    "Campaign management tools",
    "Performance analytics dashboard"
  ];
  
  const defaultCards = [
    {
      icon: <Sparkles className="size-4 text-qubras-300" />,
      title: "Smart Matchmaking",
      description: "Find perfect co-marketing partners",
      date: "Powered by AI",
      iconClassName: "text-qubras-500",
      titleClassName: "text-qubras-500",
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Sparkles className="size-4 text-qubras-300" />,
      title: "Opportunity Board",
      description: "Browse collaboration listings",
      date: "Updated daily",
      iconClassName: "text-qubras-500",
      titleClassName: "text-qubras-500",
      className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Sparkles className="size-4 text-qubras-300" />,
      title: "Campaign Tools",
      description: "Track and manage your campaigns",
      date: "Real-time analytics",
      iconClassName: "text-qubras-500",
      titleClassName: "text-qubras-500",
      className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
    },
  ];
  
  return (
    <AuroraBackground>
      <div className="container px-4 md:px-6 flex flex-col min-h-screen">
        <header className="flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-qubras-500 to-qubras-700 flex items-center justify-center text-white font-semibold text-sm">
              Q
            </div>
            <span className="text-lg font-semibold">QUBRAS</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium link-hover">Features</a>
            <a href="#how-it-works" className="text-sm font-medium link-hover">How It Works</a>
            <a href="#testimonials" className="text-sm font-medium link-hover">Testimonials</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="hidden md:inline-flex"
              onClick={() => navigate("/auth")}
            >
              Sign In
            </Button>
            <Button 
              className="bg-qubras-600 hover:bg-qubras-700 hover-lift"
              onClick={() => navigate("/auth")}
            >
              Get Started
            </Button>
          </div>
        </header>
        
        <main className="flex-1 py-8 md:py-12">
          {/* Hero Section with Animated Hero Component */}
          <Hero />
          
          <section className="pt-8 md:pt-16 pb-12 md:pb-24 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 animate-fade-in">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center p-4 rounded-lg border bg-white/50 dark:bg-black/10 hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <CheckCircle2 className="h-5 w-5 mr-3 text-qubras-600" />
                  <p className="text-sm font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* World Map Component */}
          <section className="py-12 md:py-24 bg-white/30 dark:bg-black/20 rounded-xl backdrop-blur-sm">
            <div className="max-w-7xl mx-auto text-center mb-12">
              <p className="font-bold text-xl md:text-4xl dark:text-white text-black mb-4">
                Global <span className="text-qubras-600">Connectivity</span>
              </p>
              <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto">
                Connect with companies all around the world. QUBRAS makes it easy to find and collaborate with 
                partners regardless of location.
              </p>
            </div>
            <WorldMap
              dots={[
                {
                  start: { lat: 40.7128, lng: -74.006 }, // New York
                  end: { lat: 51.5074, lng: -0.1278 }, // London
                },
                {
                  start: { lat: 40.7128, lng: -74.006 }, // New York
                  end: { lat: 37.7749, lng: -122.4194 }, // San Francisco
                },
                {
                  start: { lat: 51.5074, lng: -0.1278 }, // London
                  end: { lat: 48.8566, lng: 2.3522 }, // Paris
                },
                {
                  start: { lat: 51.5074, lng: -0.1278 }, // London
                  end: { lat: 35.6762, lng: 139.6503 }, // Tokyo
                },
                {
                  start: { lat: 37.7749, lng: -122.4194 }, // San Francisco
                  end: { lat: -33.8688, lng: 151.2093 }, // Sydney
                },
              ]}
              lineColor="#6366f1"
            />
          </section>
          
          {/* Display Cards Component */}
          <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto text-center mb-12">
              <p className="font-bold text-xl md:text-4xl dark:text-white text-black mb-4">
                Platform <span className="text-qubras-600">Features</span>
              </p>
              <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto">
                Discover the powerful tools and features that make QUBRAS the ultimate co-marketing platform.
              </p>
            </div>
            <div className="flex min-h-[400px] w-full items-center justify-center">
              <div className="w-full max-w-3xl">
                <DisplayCards cards={defaultCards} />
              </div>
            </div>
          </section>
          
          <section id="how-it-works" className="py-12 md:py-24">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none bg-qubras-500/10 text-qubras-700">
                    How It Works
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Simple, Powerful Co-Marketing
                  </h2>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Our platform makes it easy to find partners, collaborate on campaigns, and track results.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="flex flex-col space-y-3 animate-fade-in-left" style={{ animationDelay: '0ms' }}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-qubras-100 dark:bg-qubras-900">
                    <span className="text-lg font-semibold text-qubras-700">1</span>
                  </div>
                  <h3 className="text-xl font-bold">Create Your Profile</h3>
                  <p className="text-muted-foreground">
                    Set up your company profile with details about your business, marketing goals, and target audience.
                  </p>
                </div>
                
                <div className="flex flex-col space-y-3 animate-fade-in-left" style={{ animationDelay: '100ms' }}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-qubras-100 dark:bg-qubras-900">
                    <span className="text-lg font-semibold text-qubras-700">2</span>
                  </div>
                  <h3 className="text-xl font-bold">Find Perfect Partners</h3>
                  <p className="text-muted-foreground">
                    Our smart algorithm matches you with compatible companies based on your goals and audience.
                  </p>
                </div>
                
                <div className="flex flex-col space-y-3 animate-fade-in-left" style={{ animationDelay: '200ms' }}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-qubras-100 dark:bg-qubras-900">
                    <span className="text-lg font-semibold text-qubras-700">3</span>
                  </div>
                  <h3 className="text-xl font-bold">Launch Campaigns</h3>
                  <p className="text-muted-foreground">
                    Collaborate with your partners through our tools and track the performance of your co-marketing efforts.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <footer className="border-t py-6">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-qubras-500 to-qubras-700 flex items-center justify-center text-white font-semibold text-sm">
                  Q
                </div>
                <span className="text-lg font-semibold">QUBRAS</span>
              </div>
              
              <p className="text-sm text-muted-foreground">
                © 2023 QUBRAS. All rights reserved.
              </p>
              
              <div className="flex items-center gap-4">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground link-hover">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground link-hover">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AuroraBackground>
  );
};

export default Landing;
