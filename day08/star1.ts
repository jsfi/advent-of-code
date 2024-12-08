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
for (const [_, positions] of antennas) {
	for (let i = 0; i < positions.length - 1; i++) {
		const [x1, y1] = positions[i];

		for (let j = i + 1; j < positions.length; j++) {
			const [x2, y2] = positions[j];

			const antinodeX1 = x1 + x1 - x2;
			const antinodeY1 = y1 + y1 - y2;
			if (antinodeX1 >= 0 && antinodeX1 <= maxCol && antinodeY1 >= 0 && antinodeY1 <= maxRow) {
				antinodes.add(`${antinodeX1},${antinodeY1}`);
			}

			const antinodeX2 = x2 + x2 - x1;
			const antinodeY2 = y2 + y2 - y1;
			if (antinodeX2 >= 0 && antinodeX2 <= maxCol && antinodeY2 >= 0 && antinodeY2 <= maxRow) {
				antinodes.add(`${antinodeX2},${antinodeY2}`);
			}
		}
	}
}

console.log(antinodes.size);
