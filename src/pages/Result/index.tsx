import React, { useEffect, useState } from "react";

import "./styles.css";
import { CardType } from "../../types";
import { Header, Card } from "../../components";
import { useLocation } from "react-router-dom";

const Result = () => {
  const [cardsToShow, setCardsToShow] = useState<Array<CardType>|undefined>()

  const {state} = useLocation()

  useEffect(() => {
    setCardsToShow(state.cards)
  }, [state.cards])

  return (
    <div>
      <Header />
      <div><span>{cardsToShow?.length}</span></div>
      <div className="results-wrapper">
        {cardsToShow?.map((card) => {
          return <Card card={card} />;
        })}
      </div>
    </div>
  );
};

export default Result;
