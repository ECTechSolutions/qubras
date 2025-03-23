
import { useState, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { useSignIn } from "./operations/useSignIn";
import { useSignUp } from "./operations/useSignUp";
import { useSignOut } from "./operations/useSignOut";
import { useSocialAuth } from "./operations/useSocialAuth";
import { usePasswordReset } from "./operations/usePasswordReset";
import { toast } from "sonner";
import { Profile } from "./types";

export const useAuthOperations = (
  getProfile: (userId: string) => Promise<Profile | null>
) => {
  // Main state
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Auth operation hooks
  const { signIn: signInOperation, error: signInError } = useSignIn();
  const { signUp: signUpOperation, error: signUpError } = useSignUp();
  const { signOut: signOutOperation, error: signOutError } = useSignOut();
  const { socialSignIn: socialSignInOperation, error: socialSignInError } = useSocialAuth();
  const { resetPassword: resetPasswordOperation, error: resetPasswordError } = usePasswordReset();

  const refreshProfile = useCallback(async () => {
    if (!user?.id) {
      console.log("Cannot refresh profile - no user ID available");
      return null;
    }
    
    setLoading(true);
    try {
      console.log("Refreshing profile for user:", user.id);
      const profile = await getProfile(user.id);
      return profile;
    } catch (error) {
      console.error("Error refreshing profile:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [user, getProfile]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Pass the getProfile function directly since we've updated the signature in useSignIn
      await signInOperation(email, password, getProfile, setUser, setSession);
    } catch (error: any) {
      setError(error.message || "Failed to sign in");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, company: string) => {
    setLoading(true);
    setError(null);
    try {
      await signUpOperation(email, password, name, company);
      toast.success("Account created! Please check your email to verify your account.");
    } catch (error: any) {
      setError(error.message || "Failed to sign up");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    try {
      // First clear all auth state
      setUser(null);
      setSession(null);
      
      // Then perform Supabase signOut
      await signOutOperation();
      
      // Force page reload for clean state
      window.location.href = "/";
    } catch (error: any) {
      console.error("Error in signOut operation:", error);
      setError(error.message || "Failed to sign out");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const socialSignIn = async (provider: "google" | "github") => {
    setLoading(true);
    setError(null);
    try {
      await socialSignInOperation(provider);
    } catch (error: any) {
      setError(error.message || "Failed to sign in with social provider");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      await resetPasswordOperation(email);
    } catch (error: any) {
      setError(error.message || "Failed to reset password");
      throw error;
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
    resetPassword,
    refreshProfile
  };
};
