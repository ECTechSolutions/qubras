
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ListingForm from "./listing/ListingForm";

interface ListingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
  isEdit?: boolean;
  initialData?: any;
}

const ListingModal = ({ 
  open, 
  onOpenChange, 
  onSubmit, 
  isEdit = false,
  initialData 
}: ListingModalProps) => {
  console.log("ListingModal render:", { open, isEdit, initialData });
  
  const handleSubmit = (data: any) => {
    console.log("ListingModal form submitted:", data);
    if (onSubmit) {
      onSubmit(data);
      onOpenChange(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Listing" : "Create New Listing"}
          </DialogTitle>
          <DialogDescription>
            {isEdit 
              ? "Update your co-marketing opportunity details." 
              : "Create a new co-marketing opportunity listing."}
          </DialogDescription>
        </DialogHeader>
        
        <ListingForm
          initialData={{
            title: initialData?.title || "",
            description: initialData?.description || "",
            budget: initialData?.budget || "",
            duration: initialData?.duration || "",
            categories: initialData?.categories || [],
            partnership_type: initialData?.partnership_type || "offering",
            location: initialData?.location || "",
            target_audience: initialData?.target_audience || "",
            resources_to_share: initialData?.resources_to_share || [],
            business_type: initialData?.business_type || ""
          }}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isEdit={isEdit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ListingModal;
