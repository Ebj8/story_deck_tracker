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
import { Filter, Table, Grid3X3, ChevronLeft } from "lucide-react";
import FilterContent from "@/pages/collection/FilterContent";

export default function StoryDeckTracker() {
  const { data } = useGetCatalogCards();
  const { user } = useUser();
  const {
    data: collection,
    refetch: refetchCollection,
    isLoading: collectionIsLoading,
  } = useGetCollection(user?.uid || "");
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

  // Filter the collection to only include cards that are in the filteredCards
  const filteredCollection = collection?.filter((card) =>
    filteredCards?.some((filteredCard) => filteredCard.card_id === card.card_id)
  );

  return (
    <div className="min-h-screen w-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Desktop Filters Sidebar */}
        <div
          className={`hidden min-h-full md:block bg-white border-r border-gray-200 transition-all duration-300 ${
            filtersOpen ? "w-1/5" : "w-12 items-center justify-center"
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

            {filtersOpen && (
              <FilterContent
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                selectedSet={selectedSet}
                setSelectedSet={setSelectedSet}
                collectionFilter={collectionFilter}
                setCollectionFilter={setCollectionFilter}
                showVariants={showVariants}
                setShowVariants={setShowVariants}
                releaseYears={releaseYears}
                sets={sets}
              />
            )}
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 p-4 sm:p-6 sm:pr-[10%] transition-all duration-300 ${
            !filtersOpen ? "sm:pl-[10%]" : ""
          }`}
        >
          {/* View Controls */}
          <div className="flex flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                {filteredCards?.length} cards
              </Badge>
              {user && (
                <Badge variant="outline" className="text-sm">
                  {collectedCount} collected
                </Badge>
              )}
            </div>
            {user && (
              <div className="flex items-center gap-2">
                <Label htmlFor="table-view" className="text-sm">
                  {isTableView ? "Grid" : "Table"}
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
            )}
          </div>

          {/* Cards Grid - Responsive */}
          {!isTableView ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start justify-items-center gap-4">
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
            <CollectionTable
              data={filteredCollection}
              isLoading={collectionIsLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
