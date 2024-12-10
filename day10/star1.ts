import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const map = lines.map((line) => line.split('').map(Number));

function findMountainTops(row: number, col: number, nextHeight: number, mountainTops = new Set<string>()): Set<string> {
	[
		[-1, 0],
		[0, 1],
		[1, 0],
		[0, -1],
	].forEach(([rowDiff, colDiff]) => {
		const nextRow = row + rowDiff;
		const nextCol = col + colDiff;

		if (map[nextRow]?.[nextCol] === nextHeight) {
			if (nextHeight === 9) {
				mountainTops.add(`${nextRow},${nextCol}`);
			} else {
				findMountainTops(nextRow, nextCol, nextHeight + 1, mountainTops);
			}
		}
	});

	return mountainTops;
}

let result = 0;
for (let row = 0; row < map.length; row++) {
	for (let col = 0; col < map[row].length; col++) {
		if (map[row][col] === 0) {
			result += findMountainTops(row, col, 1).size;
		}
	}
}
console.log(result);
