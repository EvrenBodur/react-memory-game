import React from "react";
import { GiHand } from "react-icons/gi";
import "./index.css";

const Card = ({ item, validationHandler, disable }) => {
  return (
    <div
      onClick={
        item.disabled
          ? null
          : disable
          ? null
          : () => validationHandler(item.id, item.card_id)
      }
      className={item.flipped ? "card selected" : "card"}
    >
      <div className="card-front">
        <GiHand />
      </div>
      <div className="card-back">{item.svg}</div>
    </div>
  );
};

export default Card;
