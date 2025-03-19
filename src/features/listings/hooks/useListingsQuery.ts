
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Listing } from "../types";

export const useListingsQuery = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      console.log("Fetching listings for userId:", userId);
      
      try {
        // First fetch all listings
        const { data: listingsData, error: listingsError } = await supabase
          .from("listings")
          .select("*")
          .order("created_at", { ascending: false });

        if (listingsError) {
          console.error("Error fetching listings:", listingsError);
          toast.error("Failed to fetch listings");
          throw listingsError;
        }

        if (!listingsData || listingsData.length === 0) {
          console.log("No listings data returned");
          return [];
        }

        // Get unique user IDs from listings to fetch profiles in a separate query
        const userIds = [...new Set(listingsData.map(listing => listing.user_id))];
        
        // Fetch profiles for the user IDs
        const { data: profilesData, error: profilesError } = await supabase
          .from("profiles")
          .select("id, name, company, avatar_url")
          .in("id", userIds);
          
        if (profilesError) {
          console.error("Error fetching profiles:", profilesError);
          // Continue with listings only
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
    // Ensure the query runs immediately
    enabled: true,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
