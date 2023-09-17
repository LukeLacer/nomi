import { CardType, CardsInMyCollectionType, DeckCardsType, DeckType } from "../types";

import {
  getCardByCode,
  getNumberOfCardsInCollectionByCode,
  getPercentageInCollection,
  getHowManyCardsYouHaveInCollection,
} from "./get";

const sortCardArrayByCode = (array: CardType[]) => {
  return array.sort((a, b) => (a.code > b.code ? 1 : -1));
};

const sortCardinCollectionArrayByCard = (array: CardsInMyCollectionType[]) => {
  return array.sort((a, b) => (a.card > b.card ? 1 : -1));
};

const filterCardListByPropertyList = (
  cardList: Array<CardType>,
  propertyList: Array<string>,
  property: keyof CardType
): Array<CardType> => {
  var arrayToReturn = cardList;

  propertyList.forEach((propertyValue) => {
    arrayToReturn = cardList.filter((card) => {
      var isTrue = false;
      if (typeof card[property] === "string") {
        if (
          (card[property] as string)
            .toLowerCase()
            .includes(propertyValue.toLowerCase())
        )
          isTrue = true;
      } else {
        (card[property] as Array<string>).forEach((propertyArrayValue) => {
          if (
            propertyArrayValue
              .toLowerCase()
              .includes(propertyValue.toLowerCase())
          )
            isTrue = true;
        });
      }

      return isTrue;
    });
  });

  return arrayToReturn;
};

const countCardsInDeck = (deck: DeckType) => {
  var cardsOfDeckToReturn = deck.cards.reduce(
    (a: Array<DeckCardsType>, b: string) => {
      var i = a.findIndex((x) => x.code === b);
      return (
        i === -1 ? a.push({ code: b, numberOfCards: 1 }) : a[i].numberOfCards++,
        a
      );
    },
    []
  );
  return cardsOfDeckToReturn.sort((a, b) =>
    a.numberOfCards < b.numberOfCards ? 1 : -1
  );
};

export {
  sortCardArrayByCode,
  filterCardListByPropertyList,
  getCardByCode,
  countCardsInDeck,
  getNumberOfCardsInCollectionByCode,
  getPercentageInCollection,
  getHowManyCardsYouHaveInCollection,
  sortCardinCollectionArrayByCard
};
