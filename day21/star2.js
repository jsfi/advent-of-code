import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

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

const mod = (dividend, divisor) => {
	const result = dividend % divisor;
	return result < 0 ? result + divisor : result;
};

const makeStep = positions => {
	const visited = new Set();
	const newPositions = [];
	positions.forEach(([ row, column ]) => {
		for (const [ nextRow, nextColumn ] of [
			[ row - 1, column ],
			[ row + 1, column ],
			[ row, column - 1 ],
			[ row, column + 1 ],
		]) {
			const key = `${nextRow}|${nextColumn}`;

			if (!visited.has(key) && lines[mod(nextRow, rows)][mod(nextColumn, columns)] !== '#') {
				newPositions.push([ nextRow, nextColumn ]);
				visited.add(key);
			}
		}
	})
	return newPositions
}

let positions = [
	[ rowStart, columnStart ],
];
let values = [];
for (let step = 1; step <= 131 * 2 + 65; step++) {
	positions = makeStep(positions);

	if (step % 131 === 65) {
		values.push(positions.length);
	}
}

let quadraticFit = [];
let quadraticFitValues = values;
for (let index = 0; index < values.length; index++) {
	quadraticFit.push(quadraticFitValues.at(0));
	quadraticFitValues = quadraticFitValues.map((v, i) => v - quadraticFitValues[i - 1]).slice(1)
}

let steps = (26501365 - 65) / 131; // 202300, map.length = 131

console.log(quadraticFit[0] + quadraticFit[1] * steps + steps * (steps - 1) * quadraticFit[2] / 2);
