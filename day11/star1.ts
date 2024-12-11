import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

let stones = lines[0].split(' ').map(Number);

for (let iteration = 0; iteration < 25; iteration++) {
	const nextStones: Array<number> = [];

	for (const stone of stones) {
		if (stone === 0) {
			nextStones.push(1);
			continue;
		}

		const stringStone = String(stone);
		const stringStoneLength = stringStone.length;
		if (stringStoneLength % 2 === 0) {
			const stonePart1 = stringStone.slice(0, stringStoneLength / 2);
			nextStones.push(Number(stonePart1));

			const stonePart2 = stringStone.slice(stringStoneLength / 2);
			nextStones.push(Number(stonePart2));
			continue;
		}

		nextStones.push(stone * 2024);
	}

	stones = nextStones;
}

console.log(stones.length);
