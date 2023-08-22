import { CardType } from "../types";
import { getCardSets } from "./cardSet";

const find = (allcards: Array<CardType>, searchValue: string, removeAlters: boolean) => {
    const result: Array<CardType> = []

    const cardSets = getCardSets(searchValue)

    console.log(cardSets)

    allcards.forEach(card => {
        const lowercaseColor = card.color.map(color => color.toLowerCase())
        const lowercaseTypes = card.types.map(type => type.toLowerCase())
        const lowercaseSearchValue = searchValue.toLowerCase()
        if (cardSets.length > 0) {
            cardSets.forEach(cardSet => {
                if (card.code.toLowerCase().includes(cardSet.toLowerCase())) {
                    result.push(card)
                }
            })
        } else {
            if (
                card.attribute.toLowerCase().includes(lowercaseSearchValue)
                || card.category.toLowerCase().includes(lowercaseSearchValue)
                || card.code.toLowerCase().includes(lowercaseSearchValue)
                || lowercaseColor.includes(lowercaseSearchValue)
                || card.cost.toLowerCase().includes(lowercaseSearchValue)
                || card.counter.toLowerCase().includes(lowercaseSearchValue)
                || card.effects.toLowerCase().includes(lowercaseSearchValue)
                || card.life.toLowerCase().includes(lowercaseSearchValue)
                || card.name.toLowerCase().includes(lowercaseSearchValue)
                || card.power.toLowerCase().includes(lowercaseSearchValue)
                || card.rarity.toLowerCase().includes(lowercaseSearchValue)
                || lowercaseTypes.includes(lowercaseSearchValue)
            ) {
                if (!(removeAlters && card.code.includes('_'))) {
                    result.push(card)
                }
            }
        }
    })
    return result
}

export {find}