import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import {
  CatalogCardRead,
  CollectionCounts,
} from "@/requests/gen/react-query/fastAPI.schemas";

interface CardBoxProps {
  card: CatalogCardRead;
  collection: CollectionCounts[] | undefined;
}

const CardBox = (props: CardBoxProps) => {
  const [colored, setColored] = useState(false);
  const filteredCollection = props.collection?.filter(
    (item) => item.card_id === props.card.card_id
  );
  const regCollection = filteredCollection?.filter(
    (item) => item.is_foil === false
  );
  const foilCollection = filteredCollection?.filter(
    (item) => item.is_foil === true
  );
  const [regQty, setRegQty] = useState(
    regCollection?.length ? regCollection[0]?.qty : 0
  );
  const [foilQty, setFoilQty] = useState(
    foilCollection?.length ? foilCollection[0]?.qty : 0
  );

  useEffect(() => {
    if (filteredCollection && filteredCollection.length > 0) {
      setColored(true);
    }
  }, [filteredCollection]);

  useEffect(() => {
    if (regQty > 0 || foilQty > 0) {
      setColored(true);
    } else {
      setColored(false);
    }
  }, [regQty, foilQty]);

  const imageUrl =
    props.card.img_front_url ||
    "https://firebasestorage.googleapis.com/v0/b/sd-tracker-449515.firebasestorage.app/o/card_images%2Fplaceholder_image.jpeg?alt=media&token=0de3b6fe-c7eb-4ab4-9a7c-49d1aadb95a5";

  return (
    <Card className="m-4 w-[100%]">
      <CardContent>
        <motion.img
          className="rounded-lg m-4 mx-auto"
          src={imageUrl}
          alt="Card Image"
          style={{ filter: colored ? "none" : "grayscale(100%)" }}
          animate={{ rotateY: colored ? 720 : 0 }}
          transition={{ duration: 0.6 }}
        />
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4 items-center justify-center">
        {/* Regular & Foil Counters on One Line */}
        <div className="flex flex-col items-center">
          <Label className="text-sm">Regular</Label>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setRegQty((prev) => Math.max(0, prev - 1))}
              className="px-2 py-1 text-xs"
            >
              -
            </Button>
            <div className="relative w-8 h-8 overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={regQty}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center text-lg font-bold"
                >
                  {regQty}
                </motion.span>
              </AnimatePresence>
            </div>
            <Button
              onClick={() => setRegQty((prev) => prev + 1)}
              className="px-2 py-1 text-xs"
            >
              +
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <Label className="text-sm">Foil</Label>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setFoilQty((prev) => Math.max(0, prev - 1))}
              className="px-2 py-1 text-xs"
            >
              -
            </Button>
            <div className="relative w-8 h-8 overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={foilQty}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center text-lg font-bold"
                >
                  {foilQty}
                </motion.span>
              </AnimatePresence>
            </div>
            <Button
              onClick={() => setFoilQty((prev) => prev + 1)}
              className="px-2 py-1 text-xs"
            >
              +
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardBox;
