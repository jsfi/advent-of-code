import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const garden = lines.map((line) => line.split(''));

type Position = [number, number];

const visited = new Set<string>();

const getFencePrice = (row: number, col: number): number => {
	const plant = garden[row][col];
	const plots: Array<Position> = [[row, col]];

	let area = 0;
	let perimeter = 0;

	while (plots.length) {
		const [row, col] = plots.pop()!;
		const key = `${row},${col}`;

		if (visited.has(key)) {
			continue;
		}

		visited.add(key);
		area += 1;

		[
			[-1, 0],
			[0, 1],
			[1, 0],
			[0, -1],
		].forEach(([rowDiff, colDiff]) => {
			const nextRow = row + rowDiff;
			const nextCol = col + colDiff;

			const isSamePlant = garden[nextRow]?.[nextCol] === plant;
			if (!isSamePlant) {
				perimeter += 1;
			}

			if (isSamePlant) {
				plots.push([nextRow, nextCol]);
			}
		});
	}

	return area * perimeter;
}

let result = 0;
for (let row = 0; row < garden.length; row++) {
	const line = garden[row];
	for (let col = 0; col < line.length; col++) {
		if (visited.has(`${row},${col}`)) {
			continue;
		}

		result += getFencePrice(row, col);
	}
}

console.log(result);
