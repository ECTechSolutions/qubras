
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
    let isMounted = true;
    console.log("Auth state hook initialized");
    
    // Initialize loading state only if component is still mounted
    if (isMounted) setLoading(true);
    
    // Set up supabase auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession);
        
        if (!isMounted) return;
        
        // Update session and user state
        setSession(currentSession);
        setUser(currentSession?.user || null);
        
        if (currentSession?.user) {
          try {
            await getProfile(currentSession.user.id);
          } catch (err) {
            console.error("Error getting profile after auth change:", err);
          }
        }
        
        // Set loading to false after auth state change is processed
        setLoading(false);
      }
    );

    // Get initial session
    const initializeAuth = async () => {
      try {
        console.log("Getting initial session");
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (!isMounted) return;
        
        if (error) {
          console.error("Error getting session:", error);
          setError(error.message);
          setLoading(false);
        } else {
          console.log("Initial session:", initialSession);
          setSession(initialSession);
          setUser(initialSession?.user || null);
          
          if (initialSession?.user) {
            try {
              await getProfile(initialSession.user.id);
            } catch (err) {
              console.error("Error getting profile on init:", err);
            }
          }
          
          // Only set loading to false after everything is done
          setLoading(false);
        }
      } catch (err) {
        if (!isMounted) return;
        console.error("Error initializing auth:", err);
        setLoading(false);
      }
    };

    // Run initialization
    initializeAuth();

    // Cleanup function
    return () => {
      console.log("Auth state hook cleaning up");
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []); // Empty dependency array to run only on mount
};
