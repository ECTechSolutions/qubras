
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
        
        // Set loading to false after updating auth state
        // Profile fetching can happen in the background
        if (isMounted) {
          setLoading(false);
        }
        
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
          setLoading(false);
        } else {
          console.log("Initial session:", initialSession);
          setSession(initialSession);
          setUser(initialSession?.user || null);
          
          // Set loading to false after setting the session
          // regardless of whether we have a user or not
          if (isMounted) {
            setLoading(false);
          }
          
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

    // Add a safety timeout to prevent infinite loading - shorter timeout
    const safetyTimeout = setTimeout(() => {
      if (isMounted) {
        console.warn("Auth initialization safety timeout triggered");
        setLoading(false);
      }
    }, 2000); // Reduced from 3 seconds to 2 seconds

    // Cleanup function
    return () => {
      console.log("Auth state hook cleaning up");
      isMounted = false;
      clearTimeout(safetyTimeout);
      subscription.unsubscribe();
    };
  }, []); // Empty dependency array to run only on mount
};
