"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { SetRead } from "@/requests/gen/react-query/fastAPI.schemas";
import { useUser } from "@/auth/UserContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface FilterContentProps {
  filterValues: {
    year: string;
    set: string;
    collection: string;
    variants: string;
    foil: string;
  };
  setFilterValues: (values: any) => void;
  releaseYears: number[];
  sets: SetRead[] | undefined;
}

export default function FilterContent({
  filterValues,
  setFilterValues,
  releaseYears,
  sets,
}: FilterContentProps) {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      {/* Year Filter */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Release Year</Label>
        <Select
          value={filterValues.year}
          onValueChange={(value) =>
            setFilterValues({ ...filterValues, year: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="all_years" value="All Years">
              All Years
            </SelectItem>
            {releaseYears.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year.toString()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Separator />

      {/* Set Filter */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Set</Label>
        <Select
          value={filterValues.set}
          onValueChange={(value) =>
            setFilterValues({ ...filterValues, set: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="all" value="All Sets">
              All Sets
            </SelectItem>
            {sets?.map((set) => (
              <SelectItem key={set.set_id} value={set.set_name}>
                {set.set_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Separator />

      {/* Collection Status */}
      {user && (
        <>
          <div className="space-y-3">
            <Label className="text-sm font-medium">Collection Status</Label>
            <RadioGroup>
              {["all", "collected", "uncollected"].map((option) => (
                <div className="flex items-center space-x-2" key={option}>
                  <RadioGroupItem
                    value={option}
                    id={option}
                    checked={filterValues.collection === option}
                    onClick={() =>
                      setFilterValues({ ...filterValues, collection: option })
                    }
                  />
                  <Label htmlFor={option} className="text-sm capitalize">
                    {option === "all"
                      ? "All Cards"
                      : option === "collected"
                      ? "Collected Only"
                      : "Missing Only"}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Separator />
        </>
      )}

      {/* Variant Options */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Variants</Label>
        <RadioGroup>
          {["all", "none", "pure_nonsense"].map((option) => (
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value={option}
                id={option}
                checked={filterValues.variants === option}
                onClick={() =>
                  setFilterValues({ ...filterValues, variants: option })
                }
              />
              <Label htmlFor={option} className="text-sm capitalize">
                {option === "all"
                  ? "All Cards"
                  : option === "none"
                  ? "No Variants"
                  : "Pure Nonsense"}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Separator />

      {/* Foil Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Foil</Label>
        <RadioGroup>
          {["all", "foil", "non-foil"].map((option) => (
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value={option}
                id={option}
                checked={filterValues.foil === option}
                onClick={() =>
                  setFilterValues({ ...filterValues, foil: option })
                }
              />
              <Label htmlFor={option} className="text-sm capitalize">
                {option === "all"
                  ? "All Cards"
                  : option === "foil"
                  ? "Foil Only"
                  : "Non-Foil Only"}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
