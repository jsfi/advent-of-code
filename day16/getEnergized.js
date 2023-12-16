import { getLines } from '../getLines.js';

export const NORTH = 'NORTH';
export const EAST = 'EAST';
export const SOUTH = 'SOUTH';
export const WEST = 'WEST';

const lines = await getLines(import.meta.url);

const grid = lines.map(line => line.split(''));
export const rows = grid.length;
export const columns = grid.at(0).length;

const isInGrid = (row, column) => {
	return row >= 0 && row < rows && column >= 0 && column < columns;
};

export function getEnergized(startMove) {
	const doNotRepeat = new Set();
	const energized = new Set();

	const moves = [ startMove ];

	while (moves.length) {
		const [ row, column, direction ] = moves.shift();

		const moveKey = `${row}|${column}|${direction}`;
		if (!isInGrid(row, column) || doNotRepeat.has(moveKey)) {
			continue;
		}

		doNotRepeat.add(moveKey);
		energized.add(`${row}|${column}`);

		const char = grid[row][column];

		if (char === '-' && (direction === NORTH || direction === SOUTH)) {
			moves.push([ row, column + 1, EAST ]);
			moves.push([ row, column - 1, WEST ]);
		} else if (char === '|' && (direction === EAST || direction === WEST)) {
			moves.push([ row - 1, column, NORTH ]);
			moves.push([ row + 1, column, SOUTH ]);
		} else if (char === '\\') {
			switch (direction) {
				case NORTH:
					moves.push([ row, column - 1, WEST ]);
					break;
				case EAST:
					moves.push([ row + 1, column, SOUTH ]);
					break;
				case SOUTH:
					moves.push([ row, column + 1, EAST ]);
					break;
				case WEST:
					moves.push([ row - 1, column, NORTH ]);
					break;
			}
		} else if (char === '/') {
			switch (direction) {
				case NORTH:
					moves.push([ row, column + 1, EAST ]);
					break;
				case EAST:
					moves.push([ row - 1, column, NORTH ]);
					break;
				case SOUTH:
					moves.push([ row, column - 1, WEST ]);
					break;
				case WEST:
					moves.push([ row + 1, column, SOUTH ]);
					break;
			}
		} else {
			switch (direction) {
				case NORTH:
					moves.push([ row - 1, column, NORTH ]);
					break;
				case EAST:
					moves.push([ row, column + 1, EAST ]);
					break;
				case SOUTH:
					moves.push([ row + 1, column, SOUTH ]);
					break;
				case WEST:
					moves.push([ row, column - 1, WEST ]);
					break;
			}
		}
	}

	return energized.size;
}
