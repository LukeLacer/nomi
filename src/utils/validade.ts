import allcards from "../data/allcards.json";
import { CardType } from "../types";

const getCardByCode = (cardCode: string): CardType => {
    return allcards.find(card => card.code === cardCode) as CardType
}

export { getCardByCode }