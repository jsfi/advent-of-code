import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

/**
 * @param {string} direction
 * @return {[number, number]}
 */
function directionToXY(direction) {
	switch (direction) {
		case 'U':
			return [0, 1];
		case 'R':
			return [1, 0];
		case 'D':
			return [0, -1];
		case 'L':
			return [-1, 0];
		default: throw new Error(`Undefined direction: ${direction}`);
	}
}

/**
 * @param {number} pos
 * @param {number} diff
 * @param {number} absDiff
 * @return {number}
 */
function addDiff(pos, diff, absDiff) {
	if (absDiff === 2) {
		diff /= 2;
	}

	return pos + diff;
}

/**
 * @param {[number, number][]} rope
 * @return {void}
 */
function drawRope(rope) {
	const xses = rope.map(([x]) => x);
	const yses = rope.map(([,y]) => y);
	const minX = Math.min(0, ...xses);
	const maxX = Math.max(0, ...xses);
	const minY = Math.min(0, ...yses);
	const maxY = Math.max(0, ...yses);

	const grid = Array.from({ length: maxY - minY + 1 }, () => Array.from({ length: maxX - minX + 1 }, () => '.'));
	for (let i = 0; i < rope.length; i++) {
		const [knotX, knotY] = rope[i];
		grid[knotY - minY][knotX - minX] = i === 0 ? 'H' : i;
	}
	grid[-minY][-minX] = 's';

	console.log('');
	for (const row of grid.reverse()) {
		console.log(row.join(''));
	}
}

/**
 * @param {[number, number][]} rope
 * @return {number}
 */
export function getNumberOfTailMoves(rope) {
	const tailMoves = [rope.at(-1)];

	for (const line of lines) {
		const ropeLength = rope.length;
		const lastKnot = rope.length - 1;
		const [direction, stepsString] = line.split(' ');
		const [diffX, diffY] = directionToXY(direction);

		let steps = Number(stepsString);
		while (steps--) {
			const nextRope = [];

			for (let knot = 0; knot < ropeLength; knot++) {
				const [knotX, knotY] = rope.at(knot);
				if (knot === 0) {
					nextRope.push([knotX + diffX, knotY + diffY]);
					continue;
				}

				const indexPrevKnot = knot - 1;
				const [prevX, prevY] = nextRope.at(indexPrevKnot);
				const diffKnotX = prevX - knotX;
				const diffKnotY = prevY - knotY;
				const gapX = Math.abs(diffKnotX);
				const gapY = Math.abs(diffKnotY);

				let knotPosition;
				if (gapX > 1 || gapY > 1) {
					knotPosition = [addDiff(knotX, diffKnotX, gapX), addDiff(knotY, diffKnotY, gapY)];

					if (knot === lastKnot) {
						tailMoves.push(knotPosition);
					}
				} else {
					knotPosition = [knotX, knotY]
				}

				nextRope.push(knotPosition);
			}

			rope = nextRope;
		}

		// drawRope(rope);
	}

	return new Set(tailMoves.map(([x, y]) => `${x}|${y}`)).size;
}
