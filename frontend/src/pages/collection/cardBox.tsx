import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CardBoxProps {
  cardImage: string;
}

const CardBox = (props: CardBoxProps) => {
  const [colored, setColored] = useState(false);

  return (
    <Card className="m-4">
      <CardContent>
        <img
          className="rounded-lg m-4 mx-auto"
          src={props.cardImage}
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
