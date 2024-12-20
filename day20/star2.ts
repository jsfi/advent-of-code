import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const map = lines.map((line) => line.split(''));

const MIN = Deno.env.get('test') ? 50 : 100;

console.log('MIN', MIN);

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

const cheatsByPositions = new Map<string, number>();
for (let i = 0; i < path.length; i++) {
	const position = path[i];
	if ((i + 1) % 100 === 0) console.log(`Checking position ${i + 1}/${path.length}`);

	const stack: Array<[Position, number]> = [[position, 0]];
	const visitedWalls = new Set<string>();
	while (stack.length) {
		const [[row, col], steps] = stack.shift()!;
		if (steps >= 20) {
			continue;
		}

		for (const [rowOffset, colOffset] of [[-1, 0], [0, 1], [1, 0], [0, -1]]) {
			const nextRow = row + rowOffset;
			const nextCol = col + colOffset;
			const nextTile = map[nextRow]?.[nextCol];

			const key = position.concat([nextRow, nextCol]).join(',');
			if (cheatsByPositions.has(key)) {
				continue;
			}

			if (nextTile === '.' || nextTile === 'E') {
				const nextIndex = path.findIndex(([findRow, findColumn]) => findRow === nextRow && findColumn === nextCol);
				const diff = nextIndex - i - steps - 1;
				if (diff >= MIN) {
					cheatsByPositions.set(position.concat([nextRow, nextCol]).join(','), diff);
				}
			}

			const nextWallPosition: Position = [nextRow, nextCol];
			const wallKey = nextWallPosition.join(',');
			if (!visitedWalls.has(wallKey)) {
				visitedWalls.add(wallKey);
				stack.push([nextWallPosition, steps + 1]);
			}
		}
	}
}

console.log(cheatsByPositions.size);
