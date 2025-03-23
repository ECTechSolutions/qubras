
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Profile } from "./types";

export const useAuthState = (
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  setSession: (session: any) => void,
  setUser: (user: any) => void,
  getProfile: (userId: string) => Promise<Profile | null>
) => {
  useEffect(() => {
    let isMounted = true;
    console.log("Auth state hook initializing");
    
    // Initialize loading state
    if (isMounted) setLoading(true);
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event, "Session:", currentSession ? "exists" : "null");
        
        if (!isMounted) return;
        
        // Update session and user state
        setSession(currentSession);
        setUser(currentSession?.user || null);
        
        // For sign_in and token_refreshed events, fetch the profile
        if (currentSession?.user && ["SIGNED_IN", "TOKEN_REFRESHED", "USER_UPDATED"].includes(event.toUpperCase())) {
          try {
            const profileResult = await getProfile(currentSession.user.id);
            if (!profileResult && isMounted) {
              console.warn("Could not load profile after auth event:", event);
            }
          } catch (err) {
            console.error("Error getting profile after auth change:", err);
            if (isMounted) {
              setError("Profile data could not be loaded");
            }
          }
        }
        
        // For sign_out events, ensure state is cleared
        if (event.toLowerCase() === 'signed_out') {
          if (isMounted) {
            setUser(null);
            setSession(null);
          }
        }
        
        // Set loading to false after handling the auth state change
        if (isMounted) {
          setLoading(false);
        }
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
          toast.error("Authentication error: " + error.message);
          if (isMounted) setLoading(false);
          return;
        } 
        
        console.log("Initial session:", initialSession ? "exists" : "null");
        setSession(initialSession);
        setUser(initialSession?.user || null);
        
        // Fetch profile if user exists
        if (initialSession?.user && isMounted) {
          try {
            const profileResult = await getProfile(initialSession.user.id);
            if (!profileResult) {
              console.warn("Could not load profile on initialization");
            }
          } catch (err) {
            console.error("Error getting profile on init:", err);
          }
        }
        
        // Set loading to false after initialization is complete
        if (isMounted) {
          setLoading(false);
        }
      } catch (err) {
        if (!isMounted) return;
        console.error("Error initializing auth:", err);
        setError("Authentication initialization error");
        setLoading(false);
      }
    };

    // Run initialization
    initializeAuth();

    // Cleanup function
    return () => {
      console.log("Auth state hook cleaning up");
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [getProfile, setError, setLoading, setSession, setUser]);
};
