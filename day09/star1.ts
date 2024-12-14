import { getLines } from '../get-lines.ts';

const line = getLines(import.meta.url)[0];

let position = 0;
const spaces: Array<number> = [];
const files: Array<{ id: number; positions: Array<number> }> = [];
for (let i = 0; i < line.length; i++) {
	const size = Number(line[i]);

	if (i % 2 === 0) {
		const filePositions = [];
		for (let j = 0; j < size; j++) {
			filePositions.push(position++);
		}
		files.push({ id: Math.floor(i / 2), positions: filePositions });
	} else {
		for (let j = 0; j < size; j++) {
			spaces.push(position++);
		}
	}
}

let fileIndex = files.length - 1;
let positionIndex = files[fileIndex].positions.length - 1;
while (spaces.length) {
	if (positionIndex === -1) {
		fileIndex--;
		if (fileIndex === -1) {
			break;
		}
		positionIndex = files[fileIndex].positions.length - 1;
		continue;
	}

	const space = spaces.shift()!;
	const currentPosition = files[fileIndex].positions[positionIndex];
	if (currentPosition < space) {
		break;
	}

	files[fileIndex].positions[positionIndex] = space;
	positionIndex--;
}

const result = files.reduce((checksum, { id, positions }) => {
	const checkSumFile = positions.reduce((checkSumFile, position) => checkSumFile + (id * position), 0);
	return checksum + checkSumFile;
}, 0);
console.log(result);
