import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CatalogCardRead } from "@/requests/gen/react-query/fastAPI.schemas";

interface CardBoxProps {
  card: CatalogCardRead;
}

const CardBox = (props: CardBoxProps) => {
  const [colored, setColored] = useState(false);

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
      <CardFooter className="items-center justify-center">
        <Button onClick={() => setColored(!colored)}>Add</Button>
      </CardFooter>
    </Card>
  );
};

export default CardBox;
