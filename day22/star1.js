import { getLines } from '../getLines.js';

const SPACE = '.';
const WALL = '#';

const DIRECTION_RIGHT = 0;
const DIRECTION_DOWN = 1;
const DIRECTION_LEFT = 2;
const DIRECTION_UP = 3;
const DIRECTIONS = [DIRECTION_RIGHT, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_UP];
const DIRECTION_MAP = {
	[DIRECTION_RIGHT]: 'right',
	[DIRECTION_DOWN]: 'down',
	[DIRECTION_LEFT]: 'left',
	[DIRECTION_UP]: 'up',
}

const lines = await getLines(import.meta.url);

const map = lines.slice(0, -2).map(row => row.split(''));
const maxRowLength = Math.max(...map.map(row => row.length));
map.forEach(row => {
	while (row.length < maxRowLength) row.push(' ');
})
const path = lines.at(-1);

const getKey = (x, y) => `${x}|${y}`;

const tiles = new Map();

// create tiles
for (let y = 0; y < map.length; y++) {
	const row = map[y];
	for (let x = 0; x < row.length; x++) {
		if (row[x] !== SPACE) continue;
		tiles.set(getKey(x, y), {
			x, y,
			right: undefined, down: undefined,
			left: undefined, up: undefined,
		});
	}
}

const getNext = (x, y, xDiff = 0, yDiff = 0) => {
	const xNext = x + xDiff;
	const yNext = y + yDiff;
	const next = map[yNext]?.[xNext];

	if (next === SPACE) return tiles.get(getKey(xNext, yNext));
	if (next === WALL) return undefined;

	if (xDiff === 0 && yDiff === 0) {
		debugger;
		throw 'stop';
	}

	let iterX = xDiff === 0
		? x
		: xDiff > 0
			? 0
			: map[y].length - 1;
	let iterY = yDiff === 0
		? y
		: yDiff > 0
			? 0
			: map.length - 1;
	while(map[iterY][iterX] === ' ') {
		iterX += xDiff;
		iterY += yDiff;
	}
	return getNext(iterX, iterY);
}

// create links
for (const tile of tiles.values()) {
	const x = tile.x;
	const y = tile.y;

	tile.right = getNext(x, y, 1, 0);
	tile.down = getNext(x, y, 0, 1);
	tile.left = getNext(x, y, -1, 0);
	tile.up = getNext(x, y, 0, -1);
}

let current = tiles.values().next().value;
let direction = DIRECTION_RIGHT;
let steps = '';

const stepping = () => {
	const numSteps = Number(steps);
	for (let i = 0; i < numSteps; i++) {
		const next = current[DIRECTION_MAP[direction]];
		if (next) {
			current = next;
		} else {
			break;
		}
	}

	steps = '';
}

for (let i = 0; i < path.length; i++) {
	const char = path[i];
	if (char === 'R') {
		stepping();
		direction = DIRECTIONS.at(direction + 1 % DIRECTIONS.length);
		continue;
	}

	if (char === 'L') {
		stepping();
		direction = DIRECTIONS.at(direction - 1);
		continue;
	}

	steps += char;
}

stepping();
console.log(1000 * (current.y + 1) + 4 * (current.x + 1) + direction);