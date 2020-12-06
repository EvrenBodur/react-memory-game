import React, { useCallback, useEffect, useState } from "react";
import Card from "../card";
import "./index.css";

const Board = ({ deck, score, scoreHandler }) => {
  const [newDeck, setNewDeck] = useState(deck);
  const [validation, setValidation] = useState([]);
  const [cardID, setCardID] = useState([]);
  const [disable, setDisable] = useState(false);

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
      setNewDeck(flipper(validation[0], true, true));
      setValidation([]);
      setCardID([]);
      scoreHandler(100);
    } else if (validation.length > 1 && validation[0] !== validation[1]) {
      setDisable(true);
      setTimeout(() => {
        cardID.map((ID) => {
          setNewDeck(flipper(ID, false, false));
          setValidation([]);
          setCardID([]);
          setDisable(false);
          scoreHandler(-25);
        });
      }, 750);
    }
  }, [validation, cardID, flipper, scoreHandler]);

  useEffect(() => {
    isMatch();
  }, [isMatch]);

  useEffect(() => {
    setTimeout(() => {
      const start = newDeck.map((item) => {
        return {
          ...item,
          flipped: false,
          disabled: false,
        };
      });
      setNewDeck(start);
    }, 5000);
  }, []);

  return (
    <div className="board">
      {newDeck.map((item) => {
        return (
          <Card
            key={item.id}
            item={item}
            disable={disable}
            validation={validation}
            validationHandler={validationHandler}
          />
        );
      })}
    </div>
  );
};

export default Board;
