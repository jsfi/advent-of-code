import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const numbers = lines.slice(0, -1).map(line => line.trim().split(/\s+/).map(Number));
const operators = lines.at(-1).trim().split(/\s+/);

const results: Array<number> = [];
for (let index = 0; index < operators.length; index++) {
	const operator = operators[index];
	let result = operator === '+' ? 0 : 1;

	for (let indexNumber = 0; indexNumber < numbers.length; indexNumber++) {
		const number = numbers[indexNumber][index];
		if (operator === '+') {
			result += number;
		} else if (operator === '*') {
			result *= number;
		}
	}

	results.push(result);
}

const result = results.reduce((acc, curr) => acc + curr);
console.log(result);
