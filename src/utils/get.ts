import { countCardsInDeck } from ".";
import allcards from "../data/allcards.json";
import { getLocalData } from "../storage";
import { CardType, CardsInMyCollectionType, DeckType } from "../types";

const getCardByCode = (cardCode: string): CardType => {
  return allcards.find((card) => card.code === cardCode) as CardType;
};

const getNumberOfCardsInCollectionByCode = (cardCode: string): number => {
  return JSON.parse(getLocalData("my_collection")!).find(
    (card: CardsInMyCollectionType) => card.card === cardCode
  );
};

const getPercentageInCollection = (deck: DeckType) => {
  const collection = JSON.parse(
    getLocalData("my_collection")!
  ) as Array<CardsInMyCollectionType>;
  const cardInDeck = countCardsInDeck(deck);
  var quantityOfCardsInCollection = 0;
  cardInDeck.forEach((card) => {
    if (
      collection.find((collectionCard) => collectionCard.card === card.code)
        ?.have! >= card.numberOfCards
    )
      quantityOfCardsInCollection += card.numberOfCards;
  });
  return (quantityOfCardsInCollection / 50) * 100;
};

const getHowManyCardsYouHaveInCollection = (cardCode: string) => {
  const collection = JSON.parse(
    getLocalData("my_collection")!
  ) as Array<CardsInMyCollectionType>;
  const cardInCollection = collection.find(
    (collectionCard) => collectionCard.card === cardCode
  );
  return cardInCollection?.have;
};

const getAllEditions = (): string[] => {
  const editions: string[] = []
  allcards.forEach(card => {if (!editions.includes(card.code.split("-")[0])) editions.push(card.code.split("-")[0])})
  return editions
}

export {
  getCardByCode,
  getNumberOfCardsInCollectionByCode,
  getPercentageInCollection,
  getHowManyCardsYouHaveInCollection,
  getAllEditions
};
