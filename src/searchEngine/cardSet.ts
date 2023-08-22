const getCardSets = (searchValue: string) => {

    const cardSetRegexQuot = /ed:"(.*?)"/g
    const cardSetRegex = /ed:(\w+)\b/g
    
    const cardSets: any[] = []

    searchValue.match(cardSetRegex)?.forEach(edition => {
        const correctEd = edition.split(":")[1]
        if (!cardSets.includes(correctEd)) cardSets.push(correctEd)
    });
    
    searchValue.match(cardSetRegexQuot)?.forEach(edition => {
        const correctEd = edition.split('"')[1]
        if (!cardSets.includes(correctEd)) cardSets.push(correctEd)
    })

    return cardSets
}

export { getCardSets }