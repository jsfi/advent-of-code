import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

const NORTH = 'NORTH';
const EAST = 'EAST';
const SOUTH = 'SOUTH';
const WEST = 'WEST';

const directions = new Map([
	[ NORTH, [ -1, 0 ] ],
	[ EAST, [ 0, 1 ] ],
	[ SOUTH, [ 1, 0 ] ],
	[ WEST, [ 0, -1 ] ],
]);

const connections = new Map([
	[ NORTH, SOUTH ],
	[ EAST, WEST ],
	[ SOUTH, NORTH ],
	[ WEST, EAST ],
]);

const pipes = new Map([
	[ '|', [ NORTH, SOUTH ] ],
	[ '-', [ EAST, WEST ] ],
	[ 'L', [ NORTH, EAST ] ],
	[ 'J', [ NORTH, WEST ] ],
	[ '7', [ SOUTH, WEST ] ],
	[ 'F', [ SOUTH, EAST ] ],
	[ 'S', [ NORTH, EAST, SOUTH, WEST ] ],
]);

export function getMapData() {
	const map = lines.map(line => line.split(''));

	const isConnected = (row, column, direction) => {
		const [ rowOffset, columnOffset ] = directions.get(direction);

		const nextPipe = pipes.get(map[row + rowOffset]?.[column + columnOffset]);
		return Boolean(nextPipe) && nextPipe.includes(connections.get(direction));
	}

	const removeConnectedPipe = (row, column, direction) => {
		if (isConnected(row, column, direction)) {
			const [ rowOffset, columnOffset ] = directions.get(direction);

			const connectedRow = row + rowOffset;
			const connectedColumn = column + columnOffset;
			const connectedPipe = map[connectedRow]?.[connectedColumn];

			// never remove the starting pipe
			if (connectedPipe === 'S') {
				return;
			}

			map[connectedRow][connectedColumn] = '.';

			// remove the connected pipe in the other direction
			const connectedDirection = connections.get(direction);
			const otherDirection = pipes.get(connectedPipe).find(pipeDirection => pipeDirection !== connectedDirection);
			removeConnectedPipe(connectedRow, connectedColumn, otherDirection);
		}
	}

	let startRow = -1;
	let startColumn = -1;

	for (let row = 0; row < map.length; row++) {
		for (let column = 0; column < map[row].length; column++) {
			const char = map[row][column];

			if (char === '.') {
				continue;
			}

			if (char === 'S') {
				startRow = row;
				startColumn = column;
				continue;
			}

			const [ entry, exit ] = pipes.get(char);
			const isConnectedToEntry = isConnected(row, column, entry);
			const isConnectedToExit = isConnected(row, column, exit);

			if (!isConnectedToEntry || !isConnectedToExit) {
				map[row][column] = '.';

				if (isConnectedToEntry) {
					removeConnectedPipe(row, column, entry);
				}

				if (isConnectedToExit) {
					removeConnectedPipe(row, column, exit);
				}
			}
		}
	}

	const loop = [ [ startRow, startColumn, 'S' ] ];
	const visited = new Set([ `${startRow}|${startColumn}` ]);

	const firstConnectionDirection = pipes.get('S').find(direction => isConnected(startRow, startColumn, direction));
	const [ rowOffset, columnOffset ] = directions.get(firstConnectionDirection);

	let currentRow = startRow + rowOffset;
	let currentColumn = startColumn + columnOffset;
	let currentDirection = firstConnectionDirection;

	while (true) {
		const pipeChar = map[currentRow][currentColumn];
		const pipe = pipes.get(pipeChar);
		const connectedDirection = connections.get(currentDirection);
		const otherDirection = pipe.find(pipeDirection => pipeDirection !== connectedDirection);

		loop.push([ currentRow, currentColumn, pipeChar ]);
		visited.add(`${currentRow}|${currentColumn}`);

		const [ rowOffset, columnOffset ] = directions.get(otherDirection);
		currentRow += rowOffset;
		currentColumn += columnOffset;
		currentDirection = otherDirection;

		if (visited.has(`${currentRow}|${currentColumn}`)) {
			break;
		}
	}

	return loop;
}
