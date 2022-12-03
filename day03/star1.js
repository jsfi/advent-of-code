import { getLines } from '../getLines.js';
import { sumOfList } from '../sumOfList.js';
import { findSharedCharacters } from './findSharedCharacters.js';
import { getPriorities } from './getPriorities.js';

const lines = await getLines(import.meta.url);
const rucksacks = lines.map(rucksack => {
	const pivot = rucksack.length / 2;
	return [rucksack.slice(0, pivot), rucksack.slice(pivot)];
});
const duplicateItems = rucksacks.map(([compartment1, compartment2]) =>
	findSharedCharacters(compartment1, compartment2)
).flat();

const sumPriorities = sumOfList(getPriorities(duplicateItems));
console.log(sumPriorities);
