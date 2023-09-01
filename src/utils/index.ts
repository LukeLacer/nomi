import { CardType } from "../types";

const sortCardArrayByCode = (array: CardType[]) => {
  return array.sort((a, b) => (a.code > b.code ? 1 : -1));
};

const filterCardListByPropertyList = (
  cardList: Array<CardType>,
  propertyList: Array<string>,
  property: keyof CardType
): Array<CardType> => {
  var arrayToReturn = cardList;

  propertyList.forEach((propertyValue) => {
    arrayToReturn = cardList.filter((card) => {
      var isTrue = false;
      if (typeof card[property] === 'string') {
        if ((card[property] as string).toLowerCase().includes(propertyValue.toLowerCase())) isTrue = true
      } else {
      (card[property] as Array<string>).forEach((propertyArrayValue) => {
        if (propertyArrayValue.toLowerCase() === propertyValue.toLowerCase())
          isTrue = true;
      });
    }

      return isTrue;
    });
  });

  return arrayToReturn;
};

export { sortCardArrayByCode, filterCardListByPropertyList };
