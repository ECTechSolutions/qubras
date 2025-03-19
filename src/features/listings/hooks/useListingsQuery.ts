
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
        // Explicitly fetch all listings without filtering by user_id
        const { data, error } = await supabase
          .from("listings")
          .select("*, profiles(name, company, avatar_url)")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching listings:", error);
          toast.error("Failed to fetch listings");
          throw error;
        }

        console.log("Listings data fetched:", data);
        
        if (!data) {
          console.log("No listings data returned");
          return [];
        }
        
        const mappedListings = data.map((listing: any) => ({
          id: listing.id,
          title: listing.title,
          description: listing.description,
          budget_range: listing.budget_range,
          duration: listing.duration,
          goals: listing.goals || [],
          company: listing.profiles?.company || "Unknown Company",
          companyLogo: listing.profiles?.avatar_url || "",
          user_id: listing.user_id,
          postedAt: new Date(listing.created_at).toLocaleDateString(),
        })) as Listing[];

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
