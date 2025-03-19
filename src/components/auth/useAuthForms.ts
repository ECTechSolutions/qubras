
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

export const useAuthForms = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [resetPasswordMode, setResetPasswordMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const { signIn, signUp, socialSignIn, resetPassword, loading, error, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check if we're in password reset mode from URL parameters
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('reset') === 'true') {
      setResetPasswordMode(true);
    }
    
    // If user is already logged in, redirect to dashboard
    if (user) {
      navigate("/dashboard");
    }
  }, [location, user, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);
    
    try {
      if (resetPasswordMode) {
        if (!email.trim()) {
          setFormError("Please enter your email address");
          return;
        }
        
        await resetPassword(email);
        toast.success("Password reset email sent. Please check your inbox.");
        setResetPasswordMode(false);
      } else if (isSignIn) {
        if (!email.trim() || !password.trim()) {
          setFormError("Please enter both email and password");
          return;
        }
        
        await signIn(email, password);
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        if (!email.trim() || !password.trim() || !name.trim() || !company.trim()) {
          setFormError("Please fill in all fields");
          return;
        }
        
        await signUp(email, password, name, company);
        toast.success("Account created! Please check your email to confirm your account.");
        // Don't navigate yet as the user needs to confirm their email
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setFormError(error || "Authentication failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    if (!email.trim()) {
      setFormError("Please enter your email address");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await resetPassword(email);
      toast.success("Password reset email sent. Please check your inbox.");
    } catch (err) {
      console.error("Reset password error:", err);
      setFormError(error || "Failed to send reset email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSocialSignIn = async (provider: "google" | "github") => {
    setFormError(null);
    setIsSubmitting(true);
    try {
      await socialSignIn(provider);
      // No navigation needed as we'll be redirected
    } catch (err) {
      console.error(`${provider} sign in error:`, err);
      setFormError(error || `Failed to sign in with ${provider}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSignIn,
    setIsSignIn,
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    company,
    setCompany,
    resetPasswordMode,
    setResetPasswordMode,
    isSubmitting,
    formError,
    handleSubmit,
    handleResetPassword,
    handleSocialSignIn
  };
};
