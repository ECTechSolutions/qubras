
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";
import { AlertCircle, Mail, KeyRound } from "lucide-react";

interface AccountSettingsProps {
  user: User;
  onSuccess: () => void;
}

const AccountSettings = ({ user, onSuccess }: AccountSettingsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleResetPassword = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(user.email || "", {
        redirectTo: `${window.location.origin}/profile?tab=account`,
      });
      
      if (error) throw error;
      
      toast.success("Password reset email sent. Check your inbox to continue.");
    } catch (error: any) {
      toast.error(`Failed to send reset email: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // This is a simplified version, in a real implementation you might need 
      // to handle this differently based on Supabase's capabilities
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });
      
      if (error) throw error;
      
      onSuccess();
      setShowPasswordUpdate(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      toast.error(`Failed to update password: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your login credentials and account security
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Address
          </Label>
          <div className="flex items-center gap-4">
            <Input value={user.email || ""} disabled />
            <Button 
              variant="outline" 
              disabled 
              className="whitespace-nowrap"
              title="Email change not supported at this time"
            >
              Change Email
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Your email is used for login and notifications
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="flex items-center gap-2">
            <KeyRound className="h-4 w-4" />
            Password
          </Label>
          
          {!showPasswordUpdate ? (
            <div className="flex items-center gap-4">
              <Input type="password" value="••••••••" disabled />
              <Button 
                variant="outline"
                onClick={() => setShowPasswordUpdate(true)}
                className="whitespace-nowrap"
              >
                Change Password
              </Button>
            </div>
          ) : (
            <form onSubmit={handleUpdatePassword} className="space-y-4 border rounded-md p-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  minLength={8}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  minLength={8}
                  required
                />
              </div>
              
              <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                <AlertCircle className="h-4 w-4" />
                <span>Password must be at least 8 characters long</span>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setShowPasswordUpdate(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </form>
          )}
        </div>

        <div className="border-t pt-6">
          <Button 
            type="button" 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={handleResetPassword}
            disabled={isLoading}
          >
            Send Password Reset Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSettings;
