import { CardType } from "../types";

const find = (allcards: Array<CardType>, searchValue: string, removeAlters: boolean) => {
    const result: Array<CardType> = []
    
    allcards.forEach(card => {
        const lowercaseColor = card.color.map(color => color.toLowerCase())
        const lowercaseTypes = card.types.map(type => type.toLowerCase())
        const lowercaseSearchValue = searchValue.toLowerCase()
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
    })
    return result
}

export {find}