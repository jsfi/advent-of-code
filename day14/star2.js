import { SAND_X, SAND_Y, SYMBOL_AIR, SYMBOL_ROCK, SYMBOL_SAND } from './constants.js';
import { getGrid } from './getGrid.js';

const grid = await getGrid();
const cols = grid[0].length;

grid.push(
	Array.from({ length: cols }, () => SYMBOL_AIR),
	Array.from({ length: cols }, () => SYMBOL_ROCK),
);

const indexFloor = grid.length - 1;

let count = 0;
while (true) {
	let sandX = SAND_X - grid.xShift;
	let sandY = SAND_Y;
	let settled = false;

	if (grid[sandY][sandX] === SYMBOL_SAND) {
		break;
	}

	while (!settled) {
		const nextCell = grid[sandY + 1]?.[sandX];
		if (nextCell === SYMBOL_AIR) {
			sandY++;
			continue;
		}

		if (nextCell === SYMBOL_ROCK || nextCell === SYMBOL_SAND) {
			let nextCellLeft = grid[sandY + 1][sandX - 1];

			if (nextCellLeft === undefined) {
				grid.forEach(row => row.unshift(SYMBOL_AIR));
				grid[indexFloor][0] = SYMBOL_ROCK;
				sandX++;
				grid.xShift--;
				nextCellLeft = grid[sandY + 1][sandX - 1];
			}

			if (nextCellLeft === SYMBOL_AIR) {
				sandX--;
				sandY++;
				continue;
			}

			let nextCellRight = grid[sandY + 1][sandX + 1];

			if (nextCellRight === undefined) {
				grid.forEach(row => row.push(SYMBOL_AIR));
				grid[indexFloor][grid[indexFloor].length - 1] = SYMBOL_ROCK;
				nextCellRight = grid[sandY + 1][sandX + 1];
			}

			if (nextCellRight === SYMBOL_AIR) {
				sandX++;
				sandY++;
				continue;
			}

			count++;
			grid[sandY][sandX] = SYMBOL_SAND;
			settled = true;
		}
	}
}

// grid.forEach(row => console.log(row.join('')));

console.log(count);
