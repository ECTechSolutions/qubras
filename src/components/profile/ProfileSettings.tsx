
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Building2, Globe } from "lucide-react";

// Industry options
const industries = [
  "Technology", "Marketing", "Retail", "Healthcare", "Education", 
  "Financial Services", "Media & Entertainment", "Manufacturing",
  "Travel & Hospitality", "Food & Beverage", "Real Estate", "Other"
];

interface ProfileSettingsProps {
  profile: {
    id: string;
    name: string;
    company: string;
    avatar_url?: string;
    industry?: string;
    website?: string;
    bio?: string;
  };
  onSuccess: () => void;
}

const ProfileSettings = ({ profile, onSuccess }: ProfileSettingsProps) => {
  const { updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name || "",
    company: profile.company || "",
    industry: profile.industry || "",
    website: profile.website || "",
    bio: profile.bio || "",
    avatar_url: profile.avatar_url || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, industry: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateProfile(formData);
      onSuccess();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = () => {
    return (profile.name || "User").split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal and company information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.avatar_url || ""} />
              <AvatarFallback className="text-xl">{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-medium">Profile Picture</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Your profile picture will be shown to potential co-marketing partners
              </p>
              <Input
                type="url"
                name="avatar_url"
                placeholder="Enter profile image URL"
                value={formData.avatar_url}
                onChange={handleChange}
                className="max-w-md"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Company
              </Label>
              <Input
                id="company"
                name="company"
                placeholder="Your company name"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select value={formData.industry} onValueChange={handleSelectChange}>
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website
              </Label>
              <Input
                id="website"
                name="website"
                placeholder="https://example.com"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Tell potential partners about you and your company..."
              value={formData.bio}
              onChange={handleChange}
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" type="reset">Reset</Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ProfileSettings;
