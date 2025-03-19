
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
          <div className="flex justify-center py-8">
            <div className="text-center">
              <div className="animate-pulse text-blue-500 mb-2">⭘</div>
              <p>Loading profile data...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileLoading;
