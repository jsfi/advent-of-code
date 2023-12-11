import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

const map = lines.map(line => line.split(''));
const rowLength = map[0].length;

const emptyColumns = [];
for (let column = 0; column < rowLength; column++) {
	if (map.every(row => row[column] === '.')) {
		emptyColumns.push(column);
	}
}

const expandedRowLength = rowLength + emptyColumns.length;

const expandedMap = [];
for (const row of map) {
	if (row.every(char => char === '.')) {
		expandedMap.push(
			Array.from({ length: expandedRowLength }, () => '.'),
			Array.from({ length: expandedRowLength }, () => '.'),
		);
		continue;
	}

	let expandedRow = [ ...row ];
	for (let emptyColumnIndex = emptyColumns.length - 1; emptyColumnIndex >= 0; emptyColumnIndex--) {
		expandedRow.splice(emptyColumns[emptyColumnIndex], 0, '.');
	}
	expandedMap.push(expandedRow);
}

const galaxies = [];
for (let row = 0; row < expandedMap.length; row++) {
	for (let column = 0; column < expandedMap[row].length; column++) {
		if (expandedMap[row][column] === '#') {
			galaxies.push([ row, column ]);
		}
	}
}

let distance = 0;
for (let indexFrom = 0; indexFrom < galaxies.length; indexFrom++) {
	const [ rowFrom, columnFrom ] = galaxies[indexFrom];

	for (let indexTo = indexFrom + 1; indexTo < galaxies.length; indexTo++) {
		const [ rowTo, columnTo ] = galaxies[indexTo];

		distance += Math.abs(rowFrom - rowTo) + Math.abs(columnFrom - columnTo);
	}
}

console.log(distance);
