import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const positions = 100;
let position = 50;
let zeroPosition = 0;

for (const line of lines) {
	const [direction, ...number] = line;
	const turn = direction === 'L' ? -1 : 1;
	const steps = Number(number.join(''));

	position = (position + turn * steps) % positions;

	if (position === 0) zeroPosition++;
}

console.log(zeroPosition);
