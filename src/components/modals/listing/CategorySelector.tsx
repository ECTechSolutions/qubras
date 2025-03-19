
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { CATEGORIES } from "./constants";

interface CategorySelectorProps {
  categories: string[];
  setCategories: (categories: string[]) => void;
}

const CategorySelector = ({ categories, setCategories }: CategorySelectorProps) => {
  const [category, setCategory] = useState("");
  
  const handleAddCategory = () => {
    if (category && !categories.includes(category)) {
      setCategories([...categories, category]);
      setCategory("");
    }
  };
  
  const handleRemoveCategory = (cat: string) => {
    setCategories(categories.filter((c) => c !== cat));
  };

  return (
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
  );
};

export default CategorySelector;
