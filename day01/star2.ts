import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const positions = 100;
let position = 50;
let zeroPosition = 0;

for (const line of lines) {
	const [direction, ...number] = line;
	const turn = direction === 'L' ? -1 : 1;
	const steps = Number(number.join(''));

	const fullTurns = Math.floor(steps / positions);
	zeroPosition += fullTurns;

	let newPosition = (position + turn * steps) % positions;
	if (newPosition < 0) newPosition += positions;

	if (turn === 1) {
		// Turning right
		if (newPosition < position) {
			zeroPosition++
		}
	} else {
		// Turning left
		if (position === 0) {
			// If we already started at 0 and turn left, we don't count an additional zero crossing
		} else if (newPosition > position || newPosition === 0) {
			zeroPosition++;
		}
	}

	position = newPosition;
}

console.log(zeroPosition);
