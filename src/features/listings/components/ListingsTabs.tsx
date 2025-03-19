
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Listing } from "../types";
import ListingGrid from "./ListingGrid";

interface ListingsTabsProps {
  allListings: Listing[];
  myListings: Listing[];
  isLoading: boolean;
  onView: (id: string) => void;
  onContact: (id: string) => void;
  onCreateClick: () => void;
  onEdit: (listing: Listing) => void;
  onDelete: (id: string) => void;
}

const ListingsTabs = ({
  allListings,
  myListings,
  isLoading,
  onView,
  onContact,
  onCreateClick,
  onEdit,
  onDelete,
}: ListingsTabsProps) => {
  return (
    <Tabs defaultValue="all" className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <TabsList>
          <TabsTrigger value="all">All Listings</TabsTrigger>
          <TabsTrigger value="my-listings">My Listings</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="all" className="mt-6">
        <ListingGrid
          listings={allListings}
          isLoading={isLoading}
          onView={onView}
          onContact={onContact}
          onCreateClick={onCreateClick}
        />
      </TabsContent>
      
      <TabsContent value="my-listings" className="mt-6">
        <ListingGrid
          listings={myListings}
          isLoading={isLoading}
          onView={onView}
          onContact={onContact}
          onCreateClick={onCreateClick}
          showEditControls={true}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ListingsTabs;
