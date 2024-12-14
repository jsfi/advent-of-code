import { getLines } from '../get-lines.ts';

const line = getLines(import.meta.url)[0];

let position = 0;
const spaces: Array<{ from: number; size: number }> = [];
const files: Array<{ id: number; from: number; size: number }> = [];
for (let i = 0; i < line.length; i++) {
	const size = Number(line[i]);

	if (i % 2 === 0) {
		files.push({ id: Math.floor(i / 2), from: position, size });
	} else {
		spaces.push({ from: position, size });
	}

	position += size;
}

for (let fileIndex = files.length - 1; fileIndex >= 0; fileIndex--) {
	const file = files[fileIndex];
	const fileSize = file.size;

	for (let spaceIndex = 0; spaceIndex < spaces.length; spaceIndex++) {
		const space = spaces[spaceIndex];

		if (space.from >= file.from) {
			break;
		}

		if (space.size < fileSize) {
			continue;
		}

		file.from = space.from;

		if (space.size === fileSize) {
			spaces.splice(spaceIndex, 1);
		} else {
			space.from += fileSize;
			space.size -= fileSize;
		}
	}
}

const result = files.reduce((checksum, { id, from, size }) => {
	let checkSumFile = 0;
	for (let i = 0; i < size; i++) {
		checkSumFile += id * (from + i);
	}
	return checksum + checkSumFile;
}, 0);
console.log(result);
