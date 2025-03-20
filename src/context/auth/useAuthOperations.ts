
import { useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { useSignIn } from "./operations/useSignIn";
import { useSignUp } from "./operations/useSignUp";
import { useSignOut } from "./operations/useSignOut";
import { useSocialAuth } from "./operations/useSocialAuth";
import { usePasswordReset } from "./operations/usePasswordReset";

export const useAuthOperations = (getProfile: (userId: string) => Promise<void>) => {
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

  // Combine errors from all operations
  const updateError = (operationError: string | null) => {
    if (operationError) {
      setError(operationError);
    }
  };

  // Watch for errors from individual operations
  useState(() => {
    updateError(signInError || signUpError || signOutError || socialSignInError || resetPasswordError);
  });

  // Wrapped operations
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInOperation(email, password, getProfile, setUser, setSession);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, company: string) => {
    setLoading(true);
    try {
      await signUpOperation(email, password, name, company);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await signOutOperation(setUser, setSession);
    } finally {
      setLoading(false);
    }
  };

  const socialSignIn = async (provider: "google" | "github") => {
    setLoading(true);
    try {
      await socialSignInOperation(provider);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      await resetPasswordOperation(email);
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
