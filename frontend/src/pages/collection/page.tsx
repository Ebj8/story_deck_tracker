"use client";

import CardBox from "@/pages/collection/cardBox";
import { useState } from "react";
import { useGetCatalogCards } from "@/requests/gen/react-query/catalog";
import { useGetCollection } from "@/requests/gen/react-query/collection";
import { useGetSets } from "@/requests/gen/react-query/set";
import { useUser } from "@/auth/UserContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, ChevronLeft } from "lucide-react";
import FilterContent from "@/pages/collection/FilterContent";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function StoryDeckTracker() {
  const { data } = useGetCatalogCards();
  const { user } = useUser();
  const { data: collection, refetch: refetchCollection } = useGetCollection(
    user?.uid || ""
  );
  const { data: sets } = useGetSets();
  const [filtersOpen, setFiltersOpen] = useState(true);

  // Unified filter state
  const [filterValues, setFilterValues] = useState({
    year: "All Years",
    set: "All Sets",
    collection: "all",
    variants: "all",
    foil: "all",
  });

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
      filterValues.year !== "All Years" &&
      card.set.release_year !== Number(filterValues.year)
    )
      return false;
    // Set filter
    if (
      filterValues.set !== "All Sets" &&
      card.set.set_name !== filterValues.set
    )
      return false;

    // Collection filter
    if (
      filterValues.collection === "collected" &&
      !collectionCardIds.includes(card.card_id)
    )
      return false;

    if (
      filterValues.collection === "uncollected" &&
      collectionCardIds.includes(card.card_id)
    )
      return false;

    // Variant filter
    if (filterValues.variants === "none" && card.is_variant) return false;
    if (filterValues.variants === "pure_nonsense" && !card.is_variant)
      return false;

    return true;
  });

  // Count of collected cards from the filtered cards
  const collectedCount = filteredCards?.filter((card) =>
    collectionCardIds.includes(card.card_id)
  ).length;

  // Fix: Use max-w-screen-2xl and mx-auto to constrain width and center content
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen mx-auto w-full">
        {/* Desktop Filters Sidebar */}
        <div
          className={`hidden min-h-full xl:block bg-white border-r border-gray-200 transition-all duration-300 ${
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
                filterValues={filterValues}
                setFilterValues={setFilterValues}
                releaseYears={releaseYears}
                sets={sets}
              />
            )}
          </div>
        </div>

        {/* Main Content Wrapper for consistent width */}
        <div
          className={`flex-1 p-4 sm:p-6 xl:pr-[20%] transition-all duration-300 ${
            !filtersOpen ? "xl:pl-[calc(20%-24px)]" : ""
          }`}
        >
          <div className="max-w-screen-2xl mx-auto w-full">
            {/* View Controls */}
            <div className="flex flex-row items-center justify-center gap-4 mb-6 sticky sm:top-0 top-12 bg-gray-50 z-20 py-4">
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex gap-4">
                  <Sheet>
                    <SheetTrigger>
                      <Button
                        variant="outline"
                        size="icon"
                        className="xl:hidden"
                      >
                        <Filter className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <FilterContent
                        filterValues={filterValues}
                        setFilterValues={setFilterValues}
                        releaseYears={releaseYears}
                        sets={sets}
                      />
                    </SheetContent>
                  </Sheet>

                  <Badge variant="secondary" className="text-sm">
                    {filteredCards?.length} cards
                  </Badge>
                  {user && (
                    <Badge variant="outline" className="text-sm">
                      {collectedCount} collected
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Cards Grid - Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-4 w-full justify-self-center">
              {filterValues.foil !== "foil" &&
                filteredCards?.map((card, index) => (
                  <CardBox
                    key={index}
                    card={card}
                    isFoil={false}
                    collection={collection}
                    refetchCollection={refetchCollection}
                  />
                ))}
              {filterValues.foil !== "non-foil" &&
                filteredCards?.map((card, index) => (
                  <CardBox
                    key={index}
                    card={card}
                    isFoil={true}
                    collection={collection}
                    refetchCollection={refetchCollection}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
