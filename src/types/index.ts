type CardType = {
    code: string,
    name: string,
    attribute: string,
    power: string,
    counter: string,
    color: Array<string>,
    types: Array<string>,
    effects: string,
    rarity: string,
    category: string,
    cost: string,
    life: string
}

type SearchResultType = {
    normalCards: Array<CardType>;
    alteredCards: Array<CardType>;
    promotionalCards: Array<CardType>;
    removeAlteredCards: boolean;
    removePromotionalCards: boolean;
  }

export type { CardType, SearchResultType }