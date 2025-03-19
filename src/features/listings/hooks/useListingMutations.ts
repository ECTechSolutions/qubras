
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Listing, ListingFormData } from "../types";

export const useListingMutations = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  const createListingMutation = useMutation({
    mutationFn: async (newListing: ListingFormData) => {
      if (!userId) throw new Error("You must be logged in to create a listing");

      const { data, error } = await supabase.from("listings").insert({
        title: newListing.title,
        description: newListing.description,
        budget_range: newListing.budget,
        duration: newListing.duration,
        goals: newListing.categories,
        user_id: userId,
        partnership_type: newListing.partnership_type,
        location: newListing.location,
        target_audience: newListing.target_audience,
        resources_to_share: newListing.resources_to_share,
        business_type: newListing.business_type
      }).select();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      toast.success("Listing created successfully");
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
    onError: (error) => {
      console.error("Error creating listing:", error);
      toast.error("Failed to create listing");
    }
  });

  const updateListingMutation = useMutation({
    mutationFn: async ({ listingId, updatedListing }: { listingId: string, updatedListing: ListingFormData }) => {
      if (!userId) throw new Error("You must be logged in to update a listing");
      if (!listingId) throw new Error("No listing selected for update");

      const { data, error } = await supabase
        .from("listings")
        .update({
          title: updatedListing.title,
          description: updatedListing.description,
          budget_range: updatedListing.budget,
          duration: updatedListing.duration,
          goals: updatedListing.categories,
          partnership_type: updatedListing.partnership_type,
          location: updatedListing.location,
          target_audience: updatedListing.target_audience,
          resources_to_share: updatedListing.resources_to_share,
          business_type: updatedListing.business_type
        })
        .eq("id", listingId)
        .eq("user_id", userId)
        .select();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      toast.success("Listing updated successfully");
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
    onError: (error) => {
      console.error("Error updating listing:", error);
      toast.error("Failed to update listing");
    }
  });

  const deleteListingMutation = useMutation({
    mutationFn: async (listingId: string) => {
      if (!userId) throw new Error("You must be logged in to delete a listing");

      const { error } = await supabase
        .from("listings")
        .delete()
        .eq("id", listingId)
        .eq("user_id", userId);

      if (error) {
        throw error;
      }

      return listingId;
    },
    onSuccess: () => {
      toast.success("Listing deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
    onError: (error) => {
      console.error("Error deleting listing:", error);
      toast.error("Failed to delete listing");
    }
  });

  return {
    createListingMutation,
    updateListingMutation,
    deleteListingMutation,
  };
};
