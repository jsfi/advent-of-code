import { getLines } from '../getLines.js';
import { sumCalories } from './sumCalories.js';

/**
 * @returns {Promise<number[]>}
 */
export async function getCalories() {
	const lines = await getLines(import.meta.url);
	return sumCalories(lines);
}
