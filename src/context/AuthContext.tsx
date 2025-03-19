
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, company: string) => Promise<void>;
  signOut: () => Promise<void>;
  socialSignIn: (provider: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock authentication for MVP
  useEffect(() => {
    // Check if user is stored in localStorage (simulating persistent auth)
    const storedUser = localStorage.getItem("qubras_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For MVP, simulate successful login with any credentials
      const mockUser: User = {
        id: "user-1",
        email,
        name: "Demo User",
        company: "QUBRAS Inc.",
        avatar: "https://i.pravatar.cc/150?u=demo"
      };
      
      setUser(mockUser);
      localStorage.setItem("qubras_user", JSON.stringify(mockUser));
    } catch (err) {
      setError("Failed to sign in. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, company: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For MVP, simulate successful registration with any credentials
      const mockUser: User = {
        id: "user-1",
        email,
        name,
        company,
        avatar: "https://i.pravatar.cc/150?u=new"
      };
      
      setUser(mockUser);
      localStorage.setItem("qubras_user", JSON.stringify(mockUser));
    } catch (err) {
      setError("Failed to sign up. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      localStorage.removeItem("qubras_user");
    } catch (err) {
      setError("Failed to sign out. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const socialSignIn = async (provider: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For MVP, simulate successful login with any provider
      const mockUser: User = {
        id: "user-social-1",
        email: `demo@${provider.toLowerCase()}.com`,
        name: `${provider} User`,
        company: "QUBRAS Inc.",
        avatar: `https://i.pravatar.cc/150?u=${provider}`
      };
      
      setUser(mockUser);
      localStorage.setItem("qubras_user", JSON.stringify(mockUser));
    } catch (err) {
      setError(`Failed to sign in with ${provider}. Please try again.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signIn,
        signUp,
        signOut,
        socialSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
