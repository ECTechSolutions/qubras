
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ListingCard from "@/components/cards/ListingCard";
import ListingModal from "@/components/modals/ListingModal";

// Define the listing type based on our database schema
interface Listing {
  id: string;
  title: string;
  description: string;
  budget_range: string;
  duration: string;
  goals: string[];
  user_id: string;
  company?: string;
  companyLogo?: string;
  postedAt?: string;
}

const Listings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all listings
  const { data: listings = [], isLoading } = useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*, profiles(name, company, avatar_url)")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to fetch listings");
        throw error;
      }

      // Transform data to match our component expectations
      return data.map((listing: any) => ({
        id: listing.id,
        title: listing.title,
        description: listing.description,
        budget: listing.budget_range,
        duration: listing.duration,
        categories: listing.goals || [],
        company: listing.profiles?.company || "Unknown Company",
        companyLogo: listing.profiles?.avatar_url || "",
        user_id: listing.user_id,
        postedAt: new Date(listing.created_at).toLocaleDateString(),
      }));
    },
    enabled: !!user,
  });

  // Create a new listing
  const createListingMutation = useMutation({
    mutationFn: async (newListing: any) => {
      if (!user) throw new Error("You must be logged in to create a listing");

      const { data, error } = await supabase.from("listings").insert({
        title: newListing.title,
        description: newListing.description,
        budget_range: newListing.budget,
        duration: newListing.duration,
        goals: newListing.categories,
        user_id: user.id,
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

  // Update an existing listing
  const updateListingMutation = useMutation({
    mutationFn: async (updatedListing: any) => {
      if (!user) throw new Error("You must be logged in to update a listing");
      if (!selectedListing) throw new Error("No listing selected for update");

      const { data, error } = await supabase
        .from("listings")
        .update({
          title: updatedListing.title,
          description: updatedListing.description,
          budget_range: updatedListing.budget,
          duration: updatedListing.duration,
          goals: updatedListing.categories,
        })
        .eq("id", selectedListing.id)
        .eq("user_id", user.id)
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

  // Delete a listing
  const deleteListingMutation = useMutation({
    mutationFn: async (listingId: string) => {
      if (!user) throw new Error("You must be logged in to delete a listing");

      const { error } = await supabase
        .from("listings")
        .delete()
        .eq("id", listingId)
        .eq("user_id", user.id);

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

  const handleCreateListing = (data: any) => {
    createListingMutation.mutate(data);
  };

  const handleUpdateListing = (data: any) => {
    updateListingMutation.mutate(data);
  };

  const handleDeleteListing = (id: string) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      deleteListingMutation.mutate(id);
    }
  };

  const handleEditListing = (listing: any) => {
    setSelectedListing(listing);
    setIsEditModalOpen(true);
  };

  const handleViewListing = (id: string) => {
    const listing = listings.find((l: any) => l.id === id);
    setSelectedListing(listing || null);
    // Here you could navigate to a detail page or open a modal with details
  };

  const handleContactListing = (id: string) => {
    // Here you would typically open a messaging interface or contact form
    toast.info("Contact functionality coming soon!");
  };

  // Filter listings by search query
  const filteredListings = listings.filter((listing: any) => {
    return (
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Filter listings for "My Listings" tab
  const myListings = listings.filter((listing: any) => listing.user_id === user?.id);

  return (
    <div className="container py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Co-Marketing Listings</h1>
        <p className="text-muted-foreground">
          Discover opportunities or create your own listing to find partners
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search listings by title, description or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="gap-1 bg-qubras-600 hover:bg-qubras-700">
          <Plus className="h-4 w-4" />
          Create Listing
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="all">All Listings</TabsTrigger>
            <TabsTrigger value="my-listings">My Listings</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-qubras-600 mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading listings...</p>
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">No listings found.</p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => setIsCreateModalOpen(true)}
              >
                Create your first listing
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing: any) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onView={handleViewListing}
                  onContact={handleContactListing}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="my-listings" className="mt-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-qubras-600 mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading your listings...</p>
            </div>
          ) : myListings.length === 0 ? (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">You don't have any listings yet.</p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => setIsCreateModalOpen(true)}
              >
                Create your first listing
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myListings.map((listing: any) => (
                <div key={listing.id} className="relative group">
                  <ListingCard
                    listing={listing}
                    onView={handleViewListing}
                    onContact={handleContactListing}
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mr-2"
                      onClick={() => handleEditListing(listing)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteListing(listing.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Create Listing Modal */}
      <ListingModal 
        open={isCreateModalOpen} 
        onOpenChange={setIsCreateModalOpen}
        onSubmit={handleCreateListing}
      />

      {/* Edit Listing Modal */}
      {selectedListing && (
        <ListingModal 
          open={isEditModalOpen} 
          onOpenChange={setIsEditModalOpen}
          onSubmit={handleUpdateListing}
          isEdit={true}
          initialData={{
            title: selectedListing.title,
            description: selectedListing.description,
            budget: selectedListing.budget,
            duration: selectedListing.duration,
            categories: selectedListing.categories,
          }}
        />
      )}
    </div>
  );
};

export default Listings;
