import React, { useCallback, useEffect, useState } from "react";
import Card from "../card";
import "./index.css";

const Board = ({ deck }) => {
  const [newDeck, setNewDeck] = useState(deck);
  const [validation, setValidation] = useState([]);
  const [cardID, setCardID] = useState([]);

  const flipper = useCallback(
    (id, willFlip, willDisable) => {
      const flipCard = newDeck.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            flipped: willFlip,
            disabled: willDisable,
          };
        } else {
          return item;
        }
      });

      return flipCard;
    },
    [newDeck]
  );

  const validationHandler = (id, card_id) => {
    setValidation([...validation, card_id]);
    setCardID([...cardID, id]);
    setNewDeck(flipper(id, true, true));
  };

  const isMatch = useCallback(() => {
    if (validation.length === 1) return;
    if (validation.length && validation[0] === validation[1]) {
      console.log("matched");
      setNewDeck(flipper(validation[0], true, true));
      setValidation([]);
      setCardID([]);
    } else if (validation.length && validation[0] !== validation[1]) {
      console.log("not matched");
      setTimeout(() => {
        cardID.map((ID) => {
          setNewDeck(flipper(ID, false, false));
          setValidation([]);
          setCardID([]);
        });
      }, 500);
    }
  }, [validation, cardID, flipper]);

  useEffect(() => {
    isMatch();
  }, [validation, isMatch]);

  return (
    <div className="board">
      {newDeck.map((item) => {
        return (
          <Card
            key={item.id}
            item={item}
            validation={validation}
            validationHandler={validationHandler}
          />
        );
      })}
    </div>
  );
};

export default Board;
