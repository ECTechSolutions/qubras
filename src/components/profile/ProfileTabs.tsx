
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSettings from "./ProfileSettings";
import AccountSettings from "./AccountSettings";
import AppSettings from "./AppSettings";
import { Profile } from "@/context/auth/types";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

interface ProfileTabsProps {
  profile: Profile;
  user: User;
  initialTab?: string;
}

const ProfileTabs = ({ profile, user, initialTab = "profile" }: ProfileTabsProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid grid-cols-3 w-full max-w-md">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="app">App Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-6">
        <ProfileSettings 
          profile={profile} 
          onSuccess={() => toast.success("Profile updated successfully")} 
        />
      </TabsContent>

      <TabsContent value="account" className="space-y-6">
        <AccountSettings 
          user={user} 
          onSuccess={() => toast.success("Account settings updated successfully")} 
        />
      </TabsContent>

      <TabsContent value="app" className="space-y-6">
        <AppSettings 
          onSuccess={() => toast.success("Application settings updated successfully")} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
