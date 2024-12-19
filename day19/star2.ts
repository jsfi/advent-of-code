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

const finishedPatternCache = new Map<string, bigint>();
const findMatchingTowels = (pattern: string): bigint => {
	let patternArrangements = 0n;

	const stack: Array<string> = [pattern];
	while (stack.length > 0) {
		const patternPart = stack.pop()!;

		if (finishedPatternCache.has(patternPart)) {
			patternArrangements += finishedPatternCache.get(patternPart)!;
			continue;
		}

		const firstStripe = patternPart[0];
		const matchingTowels = towelsByFirstStripe.get(firstStripe);

		if (!matchingTowels) {
			continue;
		}

		let patternPartArrangements = 0n;
		let hasUnfinished = false;
		for (const matchingTowel of matchingTowels) {
			if (patternPart === matchingTowel) {
				patternPartArrangements++;
			} else if (patternPart.startsWith(matchingTowel)) {
				const nextPatternPart = patternPart.slice(matchingTowel.length);
				const finishedPattern = finishedPatternCache.get(nextPatternPart);
				if (finishedPattern !== undefined) {
					patternPartArrangements += finishedPattern;
				} else {
					hasUnfinished = true;
					stack.push(nextPatternPart);
				}
			}
		}

		if (!hasUnfinished) {
			finishedPatternCache.set(patternPart, patternPartArrangements);
		}

		patternArrangements += patternPartArrangements;
	}

	return patternArrangements;
}

let result = 0n;
for (const pattern of patterns) {
	const towelArrangements = findMatchingTowels(pattern);
	result += towelArrangements;
}
console.log(result);
