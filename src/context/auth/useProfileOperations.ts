
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "./types";
import { toast } from "sonner";

export const useProfileOperations = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const getProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        setProfile(null);
        return;
      }
      
      console.log("Profile data:", data);
      setProfile(data as Profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
    }
  };

  const updateProfile = async (userId: string, profileData: Partial<Profile>) => {
    if (!userId) {
      console.error("Cannot update profile: No authenticated user");
      return Promise.reject(new Error("User not authenticated"));
    }
    
    try {
      console.log("Updating profile for user:", userId, profileData);
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', userId);
      
      if (error) {
        console.error("Update profile error:", error);
        toast.error(error.message);
        return Promise.reject(error);
      }
      
      console.log("Profile updated successfully");
      // Refresh profile data
      await getProfile(userId);
      
      return Promise.resolve();
    } catch (err: any) {
      console.error("Update profile exception:", err);
      toast.error(err.message);
      return Promise.reject(err);
    }
  };

  return {
    profile,
    setProfile,
    getProfile,
    updateProfile
  };
};
