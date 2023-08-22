const cardExistsInArray = (array: any[], card: any) => {
    return array.findIndex(element => element.code.toLowerCase() === card.code.toLowerCase()) > -1
}

export { cardExistsInArray }