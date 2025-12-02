import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const ranges: Array<string> = lines.at(0).split(',');
const invalidProductIds: Array<string> = [];

for (const range of ranges) {
	const [start, end] = range.split('-').map(Number);
	for (let productId = start; productId <= end; productId++) {
		const productIdString = productId.toString();
		const length = productIdString.length;

		for (let patternLength = 1; patternLength <= Math.floor(length / 2); patternLength++) {
			if (length % patternLength !== 0) {
				continue;
			}

			const pattern = productIdString.slice(0, patternLength);
			const repetitions = Math.floor(length / patternLength);
			if (pattern.repeat(repetitions) === productIdString) {
				invalidProductIds.push(productId);
				break;
			}
		}
	}
}

const sumInvalidProductIds = invalidProductIds.reduce((sum, id) => sum + id);

console.log(sumInvalidProductIds);
