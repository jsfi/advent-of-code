import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const stones = lines[0].split(' ').map(Number);
let stoneMap = new Map(stones.map((stone) => [stone, 1]));

for (let iteration = 0; iteration < 75; iteration++) {
	const nextStoneMap: typeof stoneMap = new Map();
	const addStones = (stone: number, count: number) => {
		nextStoneMap.set(stone, (nextStoneMap.get(stone) ?? 0) + count);
	}

	for (const [stone, count] of stoneMap) {
		if (stone === 0) {
			addStones(1, count);
			continue;
		}

		const stringStone = String(stone);
		const stringStoneLength = stringStone.length;
		if (stringStoneLength % 2 === 0) {
			const stonePart1 = stringStone.slice(0, stringStoneLength / 2);
			addStones(Number(stonePart1), count);

			const stonePart2 = stringStone.slice(stringStoneLength / 2);
			addStones(Number(stonePart2), count);
			continue;
		}

		addStones(stone * 2024, count);
	}

	stoneMap = nextStoneMap;
}

console.log(stoneMap.values().reduce((sum, count) => sum + count));
