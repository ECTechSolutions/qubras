
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../navigation/Navbar";
import Sidebar from "../navigation/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);
  
  // Don't show sidebar on landing page
  const isLandingPage = location.pathname === "/";
  
  return (
    <div className="flex min-h-screen">
      {!isLandingPage && (
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
      <div className="flex flex-col flex-1 w-full">
        {!isLandingPage && (
          <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
        )}
        <main className="flex-1 transition-all duration-300 ease-in-out">
          <div className="page-transition">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
