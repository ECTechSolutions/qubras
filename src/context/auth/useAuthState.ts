
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useAuthState = (
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  setSession: (session: any) => void,
  setUser: (user: any) => void,
  getProfile: (userId: string) => Promise<void>
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
        if (currentSession?.user && ["SIGNED_IN", "TOKEN_REFRESHED"].includes(event.toUpperCase())) {
          try {
            await getProfile(currentSession.user.id);
          } catch (err) {
            console.error("Error getting profile after auth change:", err);
            if (isMounted) {
              setError("Profile data could not be loaded");
              toast.error("Profile data could not be loaded");
            }
          }
        }
        
        // For sign_out events, ensure state is cleared
        if (event.toLowerCase() === 'signed_out') {
          setUser(null);
          setSession(null);
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
        } else {
          console.log("Initial session:", initialSession ? "exists" : "null");
          setSession(initialSession);
          setUser(initialSession?.user || null);
          
          // Fetch profile if user exists
          if (initialSession?.user && isMounted) {
            try {
              await getProfile(initialSession.user.id);
            } catch (err) {
              console.error("Error getting profile on init:", err);
              if (isMounted) {
                toast.error("Failed to load profile data");
              }
            }
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
        toast.error("Authentication initialization error");
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
  }, [getProfile, setError, setLoading, setSession, setUser]);
};
