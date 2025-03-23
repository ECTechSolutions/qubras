
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "./types";
import { toast } from "sonner";

export const useProfileOperations = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  const getProfile = async (userId: string): Promise<Profile | null> => {
    if (!userId) {
      console.error("Cannot get profile: No user ID provided");
      setProfileError("No user ID provided");
      return null;
    }

    try {
      setProfileLoading(true);
      setProfileError(null);
      console.log("Fetching profile for user:", userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching profile:', error);
        setProfileError(error.message);
        toast.error("Error loading profile");
        return null;
      }
      
      if (!data) {
        console.warn("No profile found for user:", userId);
        
        // Check if we need to create a profile
        const checkAuth = await supabase.auth.getUser();
        
        if (checkAuth.error) {
          console.error("Error getting user:", checkAuth.error);
          setProfileError("Authentication error");
          return null;
        }
        
        // Create a minimal profile to prevent UI issues
        const newProfile = {
          id: userId,
          name: checkAuth.data.user?.user_metadata?.name || "User",
          company: checkAuth.data.user?.user_metadata?.company || "Company",
        } as Profile;
        
        console.log("Creating missing profile:", newProfile);
        
        // Insert the profile
        const { error: insertError, data: insertData } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .maybeSingle();
          
        if (insertError) {
          console.error("Error creating profile:", insertError);
          setProfileError(insertError.message);
          toast.error("Failed to create profile");
          return null;
        }
        
        console.log("Profile created successfully:", insertData);
        setProfile(insertData as Profile);
        return insertData as Profile;
      }
      
      console.log("Profile data loaded:", data);
      setProfile(data as Profile);
      return data as Profile;
    } catch (error: any) {
      console.error('Error in profile operations:', error);
      setProfileError(error.message);
      toast.error("Failed to load profile");
      return null;
    } finally {
      setProfileLoading(false);
    }
  };

  const updateProfile = async (userId: string, profileData: Partial<Profile>): Promise<boolean> => {
    if (!userId) {
      console.error("Cannot update profile: No authenticated user");
      toast.error("No authenticated user");
      return false;
    }
    
    try {
      setProfileLoading(true);
      console.log("Updating profile for user:", userId, profileData);
      
      // Check if profile exists first
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .maybeSingle();
        
      if (checkError) {
        console.error("Error checking profile:", checkError);
        toast.error("Error updating profile");
        return false;
      }
      
      if (!existingProfile) {
        // Profile doesn't exist, create it
        const { error: insertError, data: insertedProfile } = await supabase
          .from('profiles')
          .insert({ 
            ...profileData, 
            id: userId,
            // Ensure required fields have defaults
            name: profileData.name || 'User',
            company: profileData.company || 'Company'
          })
          .select()
          .maybeSingle();
          
        if (insertError) {
          console.error("Error creating profile:", insertError);
          toast.error("Failed to create profile");
          return false;
        }
        
        if (insertedProfile) {
          setProfile(insertedProfile as Profile);
        }
      } else {
        // Update existing profile
        const { error: updateError, data: updatedProfile } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', userId)
          .select()
          .maybeSingle();
        
        if (updateError) {
          console.error("Update profile error:", updateError);
          toast.error(updateError.message);
          return false;
        }
        
        if (updatedProfile) {
          setProfile(updatedProfile as Profile);
        }
      }
      
      console.log("Profile updated successfully");
      toast.success("Profile updated successfully");
      
      return true;
    } catch (err: any) {
      console.error("Update profile exception:", err);
      toast.error(err.message || "Error updating profile");
      return false;
    } finally {
      setProfileLoading(false);
    }
  };

  return {
    profile,
    setProfile,
    profileLoading,
    profileError,
    getProfile,
    updateProfile
  };
};
