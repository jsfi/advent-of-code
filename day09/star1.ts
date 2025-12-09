import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const redTiles: Array<[number, number]> = lines.map(line => line.split(',').map((value) => Number(value)));

let maxRectangleArea = 0;
for (let index1 = 0; index1 < redTiles.length; index1++) {
	const [tile1X, tile1Y] = redTiles[index1];
	for (let index2 = index1 + 1; index2 < redTiles.length; index2++) {
		const [tile2X, tile2Y] = redTiles[index2];
		const width = Math.abs(tile1X - tile2X) + 1;
		const height = Math.abs(tile1Y - tile2Y) + 1;
		maxRectangleArea = Math.max(maxRectangleArea, width * height);
	}
}

console.log(maxRectangleArea);
