
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthError } from "@supabase/supabase-js";
import { toast } from "sonner";

export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signOut = async (
    setUser: (user: null) => void,
    setSession: (session: null) => void
  ) => {
    try {
      setIsLoading(true);
      
      // Clear auth state in memory first - important to prevent state inconsistencies
      setUser(null);
      setSession(null);
      
      console.log("Signing out from supabase");
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Sign out error:", error);
        setError(error.message);
        toast.error(error.message);
        return Promise.reject(error);
      }
      
      console.log("Sign out from supabase successful");
      toast.success("Signed out successfully");
      
      return Promise.resolve();
    } catch (err) {
      const authError = err as AuthError;
      console.error("Sign out exception:", authError);
      setError(authError.message);
      toast.error(authError.message);
      return Promise.reject(authError);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signOut,
    isLoading,
    error,
    setError
  };
};
