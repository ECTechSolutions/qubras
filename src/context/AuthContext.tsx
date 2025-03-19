
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
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      setSession(initialSession);
      setUser(initialSession?.user || null);
      
      if (initialSession?.user) {
        await getProfile(initialSession.user.id);
      }
      
      setLoading(false);
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getProfile = async (userId: string) => {
    try {
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
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        setError(error.message);
        return Promise.reject(error);
      }
      
      setSession(data.session);
      setUser(data.user);
      
      if (data.user) {
        await getProfile(data.user.id);
      }
      
      return Promise.resolve();
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
      return Promise.reject(authError);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, company: string) => {
    try {
      setLoading(true);
      setError(null);
      
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
        setError(error.message);
        return Promise.reject(error);
      }
      
      // In Supabase, the user isn't fully signed in until email confirmation
      // depending on your auth settings
      toast.success("Registration successful! Please check your email to confirm your account.");
      
      return Promise.resolve();
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
      return Promise.reject(authError);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        setError(error.message);
        return Promise.reject(error);
      }
      
      setUser(null);
      setSession(null);
      setProfile(null);
      
      return Promise.resolve();
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
      return Promise.reject(authError);
    } finally {
      setLoading(false);
    }
  };

  const socialSignIn = async (provider: "google" | "github") => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
      });
      
      if (error) {
        setError(error.message);
        return Promise.reject(error);
      }
      
      // The actual auth happens after redirect, so we don't update state here
      
      return Promise.resolve();
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
      return Promise.reject(authError);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?reset=true`,
      });
      
      if (error) {
        setError(error.message);
        return Promise.reject(error);
      }
      
      toast.success("Password reset email sent. Please check your inbox.");
      
      return Promise.resolve();
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
      return Promise.reject(authError);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<Profile>) => {
    if (!user) return Promise.reject(new Error("User not authenticated"));
    
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id);
      
      if (error) {
        setError(error.message);
        return Promise.reject(error);
      }
      
      // Refresh profile data
      await getProfile(user.id);
      
      return Promise.resolve();
    } catch (err: any) {
      setError(err.message);
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
