
import { createContext, useContext, ReactNode, useState, useCallback, useEffect } from "react";
import { useProfileOperations } from "./useProfileOperations";
import { useAuthOperations } from "./useAuthOperations";
import { useAuthState } from "./useAuthState";
import { AuthContextType } from "./types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { 
    profile, 
    setProfile, 
    profileLoading,
    profileError,
    getProfile, 
    updateProfile 
  } = useProfileOperations();
  
  const memoizedGetProfile = useCallback(getProfile, [getProfile]);
  
  const {
    user,
    session,
    loading: authLoading,
    error: authError,
    setUser,
    setSession,
    setLoading: setAuthLoading,
    setError: setAuthError,
    signIn,
    signUp,
    signOut,
    socialSignIn,
    resetPassword,
    refreshProfile: refreshProfileOp
  } = useAuthOperations(memoizedGetProfile);

  // Combined loading state
  const [loading, setLoading] = useState(true);
  
  // Update combined loading state when auth or profile loading changes
  useEffect(() => {
    setLoading(authLoading || profileLoading);
  }, [authLoading, profileLoading]);
  
  // Combined error state
  const error = authError || profileError;

  // Initialize auth state
  useAuthState(setAuthLoading, setAuthError, setSession, setUser, memoizedGetProfile);

  const handleUpdateProfile = async (profileData: Partial<typeof profile>) => {
    if (!user) {
      return Promise.reject(new Error("User not authenticated"));
    }
    return updateProfile(user.id, profileData);
  };
  
  const refreshProfile = async () => {
    return refreshProfileOp();
  };

  // For debugging purposes
  const [initialized] = useState(true);
  
  useEffect(() => {
    console.log("AuthProvider state:", { 
      initialized, 
      userEmail: user?.email,
      hasSession: !!session,
      loading,
      authLoading,
      profileLoading,
      hasProfile: !!profile,
      error: error || "none"
    });
  }, [initialized, user, session, loading, authLoading, profileLoading, profile, error]);

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
        updateProfile: handleUpdateProfile,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
