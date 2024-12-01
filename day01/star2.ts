import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const listLeft: Array<number> = [];
const listRight: Array<number> = [];

for (const line of lines) {
	const chars = line.split(/\s+/).map(Number);

	listLeft.push(chars[0]);
	listRight.push(chars[1]);
}

const numberWithCount = new Map<number, number>();
for (const number of listRight) {
	const count = numberWithCount.get(number) ?? 0;
	numberWithCount.set(number, count + 1);
}

let result = 0;
for (const number of listLeft) {
	result += number * (numberWithCount.get(number) ?? 0);
}

console.log(result);
