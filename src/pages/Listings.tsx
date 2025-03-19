
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import ListingModal from "@/components/modals/ListingModal";
import { Listing } from "@/features/listings/types";
import { useListingsQuery } from "@/features/listings/hooks/useListingsQuery";
import { useListingMutations } from "@/features/listings/hooks/useListingMutations";
import ListingsHeader from "@/features/listings/components/ListingsHeader";
import ListingsTabs from "@/features/listings/components/ListingsTabs";

const Listings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user } = useAuth();
  
  const { data: listings = [], isLoading } = useListingsQuery(user?.id);
  
  const { 
    createListingMutation, 
    updateListingMutation, 
    deleteListingMutation 
  } = useListingMutations(user?.id);

  const handleCreateListing = (data: any) => {
    createListingMutation.mutate(data);
  };

  const handleUpdateListing = (data: any) => {
    if (!selectedListing) return;
    updateListingMutation.mutate({ 
      listingId: selectedListing.id, 
      updatedListing: data 
    });
  };

  const handleDeleteListing = (id: string) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      deleteListingMutation.mutate(id);
    }
  };

  const handleEditListing = (listing: Listing) => {
    setSelectedListing(listing);
    setIsEditModalOpen(true);
  };

  const handleViewListing = (id: string) => {
    const listing = listings.find((l) => l.id === id);
    setSelectedListing(listing || null);
  };

  const handleContactListing = (id: string) => {
    toast.info("Contact functionality coming soon!");
  };

  const filteredListings = listings.filter((listing) => {
    return (
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (listing.company?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    );
  });

  const myListings = listings.filter((listing) => listing.user_id === user?.id);

  return (
    <div className="container py-8">
      <ListingsHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCreateClick={() => setIsCreateModalOpen(true)}
      />

      <ListingsTabs 
        allListings={filteredListings}
        myListings={myListings}
        isLoading={isLoading}
        onView={handleViewListing}
        onContact={handleContactListing}
        onCreateClick={() => setIsCreateModalOpen(true)}
        onEdit={handleEditListing}
        onDelete={handleDeleteListing}
      />

      <ListingModal 
        open={isCreateModalOpen} 
        onOpenChange={setIsCreateModalOpen}
        onSubmit={handleCreateListing}
      />

      {selectedListing && (
        <ListingModal 
          open={isEditModalOpen} 
          onOpenChange={setIsEditModalOpen}
          onSubmit={handleUpdateListing}
          isEdit={true}
          initialData={{
            title: selectedListing.title,
            description: selectedListing.description,
            budget: selectedListing.budget_range,
            duration: selectedListing.duration,
            categories: selectedListing.goals,
          }}
        />
      )}
    </div>
  );
};

export default Listings;
