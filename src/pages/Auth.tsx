
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { Github, Loader2, Mail } from "lucide-react";

const Auth = () => {
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
  
  if (resetPasswordMode) {
    return (
      <div className="container flex items-center justify-center min-h-screen py-10">
        <Card className="w-full max-w-md shadow-lg animate-scale-in">
          <form onSubmit={handleResetPassword}>
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>
                Enter your email address to receive a password reset link.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {formError && (
                <Alert variant="destructive">
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Reset Link
              </Button>
              <Button
                type="button"
                variant="link"
                onClick={() => setResetPasswordMode(false)}
              >
                Back to Sign In
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md shadow-lg animate-scale-in">
        <Tabs defaultValue={isSignIn ? "signin" : "signup"} onValueChange={(v) => setIsSignIn(v === "signin")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          {formError && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}
          
          <TabsContent value="signin">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                  Sign in to your QUBRAS account to continue.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button 
                      variant="link" 
                      className="px-0" 
                      size="sm"
                      type="button"
                      onClick={() => setResetPasswordMode(true)}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-indigo-400 hover:bg-indigo-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
                
                <div className="relative flex items-center justify-center w-full">
                  <div className="absolute w-full border-t"></div>
                  <div className="relative px-4 bg-card text-xs text-muted-foreground">
                    or continue with
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialSignIn("google")}
                    disabled={isSubmitting}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialSignIn("github")}
                    disabled={isSubmitting}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </div>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Create a QUBRAS account to start finding partners.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Full Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    placeholder="Company Name"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-indigo-400 hover:bg-indigo-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Account
                </Button>
                
                <div className="relative flex items-center justify-center w-full">
                  <div className="absolute w-full border-t"></div>
                  <div className="relative px-4 bg-card text-xs text-muted-foreground">
                    or continue with
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialSignIn("google")}
                    disabled={isSubmitting}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialSignIn("github")}
                    disabled={isSubmitting}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </div>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;
