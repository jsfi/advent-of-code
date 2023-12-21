import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

const maxSteps = process.env.test === undefined ? 64 : 6;

const rows = lines.length;
const columns = lines.at(0).length;

let rowStart, columnStart;
findStart: for (let row = 0; row < rows; row++) {
	for (let column = 0; column < columns; column++) {
		if (lines.at(row).at(column) === 'S') {
			rowStart = row;
			columnStart = column;
			break findStart;
		}
	}
}

let steps = [ [ rowStart, columnStart ] ];
let result = 1;
const visited = new Set([ `${rowStart}|${columnStart}` ]);
for (let step = 1; step <= maxSteps; step++) {
	const nextSteps = [];

	for (const [ row, column ] of steps) {
		for (const [ rowNext, columnNext ] of [
			[ row - 1, column ],
			[ row + 1, column ],
			[ row, column - 1 ],
			[ row, column + 1 ],
		]) {
			const key = `${rowNext}|${columnNext}`;
			if (
				rowNext < 0
				|| rowNext >= rows
				|| columnNext < 0
				|| columnNext >= columns
				|| visited.has(key)
			) {
				continue;
			}

			visited.add(key);

			if (lines.at(rowNext).at(columnNext) === '#') {
				continue;
			}

			if (step % 2 === 0) {
				result++;
			}

			nextSteps.push([ rowNext, columnNext ]);
		}
	}

	steps = nextSteps;
}

console.log(result);
