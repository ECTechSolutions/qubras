
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Listing } from "../types";

export const useListingsQuery = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["listings", userId],
    queryFn: async () => {
      console.log("Fetching listings for userId:", userId);
      
      if (!userId) {
        console.log("No userId provided, waiting for authentication");
        return [];
      }
      
      try {
        // Fetch listings and profiles in parallel for better performance
        const [listingsResponse, profilesResponse] = await Promise.all([
          supabase
            .from("listings")
            .select("*")
            .order("created_at", { ascending: false }),
          supabase
            .from("profiles")
            .select("id, name, company, avatar_url")
        ]);

        const { data: listingsData, error: listingsError } = listingsResponse;
        const { data: profilesData, error: profilesError } = profilesResponse;

        if (listingsError) {
          console.error("Error fetching listings:", listingsError);
          toast.error("Failed to fetch listings");
          throw listingsError;
        }

        if (profilesError) {
          console.error("Error fetching profiles:", profilesError);
          // Continue with listings only, don't throw error
        }

        if (!listingsData || listingsData.length === 0) {
          console.log("No listings data returned");
          return [];
        }

        // Create a map of profiles by user ID for easy lookup
        const profilesMap = new Map();
        if (profilesData) {
          profilesData.forEach(profile => {
            profilesMap.set(profile.id, profile);
          });
        }
        
        // Map the listings with profile information
        const mappedListings = listingsData.map((listing: any) => {
          const profile = profilesMap.get(listing.user_id);
          return {
            id: listing.id,
            title: listing.title,
            description: listing.description,
            budget_range: listing.budget_range,
            duration: listing.duration,
            goals: listing.goals || [],
            company: profile?.company || "Unknown Company",
            companyLogo: profile?.avatar_url || "",
            user_id: listing.user_id,
            postedAt: new Date(listing.created_at).toLocaleDateString(),
            partnership_type: listing.partnership_type || "offering",
            location: listing.location,
            target_audience: listing.target_audience,
            resources_to_share: listing.resources_to_share || [],
            business_type: listing.business_type
          };
        }) as Listing[];

        console.log("Mapped listings:", mappedListings.length, mappedListings);
        return mappedListings;
      } catch (error) {
        console.error("Unexpected error in listings query:", error);
        toast.error("An unexpected error occurred while fetching listings");
        return [];
      }
    },
    // Only run the query when userId is available
    enabled: !!userId,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    refetchInterval: false, // Disable auto-refetching to reduce load
  });
};
