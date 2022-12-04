import { getLines } from '../getLines.js';

/**
 * @returns {Promise<string[][]>}
 */
export async function getMoves() {
	const lines = await getLines(import.meta.url);
	return lines.map(line => line.split(' '));
}
