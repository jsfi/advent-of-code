import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const redTiles: Array<[number, number]> = lines.map(line => line.split(',').map((value) => Number(value)));

const sides = redTiles.map((tile, index) => {
	return [tile, redTiles[(index + 1) % redTiles.length]];
});

const inRange = (a1, a2, b1, b2) =>
	!(a1 <= b1 && a1 <= b2 && a2 <= b1 && a2 <= b2) &&
	!(a1 >= b1 && a1 >= b2 && a2 >= b1 && a2 >= b2);

let maxRectangleArea = 0;
for (let index1 = 0; index1 < redTiles.length; index1++) {
	const [tile1X, tile1Y] = redTiles[index1];
	for (let index2 = index1 + 1; index2 < redTiles.length; index2++) {
		const [tile2X, tile2Y] = redTiles[index2];
		const width = Math.abs(tile1X - tile2X) + 1;
		const height = Math.abs(tile1Y - tile2Y) + 1;
		const area = width * height;

		if (area > maxRectangleArea) {
			const isIntersecting = sides.some(
				([[side1X, side1Y], [side2X, side2Y]]) =>
					inRange(side1Y, side2Y, tile1Y, tile2Y) && inRange(side1X, side2X, tile1X, tile2X)
			);

			if (!isIntersecting) {
				maxRectangleArea = area;
			}
		}
	}
}

console.log(maxRectangleArea);