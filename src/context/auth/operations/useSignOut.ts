
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signOut = async (): Promise<void> => {
    try {
      setIsLoading(true);
      console.log("Starting sign out process");
      
      const { error: signOutError } = await supabase.auth.signOut();
      
      if (signOutError) {
        console.error("Sign out error:", signOutError);
        setError(signOutError.message);
        toast.error("Failed to sign out: " + signOutError.message);
        throw signOutError;
      }
      
      console.log("Sign out successful");
    } catch (err) {
      console.error("Sign out exception:", err);
      const message = err instanceof Error ? err.message : "Unknown error during sign out";
      setError(message);
      toast.error("Failed to sign out: " + message);
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
