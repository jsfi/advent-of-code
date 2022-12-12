import { getLines } from '../getLines.js';

const CHAR_CODE_S = 'S'.charCodeAt(0);
const CHAR_CODE_E = 'E'.charCodeAt(0);

/**
 * @param {string} elevationChar
 * @returns {Cell}
 */
function mapElevationToCell(elevationChar) {
	const elevation = elevationChar.charCodeAt(0);
	return { elevation, children: [] };
}

/**
 * @returns {Promise<Cell[][]>}
 */
export async function getGrid() {
	const lines = await getLines(import.meta.url);

	/**
	 * @type {Cell[][]}
	 */
	const grid = [];

	for (const line of lines) {

		const row = line.split('').map(mapElevationToCell);

		const startIndex = row.findIndex(cell => cell.elevation === CHAR_CODE_S);
		if (startIndex !== -1) {
			const start = row[startIndex];
			start.start = true;
			start.elevation = 'a'.charCodeAt(0);
		}

		const endIndex = row.findIndex(cell => cell.elevation === CHAR_CODE_E);
		if (endIndex !== -1) {
			const end = row[endIndex];
			end.end = true;
			end.elevation = 'z'.charCodeAt(0);
		}

		grid.push(row);
	}

	for (let y = 0; y < grid.length; y++) {
		const row = grid[y];

		for (let x = 0; x < row.length; x++) {
			const cellX = row[x];
			const maxNextElevation = cellX.elevation + 1;

			cellX.children = [
				grid[y - 1]?.[x],
				grid[y][x + 1],
				grid[y + 1]?.[x],
				grid[y][x - 1],
			].filter(cell => cell && maxNextElevation >= cell.elevation);
		}
	}

	return grid;
}
