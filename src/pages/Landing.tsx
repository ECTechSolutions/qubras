
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuroraBackground from "@/components/ui/aurora-background";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  
  const features = [
    "Smart partner matching algorithm",
    "Post and browse collaboration opportunities",
    "Real-time messaging with potential partners",
    "Campaign management tools",
    "Performance analytics dashboard"
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
          <section className="flex flex-col justify-center items-center text-center pt-8 md:pt-16 pb-12 md:pb-24 space-y-8">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none bg-qubras-500/10 text-qubras-700 mb-4">
              Introducing QUBRAS
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter md:leading-tight max-w-3xl animate-fade-in">
              Find Your Perfect <span className="text-qubras-600">Co-marketing</span> Partners
            </h1>
            
            <p className="text-muted-foreground md:text-xl max-w-2xl mx-auto animate-fade-in">
              QUBRAS connects companies for powerful co-marketing campaigns through smart matchmaking, clear communication, and effective collaboration tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Button 
                size="lg" 
                className="bg-qubras-600 hover:bg-qubras-700 hover-lift"
                onClick={() => navigate("/auth")}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/auth")}
              >
                Take a Tour
              </Button>
            </div>
            
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
