
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
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

interface ListingFormProps {
  initialData?: {
    title?: string;
    description?: string;
    budget?: string;
    duration?: string;
    categories?: string[];
    partnership_type?: string;
    location?: string;
    target_audience?: string;
    resources_to_share?: string[];
    business_type?: string;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

const BUSINESS_TYPES = ["B2B", "B2C", "B2B2C", "D2C", "Other"];

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
  const [partnershipType, setPartnershipType] = useState(initialData?.partnership_type || "offering");
  const [location, setLocation] = useState(initialData?.location || "");
  const [targetAudience, setTargetAudience] = useState(initialData?.target_audience || "");
  const [businessType, setBusinessType] = useState(initialData?.business_type || "");
  const [resources, setResources] = useState<string[]>(initialData?.resources_to_share || []);
  const [resource, setResource] = useState("");
  
  const handleAddResource = () => {
    if (resource && !resources.includes(resource)) {
      setResources([...resources, resource]);
      setResource("");
    }
  };
  
  const handleRemoveResource = (res: string) => {
    setResources(resources.filter(r => r !== res));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      title,
      description,
      budget,
      duration,
      categories,
      partnership_type: partnershipType,
      location,
      target_audience: targetAudience,
      resources_to_share: resources,
      business_type: businessType,
    };
    
    onSubmit(data);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label>Partnership Type</Label>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="offering"
                name="partnership_type"
                value="offering"
                checked={partnershipType === "offering"}
                onChange={() => setPartnershipType("offering")}
                className="mr-2"
              />
              <Label htmlFor="offering" className="cursor-pointer">Offering Partnership</Label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="seeking"
                name="partnership_type"
                value="seeking"
                checked={partnershipType === "seeking"}
                onChange={() => setPartnershipType("seeking")}
                className="mr-2"
              />
              <Label htmlFor="seeking" className="cursor-pointer">Seeking Partnership</Label>
            </div>
          </div>
        </div>
        
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
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="E.g. New York, Remote, etc."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="business_type">Business Type</Label>
          <Select value={businessType} onValueChange={setBusinessType}>
            <SelectTrigger id="business_type">
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              {BUSINESS_TYPES.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="target_audience">Target Audience</Label>
          <Input
            id="target_audience"
            placeholder="Describe your target audience"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
          />
        </div>
        
        <CategorySelector 
          categories={categories}
          setCategories={setCategories}
        />
        
        <div className="grid gap-2">
          <Label>Resources to Share</Label>
          <div className="flex gap-2">
            <Input
              placeholder="E.g. Email List, Social Media, etc."
              value={resource}
              onChange={(e) => setResource(e.target.value)}
            />
            <Button 
              type="button" 
              size="icon" 
              onClick={handleAddResource}
              disabled={!resource}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add resource</span>
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {resources.map((res) => (
              <Badge key={res} variant="secondary" className="pr-1">
                {res}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1"
                  onClick={() => handleRemoveResource(res)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {res}</span>
                </Button>
              </Badge>
            ))}
            {resources.length === 0 && (
              <span className="text-sm text-muted-foreground">
                No resources added
              </span>
            )}
          </div>
        </div>
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
