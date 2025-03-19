
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";

interface ListingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
  isEdit?: boolean;
  initialData?: any;
}

const CATEGORIES = [
  "Social Media",
  "Email Marketing",
  "Content Creation",
  "Influencer Marketing",
  "SEO",
  "PPC",
  "Event Marketing",
  "Affiliate Marketing",
  "Video Marketing"
];

const ListingModal = ({ 
  open, 
  onOpenChange, 
  onSubmit, 
  isEdit = false,
  initialData 
}: ListingModalProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [budget, setBudget] = useState(initialData?.budget || "");
  const [duration, setDuration] = useState(initialData?.duration || "");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>(initialData?.categories || []);
  
  const handleAddCategory = () => {
    if (category && !categories.includes(category)) {
      setCategories([...categories, category]);
      setCategory("");
    }
  };
  
  const handleRemoveCategory = (cat: string) => {
    setCategories(categories.filter((c) => c !== cat));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      title,
      description,
      budget,
      duration,
      categories,
    };
    
    onSubmit?.(data);
    
    if (!isEdit) {
      // Reset form if not editing
      setTitle("");
      setDescription("");
      setBudget("");
      setDuration("");
      setCategories([]);
    }
    
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
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
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="E.g. Social Media Cross-Promotion"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your co-marketing opportunity..."
                className="min-h-[120px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="budget">Budget</Label>
                <Select value={budget} onValueChange={setBudget} required>
                  <SelectTrigger id="budget">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="$1,000 - $5,000">$1,000 - $5,000</SelectItem>
                    <SelectItem value="$5,000 - $10,000">$5,000 - $10,000</SelectItem>
                    <SelectItem value="$10,000 - $20,000">$10,000 - $20,000</SelectItem>
                    <SelectItem value="$20,000+">$20,000+</SelectItem>
                    <SelectItem value="No Budget">No Budget</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Select value={duration} onValueChange={setDuration} required>
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="< 1 month">{"< 1 month"}</SelectItem>
                    <SelectItem value="1-3 months">1-3 months</SelectItem>
                    <SelectItem value="3-6 months">3-6 months</SelectItem>
                    <SelectItem value="6+ months">6+ months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Categories</Label>
              <div className="flex gap-2">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  type="button" 
                  size="icon" 
                  onClick={handleAddCategory}
                  disabled={!category}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add category</span>
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((cat) => (
                  <Badge key={cat} variant="secondary" className="pr-1">
                    {cat}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1"
                      onClick={() => handleRemoveCategory(cat)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {cat}</span>
                    </Button>
                  </Badge>
                ))}
                {categories.length === 0 && (
                  <span className="text-sm text-muted-foreground">
                    No categories selected
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEdit ? "Save Changes" : "Create Listing"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ListingModal;
