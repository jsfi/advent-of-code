import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

type Position = [number, number];

const antennas = new Map<string, Array<Position>>();
for (let row = 0; row < lines.length; row++) {
	for (let col = 0; col < lines[row].length; col++) {
		const type = lines[row][col];

		if (type === '.') {
			continue;
		}

		let positions = antennas.get(type);

		if (!positions) {
			positions = [];
			antennas.set(type, positions);
		}

		positions.push([col, row]);
	}
}

const maxRow = lines.length - 1;
const maxCol = lines[0].length - 1;

const antinodes = new Set<string>();
for (const [type, positions] of antennas) {
	if (positions.length <= 1) {
		console.log('All by myself...', type);
		continue;
	}

	for (let i = 0; i < positions.length; i++) {
		const [x, y] = positions[i];
		antinodes.add(`${x},${y}`);
	}

	for (let i = 0; i < positions.length - 1; i++) {
		const [x1, y1] = positions[i];

		for (let j = i + 1; j < positions.length; j++) {
			const [x2, y2] = positions[j];

			const dx1 = x1 - x2;
			const dy1 = y1 - y2;

			let antinodeX1 = x1 + dx1;
			let antinodeY1 = y1 + dy1;

			while(antinodeX1 >= 0 && antinodeX1 <= maxCol && antinodeY1 >= 0 && antinodeY1 <= maxRow) {
				antinodes.add(`${antinodeX1},${antinodeY1}`);
				antinodeX1 += dx1;
				antinodeY1 += dy1;
			}

			const dx2 = x2 - x1;
			const dy2 = y2 - y1;

			let antinodeX2 = x2 + dx2;
			let antinodeY2 = y2 + dy2;

			while(antinodeX2 >= 0 && antinodeX2 <= maxCol && antinodeY2 >= 0 && antinodeY2 <= maxRow) {
				antinodes.add(`${antinodeX2},${antinodeY2}`);
				antinodeX2 += dx2;
				antinodeY2 += dy2;
			}
		}
	}
}

console.log(antinodes.size);
