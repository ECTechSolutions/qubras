
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, Menu, Search, User } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface NavbarProps {
  onOpenSidebar: () => void;
}

const Navbar = ({ onOpenSidebar }: NavbarProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple clicks
    
    try {
      setIsLoggingOut(true);
      console.log("Starting logout process");
      
      await signOut();
      console.log("Logout successful, redirecting to landing page");
      
      // Force a full browser navigation to completely reset application state
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
      setIsLoggingOut(false); // Reset the loading state on error
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur-sm dark:bg-black/20 dark:border-slate-800">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="icon" onClick={onOpenSidebar}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
        
        <div className="hidden md:flex items-center gap-1 text-lg font-semibold text-qubras-700">
          QUBRAS
        </div>
        
        <div className="flex items-center flex-1 justify-end gap-4">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="rounded-full bg-background border border-input px-8 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-40 lg:w-64"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-qubras-500" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout} 
            title="Logout"
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <div className="h-5 w-5 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
            ) : (
              <LogOut className="h-5 w-5" />
            )}
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
