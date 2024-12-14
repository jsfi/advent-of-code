import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);
const laboratory = lines.map((line) => line.split(''));

type Pair = [number, number];

const TOP: Pair = [0, -1];
const RIGHT: Pair = [1, 0];
const BOTTOM: Pair = [0, 1];
const LEFT: Pair = [-1, 0];
const directions: Array<Pair> = [TOP, RIGHT, BOTTOM, LEFT];

let start!: Pair;
for (let row = 0; row < laboratory.length; row++) {
	const line = lines[row];
	for (let col = 0; col < line.length; col++) {
		const char = line[col];
		if (char === '^') {
			start = [col, row];
		}
	}
}

let direction = TOP;
const visited = new Set<string>();
let position = start;
while (true) {
	visited.add(position.join(','));

	const nextPosition: Pair = [position[0] + direction[0], position[1] + direction[1]];
	const tile = laboratory[nextPosition[1]]?.[nextPosition[0]];

	if (tile === undefined) {
		break;
	}

	if (tile === '#') {
		direction = directions[(directions.indexOf(direction) + 1) % directions.length];
		continue;
	}

	position = nextPosition;
}

// Bruteforce all possible obstacles in the path
let loops = 0;
for (const visitedPosition of visited) {
	const [x, y] = visitedPosition.split(',').map(Number);

	// Clone the laboratory and add a wall at the visited position
	const modifiedLaboratory = structuredClone(laboratory);
	modifiedLaboratory[y][x] = '#';

	let position = start;
	let direction = TOP;
	const visitedWithDirection = new Set<string>();

	while (true) {
		const positionAndDirectionString = position.concat(direction).join(',');

		// If we are on the same position with the same direction, we are in a loop
		if (visitedWithDirection.has(positionAndDirectionString)) {
			loops++;
			break;
		}

		visitedWithDirection.add(position.concat(direction).join(','));

		const nextPosition: Pair = [position[0] + direction[0], position[1] + direction[1]];
		const tile = modifiedLaboratory[nextPosition[1]]?.[nextPosition[0]];

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
}

console.log(loops);
