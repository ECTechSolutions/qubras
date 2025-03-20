
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileLoading = () => {
  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Loading profile information...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center py-8 space-y-4">
            <div className="relative">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-6 w-6 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
              </div>
            </div>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
            <div className="animate-pulse flex flex-col items-center">
              <p className="text-center text-muted-foreground">
                Please wait while we load your profile...
              </p>
              <p className="text-center text-xs text-muted-foreground mt-2">
                If this takes longer than expected, try refreshing the page.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileLoading;
