import { CardType } from "../types"

const cardExistsInArray = (array: any[], card: any) => {
    return array.findIndex(element => element.code.toLowerCase() === card.code.toLowerCase()) > -1
}

const sortCardArrayByCode = (array: CardType[]) => {
    return array.sort((a, b) => (a.code > b.code) ? 1 : -1)
}

export { cardExistsInArray, sortCardArrayByCode }