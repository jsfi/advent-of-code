import { getLines } from '../getLines.js';
import { getNumbers } from './getNumbers.js';

const lines = await getLines(import.meta.url);

let countCards = lines.map(() => 1);

for (let cardNumber = 0; cardNumber < lines.length; cardNumber++) {
    const line = lines[cardNumber];
    const [, cardResult] = line.split(': ');
    const [winningNumbersString, drawnNumbersString] = cardResult.split(' | ');

    const winningNumbers = new Set(getNumbers(winningNumbersString));
    const drawnNumbers = getNumbers(drawnNumbersString);

    let points = 0;
    for (const drawnNumber of drawnNumbers) {
        if (winningNumbers.has(drawnNumber)) {
            points++;
        }
    }

    for (let addCards = 1; addCards <= points; addCards++) {
        countCards[cardNumber + addCards] += countCards[cardNumber];
    }
}

console.log(countCards.reduce((sum, count) => sum + count));
