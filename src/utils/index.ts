import {
  CardType,
  CardsInMyCollectionType,
  DeckCardsType,
  DeckType,
} from "../types";

import {
  getCardByCode,
  getNumberOfCardsInCollectionByCode,
  getPercentageInCollection,
  getHowManyCardsYouHaveInCollection,
  getAllEditions
} from "./get";

import {
  changesInDeckVersion
} from "./compare";

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

const sortCardsInDeck = (deck: DeckType) => {
  return deck.cards.sort((a, b) =>
    a.numberOfCards < b.numberOfCards ? 1 : -1
  );
};

const convertStringToDecklist = (deckToConvert: string): DeckCardsType[] => {
  const cardsConverted = deckToConvert.split('\n').map(cardString => {
    return {
      code: cardString.split(' ')[1],
      numberOfCards: parseInt(cardString.split(' ')[0])
    }
  })
  return cardsConverted
}

const convertDecklistToString = (deckToConvert: DeckCardsType[]): string => {
  var deckString = ''
  deckToConvert.forEach((card, index) => {
    if (index !== 0) deckString = deckString + '\n'
    deckString = deckString + card.numberOfCards + ' ' + card.code
  })
  return deckString
}

export {
  sortCardArrayByCode,
  filterCardListByPropertyList,
  getCardByCode,
  sortCardsInDeck,
  getNumberOfCardsInCollectionByCode,
  getPercentageInCollection,
  getHowManyCardsYouHaveInCollection,
  sortCardinCollectionArrayByCard,
  getAllEditions,
  convertStringToDecklist,
  convertDecklistToString,
  changesInDeckVersion
};
