import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const garden = lines.map((line) => line.split(''));

type Position = [number, number];

const directions: Array<Position> = [
	[0, 1],
	[1, 0],
	[0, -1],
	[-1, 0],
];

const visited = new Set<string>();

const getFencePrice = (row: number, col: number): number => {
	const plant = garden[row][col];
	const plots: Array<Position> = [[row, col]];
	const plotSet = new Set<string>();

	while (plots.length) {
		const [row, col] = plots.pop()!;
		const key = `${row},${col}`;

		if (visited.has(key)) {
			continue;
		}

		visited.add(key);
		plotSet.add(key);

		directions.forEach(([rowDiff, colDiff]) => {
			const nextRow = row + rowDiff;
			const nextCol = col + colDiff;

			const isSamePlant = garden[nextRow]?.[nextCol] === plant;
			if (isSamePlant) {
				plots.push([nextRow, nextCol]);
			}
		});
	}

	let corners = 0;
	for (const plot of plotSet) {
		const [plotRow, plotCol] = plot.split(',').map(Number);
		let plotCorners = 0;

		const topMatches = garden[plotRow - 1]?.[plotCol] === plant;
		const rightMatches = garden[plotRow]?.[plotCol + 1] === plant;
		const bottomMatches = garden[plotRow + 1]?.[plotCol] === plant;
		const leftMatches = garden[plotRow]?.[plotCol - 1] === plant;

		// Outer corners
		if (!topMatches && !rightMatches) plotCorners += 1;
		if (!rightMatches && !bottomMatches) plotCorners += 1;
		if (!bottomMatches && !leftMatches) plotCorners += 1;
		if (!leftMatches && !topMatches) plotCorners += 1;

		// Inner corners
		if (topMatches && rightMatches && garden[plotRow - 1]?.[plotCol + 1] !== plant) plotCorners += 1;
		if (rightMatches && bottomMatches && garden[plotRow + 1]?.[plotCol + 1] !== plant) plotCorners += 1;
		if (bottomMatches && leftMatches && garden[plotRow + 1]?.[plotCol - 1] !== plant) plotCorners += 1;
		if (leftMatches && topMatches && garden[plotRow - 1]?.[plotCol - 1] !== plant) plotCorners += 1;

		corners += plotCorners;
	}

	return plotSet.size * corners;
};

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
