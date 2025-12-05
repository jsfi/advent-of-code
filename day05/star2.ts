import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const freshRanges: Array<[number, number]> = [];

for (const line of lines) {
	if (line.includes('-')) {
		freshRanges.push(line.split('-').map(Number));
	}
}

freshRanges.sort((a, b) => a[0] - b[0]);

for (let i = 1; i < freshRanges.length; i++) {
	const [currentStart, currentEnd] = freshRanges[i];
	const [, lastEnd] = freshRanges[i - 1];

	// Merge overlapping ranges
	if (currentStart <= lastEnd) {
		freshRanges[i - 1][1] = Math.max(lastEnd, currentEnd);
		freshRanges.splice(i, 1);
		i--;
	}
}

const freshRangesCount = freshRanges.reduce((sum, [start, end]) => sum + (end - start + 1), 0);
console.log(freshRangesCount);
