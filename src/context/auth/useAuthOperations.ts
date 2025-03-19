
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session, AuthError } from "@supabase/supabase-js";
import { toast } from "sonner";

export const useAuthOperations = (getProfile: (userId: string) => Promise<void>) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
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
      setSession(data.session);
      setUser(data.user);
      
      if (data.user) {
        await getProfile(data.user.id);
      }
      
      return Promise.resolve();
    } catch (err) {
      const authError = err as AuthError;
      console.error("Sign in exception:", authError);
      setError(authError.message);
      toast.error(authError.message);
      return Promise.reject(authError);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, company: string) => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      
      console.log("Signing out");
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Sign out error:", error);
        setError(error.message);
        toast.error(error.message);
        return Promise.reject(error);
      }
      
      console.log("Sign out successful");
      setUser(null);
      setSession(null);
      
      return Promise.resolve();
    } catch (err) {
      const authError = err as AuthError;
      console.error("Sign out exception:", authError);
      setError(authError.message);
      toast.error(authError.message);
      return Promise.reject(authError);
    } finally {
      setLoading(false);
    }
  };

  const socialSignIn = async (provider: "google" | "github") => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Resetting password for:", email);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?reset=true`,
      });
      
      if (error) {
        console.error("Reset password error:", error);
        setError(error.message);
        toast.error(error.message);
        return Promise.reject(error);
      }
      
      console.log("Reset password email sent");
      toast.success("Password reset email sent. Please check your inbox.");
      
      return Promise.resolve();
    } catch (err) {
      const authError = err as AuthError;
      console.error("Reset password exception:", authError);
      setError(authError.message);
      toast.error(authError.message);
      return Promise.reject(authError);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    setUser,
    session,
    setSession,
    loading,
    setLoading,
    error,
    setError,
    signIn,
    signUp,
    signOut,
    socialSignIn,
    resetPassword
  };
};
