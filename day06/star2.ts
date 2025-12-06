import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const numbers = lines.slice(0, -1);
const operators = lines.at(-1).trim().split(/\s+/);
const maxColumn = Math.max(...numbers.map(line => line.length));

let column = 0;
const results: Array<number> = [];
for (let index = 0; index < operators.length; index++) {
	const operator = operators[index];
	const numbersInOperation: Array<number> = [];

	while (true) {
		const numbersInColumn = numbers.map(line => line[column]);
		column++;

		if (numbersInColumn.every(char => char === ' ') || column > maxColumn) {
			results.push(numbersInOperation.reduce((acc, number) => {
				if (operator === '+') {
					return acc + number;
				} else if (operator === '*') {
					return acc * number;
				}
				throw new Error('Unknown operator');
			}, operator === '+' ? 0 : 1));
			break;
		}

		numbersInOperation.push(Number(numbersInColumn.join('')));
	}
}

const result = results.reduce((acc, curr) => acc + curr);
console.log(result);
