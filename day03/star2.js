import { getLines } from '../getLines.js';
import { findSharedCharacters } from './findSharedCharacters.js';
import { getPriority } from './getPriority.js';

const lines = await getLines(import.meta.url);

let sumPrioritiesBadges = 0;
for (let i = 0; i <= lines.length / 3 - 1; i++) {
	const startIndex = i * 3;

	const shared12 = findSharedCharacters(lines[startIndex], lines[startIndex + 1]);
	const shared123 = findSharedCharacters(lines[startIndex + 2], shared12.join(''));

	if (shared123.length !== 1) {
		throw new Error('Too many badges');
	}

	sumPrioritiesBadges += getPriority(shared123[0]);
}

console.log(sumPrioritiesBadges);
