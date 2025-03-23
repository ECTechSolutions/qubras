
import { useEffect } from "react";
import { useAuth } from "@/context/auth";
import ProfileLoading from "@/components/profile/ProfileLoading";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { toast } from "sonner";

const Profile = () => {
  const { profile, user, loading, error, refreshProfile } = useAuth();

  // Attempt to refresh the profile if it's not available
  useEffect(() => {
    if (user && !profile && !loading) {
      console.log("Profile page: Profile not available, attempting to refresh");
      refreshProfile().catch(err => {
        console.error("Error refreshing profile:", err);
        toast.error("Could not load your profile");
      });
    }
  }, [user, profile, loading, refreshProfile]);

  // Handle loading state
  if (loading) {
    return <ProfileLoading />;
  }

  // Handle error state
  if (error) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Error Loading Profile</h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        <button 
          onClick={() => refreshProfile()} 
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Handle no user or profile
  if (!user || !profile) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Profile Not Available</h2>
        <p className="text-muted-foreground mb-6">
          Please try signing out and signing back in.
        </p>
        <button 
          onClick={() => window.location.href = "/auth"} 
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Go to Login
        </button>
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
