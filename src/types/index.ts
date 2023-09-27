type CardType = {
  code: string;
  name: string;
  attribute: string;
  power: string;
  counter: string;
  color: Array<string>;
  types: Array<string>;
  effects: string;
  rarity: string;
  category: string;
  cost: string;
  life: string;
};

type SearchResultType = {
  normalCards: Array<CardType>;
  alteredCards: Array<CardType>;
  promotionalCards: Array<CardType>;
  removeAlteredCards: boolean;
  removePromotionalCards: boolean;
};

type DeckType = {
  name: string;
  version: number;
  description: string;
  leader: string;
  cards: Array<DeckCardsType>;
  oldVersions?: Array<DeckType>;
};

type DeckCardsType = {
  code: string;
  numberOfCards: number;
};

type CardsInMyCollectionType = {
  card: string;
  have: number;
  want: number;
}

type DeckChanges = {
  cardCode: string;
  numberOfCards: number;
  changeType: "in" | "out";
};

export type { CardType, SearchResultType, DeckType, DeckCardsType, CardsInMyCollectionType, DeckChanges };
