import allcards from "../data/allcards.json";
import { CardType } from "../types";

const validateCardCode = (cardCode: string): CardType => {
    return allcards.find(card => card.code === cardCode) as CardType
}

export { validateCardCode }