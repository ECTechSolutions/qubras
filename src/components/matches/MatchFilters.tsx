
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

const MatchFilters = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Industry</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>Software</DropdownMenuItem>
          <DropdownMenuItem>Marketing</DropdownMenuItem>
          <DropdownMenuItem>Design</DropdownMenuItem>
          <DropdownMenuItem>Finance</DropdownMenuItem>
          <DropdownMenuItem>Sustainability</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Compatibility</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>Above 90%</DropdownMenuItem>
          <DropdownMenuItem>Above 80%</DropdownMenuItem>
          <DropdownMenuItem>Above 70%</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Reset Filters</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MatchFilters;
