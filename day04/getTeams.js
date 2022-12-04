import { getLines } from '../getLines.js';

/**
 * @returns {Promise<number[][][]>}
 */
export async function getTeams() {
	const lines = await getLines(import.meta.url);
	return lines.map(line =>
		line.split(',').map(elf => elf.split('-').map(Number))
	);
}
