
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "next-themes";
import { BellRing, Moon, Sun, Monitor } from "lucide-react";

interface AppSettingsProps {
  onSuccess: () => void;
}

const AppSettings = ({ onSuccess }: AppSettingsProps) => {
  const { theme, setTheme } = useTheme();
  
  // These would normally be stored in a user preferences database
  // For now, we'll use local state as a demonstration
  const [notifications, setNotifications] = useState({
    newMatches: true,
    messages: true,
    listingUpdates: true,
    marketingEmails: false
  });

  const handleThemeChange = (value: string) => {
    setTheme(value);
    onSuccess();
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      // In a real app, this would save to a database
      return updated;
    });
    onSuccess();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize how QUBRAS looks on your device
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={theme} 
            onValueChange={handleThemeChange}
            className="grid grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem 
                value="light" 
                id="theme-light" 
                className="sr-only" 
              />
              <Label
                htmlFor="theme-light"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Sun className="mb-3 h-6 w-6" />
                Light
              </Label>
            </div>
            
            <div>
              <RadioGroupItem 
                value="dark" 
                id="theme-dark" 
                className="sr-only" 
              />
              <Label
                htmlFor="theme-dark"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Moon className="mb-3 h-6 w-6" />
                Dark
              </Label>
            </div>
            
            <div>
              <RadioGroupItem 
                value="system" 
                id="theme-system" 
                className="sr-only" 
              />
              <Label
                htmlFor="theme-system"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Monitor className="mb-3 h-6 w-6" />
                System
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellRing className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            Choose what notifications you receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="new-matches" className="flex-1">
              New Match Notifications
              <p className="text-sm font-normal text-muted-foreground">
                Get notified when you have a new co-marketing match
              </p>
            </Label>
            <Switch
              id="new-matches"
              checked={notifications.newMatches}
              onCheckedChange={() => handleNotificationChange('newMatches')}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="messages" className="flex-1">
              Message Notifications
              <p className="text-sm font-normal text-muted-foreground">
                Get notified when you receive new messages
              </p>
            </Label>
            <Switch
              id="messages"
              checked={notifications.messages}
              onCheckedChange={() => handleNotificationChange('messages')}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="listing-updates" className="flex-1">
              Listing Update Notifications
              <p className="text-sm font-normal text-muted-foreground">
                Get notified about updates to listings you're involved with
              </p>
            </Label>
            <Switch
              id="listing-updates"
              checked={notifications.listingUpdates}
              onCheckedChange={() => handleNotificationChange('listingUpdates')}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="marketing-emails" className="flex-1">
              Marketing Emails
              <p className="text-sm font-normal text-muted-foreground">
                Receive emails about QUBRAS updates and features
              </p>
            </Label>
            <Switch
              id="marketing-emails"
              checked={notifications.marketingEmails}
              onCheckedChange={() => handleNotificationChange('marketingEmails')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Manage your data within QUBRAS
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button variant="outline" className="w-full sm:w-auto">
            Export My Data
          </Button>
          <Button variant="destructive" className="w-full sm:w-auto">
            Delete My Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppSettings;
