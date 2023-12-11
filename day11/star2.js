import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

const EMPTY = 'E';
const emptySize = 1_000_000;

const map = lines.map(line => line.split(''));
const rowLength = map[0].length;

for (let column = 0; column < rowLength; column++) {
	if (map.every(row => row[column] === '.')) {
		map.forEach(row => row[column] = EMPTY);
	}
}

for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
	const row = map[rowIndex];
	if (row.every(char => char === '.' || char === EMPTY)) {
		map.splice(rowIndex, 1, row.map(() => EMPTY));
	}
}

const galaxies = [];
for (let row = 0; row < map.length; row++) {
	for (let column = 0; column < map[row].length; column++) {
		if (map[row][column] === '#') {
			galaxies.push([ row, column ]);
		}
	}
}

let distance = 0;
for (let indexFrom = 0; indexFrom < galaxies.length; indexFrom++) {
	const [ rowFrom, columnFrom ] = galaxies[indexFrom];

	for (let indexTo = indexFrom + 1; indexTo < galaxies.length; indexTo++) {
		const [ rowTo, columnTo ] = galaxies[indexTo];

		const minRow = Math.min(rowFrom, rowTo);
		const maxRow = Math.max(rowFrom, rowTo);
		for (let row = minRow + 1; row <= maxRow; row++) {
			const char = map[row][columnFrom];
			if (char === EMPTY) {
				distance += emptySize;
			} else {
				distance++;
			}
		}

		const minColumn = Math.min(columnFrom, columnTo);
		const maxColumn = Math.max(columnFrom, columnTo);
		for (let column = minColumn + 1; column <= maxColumn; column++) {
			const char = map[rowFrom][column];
			if (char === EMPTY) {
				distance += emptySize;
			} else {
				distance++;
			}
		}
	}
}

console.log(distance);
