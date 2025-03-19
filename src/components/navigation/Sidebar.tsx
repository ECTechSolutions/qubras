
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Calendar, 
  ChevronLeft, 
  Home, 
  LayoutDashboard, 
  MessageSquare, 
  PieChart, 
  Settings, 
  Users,
  X 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const location = useLocation();
  
  const links = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "Matches", href: "/matches", icon: <Users className="h-5 w-5" /> },
    { name: "Listings", href: "/listings", icon: <Home className="h-5 w-5" /> },
    { name: "Messages", href: "/messages", icon: <MessageSquare className="h-5 w-5" /> },
    { name: "Campaigns", href: "/campaigns", icon: <Calendar className="h-5 w-5" /> },
    { name: "Analytics", href: "/analytics", icon: <PieChart className="h-5 w-5" /> },
    { name: "Profile", href: "/profile", icon: <Settings className="h-5 w-5" /> },
  ];
  
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-qubras-500 to-qubras-700 flex items-center justify-center text-white font-semibold text-sm">
              Q
            </div>
            <span className="text-lg font-semibold">QUBRAS</span>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100vh-4rem)] py-4">
          <div className="space-y-1 px-3">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-qubras-50 text-qubras-700 dark:bg-qubras-900/20 dark:text-qubras-500"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="px-3 py-4 mt-8">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2" 
              size="sm"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Collapse</span>
            </Button>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default Sidebar;
