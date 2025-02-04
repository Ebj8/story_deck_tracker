import CardBox from "./cardBox";
import { useGetCatalogCards } from "@/requests/gen/react-query/catalog";
import { useGetCollectionCount } from "@/requests/gen/react-query/collection";
import { useUser } from "@/auth/userContext";

const CollectionPage = () => {
  const { data } = useGetCatalogCards();
  const { user } = useUser();
  const { data: collection } = useGetCollectionCount(user?.uid || "");

  const numCards = data?.length || 0;
  const numRows = Math.ceil(numCards / 3);

  return (
    <div>
      {Array.from({ length: numRows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex flex-row items-center">
          {data?.slice(rowIndex * 3, rowIndex * 3 + 3).map((card, index) => {
            return <CardBox key={index} card={card} collection={collection} />;
          })}
        </div>
      ))}
    </div>
  );
};

export default CollectionPage;
