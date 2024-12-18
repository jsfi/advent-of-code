import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const isTest = Boolean(Deno.env.get('test'));

type Position = [number, number];

const bytes = lines.map((line) => line.split(',').map(Number) as Position);
const bytesFallen = isTest ? 12 : 1024;

const memorySize = isTest ? 7 : 71;
const memory = Array.from(
	{ length: memorySize },
	() => Array.from({ length: memorySize }, () => '.'),
);

for (let i = 0; i < bytesFallen; i++) {
	const [x, y] = bytes[i];
	memory[y][x] = '#';
}

const visited = new Set<string>();
const stack: Array<[Position, number]> = [[[0, 0], 0]];
while (stack.length) {
	const [[x, y], steps] = stack.shift()!;
	const key = `${x},${y}`;

	if (visited.has(key) || memory[y]?.[x] !== '.') {
		continue;
	}

	visited.add(key);

	if (x === memorySize - 1 && y === memorySize - 1) {
		console.log(steps);
		break;
	}

	[
		[-1, 0],
		[0, 1],
		[1, 0],
		[0, -1],
	].forEach(([dx, dy]) => {
		stack.push([[x + dx, y + dy], steps + 1]);
	});
}
