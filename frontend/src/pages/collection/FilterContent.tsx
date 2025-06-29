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

interface FilterContentProps {
  selectedYear: string;
  setSelectedYear: (value: string) => void;
  selectedSet: string;
  setSelectedSet: (value: string) => void;
  collectionFilter: string;
  setCollectionFilter: (value: string) => void;
  showVariants: string;
  setShowVariants: (value: string) => void;
  releaseYears: number[];
  sets: SetRead[] | undefined;
}

export default function FilterContent({
  selectedYear,
  setSelectedYear,
  selectedSet,
  setSelectedSet,
  collectionFilter,
  setCollectionFilter,
  showVariants,
  setShowVariants,
  releaseYears,
  sets,
}: FilterContentProps) {
  return (
    <div className="space-y-6">
      {/* Year Filter */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Release Year</Label>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
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
        <Select value={selectedSet} onValueChange={setSelectedSet}>
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
      <div className="space-y-3">
        <Label className="text-sm font-medium">Collection Status</Label>
        {["all", "collected", "uncollected"].map((option) => (
          <div className="flex items-center space-x-2" key={option}>
            <input
              type="radio"
              id={option}
              name="collection"
              value={option}
              checked={collectionFilter === option}
              onChange={(e) => setCollectionFilter(e.target.value)}
              className="w-4 h-4 text-purple-600"
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
      </div>
      <Separator />

      {/* Variant Options */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Variants</Label>
        {["all", "none", "pure_nonsense"].map((option) => (
          <div className="flex items-center space-x-2" key={option}>
            <input
              type="radio"
              id={option}
              name="variants"
              value={option}
              checked={showVariants === option}
              onChange={(e) => setShowVariants(e.target.value)}
              className="w-4 h-4 text-purple-600"
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
      </div>
    </div>
  );
}
