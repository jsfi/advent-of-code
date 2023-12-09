import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

const maxCubes = {
	red: 12, green: 13, blue: 14,
};

let result = 0;

gameLoop: for (const line of lines) {
	const [ game, record ] = line.split(': ');
	const gameNumber = Number(game.slice(5));
	const revealedSets = record.split('; ');

	for (const revealedSet of revealedSets) {
		const cubesInSet = revealedSet.split(', ');

		for (const cube of cubesInSet) {
			const [ count, color ] = cube.split(' ');
			if (maxCubes[color] < Number(count)) {
				continue gameLoop;
			}
		}
	}

	result += gameNumber;
}

console.log(result);
