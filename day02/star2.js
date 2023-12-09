import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

let result = 0;

for (const line of lines) {
	const [ , record ] = line.split(': ');
	const revealedSets = record.split('; ');

	const maxCubes = {
		red: 0,
		green: 0,
		blue: 0,
	};

	for (const revealedSet of revealedSets) {
		const cubesInSet = revealedSet.split(', ');

		for (const cube of cubesInSet) {
			const [ count, color ] = cube.split(' ');
			maxCubes[color] = Math.max(Number(count), maxCubes[color]);
		}
	}

	result += Object.values(maxCubes).reduce((product, count) => product * count);
}

console.log(result);
