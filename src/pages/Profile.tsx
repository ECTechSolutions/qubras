
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileSettings from "@/components/profile/ProfileSettings";
import AccountSettings from "@/components/profile/AccountSettings";
import AppSettings from "@/components/profile/AppSettings";
import { toast } from "sonner";

const Profile = () => {
  const { profile, user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  if (!profile || !user) {
    return (
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Loading profile information...</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center p-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-qubras-600"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profile & Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile information and application settings
        </p>
      </header>

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
    </div>
  );
};

export default Profile;
