import { getLines } from '../getLines.js';
import { getNumbers } from '../getNumbers.js';

const lines = await getLines(import.meta.url);

let result = 0;

for (const line of lines) {
	const [ , cardResult ] = line.split(': ');
	const [ winningNumbersString, drawnNumbersString ] = cardResult.split(' | ');

	const winningNumbers = new Set(getNumbers(winningNumbersString));
	const drawnNumbers = getNumbers(drawnNumbersString);

	let points = 0;
	for (const drawnNumber of drawnNumbers) {
		if (winningNumbers.has(drawnNumber)) {
			if (points === 0) {
				points = 1;
			} else {
				points *= 2;
			}
		}
	}

	result += points;
}

console.log(result);
