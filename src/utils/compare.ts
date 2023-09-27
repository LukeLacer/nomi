import { DeckType, DeckChanges } from "../types";

const changesInDeckVersion = (
  previousVersion: DeckType,
  nextVersion: DeckType
): DeckChanges[] | undefined => {
  if (!(previousVersion && nextVersion)) return undefined;
  var cardsChanged: DeckChanges[] = [];
  previousVersion.cards.forEach((previousCard) => {
    if (
      nextVersion.cards.filter(
        (nextCard) => nextCard.code === previousCard.code
      ).length <= 0
    ) {
      cardsChanged.push({
        cardCode: previousCard.code,
        numberOfCards: previousCard.numberOfCards,
        changeType: "out",
      });
    }
  });

  nextVersion.cards.forEach((nextCard) => {
    if (
      previousVersion.cards.filter(
        (previousCard) => previousCard.code === nextCard.code
      ).length <= 0
    ) {
      cardsChanged.push({
        cardCode: nextCard.code,
        numberOfCards: nextCard.numberOfCards,
        changeType: "in",
      });
    }
  });

  return cardsChanged;
};

export { changesInDeckVersion };
