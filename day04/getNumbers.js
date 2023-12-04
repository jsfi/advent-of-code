export const getNumbers = (numbersString) => numbersString.split(' ')
    .map((number) => number.trim())
    .filter(Boolean)
    .map(Number);