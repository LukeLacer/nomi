import React, { useEffect, useState } from "react";

import "./styles.css";
import { CardType, SearchResultType } from "../../types";
import { Header, Card } from "../../components";
import { useLocation } from "react-router-dom";
import { sortCardArrayByCode } from "../../utils";

type AllCardsType = {
  normal: Array<CardType>;
  promotional: Array<CardType>;
  altered: Array<CardType>;
};

const Result = () => {
  const [cardsToShow, setCardsToShow] = useState<Array<CardType>>([]);

  const [allCards, setAllCards] = useState<AllCardsType>({
    normal: [],
    promotional: [],
    altered: [],
  });

  const [removeAlters, setRemoveAlters] = useState<boolean>(false);
  const [removePromotionals, setRemovePromotionals] = useState<boolean>(false);

  const results: SearchResultType = useLocation().state;

  useEffect(() => {
    setAllCards({
      normal: results.normalCards,
      promotional: results.promotionalCards,
      altered: results.alteredCards,
    });
  }, [results]);

  useEffect(() => {
    const { normal, promotional, altered } = allCards;

    const cardArrayToShow: Array<CardType> = [];

    cardArrayToShow.push(...normal);
    if (!removeAlters) cardArrayToShow.push(...altered);
    if (!removePromotionals) cardArrayToShow.push(...promotional);

    setCardsToShow(sortCardArrayByCode(cardArrayToShow));
  }, [allCards, removeAlters, removePromotionals]);

  const removeAltersHandler = () => {
    setRemoveAlters(!removeAlters);
  };

  const removePromotionalsHandler = () => {
    setRemovePromotionals(!removePromotionals);
  };

  return (
    <div>
      <Header />
      <div className="sub-header-wrapper">
        <div className="filters-wrapper">
          <div className="remove-alternative-wrapper">
            <input
              type="checkbox"
              name="removeAlters"
              id="removeAlters"
              checked={removeAlters}
              onChange={() => removeAltersHandler()}
            />
            <label htmlFor="removeAlters">Remove alternative</label>
          </div>
          <div className="remove-promotional-wrapper">
            <input
              type="checkbox"
              name="removePromotionals"
              id="removePromotionals"
              checked={removePromotionals}
              onChange={() => removePromotionalsHandler()}
            />
            <label htmlFor="removePromotionals">Remove promotional</label>
          </div>
        </div>
        <p>{cardsToShow?.length} results for this search</p>
      </div>
      <div className="results-wrapper">
        {cardsToShow?.map((card) => {
          return <Card card={card} />;
        })}
      </div>
    </div>
  );
};

export default Result;
