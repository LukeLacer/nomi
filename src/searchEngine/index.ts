import { CardType, SearchResultType } from "../types";
import { cardExistsInArray } from "../utils";
import { getCardProperties } from "./cardPropertyByString";

const find = (
  allcards: Array<CardType>,
  searchValue: string,
  separateAlters: boolean = false,
  separatePromotionals: boolean = false
) => {
  const result: Array<CardType> = [];

  const cardSets = getCardProperties("s", searchValue);
  const cardNumbers = getCardProperties("n", searchValue);
  const cardColors = getCardProperties("c", searchValue);
  const cardCategories = getCardProperties("t", searchValue);
  const cardEffects = getCardProperties("e", searchValue);

  const pushIfDoesntExist = (array: CardType[], card: CardType) => {
    if (!cardExistsInArray(array, card)) array.push(card);
  };

  allcards.forEach((card) => {
    const lowercaseColor = card.color.map((color) => color.toLowerCase());
    const lowercaseTypes = card.types.map((type) => type.toLowerCase());
    const lowercaseSearchValue = searchValue.toLowerCase();
    if (
      cardSets.length > 0 ||
      cardNumbers.length > 0 ||
      cardColors.length > 0 ||
      cardCategories.length > 0 ||
      cardEffects.length > 0
    ) {
      cardSets.forEach((cardSet) => {
        if (card.code.toLowerCase().includes(cardSet.toLowerCase())) {
          pushIfDoesntExist(result, card);
        }
      });
      cardNumbers.forEach((cardNumber) => {
        if (card.code.toLowerCase().includes(cardNumber.toLowerCase())) {
          pushIfDoesntExist(result, card);
        }
      });
      cardColors.forEach((cardColor) => {
        card.color.forEach((color) => {
          if (color.toLowerCase().includes(cardColor.toLowerCase()))
            pushIfDoesntExist(result, card);
        });
      });
      cardCategories.forEach((cardCategory) => {
        if (card.category.toLowerCase().includes(cardCategory.toLowerCase())) {
          pushIfDoesntExist(result, card);
        }
      });
      cardEffects.forEach((cardEffect) => {
        if (card.effects.toLowerCase().includes(cardEffect.toLowerCase())) {
          pushIfDoesntExist(result, card);
        }
      });
    } else {
      if (
        card.attribute.toLowerCase().includes(lowercaseSearchValue) ||
        card.category.toLowerCase().includes(lowercaseSearchValue) ||
        card.code.toLowerCase().includes(lowercaseSearchValue) ||
        lowercaseColor.includes(lowercaseSearchValue) ||
        card.cost.toLowerCase().includes(lowercaseSearchValue) ||
        card.counter.toLowerCase().includes(lowercaseSearchValue) ||
        card.effects.toLowerCase().includes(lowercaseSearchValue) ||
        card.life.toLowerCase().includes(lowercaseSearchValue) ||
        card.name.toLowerCase().includes(lowercaseSearchValue) ||
        card.power.toLowerCase().includes(lowercaseSearchValue) ||
        card.rarity.toLowerCase().includes(lowercaseSearchValue) ||
        lowercaseTypes.includes(lowercaseSearchValue)
      ) {
        pushIfDoesntExist(result, card);
      }
    }
  });

  const objectToReturn: SearchResultType = {
    normalCards: result.filter(
      (card) => !card.code.includes("_") && !(card.code.slice(0, 2) === "P-")
    ),
    alteredCards: result.filter((card) => card.code.includes("_")),
    promotionalCards: result.filter((card) => card.code.slice(0, 2) === "P-"),
    removeAlteredCards: separateAlters,
    removePromotionalCards: separatePromotionals,
  };

  return objectToReturn;
};

export { find };
