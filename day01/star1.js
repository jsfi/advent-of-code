import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

const isDigit = char => !Number.isNaN(Number(char));

let result = 0;

for (const line of lines) {
	const chars = line.split('');

	const firstDigit = chars.find(isDigit);
	const lastDigit = chars.findLast(isDigit);

	const twoDigitNumber = Number(firstDigit + lastDigit);
	result += twoDigitNumber;
}

console.log(result);
