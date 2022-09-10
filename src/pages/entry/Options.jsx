import { useState, useEffect } from "react";
import axios from "axios";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";
import { Row } from "react-bootstrap";

//?Pay attention: I forgot {} around optionsType props and it cause of error that I spend long time to search about it, Eventually I saw .get(`http://localhost:3030/[object20%object]`) in console(after writ console.log to check items value). so please focus.
export default function Options({ optionsType }) {
  const [items, setItems] = useState([]);

  //optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionsType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        //TODO: handle error response
        console.log(error.message);
      });
  }, [optionsType]);

  const ItemComponent =
    optionsType === "scoops" ? ScoopOptions : ToppingOptions;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
}
