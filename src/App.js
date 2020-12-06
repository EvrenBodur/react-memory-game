import React, { useCallback, useState } from "react";
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
  const [score, setScore] = useState(0);
  const deck = createDeck();

  const scoreHandler = useCallback(
    (val) => {
      setScore(score + val);
    },
    [score]
  );
  return (
    <div className="container">
      <Board deck={deck} score={score} scoreHandler={scoreHandler} />
      <div className="score-board">
        <div className="title">Score</div>
        <div className="score">{score}</div>
      </div>
    </div>
  );
};

export default App;
