
import { Session, User } from "@supabase/supabase-js";

export interface Profile {
  id: string;
  name: string;
  company: string;
  avatar_url?: string;
  industry?: string;
  website?: string;
  bio?: string;
}

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, company: string) => Promise<void>;
  signOut: () => Promise<void>;
  socialSignIn: (provider: "google" | "github") => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (profile: Partial<Profile>) => Promise<void>;
}
