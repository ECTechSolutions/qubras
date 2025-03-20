
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthError } from "@supabase/supabase-js";
import { toast } from "sonner";

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = async (email: string, password: string, name: string, company: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log("Signing up with email:", email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            company,
          },
        },
      });
      
      if (error) {
        console.error("Sign up error:", error);
        setError(error.message);
        toast.error(error.message);
        return Promise.reject(error);
      }
      
      console.log("Sign up successful:", data);
      // In Supabase, the user isn't fully signed in until email confirmation
      // depending on your auth settings
      toast.success("Registration successful! Please check your email to confirm your account.");
      
      return Promise.resolve();
    } catch (err) {
      const authError = err as AuthError;
      console.error("Sign up exception:", authError);
      setError(authError.message);
      toast.error(authError.message);
      return Promise.reject(authError);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signUp,
    isLoading,
    error,
    setError
  };
};
