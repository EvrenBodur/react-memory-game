import React from "react";
import Board from "./components/board";
import { deck } from "./deck/deck";
import "./App.css";

const createDeck = () => {
  let id = 0;
  const newDeck = [...deck, ...deck].map((item) => {
    id++;
    return {
      id,
      card_id: item.card_id,
      svg: item.svg,
      flipped: item.flipped,
      disabled: item.disabled,
    };
  });
  return newDeck;
};

const App = () => {
  const deck = createDeck();
  return (
    <div className="container">
      <Board deck={deck} />
    </div>
  );
};

export default App;
