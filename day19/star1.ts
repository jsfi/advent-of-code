import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const towels = lines[0].split(', ');
const patterns = lines.slice(2);

const towelsByFirstStripe = new Map<string, Array<string>>();
for (const towel of towels) {
	const firstStripe = towel[0];
	let towelsWithSameFirstStripe = towelsByFirstStripe.get(firstStripe);

	if (!towelsWithSameFirstStripe) {
		towelsWithSameFirstStripe = [];
		towelsByFirstStripe.set(firstStripe, towelsWithSameFirstStripe);
	}

	towelsWithSameFirstStripe.push(towel);
}

const findMatchingTowels = (pattern: string): boolean => {
	if (pattern.length === 0) {
		return true;
	}

	const firstStripe = pattern[0];
	const matchingTowels = towelsByFirstStripe.get(firstStripe);

	if (!matchingTowels) {
		return false;
	}

	for (const matchingTowel of matchingTowels) {
		if (pattern.startsWith(matchingTowel) && findMatchingTowels(pattern.slice(matchingTowel.length))) {
			return true;
		}
	}

	return false;
}

let result = 0;
for (const pattern of patterns) {
	if (findMatchingTowels(pattern)) {
		result++;
	}
}
console.log(result);
