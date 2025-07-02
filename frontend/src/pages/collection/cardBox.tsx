import Counter from "@/components/ui/Counter";
import { motion, AnimatePresence } from "framer-motion";
import {
  CatalogCardRead,
  CollectionRead,
} from "@/requests/gen/react-query/fastAPI.schemas";
import { useUser } from "@/auth/UserContext";
import {
  useCreateCollectionRow,
  useUpdateCollectionRow,
} from "@/requests/gen/react-query/collection";
import { Minus } from "lucide-react";

interface CardBoxProps {
  card: CatalogCardRead;
  collection: CollectionRead[] | undefined;
  isFoil: boolean;
  refetchCollection: () => void;
}

const CardBox = ({
  card,
  collection,
  isFoil,
  refetchCollection,
}: CardBoxProps) => {
  const { user } = useUser();

  // Filter collections for this card
  const regCollection =
    collection?.filter(
      (item) => item.card_id === card.card_id && !item.is_foil
    ) || [];

  const foilCollection =
    collection?.filter(
      (item) => item.card_id === card.card_id && item.is_foil
    ) || [];

  const regNM = regCollection.find((item) => item.condition === "NM");
  const foilNM = foilCollection.find((item) => item.condition === "NM");

  const regQty = regCollection.reduce((sum, c) => sum + c.qty, 0);
  const foilQty = foilCollection.reduce((sum, c) => sum + c.qty, 0);
  const regNMQty = regNM?.qty ?? 0;
  const foilNMQty = foilNM?.qty ?? 0;

  const createCollectionRow = useCreateCollectionRow();
  const updateCollectionRow = useUpdateCollectionRow();

  const handleRegIncrease = () => {
    const mutation = regNMQty === 0 ? createCollectionRow : updateCollectionRow;

    mutation.mutate(
      {
        data: {
          user_id: user?.uid ?? "",
          card_id: card.card_id,
          is_foil: false,
          qty: regNMQty + 1,
          condition: "NM",
        },
      },
      {
        onSuccess: refetchCollection, // 👈 just call this
        onError: (error) => console.error("Error updating regular:", error),
      }
    );
  };

  const handleFoilIncrease = () => {
    const mutation =
      foilNMQty === 0 ? createCollectionRow : updateCollectionRow;

    mutation.mutate(
      {
        data: {
          user_id: user?.uid ?? "",
          card_id: card.card_id,
          is_foil: true,
          qty: foilNMQty + 1,
          condition: "NM",
        },
      },
      {
        onSuccess: refetchCollection,
        onError: (error) => console.error("Error updating foil:", error),
      }
    );
  };

  const handleRegDecrease = () => {
    if (regNMQty === 0) return;

    updateCollectionRow.mutate(
      {
        data: {
          user_id: user?.uid ?? "",
          card_id: card.card_id,
          is_foil: false,
          qty: Math.max(0, regNMQty - 1),
          condition: "NM",
        },
      },
      {
        onSuccess: refetchCollection,
        onError: (error) => console.error("Error decreasing regular:", error),
      }
    );
  };

  const handleFoilDecrease = () => {
    if (foilNMQty === 0) return;

    updateCollectionRow.mutate(
      {
        data: {
          user_id: user?.uid ?? "",
          card_id: card.card_id,
          is_foil: true,
          qty: Math.max(0, foilNMQty - 1),
          condition: "NM",
        },
      },
      {
        onSuccess: refetchCollection,
        onError: (error) => console.error("Error decreasing foil:", error),
      }
    );
  };

  const imageUrl =
    card.img_front_url ||
    "https://firebasestorage.googleapis.com/v0/b/sd-tracker-449515.firebasestorage.app/o/card_images%2Fplaceholder_image.jpeg?alt=media&token=0de3b6fe-c7eb-4ab4-9a7c-49d1aadb95a5";

  const colored = isFoil ? foilQty > 0 || !user : regQty > 0 || !user;

  return (
    <div className="mt-4">
      <AnimatePresence mode="popLayout">
        <div className="relative inline-block m-4 mx-auto w-[230px] h-[320px] rounded-lg overflow-hidden">
          {/* Card image */}
          <motion.img
            key={regQty + foilQty}
            className="w-full h-full object-cover rounded-lg"
            src={imageUrl}
            alt="Card Image"
            initial={{ opacity: 0, scale: 0 }}
            style={{ filter: colored ? "none" : "grayscale(100%)" }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={isFoil ? handleFoilIncrease : handleRegIncrease}
            transition={{
              duration: 0.4,
              scale: { type: "spring", bounce: 0.5 },
            }}
          />

          {/* Quantity indicator square */}
          <div className="absolute top-2 right-2 bg-gray-800/80 text-white text-sm font-bold px-2 py-1 rounded min-w-[24px] text-center z-10">
            {isFoil ? foilQty : regQty}
          </div>

          {/* Decrease button */}
          <button
            onClick={isFoil ? handleFoilDecrease : handleRegDecrease}
            className="absolute top-0 left-0 w-16 h-16 bg-red-500 hover:bg-red-600 z-10 transition-colors duration-200 cursor-pointer"
            disabled={(isFoil ? foilQty : regQty) === 0}
            style={{
              clipPath: "polygon(0 0, 0 100%, 100% 0)",
              backgroundColor:
                (isFoil ? foilQty : regQty) === 0 ? "#6b7280" : undefined,
            }}
          >
            <span className="absolute top-2 left-2 text-white text-sm">
              <Minus className="w-6 h-6" />
            </span>
          </button>

          {isFoil && (
            <>
              {/* ✨ Shine Bar - CONFINED */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none rounded-lg">
                <div className="absolute w-1/3 h-full bg-gradient-to-b from-transparent via-white/40 to-transparent opacity-90 rotate-[-20deg] animate-foil-shine-inside" />
              </div>

              {/* 🌈 Enhanced Rainbow Overlay */}
              <div
                className={`absolute inset-0 pointer-events-none rounded-lg mix-blend-screen ${
                  colored ? "opacity-50" : "opacity-30"
                } bg-[linear-gradient(-45deg,#ff00cc,#3333ff,#00ffcc,#ffcc00,#ff00cc)] bg-[400%_400%] animate-foil-rainbow`}
              />
            </>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default CardBox;
