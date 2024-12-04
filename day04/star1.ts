import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);
const rows = lines.map(line => line.split(''));

const searchWord = ['X', 'M', 'A', 'S'];

const match = (charIndex: number, row: number, col: number, dx: number, dy: number) => {
	if (charIndex === searchWord.length) {
		return true;
	}

	if (rows[row]?.[col] !== searchWord[charIndex]) {
		return false;
	}

	return match(charIndex + 1, row + dy, col + dx, dx, dy);
}

let result = 0;
for (let row = 0; row < rows.length; row++) {
	for (let col = 0; col < rows[row].length; col++) {
		if (rows[row][col] !== searchWord[0]) {
			continue;
		}

		// horizontal
		if (match(0, row, col, 1, 0)) {
			result++;
		}

		// horizontal reversed
		if (match(0, row, col, -1, 0)) {
			result++;
		}

		// vertical
		if (match(0, row, col, 0, 1)) {
			result++;
		}

		// vertical reversed
		if (match(0, row, col, 0, -1)) {
			result++;
		}

		// diagonal up-right
		if (match(0, row, col, 1, -1)) {
			result++;
		}

		// diagonal down-right
		if (match(0, row, col, 1, 1)) {
			result++;
		}

		// diagonal down-left
		if (match(0, row, col, -1, 1)) {
			result++;
		}

		// diagonal up-left
		if (match(0, row, col, -1, -1)) {
			result++;
		}
	}
}

console.log(result);
