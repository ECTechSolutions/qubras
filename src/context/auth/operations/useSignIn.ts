
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthError } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Profile } from "../types";

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (
    email: string, 
    password: string, 
    getProfile: (userId: string) => Promise<Profile | null>,
    setUser: (user: any) => void,
    setSession: (session: any) => void
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log("Signing in with email:", email);
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (signInError) {
        console.error("Sign in error:", signInError);
        setError(signInError.message);
        toast.error(signInError.message);
        return Promise.reject(signInError);
      }
      
      if (!data || !data.session || !data.user) {
        const missingDataError = new Error("Sign-in succeeded but required data is missing");
        console.error(missingDataError);
        setError("Authentication error: Missing session data");
        toast.error("Authentication error: Please try again");
        return Promise.reject(missingDataError);
      }
      
      console.log("Sign in successful:", data.user.email);
      
      // Update state
      setSession(data.session);
      setUser(data.user);
      
      // Fetch profile data
      try {
        await getProfile(data.user.id);
        console.log("Profile loading attempt completed after sign in");
      } catch (profileError) {
        console.error("Error fetching profile after sign in:", profileError);
        // Continue even if profile fetch fails - we already have the user logged in
      }
      
      return data.user.id;
    } catch (err) {
      const authError = err as AuthError;
      console.error("Sign in exception:", authError);
      setError(authError.message);
      toast.error(authError.message);
      return Promise.reject(authError);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    isLoading,
    error,
    setError
  };
};
