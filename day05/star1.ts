import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const freshRanges: Array<[number, number]> = [];
const ingredients: Array<number> = [];

for (const line of lines) {
	if (line.includes('-')) {
		freshRanges.push(line.split('-').map(Number));
	} else if (line) {
		ingredients.push(Number(line));
	}
}

let freshIngredientCount = 0;
for (const ingredient of ingredients) {
	for (const [start, end] of freshRanges) {
		if (ingredient >= start && ingredient <= end) {
			freshIngredientCount++;
			break;
		}
	}
}

console.log(freshIngredientCount);
