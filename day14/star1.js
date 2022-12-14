import { SAND_X, SAND_Y, SYMBOL_AIR, SYMBOL_ROCK, SYMBOL_SAND } from './constants.js';
import { getGrid } from './getGrid.js';

const grid = await getGrid();

let count = 0;
let intoTheVoid = false;
while (!intoTheVoid) {
	let sandX = SAND_X - grid.xShift;
	let sandY = SAND_Y;
	let settled = false;

	while (!settled) {
		const nextCell = grid[sandY + 1]?.[sandX];
		if (nextCell === SYMBOL_AIR) {
			sandY++;
			continue;
		}

		if (nextCell === SYMBOL_ROCK || nextCell === SYMBOL_SAND) {
			const nextCellLeft = grid[sandY + 1][sandX - 1];

			if (nextCellLeft === undefined) {
				intoTheVoid = true;
				break;
			}

			if (nextCellLeft === SYMBOL_AIR) {
				sandX--;
				sandY++;
				continue;
			}

			const nextCellRight = grid[sandY + 1][sandX + 1];

			if (nextCellRight === undefined) {
				intoTheVoid = true;
				break;
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

		if (nextCell === undefined) {
			grid[sandY][sandX] = 'X';
			intoTheVoid = true;
			break;
		}
	}
}

// grid.forEach(row => console.log(row.join('')));

console.log(count);
