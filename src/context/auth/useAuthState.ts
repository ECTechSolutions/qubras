
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
            const userId = currentSession.user.id;
            console.log(`Attempting to load profile for ${event} event, user ID: ${userId}`);
            
            const profileResult = await getProfile(userId);
            
            if (!profileResult && isMounted) {
              console.warn(`Profile load failed after ${event} event, will retry`);
              
              // Try multiple times with increasing delays
              let retryAttempt = 0;
              const maxRetries = 3;
              
              const attemptProfileLoad = async () => {
                if (!isMounted || retryAttempt >= maxRetries) {
                  console.log(`Profile loading stopped: isMounted=${isMounted}, retryAttempt=${retryAttempt}`);
                  if (isMounted) setLoading(false);
                  return;
                }
                
                retryAttempt++;
                const delay = retryAttempt * 1000; // Increasing delay
                
                console.log(`Retry ${retryAttempt}/${maxRetries} for profile load in ${delay}ms`);
                
                setTimeout(async () => {
                  try {
                    const retryResult = await getProfile(userId);
                    if (!retryResult && isMounted && retryAttempt < maxRetries) {
                      attemptProfileLoad(); // Try again if still failed
                    } else {
                      if (isMounted) setLoading(false);
                    }
                  } catch (err) {
                    console.error(`Error in profile retry attempt ${retryAttempt}:`, err);
                    if (isMounted && retryAttempt < maxRetries) {
                      attemptProfileLoad(); // Try again after error
                    } else {
                      if (isMounted) setLoading(false);
                    }
                  }
                }, delay);
              };
              
              attemptProfileLoad();
              return; // We'll set loading to false in the retry chain
            }
          } catch (err) {
            console.error("Error getting profile after auth change:", err);
            if (isMounted) {
              setError("Profile data could not be loaded");
              setLoading(false);
            }
            return;
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
          const userId = initialSession.user.id;
          console.log(`Loading profile for user ID: ${userId} during initialization`);
          
          try {
            const profileResult = await getProfile(userId);
            
            if (!profileResult && isMounted) {
              console.warn("Initial profile load failed, will retry");
              
              // Try multiple times with increasing delays
              let retryAttempt = 0;
              const maxRetries = 3;
              
              const attemptProfileLoad = async () => {
                if (!isMounted || retryAttempt >= maxRetries) {
                  console.log(`Initial profile loading stopped: isMounted=${isMounted}, retryAttempt=${retryAttempt}`);
                  if (isMounted) setLoading(false);
                  return;
                }
                
                retryAttempt++;
                const delay = retryAttempt * 1000; // Increasing delay
                
                console.log(`Initial retry ${retryAttempt}/${maxRetries} for profile load in ${delay}ms`);
                
                setTimeout(async () => {
                  try {
                    const retryResult = await getProfile(userId);
                    if (!retryResult && isMounted && retryAttempt < maxRetries) {
                      attemptProfileLoad(); // Try again if still failed
                    } else {
                      if (isMounted) setLoading(false);
                    }
                  } catch (err) {
                    console.error(`Error in initial profile retry attempt ${retryAttempt}:`, err);
                    if (isMounted && retryAttempt < maxRetries) {
                      attemptProfileLoad(); // Try again after error
                    } else {
                      if (isMounted) setLoading(false);
                    }
                  }
                }, delay);
              };
              
              attemptProfileLoad();
              return; // We'll set loading to false in the retry chain
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
