
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { PasswordResetForm } from "@/components/auth/PasswordResetForm";
import { useAuthForms } from "@/components/auth/useAuthForms";

const Auth = () => {
  const {
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
  } = useAuthForms();
  
  if (resetPasswordMode) {
    return (
      <PasswordResetForm
        email={email}
        setEmail={setEmail}
        formError={formError}
        isSubmitting={isSubmitting}
        handleResetPassword={handleResetPassword}
        setResetPasswordMode={setResetPasswordMode}
      />
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
          
          <TabsContent value="signin">
            <SignInForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              formError={formError}
              isSubmitting={isSubmitting}
              handleSubmit={handleSubmit}
              handleSocialSignIn={handleSocialSignIn}
              setResetPasswordMode={setResetPasswordMode}
            />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignUpForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              name={name}
              setName={setName}
              company={company}
              setCompany={setCompany}
              formError={formError}
              isSubmitting={isSubmitting}
              handleSubmit={handleSubmit}
              handleSocialSignIn={handleSocialSignIn}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;
