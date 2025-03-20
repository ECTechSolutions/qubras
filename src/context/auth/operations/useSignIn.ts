
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthError } from "@supabase/supabase-js";
import { toast } from "sonner";

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (
    email: string, 
    password: string, 
    getProfile: (userId: string) => Promise<void>,
    setUser: (user: any) => void,
    setSession: (session: any) => void
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log("Signing in with email:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Sign in error:", error);
        setError(error.message);
        toast.error(error.message);
        return Promise.reject(error);
      }
      
      console.log("Sign in successful:", data);
      
      // Ensure we have session and user data before updating state
      if (data && data.session) {
        setSession(data.session);
        setUser(data.user);
        
        if (data.user) {
          await getProfile(data.user.id);
        }
      } else {
        console.error("Sign in succeeded but no session data returned");
        setError("Authentication error: No session data");
        toast.error("Authentication error: Please try again");
        return Promise.reject(new Error("No session data"));
      }
      
      return Promise.resolve();
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
