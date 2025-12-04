import { getLines } from '../get-lines.ts';

const rows = getLines(import.meta.url);

const adjacentDeltas = [
	[-1, -1], [-1, 0], [-1, 1],
	[ 0, -1],          [ 0, 1],
	[ 1, -1], [ 1, 0], [ 1, 1],
];

const accessablePapers: Array<[number, number]> = [];
let lastAccessableCount = -1;

while (lastAccessableCount !== accessablePapers.length) {
	lastAccessableCount = accessablePapers.length;

	for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
		let row = rows[rowIndex];

		for (let colIndex = 0; colIndex < row.length; colIndex++) {
			const cell = row[colIndex];
			if (cell !== '@') {
				continue;
			}

			const adjacent = adjacentDeltas.reduce((count, [deltaRow, deltaCol]) => {
				if (rows[rowIndex + deltaRow]?.[colIndex + deltaCol] === '@') {
					return count + 1;
				}

				return count;
			}, 0);

			if (adjacent < 4) {
				accessablePapers.push([rowIndex, colIndex]);
			}
		}
	}

	for (const [rowIndex, colIndex] of accessablePapers) {
		rows[rowIndex] = rows[rowIndex].substring(0, colIndex) + 'x' + rows[rowIndex].substring(colIndex + 1);
	}
}

console.log(accessablePapers.length);
