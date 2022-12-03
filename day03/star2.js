import { getLines } from '../getLines.js';
import { sumOfList } from '../sumOfList.js';
import { findSharedCharacters } from './findSharedCharacters.js';
import { getPriorities } from './getPriorities.js';

const lines = await getLines(import.meta.url);

const groups = [];
for (let i = 0; i <= lines.length / 3 - 1; i++) {
	const startIndex = i * 3;
	groups.push(lines.slice(startIndex, startIndex + 3));
}

const groupBadges = groups.map(rucksacks => {
	const shared12 = findSharedCharacters(rucksacks[0], rucksacks[1]);
	const shared123 = findSharedCharacters(rucksacks[2], shared12.join(''));
	if (shared123.length !== 1) {
		throw new Error('Too many badges');
	}
	return shared123[0];
});

const sumPriorities = sumOfList(getPriorities(groupBadges));
console.log(sumPriorities);
