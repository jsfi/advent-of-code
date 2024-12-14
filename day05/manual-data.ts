import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

export const pageOrderingRules = new Map<number, Array<number>>();
export const updates: Array<Array<number>> = [];

for (let i = 0; i < lines.length; i++) {
	const line = lines[i];
	if (line === '') {
		updates.push(...lines.slice(i + 1).map((line) => line.split(',').map((value) => Number(value))));
		break;
	}

	const [before, after] = line.split('|').map((value) => Number(value));
	let pageOrdering = pageOrderingRules.get(after);

	if (!pageOrdering) {
		pageOrdering = [];
		pageOrderingRules.set(after, pageOrdering);
	}

	pageOrdering.push(before);
}
