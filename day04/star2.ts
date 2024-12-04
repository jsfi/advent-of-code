import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);
const rows = lines.map(line => line.split(''));

const match = (row: number, col: number, dx: number, dy: number) => {
	const charStart = rows[row - dy]?.[col - dx];
	const charEnd = rows[row + dy]?.[col + dx];

	return (charStart === 'M' && charEnd === 'S') || (charStart === 'S' && charEnd === 'M');
}

let result = 0;
for (let row = 0; row < rows.length; row++) {
	for (let col = 0; col < rows[row].length; col++) {
		if (rows[row][col] !== 'A') {
			continue;
		}

		if (match(row, col, 1, 1) && match(row, col, 1, -1)) {
			result++;
		}
	}
}

console.log(result);
