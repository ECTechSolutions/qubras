
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import CategorySelector from "./CategorySelector";
import { DialogFooter } from "@/components/ui/dialog";

interface ListingFormProps {
  initialData?: {
    title?: string;
    description?: string;
    budget?: string;
    duration?: string;
    categories?: string[];
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

const ListingForm = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isEdit = false 
}: ListingFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [budget, setBudget] = useState(initialData?.budget || "");
  const [duration, setDuration] = useState(initialData?.duration || "");
  const [categories, setCategories] = useState<string[]>(initialData?.categories || []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      title,
      description,
      budget,
      duration,
      categories,
    };
    
    onSubmit(data);
  };
  
  return (
    <form onSubmit={handleSubmit}>
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
        
        <CategorySelector 
          categories={categories}
          setCategories={setCategories}
        />
      </div>
      
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit">
          {isEdit ? "Save Changes" : "Create Listing"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ListingForm;
