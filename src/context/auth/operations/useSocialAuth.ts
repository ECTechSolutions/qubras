
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthError } from "@supabase/supabase-js";
import { toast } from "sonner";

export const useSocialAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const socialSignIn = async (provider: "google" | "github") => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log(`Signing in with ${provider}`);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        console.error(`${provider} sign in error:`, error);
        setError(error.message);
        toast.error(error.message);
        return Promise.reject(error);
      }
      
      console.log(`${provider} sign in initiated:`, data);
      // The actual auth happens after redirect, so we don't update state here
      
      return Promise.resolve();
    } catch (err) {
      const authError = err as AuthError;
      console.error(`${provider} sign in exception:`, authError);
      setError(authError.message);
      toast.error(authError.message);
      return Promise.reject(authError);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    socialSignIn,
    isLoading,
    error,
    setError
  };
};
