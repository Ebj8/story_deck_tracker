"use client";

import CardBox from "@/pages/collection/cardBox";
import CollectionTable from "@/pages/collection/collectionTable";
import { useState } from "react";
import { useGetCatalogCards } from "@/requests/gen/react-query/catalog";
import { useGetCollection } from "@/requests/gen/react-query/collection";
import { useGetSets } from "@/requests/gen/react-query/set";
import { useUser } from "@/auth/UserContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Table, Grid3X3, ChevronLeft } from "lucide-react";

export default function StoryDeckTracker() {
  const { data } = useGetCatalogCards();
  const { user } = useUser();
  const { data: collection, refetch: refetchCollection } = useGetCollection(
    user?.uid || ""
  );
  const { data: sets } = useGetSets();
  const [isTableView, setIsTableView] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(true);

  // Filter states
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [selectedSet, setSelectedSet] = useState("All Sets");
  const [showVariants, setShowVariants] = useState("all"); // all, none, pure_nonsense
  const [collectionFilter, setCollectionFilter] = useState("all"); // all, collected, uncollected

  // Make an array out of the unique card_id from the collection
  const collectionCardIds = Array.from(
    new Set(collection?.map((card) => card.card_id) || [])
  );

  // Make an array out of the unique release years from the sets
  const releaseYears = Array.from(
    new Set(sets?.map((set) => set.release_year) || [])
  ).sort((a, b) => b - a); // Sort descending

  // Filter cards based on the selected filters
  const filteredCards = data?.filter((card) => {
    // Year filter
    if (
      selectedYear !== "All Years" &&
      card.set.release_year !== Number(selectedYear)
    )
      return false;
    // Set filter
    if (selectedSet !== "All Sets" && card.set.set_name !== selectedSet)
      return false;

    // Collection filter
    if (
      collectionFilter === "collected" &&
      !collectionCardIds.includes(card.card_id)
    )
      return false;

    if (
      collectionFilter === "uncollected" &&
      collectionCardIds.includes(card.card_id)
    )
      return false;

    // Variant filter
    if (showVariants === "none" && card.is_variant) return false;
    if (showVariants === "pure_nonsense" && !card.is_variant) return false;

    return true;
  });

  // Count of collected cards from the filtered cards
  const collectedCount = filteredCards?.filter((card) =>
    collectionCardIds.includes(card.card_id)
  ).length;

  const FilterContent = () => (
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
            {releaseYears?.map((year) => (
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
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="all"
              name="collection"
              value="all"
              checked={collectionFilter === "all"}
              onChange={(e) => setCollectionFilter(e.target.value)}
              className="w-4 h-4 text-purple-600"
            />
            <Label htmlFor="all" className="text-sm">
              All Cards
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="collected"
              name="collection"
              value="collected"
              checked={collectionFilter === "collected"}
              onChange={(e) => setCollectionFilter(e.target.value)}
              className="w-4 h-4 text-purple-600"
            />
            <Label htmlFor="collected" className="text-sm">
              Collected Only
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="uncollected"
              name="collection"
              value="uncollected"
              checked={collectionFilter === "uncollected"}
              onChange={(e) => setCollectionFilter(e.target.value)}
              className="w-4 h-4 text-purple-600"
            />
            <Label htmlFor="uncollected" className="text-sm">
              Missing Only
            </Label>
          </div>
        </div>
      </div>

      <Separator />

      {/* Variant Options */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Collection Status</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="all"
              name="variants"
              value="all"
              checked={showVariants === "all"}
              onChange={(e) => setShowVariants(e.target.value)}
              className="w-4 h-4 text-purple-600"
            />
            <Label htmlFor="all" className="text-sm">
              All Cards
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="none"
              name="variants"
              value="none"
              checked={showVariants === "none"}
              onChange={(e) => setShowVariants(e.target.value)}
              className="w-4 h-4 text-purple-600"
            />
            <Label htmlFor="collected" className="text-sm">
              No Variants
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="pure_nonsense"
              name="variants"
              value="pure_nonsense"
              checked={showVariants === "pure_nonsense"}
              onChange={(e) => setShowVariants(e.target.value)}
              className="w-4 h-4 text-purple-600"
            />
            <Label htmlFor="uncollected" className="text-sm">
              Pure Nonsense
            </Label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Desktop Filters Sidebar */}
        <div
          className={`hidden min-h-full md:block bg-white border-r border-gray-200 transition-all duration-300 ${
            filtersOpen ? "w-1/4" : "w-12 items-center justify-center"
          }`}
        >
          <div className="p-4 w-full">
            <div className="flex items-center justify-between mb-4">
              {filtersOpen && (
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h2>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFiltersOpen(!filtersOpen)}
                className={` ${
                  !filtersOpen ? "w-full flex justify-center" : ""
                }`}
              >
                {filtersOpen ? (
                  <ChevronLeft className="w-4 h-4" />
                ) : (
                  <Filter className="w-5 h-5" />
                )}
              </Button>
            </div>

            {filtersOpen && <FilterContent />}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6">
          {/* View Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                {filteredCards?.length} cards
              </Badge>
              <Badge variant="outline" className="text-sm">
                {collectedCount} collected
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="table-view" className="text-sm">
                Switch to Table
              </Label>
              <Switch
                id="table-view"
                checked={isTableView}
                onCheckedChange={setIsTableView}
              />
              {isTableView ? (
                <Table className="w-4 h-4" />
              ) : (
                <Grid3X3 className="w-4 h-4" />
              )}
            </div>
          </div>

          {/* Cards Grid - Responsive */}
          {!isTableView ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center">
              {filteredCards?.map((card, index) => (
                <CardBox
                  key={index}
                  card={card}
                  collection={collection}
                  refetchCollection={refetchCollection}
                />
              ))}
            </div>
          ) : (
            <CollectionTable />
          )}
        </div>
      </div>
    </div>
  );
}
