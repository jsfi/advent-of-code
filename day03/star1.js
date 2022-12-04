import { getLines } from '../getLines.js';
import { sumOfList } from '../sumOfList.js';
import { findSharedCharacters } from './findSharedCharacters.js';
import { getPriority } from './getPriority.js';

const lines = await getLines(import.meta.url);

let sumPrioritiesDuplicates = 0;
for (const rucksack of lines) {
	const pivot = rucksack.length / 2;
	const compartment1 = rucksack.slice(0, pivot);
	const compartment2 = rucksack.slice(pivot);

	sumPrioritiesDuplicates += sumOfList(findSharedCharacters(compartment1, compartment2).map(getPriority));
}

console.log(sumPrioritiesDuplicates);
