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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.map((card, index) => (
                <CardBox
                  key={index}
                  card={card}
                  collection={collection}
                  refetchCollection={refetchCollection}
                />
              ))}
            </div>
          </div>
        ) : (
          <CollectionTable />
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
