import { getLines } from '../getLines.js';

const NORTH = 'NORTH';
const EAST = 'EAST';
const SOUTH = 'SOUTH';
const WEST = 'WEST';

const turnLeft = (direction) => {
	switch (direction) {
		case NORTH:
			return WEST;
		case EAST:
			return NORTH;
		case SOUTH:
			return EAST;
		case WEST:
			return SOUTH;
	}
}

const turnRight = (direction) => {
	switch (direction) {
		case NORTH:
			return EAST;
		case EAST:
			return SOUTH;
		case SOUTH:
			return WEST;
		case WEST:
			return NORTH;
	}
}

const nextPosition = (row, column, direction) => {
	switch (direction) {
		case NORTH:
			return [ row - 1, column ];
		case EAST:
			return [ row, column + 1 ];
		case SOUTH:
			return [ row + 1, column ];
		case WEST:
			return [ row, column - 1 ];
	}
}

export async function findMinimumHeatLoss(canMoveForward, canTurn) {
	const lines = await getLines(import.meta.url);
	const grid = lines.map(line => line.split('').map(Number));
	const rows = grid.length;
	const columns = grid.at(0).length;
	const rowTarget = rows - 1;
	const columnTarget = columns - 1;

	// row, column, direction, distanceInDirection
	const queue = [ [ [ 0, 0, EAST, 0 ] ] ];
	let heatLoss = 0;
	const seen = new Set();

	function tryMove(basePath, direction) {
		const [ row, column ] = nextPosition(basePath.at(0), basePath.at(1), direction);
		if (row < 0 || row >= rows || column < 0 || column >= columns) return;

		const distance = basePath.at(2) === direction ? basePath.at(3) + 1 : 1;

		const identifier = `${row}|${column}|${direction}|${distance}`;
		if (seen.has(identifier)) return;

		seen.add(identifier);
		const newHeatLoss = heatLoss + grid[row][column];
		queue[newHeatLoss] ??= [];
		queue[newHeatLoss].push([ row, column, direction, distance ]);
	}

	findMinimumHeatLoss: while (true) {
		for (const path of queue[heatLoss] ?? []) {
			const row = path.at(0);
			const column = path.at(1);
			if (row === rowTarget && column === columnTarget) {
				break findMinimumHeatLoss;
			}

			const direction = path.at(2);
			const distance = path.at(3);
			if (canMoveForward(distance)) {
				tryMove(path, direction);
			}
			if (canTurn(distance)) {
				tryMove(path, turnLeft(direction));
				tryMove(path, turnRight(direction));
			}
		}

		heatLoss++;
	}

	return heatLoss;
}
