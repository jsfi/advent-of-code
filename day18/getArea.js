import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

export async function getArea(getDirectionAndSteps) {
	let row = 0;
	let column = 0;
	let totalSteps = 0;
	const points = [
		[ row, column ],
	];

	for (const line of lines) {
		const [ direction, steps ] = getDirectionAndSteps(line);

		row += (direction === 'U' ? -1 : direction === 'D' ? 1 : 0) * steps;
		column += (direction === 'L' ? -1 : direction === 'R' ? 1 : 0) * steps;
		totalSteps += steps;

		points.push([ row, column ]);
	}

	let s1 = 0;
	let s2 = 0;
	for (let index = 0; index < points.length; index++) {
		const nextIndex = (index + 1) % points.length;
		s1 += points.at(index).at(0) * points.at(nextIndex).at(1);
		s2 += points.at(index).at(1) * points.at(nextIndex).at(0);
	}

	const area = Math.abs(s1 - s2) / 2;

	// every edge field adds additional space to the result
	// a straight line adds 1/2, an outside corner 3/4 and an inside corner 1/4
	// as every inside corner must match with an outside corner, we can simplify those to 1/2
	// additionally we have 4 unmatched outside corners, which are 1/4 over 1/2 each
	// therefore we have to add 1, if we simplify the calculation to 1/2 for every type
	const edge = totalSteps / 2 + 1;

	return area + edge;
}
