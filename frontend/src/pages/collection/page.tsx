import CardBox from "./cardBox";
import { useGetCatalogCards } from "@/requests/gen/react-query/catalog";

const CollectionPage = () => {
  const { data } = useGetCatalogCards();

  const numCards = data?.length || 0;
  const numRows = Math.ceil(numCards / 3);

  return (
    <div>
      {Array.from({ length: numRows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex flex-row items-center">
          {data?.slice(rowIndex * 3, rowIndex * 3 + 3).map((card, index) => (
            <CardBox key={index} card={card} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CollectionPage;
