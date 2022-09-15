import { useState, useEffect } from "react";
import axios from "axios";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";
import { Row } from "react-bootstrap";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";

//?Pay attention: I forgot {} around optionType props and it cause of error that I spend long time to search about it, Eventually I saw .get(`http://localhost:3030/[object20%object]`) in console(after writ console.log to check items value). so please focus.
export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();
  //optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => setError(true));
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOptions;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}
