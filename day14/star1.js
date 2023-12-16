import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

let result = 0;

const rows = lines.length;
const columns = lines.at(0).length;
let moveToRow = Array.from({ length: columns }, () => 0);

for (let row = 0; row < rows; row++) {
	for (let column = 0; column < columns; column++) {
		const char = lines[row][column];
		if (char === 'O') {
			result += rows - moveToRow[column];
			moveToRow[column]++;
		} else if (char === '#') {
			moveToRow[column] = row + 1;
		}
	}
}

console.log(result);
