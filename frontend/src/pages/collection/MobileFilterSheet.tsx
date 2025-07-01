import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import FilterContent from "./FilterContent";
import type { SetRead } from "@/requests/gen/react-query/fastAPI.schemas";

interface MobileFilterSheetProps {
  filterValues: {
    year: string;
    set: string;
    collection: string;
    variants: string;
  };
  setFilterValues: (values: any) => void;
  releaseYears: number[];
  sets: SetRead[] | undefined;
}

export default function MobileFilterSheet({
  filterValues,
  setFilterValues,
  releaseYears,
  sets,
}: MobileFilterSheetProps) {
  const [open, setOpen] = useState(false);

  const handleFilterChange = (newValues: any) => {
    setFilterValues(newValues);
    // Optionally close the sheet when filters change
    // setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Filter className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <FilterContent
            filterValues={filterValues}
            setFilterValues={handleFilterChange}
            variant="mobile"
            data={{
              releaseYears,
              sets,
              user: null, // Will be handled inside FilterContent
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
