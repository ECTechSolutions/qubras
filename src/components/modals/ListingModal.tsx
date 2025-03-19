
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
  console.log("ListingModal render:", { open, isEdit });
  
  const handleSubmit = (data: any) => {
    console.log("ListingModal form submitted:", data);
    onSubmit?.(data);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
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
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isEdit={isEdit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ListingModal;
