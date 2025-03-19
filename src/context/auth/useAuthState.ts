
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAuthState = (
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  setSession: (session: any) => void,
  setUser: (user: any) => void,
  getProfile: (userId: string) => Promise<void>
) => {
  useEffect(() => {
    // Initialize loading state
    setLoading(true);
    
    // Set up supabase auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession);
        
        // Update session and user state
        setSession(currentSession);
        setUser(currentSession?.user || null);
        
        if (currentSession?.user) {
          await getProfile(currentSession.user.id);
        }
        
        // Set loading to false after auth state change is processed
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
        // Ensure loading is always set to false when auth initialization completes
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [setLoading, setError, setSession, setUser, getProfile]);
};
