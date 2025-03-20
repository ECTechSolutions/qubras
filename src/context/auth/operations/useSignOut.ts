
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signOut = async () => {
    try {
      setIsLoading(true);
      console.log("Signing out from supabase");
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Sign out error:", error);
        setError(error.message);
        toast.error(error.message);
        throw error;
      }
      
      console.log("Sign out from supabase successful");
      return true;
    } catch (err) {
      console.error("Sign out exception:", err);
      const message = err instanceof Error ? err.message : "Unknown error during sign out";
      setError(message);
      throw err;
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
