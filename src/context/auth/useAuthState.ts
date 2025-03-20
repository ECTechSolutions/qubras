
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
    let authStateInitialized = false;
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
            if (isMounted) {
              setError("Failed to load profile data");
              toast.error("Failed to load profile data");
            }
          } finally {
            // Set loading to false even if profile fetch fails
            if (isMounted) {
              setLoading(false);
              authStateInitialized = true;
            }
          }
        } else {
          // No user in session, set loading to false
          if (isMounted) {
            setLoading(false);
            authStateInitialized = true;
          }
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
              if (isMounted) {
                setError("Failed to load profile data");
                toast.error("Failed to load profile data");
              }
            } finally {
              // Set loading to false even if profile fetch fails
              if (isMounted) {
                setLoading(false);
                authStateInitialized = true;
              }
            }
          } else {
            // No user in session, set loading to false
            if (isMounted) {
              setLoading(false);
              authStateInitialized = true;
            }
          }
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

    // Add a safety timeout to prevent infinite loading
    const safetyTimeout = setTimeout(() => {
      if (isMounted && !authStateInitialized) {
        console.warn("Auth initialization timed out");
        setLoading(false);
        setError("Authentication initialization timed out");
        toast.error("Authentication took too long. Please refresh the page.");
      }
    }, 3000); // Reduced from 5 seconds to 3 seconds

    // Cleanup function
    return () => {
      console.log("Auth state hook cleaning up");
      isMounted = false;
      clearTimeout(safetyTimeout);
      subscription.unsubscribe();
    };
  }, []); // Empty dependency array to run only on mount
};
