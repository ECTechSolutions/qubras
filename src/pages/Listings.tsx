import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import ListingModal from "@/components/modals/ListingModal";
import { Listing } from "@/features/listings/types";
import { useListingsQuery } from "@/features/listings/hooks/useListingsQuery";
import { useListingMutations } from "@/features/listings/hooks/useListingMutations";
import ListingsHeader from "@/features/listings/components/ListingsHeader";
import ListingsTabs from "@/features/listings/components/ListingsTabs";
import ProfileLoading from "@/components/profile/ProfileLoading";

const Listings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user, loading: authLoading } = useAuth();
  
  const { 
    data: listings = [], 
    isLoading: listingsLoading, 
    isError, 
    refetch 
  } = useListingsQuery(user?.id);
  
  const isLoading = authLoading || listingsLoading;
  
  console.log("Listings page render:", { 
    user, 
    authLoading,
    listingsLoading, 
    listings: listings?.length || 0, 
    isError,
    createModalOpen: isCreateModalOpen
  });
  
  // Refetch when component mounts or user changes
  useEffect(() => {
    if (user) {
      console.log("Listings page mounted or user changed, refetching...");
      refetch();
    }
  }, [user, refetch]);
  
  const { 
    createListingMutation, 
    updateListingMutation, 
    deleteListingMutation 
  } = useListingMutations(user?.id);

  const handleCreateListing = (data: any) => {
    console.log("Creating listing with data:", data);
    if (!user) {
      toast.error("You must be logged in to create a listing");
      return;
    }
    
    createListingMutation.mutate(data, {
      onSuccess: () => {
        console.log("Listing created successfully");
        refetch();
      }
    });
  };

  const handleUpdateListing = (data: any) => {
    if (!selectedListing) return;
    console.log("Updating listing:", selectedListing.id, data);
    updateListingMutation.mutate({ 
      listingId: selectedListing.id, 
      updatedListing: data 
    });
  };

  const handleDeleteListing = (id: string) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      console.log("Deleting listing:", id);
      deleteListingMutation.mutate(id);
    }
  };

  const handleEditListing = (listing: Listing) => {
    console.log("Editing listing:", listing.id);
    setSelectedListing(listing);
    setIsEditModalOpen(true);
  };

  const handleViewListing = (id: string) => {
    console.log("Viewing listing:", id);
    const listing = listings.find((l) => l.id === id);
    setSelectedListing(listing || null);
  };

  const handleContactListing = (id: string) => {
    console.log("Contacting listing:", id);
    toast.info("Contact functionality coming soon!");
  };

  // Filter listings based on search query
  const filteredListings = listings.filter((listing) => {
    return (
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (listing.company?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    );
  });

  // Get only the current user's listings
  const myListings = user ? listings.filter((listing) => listing.user_id === user.id) : [];

  if (authLoading) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <h2 className="text-lg font-semibold mb-2">Authenticating...</h2>
          <p className="text-muted-foreground">Please wait while we validate your session.</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-8">
        <div className="text-center py-12 bg-destructive/10 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Error loading listings</h2>
          <p className="text-muted-foreground mb-4">
            There was a problem fetching the listings data.
          </p>
          <button 
            onClick={() => refetch()} 
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <ListingsHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCreateClick={() => {
          console.log("Create button clicked");
          setIsCreateModalOpen(true);
        }}
      />

      <ListingsTabs 
        allListings={filteredListings}
        myListings={myListings}
        isLoading={listingsLoading}
        onView={handleViewListing}
        onContact={handleContactListing}
        onCreateClick={() => {
          console.log("Create button clicked from tabs");
          setIsCreateModalOpen(true);
        }}
        onEdit={handleEditListing}
        onDelete={handleDeleteListing}
      />

      <ListingModal 
        open={isCreateModalOpen} 
        onOpenChange={(open) => {
          console.log("Create modal state changed:", open);
          setIsCreateModalOpen(open);
        }}
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
