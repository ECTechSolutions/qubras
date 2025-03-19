
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ProfileLoading = () => {
  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Loading profile information...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            Loading profile data...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileLoading;
