import CardBox from "./cardBox";
import CollectionTable from "./collectionTable";
import { useGetCatalogCards } from "@/requests/gen/react-query/catalog";
import { useGetCollection } from "@/requests/gen/react-query/collection";
import { useUser } from "@/auth/UserContext";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

const CollectionPage = () => {
  const { data } = useGetCatalogCards();
  const { user } = useUser();
  const { data: collection, refetch: refetchCollection } = useGetCollection(
    user?.uid || ""
  );
  const [cardView, setCardView] = useState(true);

  const numCards = data?.length || 0;
  const numRows = Math.ceil(numCards / 3);

  return (
    <div className="relative min-h-screen">
      {/* Switch positioned at the top right */}
      <div className="absolute top-4 right-6 z-10">
        {cardView ? "Switch to Table " : "Switch to Cards "}
        <Switch
          checked={cardView}
          onCheckedChange={(checked) => setCardView(checked)}
        />
      </div>

      {/* Add extra padding to prevent overlap */}
      <div className="pt-12">
        {cardView ? (
          <div>
            {Array.from({ length: numRows }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex flex-row items-center">
                {data
                  ?.slice(rowIndex * 3, rowIndex * 3 + 3)
                  .map((card, index) => (
                    <CardBox
                      key={index}
                      card={card}
                      collection={collection}
                      refetchCollection={refetchCollection}
                    />
                  ))}
              </div>
            ))}
          </div>
        ) : (
          <CollectionTable />
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
