import { getGrid } from './getGrid.js';
import { getShortestPathToEnd } from './getShortestPathToEnd.js';

const grid = await getGrid();

const start = (() => {
	for (let y = 0; y < grid.length; y++) {
		const row = grid[y];
		for (let x = 0; x < row.length; x++) {
			if (row[x].start) {
				return row[x];
			}
		}
	}
})();

const queue = [[start]];
const shortestPathFromStart = getShortestPathToEnd(queue);

console.log(shortestPathFromStart.length - 1); // steps
