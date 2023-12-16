import { NORTH, EAST, SOUTH, WEST, rows, columns, getEnergized } from './getEnergized.js';

let maxEnergized = 0;

for (let row = 0; row < rows; row++) {
	maxEnergized = Math.max(
		getEnergized([ row, 0, EAST ]),
		getEnergized([ row, columns - 1, WEST ]),
		maxEnergized,
	);
}

for (let column = 0; column < columns; column++) {
	maxEnergized = Math.max(
		getEnergized([ 0, column, SOUTH ]),
		getEnergized([ rows - 1, column, NORTH ]),
		maxEnergized,
	);
}

console.log(maxEnergized);
