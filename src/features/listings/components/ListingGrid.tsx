
import { Button } from "@/components/ui/button";
import ListingCard from "@/components/cards/ListingCard";
import { Listing, ListingCardData } from "../types";

interface ListingGridProps {
  listings: Listing[];
  isLoading: boolean;
  onView: (id: string) => void;
  onContact: (id: string) => void;
  onCreateClick?: () => void;
  showEditControls?: boolean;
  onEdit?: (listing: Listing) => void;
  onDelete?: (id: string) => void;
}

const ListingGrid = ({
  listings,
  isLoading,
  onView,
  onContact,
  onCreateClick,
  showEditControls = false,
  onEdit,
  onDelete,
}: ListingGridProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-qubras-600 mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading listings...</p>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/50 rounded-lg">
        <p className="text-muted-foreground">No listings found.</p>
        {onCreateClick && (
          <Button
            variant="outline"
            className="mt-4"
            onClick={onCreateClick}
          >
            Create your first listing
          </Button>
        )}
      </div>
    );
  }

  const mapToCardData = (listing: Listing): ListingCardData => ({
    id: listing.id,
    title: listing.title,
    company: listing.company || "Unknown Company",
    companyLogo: listing.companyLogo || "",
    description: listing.description,
    budget: listing.budget_range,
    duration: listing.duration,
    categories: listing.goals,
    postedAt: listing.postedAt || "",
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <div key={listing.id} className={`relative ${showEditControls ? 'group' : ''}`}>
          <ListingCard
            listing={mapToCardData(listing)}
            onView={onView}
            onContact={onContact}
          />
          
          {showEditControls && onEdit && onDelete && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="outline"
                size="sm"
                className="mr-2"
                onClick={() => onEdit(listing)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(listing.id)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListingGrid;
