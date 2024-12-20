import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const map = lines.map((line) => line.split(''));

type Position = [number, number];

const path: Array<Position> = [];
start: for (let row = 0; row < map.length; row++) {
	for (let col = 0; col < map[row].length; col++) {
		if (map[row][col] === 'S') {
			path.push([row, col]);
			break start;
		}
	}
}

const visited = new Set<string>(path[0].join(','));
path: while (true) {
	const [row, col] = path.at(-1)!;

	for (const [rowOffset, colOffset] of [[-1, 0], [0, 1], [1, 0], [0, -1]]) {
		const nextRow = row + rowOffset;
		const nextCol = col + colOffset;

		const key = `${nextRow},${nextCol}`;
		if (visited.has(key)) {
			continue;
		}

		const nextTile = map[nextRow]?.[nextCol];
		if (nextTile === '.' || nextTile === 'E') {
			path.push([nextRow, nextCol]);
			visited.add(key);
		}

		if (nextTile === 'E') {
			break path;
		}
	}
}

const cheats = new Map<number, number>();
for (let i = 0; i < path.length; i++) {
	const [row, col] = path[i];

	for (const [rowOffset, colOffset] of [[-2, 0], [0, 2], [2, 0], [0, -2]]) {
		const nextRow = row + rowOffset;
		const nextCol = col + colOffset;
		const nextTile = map[nextRow]?.[nextCol];

		if (nextTile === '.' || nextTile === 'E') {
			const nextIndex = path.findIndex(([findRow, findColumn]) => findRow === nextRow && findColumn === nextCol);
			const diff = nextIndex - i - 2;
			if (diff > 0) {
				cheats.set(diff, (cheats.get(diff) ?? 0) + 1);
			}
		}
	}
}

let result = 0;
for (const [key, value] of cheats) {
	if (key >= 100) {
		result += value;
	}
}
console.log(result);
