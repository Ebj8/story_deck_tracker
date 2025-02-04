import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Counter from "@/components/ui/Counter";
import { motion, AnimatePresence } from "framer-motion";
import {
  CatalogCardRead,
  CollectionCounts,
} from "@/requests/gen/react-query/fastAPI.schemas";

interface CardBoxProps {
  card: CatalogCardRead;
  collection: CollectionCounts[] | undefined;
}

const CardBox = ({ card, collection }: CardBoxProps) => {
  const [colored, setColored] = useState(false);

  // Filter collections
  const filteredCollection = collection?.filter(
    (item) => item.card_id === card.card_id
  );
  const regCollection = filteredCollection?.find((item) => !item.is_foil);
  const foilCollection = filteredCollection?.find((item) => item.is_foil);

  // Initialize state from props
  const [regQty, setRegQty] = useState(() => regCollection?.qty ?? 0);
  const [foilQty, setFoilQty] = useState(() => foilCollection?.qty ?? 0);

  // Update state only when collection changes
  useEffect(() => {
    setRegQty(regCollection?.qty ?? 0);
    setFoilQty(foilCollection?.qty ?? 0);
  }, [collection]); // Depend on `collection` instead of filteredCollection

  // Handle color animation
  useEffect(() => {
    setColored(regQty > 0 || foilQty > 0);
  }, [regQty, foilQty]);

  const imageUrl =
    card.img_front_url ||
    "https://firebasestorage.googleapis.com/v0/b/sd-tracker-449515.firebasestorage.app/o/card_images%2Fplaceholder_image.jpeg?alt=media&token=0de3b6fe-c7eb-4ab4-9a7c-49d1aadb95a5";

  return (
    <Card className="m-4 w-[100%]">
      <CardContent>
        <AnimatePresence mode="popLayout">
          <motion.img
            key={regQty + foilQty}
            className="rounded-lg m-4 mx-auto"
            src={imageUrl}
            alt="Card Image"
            initial={{ opacity: 0, scale: 0 }}
            style={{ filter: colored ? "none" : "grayscale(100%)" }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
          />
        </AnimatePresence>
        <div className="grid grid-cols-2 gap-8 items-center justify-center">
          {/* Regular & Foil Counters */}
          <Counter
            label="Regular"
            count={regQty}
            onIncrement={() => setRegQty((prev) => prev + 1)}
            onDecrement={() => setRegQty((prev) => Math.max(0, prev - 1))}
          />
          <Counter
            label="Foil"
            count={foilQty}
            onIncrement={() => setFoilQty((prev) => prev + 1)}
            onDecrement={() => setFoilQty((prev) => Math.max(0, prev - 1))}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CardBox;
