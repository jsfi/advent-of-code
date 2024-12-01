import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const listLeft: Array<number> = [];
const listRight: Array<number> = [];

for (const line of lines) {
	const chars = line.split(/\s+/).map(Number);

	listLeft.push(chars[0]);
	listRight.push(chars[1]);
}

listLeft.sort();
listRight.sort();

let result = 0;
for (let i = 0; i < listLeft.length; i++) {
	result += Math.abs(listLeft[i] - listRight[i]);
}

console.log(result);
