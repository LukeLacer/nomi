const getCardProperties = (searchedProperty: string, searchValue: string) => {
    
    const cardSetRegexQuot = new RegExp(searchedProperty + ':"(.*?)"', 'g');
    const cardSetRegex = new RegExp(searchedProperty + ':(\\w+)\\b', 'g');
    
    const cardProperties: any[] = []

    searchValue.match(cardSetRegex)?.forEach(property => {
        const correctEd = property.split(":")[1]
        if (!cardProperties.includes(correctEd)) cardProperties.push(correctEd)
    });
    
    searchValue.match(cardSetRegexQuot)?.forEach(property => {
        const correctEd = property.split('"')[1]
        if (!cardProperties.includes(correctEd)) cardProperties.push(correctEd)
    })

    return cardProperties
}

export { getCardProperties }