import { getChamber, WIDTH_CHAMBER } from './chamber.js';
import { initJetPattern } from './jetPattern.js';
import { rocks } from './rocks.js';

const QUANTITY_ROCKS = 2022;

const getNextJetPattern = await initJetPattern();
const [rockHitsRock, addRockToChamber] = getChamber();

let highestPoint = 0;

for (let i = 0; i < QUANTITY_ROCKS; i++) {
	const rock = rocks[i % rocks.length];
	// its left edge is two units away from the left wall
	let x = 2;
	// its bottom edge is three units above the highest rock
	let y = highestPoint + 3;

	let canMove = true;
	while (canMove) {
		const diffJet = getNextJetPattern();
		if (diffJet === '>') {
			if (x + 1 + rock[0].length <= WIDTH_CHAMBER && !rockHitsRock(rock, x + 1, y)) {
				x++;
			}
		} else if (diffJet === '<') {
			if (x > 0 && !rockHitsRock(rock, x - 1, y)) {
				x--;
			}
		}

		if (y === 0 || rockHitsRock(rock, x, y - 1)) {
			canMove = false;
			highestPoint = Math.max(rock.length + y, highestPoint);
			addRockToChamber(rock, x, y);
			continue;
		}

		y--;
	}
}

console.log(highestPoint);

