
import { useAuth } from "@/context/auth";
import ProfileLoading from "@/components/profile/ProfileLoading";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";

const Profile = () => {
  const { profile, user } = useAuth();

  if (!profile || !user) {
    return <ProfileLoading />;
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
