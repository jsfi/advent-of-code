import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

let result = 0;
let number = '';
const numbersInRow = new Map();
let gears = [];

const pushNumber = (end, row) => {
	if (number) {
		let rowNumbers = numbersInRow.get(row);
		if (!rowNumbers) {
			rowNumbers = [];
			numbersInRow.set(row, rowNumbers);
		}

		rowNumbers.push([ number, end - number.length ]);
		number = '';
	}
}

for (let row = 0; row < lines.length; row++) {
	for (let column = 0; column < lines[row].length; column++) {
		const value = lines[row][column];

		if (value.match(/\d/)) {
			number += value;
			continue;
		}

		pushNumber(column, row);

		if (value !== '*') {
			continue;
		}

		gears.push([ column, row ]);
	}

	pushNumber(lines[row].length, row);
}

for (const gear of gears) {
	const [ column, row ] = gear;
	const matchedNumbers = [];

	for (let rowNumber = row - 1; rowNumber <= row + 1; rowNumber++) {
		const numbers = numbersInRow.get(rowNumber);

		if (!numbers) {
			continue;
		}

		for (const number of numbers) {
			const [ value, startColumnNumber ] = number;

			if (startColumnNumber - 1 <= column && startColumnNumber + value.length >= column) {
				matchedNumbers.push(Number(value));
			}
		}

		if (matchedNumbers.length === 2) {
			result += Number(matchedNumbers[0]) * Number(matchedNumbers[1]);
			break;
		}
	}
}

console.log(result);
