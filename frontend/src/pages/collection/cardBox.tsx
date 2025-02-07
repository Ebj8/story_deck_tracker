import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Counter from "@/components/ui/Counter";
import { motion, AnimatePresence } from "framer-motion";
import {
  CatalogCardRead,
  CollectionCounts,
} from "@/requests/gen/react-query/fastAPI.schemas";
import { useUser } from "@/auth/UserContext";
import { useCreateCollectionRow } from "@/requests/gen/react-query/collection";

interface CardBoxProps {
  card: CatalogCardRead;
  collection: CollectionCounts[] | undefined;
}

const CardBox = ({ card, collection }: CardBoxProps) => {
  // colored is used to determine if a card should be colored or grayscale
  const [colored, setColored] = useState(false);
  // Fetch the user to determine if we should render collection update buttons
  const { user } = useUser();

  // Filter collections
  const filteredCollection = collection?.filter(
    (item) => item.card_id === card.card_id
  );
  const regCollection = filteredCollection?.find((item) => !item.is_foil);
  const foilCollection = filteredCollection?.find((item) => item.is_foil);

  // Initialize state from props
  const [regQty, setRegQty] = useState(() => regCollection?.qty ?? 0);
  const [foilQty, setFoilQty] = useState(() => foilCollection?.qty ?? 0);

  const mutation = useCreateCollectionRow();

  // Update state only when collection changes
  useEffect(() => {
    setRegQty(regCollection?.qty ?? 0);
    setFoilQty(foilCollection?.qty ?? 0);
  }, [collection]); // Depend on `collection` instead of filteredCollection

  // Handle color animation
  useEffect(() => {
    setColored(regQty > 0 || foilQty > 0);
  }, [regQty, foilQty]);

  const handleRegIncrease = () => {
    if (regQty === 0 && user != undefined) {
      mutation.mutate(
        {
          data: {
            user_id: user?.uid,
            card_id: card.card_id,
            is_foil: false,
            qty: 1,
            condition: "NM",
          },
        },
        {
          onSuccess: (response) => {
            console.log("Set created successfully!", response);
          },
          onError: (error) => {
            console.error("Error creating set:", error);
          },
        }
      );
    }
    setRegQty((prev) => prev + 1);
  };

  const handleFoilIncrease = () => {
    if (foilQty === 0 && user != undefined) {
      mutation.mutate(
        {
          data: {
            user_id: user?.uid,
            card_id: card.card_id,
            is_foil: true,
            qty: 1,
            condition: "NM",
          },
        },
        {
          onSuccess: (response) => {
            console.log("Set created successfully!", response);
          },
          onError: (error) => {
            console.error("Error creating set:", error);
          },
        }
      );
    }
    setFoilQty((prev) => prev + 1);
  };

  // Default image if no image is provided
  const imageUrl =
    card.img_front_url ||
    "https://firebasestorage.googleapis.com/v0/b/sd-tracker-449515.firebasestorage.app/o/card_images%2Fplaceholder_image.jpeg?alt=media&token=0de3b6fe-c7eb-4ab4-9a7c-49d1aadb95a5";

  return (
    <Card className="m-4 w-[100%]">
      <CardContent>
        <AnimatePresence mode="popLayout">
          <motion.img
            // whenever key changes the animation triggers so we trigger the animation
            // whenever card quantities change
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
        {user && (
          <div className="grid grid-cols-2 gap-8 items-center justify-center">
            {/* Regular & Foil Counters */}
            <Counter
              label="Regular"
              count={regQty}
              onIncrement={handleRegIncrease}
              onDecrement={() => setRegQty((prev) => Math.max(0, prev - 1))}
            />
            <Counter
              label="Foil"
              count={foilQty}
              onIncrement={handleFoilIncrease}
              onDecrement={() => setFoilQty((prev) => Math.max(0, prev - 1))}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CardBox;
