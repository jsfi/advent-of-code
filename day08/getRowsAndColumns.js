import { getLines } from '../getLines.js';

/**
 * @return {Promise<[number[][]|number[][]]>}
 */
export async function getRowsAndColumns() {
	const lines = await getLines(import.meta.url);

	const rows = lines.map(row => row.split('').map(Number));

	const columns = Array.from({ length: rows[0].length }, () => []);
	for (let y = 0; y < rows.length; y++) {
		const row = rows[y];
		for (let x = 0; x < row.length; x++) {
			columns[x][y] = row[x];
		}
	}

	return [rows, columns];
}
