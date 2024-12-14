import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);
const laboratory = lines.map((line) => line.split(''));

type Pair = [number, number];

const TOP: Pair = [0, -1];
const RIGHT: Pair = [1, 0];
const BOTTOM: Pair = [0, 1];
const LEFT: Pair = [-1, 0];
const directions: Array<Pair> = [TOP, RIGHT, BOTTOM, LEFT];

let position!: Pair;
for (let row = 0; row < laboratory.length; row++) {
	const line = lines[row];
	for (let col = 0; col < line.length; col++) {
		const char = line[col];
		if (char === '^') {
			position = [col, row];
		}
	}
}

let direction = TOP;
const visited = new Set<string>();
while (true) {
	visited.add(position.join(','));

	const nextPosition: Pair = [position[0] + direction[0], position[1] + direction[1]];
	const tile = laboratory[nextPosition[1]]?.[nextPosition[0]];

	// If we run out of bounds, we are done
	if (tile === undefined) {
		break;
	}

	// If we hit a wall, turn right
	if (tile === '#') {
		direction = directions[(directions.indexOf(direction) + 1) % directions.length];
		continue;
	}

	position = nextPosition;
}

console.log(visited.size);
