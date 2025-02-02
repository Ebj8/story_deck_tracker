import { useState } from "react";
import CardBox from "./cardBox";

const CollectionPage = () => {
  const [colored, setColored] = useState(false);

  return (
    <div className="flex flex-row items-center">
      <CardBox cardImage="https://firebasestorage.googleapis.com/v0/b/sd-tracker-449515.firebasestorage.app/o/card_images%2Fchasmfriends_01_front.jpg?alt=media&token=c2c630b5-f173-42c8-8208-1959a222e4bf" />
      <CardBox cardImage="https://firebasestorage.googleapis.com/v0/b/sd-tracker-449515.firebasestorage.app/o/card_images%2Fchasmfriends_01_front.jpg?alt=media&token=c2c630b5-f173-42c8-8208-1959a222e4bf" />
      <CardBox cardImage="https://firebasestorage.googleapis.com/v0/b/sd-tracker-449515.firebasestorage.app/o/card_images%2Fchasmfriends_01_front.jpg?alt=media&token=c2c630b5-f173-42c8-8208-1959a222e4bf" />
    </div>
  );
};

export default CollectionPage;
