import { getGrid } from './getGrid.js';
import { getShortestPathToEnd } from './getShortestPathToEnd.js';

const LOWEST_ELEVATION = 'a'.charCodeAt(0);

const grid = await getGrid();

/**
 * @type {Cell[]}
 */
let possibleStarts = [];
for (let y = 0; y < grid.length; y++) {
	const row = grid[y];
	for (let x = 0; x < row.length; x++) {
		if (row[x].elevation === LOWEST_ELEVATION) {
			possibleStarts.push(row[x]);
		}
	}
}

const queue = possibleStarts.map(startCell => [startCell]);
const shortestPathFromStart = getShortestPathToEnd(queue);

console.log(shortestPathFromStart.length - 1); // steps
