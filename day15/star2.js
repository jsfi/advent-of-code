import { getLines } from '../getLines.js';
import { hash } from './hash.js';

const lines = await getLines(import.meta.url);

let boxes = [];

lines.at(0).split(',').forEach((step) => {
	const label = step.match(/^\w+/).at(0);
	const boxIndex = hash(label);

	if (!boxes[boxIndex]) {
		boxes[boxIndex] = new Map();
	}

	if (step.endsWith('-')) {
		boxes[boxIndex].delete(label);
		if (boxes[boxIndex].size === 0) {
			delete boxes[boxIndex];
		}
		return;
	}

	const lens = Number(step.split('=').at(1));
	boxes[boxIndex].set(label, lens);
});

let result = 0;
for (let boxIndex = 0; boxIndex < boxes.length; boxIndex++) {
	const box = boxes[boxIndex];
	if (!box) {
		continue;
	}

	const lenses = Array.from(box.values());
	for (let lensIndex = 0; lensIndex < lenses.length; lensIndex++) {
		result += (boxIndex + 1) * (lensIndex + 1) * lenses[lensIndex];
	}
}

console.log(result);
