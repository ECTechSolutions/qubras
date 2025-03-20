
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
    console.log("Auth state hook initialized");
    
    // Initialize loading state
    if (isMounted) setLoading(true);
    
    // Set up supabase auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession);
        
        if (!isMounted) return;
        
        // Update session and user state
        setSession(currentSession);
        setUser(currentSession?.user || null);
        
        // Fetch profile in the background if user exists
        if (currentSession?.user && isMounted) {
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
        
        // Set loading to false after handling the auth state change
        if (isMounted) {
          setLoading(false);
        }
      }
    );

    // Get initial session after setting up the listener
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
          console.log("Initial session:", initialSession);
          setSession(initialSession);
          setUser(initialSession?.user || null);
          
          // Fetch profile in the background if user exists
          if (initialSession?.user && isMounted) {
            getProfile(initialSession.user.id).catch(err => {
              console.error("Error getting profile on init:", err);
              if (isMounted) {
                toast.error("Failed to load profile data");
              }
            });
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
        
        // Ensure loading is set to false even if an error occurs
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
