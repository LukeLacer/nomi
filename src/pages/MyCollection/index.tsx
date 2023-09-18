import React, { useEffect, useState } from "react";

import "./styles.css";
import { CardImage, Header } from "../../components";
import { CardsInMyCollectionType } from "../../types";
import defaultcollection from "../../data/defaultcollection.json";
import {
  getAllEditions,
  getCardByCode,
  sortCardinCollectionArrayByCard,
} from "../../utils";
import allcards from "../../data/allcards.json";

type CardCounterType = {
  edition: string;
  quantity: number;
};

const MyCollection = () => {
  const [myCards, setMycards] = useState<Array<CardsInMyCollectionType>>();
  const [showAllCards, setShowAllCards] = useState<boolean>(true);
  const [removeAlters, setRemoveAlters] = useState<boolean>(false);
  const [removePromotionals, setRemovePromotionals] = useState<boolean>(false);
  const [blockChanges, setBlockChanges] = useState<boolean>(false);
  const [showImage, setShowImage] = useState(true);
  const [showName, setShowName] = useState(true);
  const [showCode, setShowCode] = useState(true);
  const [showHave, setShowHave] = useState(true);
  const [showWant, setShowWant] = useState(true);
  const [showNeed, setShowNeed] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("my_collection") === null)
      setMycards(defaultcollection);
    else {
      const newerCardList: Array<CardsInMyCollectionType> = JSON.parse(
        localStorage.getItem("my_collection")!
      );
      if (
        JSON.parse(localStorage.getItem("my_collection")!).length <
        allcards.length
      )
        allcards.forEach((card) => {
          if (
            !newerCardList.some(
              (cardInMyCollection) => cardInMyCollection.card === card.code
            )
          )
            newerCardList.push({ card: card.code, have: 0, want: 0 });
        });
      setMycards(sortCardinCollectionArrayByCard(newerCardList));
    }
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
    const newValue = event.target.value < 0 ? 0 : event.target.value;
    setMycards(updateQuantity(myCards!, cardCode, newValue, field));
  };

  const cardsIWantAndIDontHave = (): CardCounterType[] => {
    const returnCounters: CardCounterType[] = [
      { edition: "TOTAL", quantity: 0 },
    ];
    const editions = getAllEditions();
    editions.forEach((edition) => {
      myCards?.forEach((card) => {
        if (card.want > card.have && card.card.split("-")[0] === edition) {
          if (returnCounters.some((counter) => counter.edition === edition))
            returnCounters.map((counter) => {
              if (counter.edition === edition || counter.edition === "TOTAL")
                counter.quantity += card.want - card.have;
              return counter;
            });
          else {
            returnCounters.push({
              edition: edition,
              quantity: card.want - card.have,
            });
            returnCounters.map((counter) => {
              if (counter.edition === "TOTAL")
                counter.quantity += card.want - card.have;
              return counter;
            });
          }
        }
      });
    });
    return returnCounters.sort((a, b) =>
      a.edition < b.edition || a.edition === "TOTAL" ? -1 : 1
    );
  };

  return (
    <>
      <Header />
      <div className="counters-wrapper">
        Number of cards I want and I don't have
        {cardsIWantAndIDontHave().map((counter) => (
          <div>
            <span>{counter.edition + ": "}</span>
            <span>{counter.quantity}</span>
          </div>
        ))}
      </div>
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
        <div>
          <input
            type="checkbox"
            name="block-changes"
            id="block-changes"
            checked={blockChanges}
            onChange={() => setBlockChanges(!blockChanges)}
          />
          <label htmlFor="block-changes">
            Block changes to card quantities
          </label>
        </div>
      </div>
      <div>
        <div>
          <input
            type="checkbox"
            name="show-image"
            id="show-image"
            checked={showImage}
            onChange={() => setShowImage(!showImage)}
          />
          <label htmlFor="show-image">Show Image</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="show-name"
            id="show-name"
            checked={showName}
            onChange={() => setShowName(!showName)}
          />
          <label htmlFor="show-name">Show Name</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="show-code"
            id="show-code"
            checked={showCode}
            onChange={() => setShowCode(!showCode)}
          />
          <label htmlFor="show-code">Show Code</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="show-have"
            id="show-have"
            checked={showHave}
            onChange={() => setShowHave(!showHave)}
          />
          <label htmlFor="show-have">Show Have</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="show-want"
            id="show-want"
            checked={showWant}
            onChange={() => setShowWant(!showWant)}
          />
          <label htmlFor="show-want">Show Want</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="show-need"
            id="show-need"
            checked={showNeed}
            onChange={() => setShowNeed(!showNeed)}
          />
          <label htmlFor="show-need">Show Need</label>
        </div>
      </div>
      <table className="my-collection-table">
        <thead>
          <tr>
            {showImage ? <th>Image</th> : null}
            {showName ? <th>Name</th> : null}
            {showCode ? <th>Code</th> : null}
            {showHave ? <th>Have</th> : null}
            {showWant ? <th>Want</th> : null}
            {showNeed ? <th>Need</th> : null}
          </tr>
        </thead>
        {myCards?.map((card) => {
          return (card.want > card.have || showAllCards) &&
            !(card.card.includes("_") && removeAlters) &&
            !(card.card[0] === "P" && removePromotionals) ? (
            <tr>
              {showImage ? (
                <td>
                  <CardImage code={card.card} height="100px" />
                </td>
              ) : null}
              {showCode ? <td>{getCardByCode(card.card).name}</td> : null}
              {showName ? <td>{card.card}</td> : null}
              {showHave ? (
                <td>
                  <input
                    type="number"
                    className="want-have-input"
                    disabled={blockChanges}
                    value={card.have}
                    onChange={(e) =>
                      onChangeQuantityHandler(e, "have", card.card)
                    }
                    name="have"
                    id="have"
                  />
                </td>
              ) : null}
              {showWant ? (
                <td>
                  <input
                    type="number"
                    className="want-have-input"
                    disabled={blockChanges}
                    value={card.want}
                    onChange={(e) =>
                      onChangeQuantityHandler(e, "want", card.card)
                    }
                    name="want"
                    id="want"
                  />
                </td>
              ) : null}
              {showNeed ? (
                <td>
                  <span className="want-have-input">
                    {card.have < card.want ? card.want - card.have : 0}
                  </span>
                </td>
              ) : null}
            </tr>
          ) : null;
        })}
      </table>
    </>
  );
};

export default MyCollection;
