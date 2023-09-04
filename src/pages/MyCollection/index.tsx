import React, { useEffect, useState } from "react";

import "./styles.css";
import { CardImage, Header } from "../../components";
import { CardsInMyCollectionType } from "../../types";
import defaultcollection from "../../data/defaultcollection.json";
import { getCardByCode } from "../../utils";

const MyCollection = () => {
  const [myCards, setMycards] = useState<Array<CardsInMyCollectionType>>();
  const [showAllCards, setShowAllCards] = useState<boolean>(true);
  const [removeAlters, setRemoveAlters] = useState<boolean>(false);
  const [removePromotionals, setRemovePromotionals] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("my_collection") === null)
      setMycards(defaultcollection);
    else setMycards(JSON.parse(localStorage.getItem("my_collection")!));
  }, []);

  useEffect(() => {
    localStorage.setItem("my_collection", JSON.stringify(myCards));
  }, [myCards]);

  const updateQuantity = (
    arrayOfCards: Array<CardsInMyCollectionType>,
    cardCode: string,
    newValue: number,
    field: keyof CardsInMyCollectionType
  ) =>
    arrayOfCards.map((card) => {
      if (card.card === cardCode) {
        card[field] = newValue as never;
      }
      return card;
    });

  const onChangeQuantityHandler = (
    event: any,
    field: keyof CardsInMyCollectionType,
    cardCode: string
  ) => {
    const newValue = event.target.value === "" ? 0 : event.target.value;
    setMycards(updateQuantity(myCards!, cardCode, newValue, field));
  };

  return (
    <>
      <Header />
      <div className="filters-wrapper">
        <div className="remove-alternative-wrapper">
          <input
            type="checkbox"
            name="removeAlters"
            id="removeAlters"
            checked={removeAlters}
            onChange={() => setRemoveAlters(!removeAlters)}
          />
          <label htmlFor="removeAlters">Remove alternative</label>
          <div className="remove-promotional-wrapper">
            <input
              type="checkbox"
              name="removePromotionals"
              id="removePromotionals"
              checked={removePromotionals}
              onChange={() => setRemovePromotionals(!removePromotionals)}
            />
            <label htmlFor="removePromotionals">Remove promotional</label>
          </div>
        </div>
        <div className="show-all-cards-wrapper">
          <input
            type="checkbox"
            name="showJustCardsIWant"
            id="showJustCardsIWant"
            checked={!showAllCards}
            onChange={() => setShowAllCards(!showAllCards)}
          />
          <label htmlFor="showJustCardsIWant">Show just cards I want</label>
        </div>
      </div>
      <table className="my-collection-table">
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Code</th>
          <th>Have</th>
          <th>Want</th>
        </tr>
        {myCards?.map((card) => {
          return (card.want > card.have || showAllCards) &&
            !(card.card.includes("_") && removeAlters) &&
            !(card.card[0] === "P" && removePromotionals) ? (
            <tr>
              <td>
                <CardImage code={card.card} height="100px" />
              </td>
              <td>{getCardByCode(card.card).name}</td>
              <td>{card.card}</td>
              <td>
                <input
                  type="number"
                  className="want-have-input"
                  value={card.have}
                  onChange={(e) =>
                    onChangeQuantityHandler(e, "have", card.card)
                  }
                  name="have"
                  id="have"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="want-have-input"
                  value={card.want}
                  onChange={(e) =>
                    onChangeQuantityHandler(e, "want", card.card)
                  }
                  name="want"
                  id="want"
                />
              </td>
            </tr>
          ) : null;
        })}
      </table>
    </>
  );
};

export default MyCollection;
