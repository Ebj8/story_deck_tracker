import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        <img
          className="rounded-lg m-4 mx-auto"
          src={imageUrl}
          alt="Card Image"
          style={{ filter: colored ? "none" : "grayscale(100%)" }}
        />
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center gap-4">
        <Label htmlFor="regQty">Regular</Label>
        <div className="grid grid-cols-3 gap-4">
          <Button onClick={() => setRegQty(regQty - 1)}>-</Button>

          <Input type="regQty" placeholder={regQty.toString()} />
          <Button onClick={() => setRegQty(regQty + 1)}>+</Button>
        </div>
        <Label htmlFor="foilQty">Foil</Label>
        <div className="grid grid-cols-3 gap-4">
          <Button onClick={() => setFoilQty(foilQty - 1)}>-</Button>

          <Input type="foilQty" placeholder={foilQty.toString()} />
          <Button onClick={() => setFoilQty(foilQty + 1)}>+</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardBox;
