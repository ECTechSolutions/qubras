
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User, AuthError } from "@supabase/supabase-js";
import { toast } from "sonner";

interface Profile {
  id: string;
  name: string;
  company: string;
  avatar_url?: string;
  industry?: string;
  website?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, company: string) => Promise<void>;
  signOut: () => Promise<void>;
  socialSignIn: (provider: "google" | "github") => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (profile: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set up supabase auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession);
        setSession(currentSession);
        setUser(currentSession?.user || null);
        
        if (currentSession?.user) {
          await getProfile(currentSession.user.id);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
          setError(error.message);
        } else {
          console.log("Initial session:", initialSession);
          setSession(initialSession);
          setUser(initialSession?.user || null);
          
          if (initialSession?.user) {
            await getProfile(initialSession.user.id);
          }
        }
      } catch (err) {
        console.error("Error initializing auth:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        setProfile(null);
        return;
      }
      
      console.log("Profile data:", data);
      setProfile(data as Profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
    }
  };

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
      setProfile(null);
      
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

  const updateProfile = async (profileData: Partial<Profile>) => {
    if (!user) {
      console.error("Cannot update profile: No authenticated user");
      return Promise.reject(new Error("User not authenticated"));
    }
    
    try {
      setLoading(true);
      setError(null);
      
      console.log("Updating profile for user:", user.id, profileData);
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id);
      
      if (error) {
        console.error("Update profile error:", error);
        setError(error.message);
        toast.error(error.message);
        return Promise.reject(error);
      }
      
      console.log("Profile updated successfully");
      // Refresh profile data
      await getProfile(user.id);
      
      return Promise.resolve();
    } catch (err: any) {
      console.error("Update profile exception:", err);
      setError(err.message);
      toast.error(err.message);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        error,
        signIn,
        signUp,
        signOut,
        socialSignIn,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
