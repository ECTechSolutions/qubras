
import { createContext, useContext, ReactNode, useState, useCallback } from "react";
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
  const { profile, setProfile, getProfile, updateProfile } = useProfileOperations();
  
  const memoizedGetProfile = useCallback(getProfile, [getProfile]);
  
  const {
    user,
    session,
    loading,
    error,
    setUser,
    setSession,
    setLoading,
    setError,
    signIn,
    signUp,
    signOut,
    socialSignIn,
    resetPassword
  } = useAuthOperations(memoizedGetProfile);

  // Initialize auth state
  useAuthState(setLoading, setError, setSession, setUser, memoizedGetProfile);

  const handleUpdateProfile = async (profileData: Partial<typeof profile>) => {
    if (!user) {
      return Promise.reject(new Error("User not authenticated"));
    }
    return updateProfile(user.id, profileData);
  };

  // For debugging purposes
  const [initialized] = useState(true);
  console.log("AuthProvider state:", { 
    initialized, 
    userEmail: user?.email,
    hasSession: !!session,
    loading,
    hasProfile: !!profile,
    error: error || "none"
  });

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
