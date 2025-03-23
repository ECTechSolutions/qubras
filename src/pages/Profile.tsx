
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import ProfileLoading from "@/components/profile/ProfileLoading";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const Profile = () => {
  const { profile, user, loading, error, refreshProfile } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [manualRetryAttempted, setManualRetryAttempted] = useState(false);

  // Attempt to refresh the profile if it's not available with automatic retries
  useEffect(() => {
    if (user && !profile && !loading && retryCount < 5) {
      console.log(`Profile page: Profile not available, attempting auto-refresh (attempt ${retryCount + 1})`);
      setIsRefreshing(true);
      
      // Add short delay between retries
      const timeoutId = setTimeout(() => {
        refreshProfile()
          .then(profileResult => {
            console.log("Profile refresh result:", profileResult ? "success" : "failed");
            if (!profileResult) {
              setRetryCount(prev => prev + 1);
            }
          })
          .catch(err => {
            console.error("Error refreshing profile:", err);
            toast.error("Could not load your profile");
            setRetryCount(prev => prev + 1);
          })
          .finally(() => {
            setIsRefreshing(false);
          });
      }, retryCount * 500); // Increasing delay between retries
      
      return () => clearTimeout(timeoutId);
    }
  }, [user, profile, loading, refreshProfile, retryCount]);

  // Force one final attempt when auto-retries are exhausted
  useEffect(() => {
    if (retryCount === 5 && !manualRetryAttempted && user && !profile) {
      console.log("All auto-retries failed, making one final attempt");
      setManualRetryAttempted(true);
      setIsRefreshing(true);
      
      setTimeout(() => {
        refreshProfile()
          .finally(() => {
            setIsRefreshing(false);
            if (!profile) {
              toast.error("Could not load profile after multiple attempts");
            }
          });
      }, 1000);
    }
  }, [retryCount, manualRetryAttempted, user, profile, refreshProfile]);

  // Handle different states
  if (loading || isRefreshing) {
    return <ProfileLoading />;
  }

  // Handle error state
  if (error) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Error Loading Profile</h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button 
          onClick={() => {
            setIsRefreshing(true);
            refreshProfile()
              .finally(() => setIsRefreshing(false));
          }} 
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  // Handle no user or profile
  if (!user || !profile) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Profile Not Available</h2>
        <p className="text-muted-foreground mb-6">
          We couldn't load your profile information after multiple attempts.
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => {
              console.log("Manual refresh initiated from UI");
              setIsRefreshing(true);
              setRetryCount(0);
              setManualRetryAttempted(false);
              refreshProfile()
                .finally(() => setIsRefreshing(false));
            }} 
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retry Loading Profile
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.location.href = "/auth"} 
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <ProfileHeader 
        title="Profile & Settings" 
        description="Manage your profile information and application settings" 
      />
      <ProfileTabs profile={profile} user={user} />
    </div>
  );
};

export default Profile;
