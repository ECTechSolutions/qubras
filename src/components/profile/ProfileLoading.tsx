
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ProfileLoading = () => {
  const [loadingTooLong, setLoadingTooLong] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  
  useEffect(() => {
    // Set a timeout to detect if loading takes too long
    const timeoutId = setTimeout(() => {
      setLoadingTooLong(true);
    }, 5000); // 5 seconds
    
    // Set up a timer to show how long we've been loading
    const intervalId = setInterval(() => {
      setSecondsElapsed(prev => {
        const newValue = prev + 1;
        // Update progress bar - max out at 90% to indicate we're still waiting
        setProgressValue(Math.min(90, newValue * 3)); 
        return newValue;
      });
    }, 1000);
    
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  const handleRetry = () => {
    setIsRetrying(true);
    console.log("Profile loading retry initiated");
    
    // Set a short timeout to allow UI to update before reload
    setTimeout(() => {
      window.location.reload();
    }, 500); // Short delay to show loading indicator
  };

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Loading profile information... ({secondsElapsed}s)</CardDescription>
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
            
            <div className="w-full max-w-md mt-4">
              <Progress value={progressValue} className="h-2" />
            </div>
            
            <div className="animate-pulse flex flex-col items-center">
              <p className="text-center text-muted-foreground">
                Please wait while we load your profile...
              </p>
              <p className="text-center text-xs text-muted-foreground mt-2">
                {loadingTooLong 
                  ? "Loading is taking longer than expected. You may need to retry." 
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
