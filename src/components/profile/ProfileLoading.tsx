
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const ProfileLoading = () => {
  const [loadingTooLong, setLoadingTooLong] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  
  useEffect(() => {
    // Set a timeout to detect if loading takes too long
    const timeoutId = setTimeout(() => {
      setLoadingTooLong(true);
    }, 5000); // 5 seconds
    
    return () => clearTimeout(timeoutId);
  }, []);

  const handleRetry = () => {
    setIsRetrying(true);
    
    // Set a short timeout to allow UI to update before reload
    setTimeout(() => {
      window.location.reload();
    }, 300); // Short delay to show loading indicator
  };

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
                {loadingTooLong 
                  ? "Loading is taking longer than expected." 
                  : "If this takes longer than expected, try refreshing the page."}
              </p>
            </div>
          </div>
        </CardContent>
        {loadingTooLong && (
          <CardFooter className="flex justify-center">
            <Button 
              onClick={handleRetry} 
              variant="outline" 
              size="sm" 
              className="gap-2"
              disabled={isRetrying}
            >
              {isRetrying ? (
                <>
                  <div className="h-4 w-4 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
                  Retrying...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Retry
                </>
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ProfileLoading;
