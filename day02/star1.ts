import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const ranges = lines.at(0).split(',');
const invalidProductIds: Array<string> = [];

for (const range of ranges) {
	const [start, end] = range.split('-').map(Number);
	for (let productId = start; productId <= end; productId++) {
		const productIdString = productId.toString();
		const length = productIdString.length;
		if (length % 2 !== 0) {
			continue;
		}

		const center = length / 2;
		if (productIdString.slice(0, center) === productIdString.slice(center)) {
			invalidProductIds.push(productId);
		}
	}
}

const sumInvalidProductIds = invalidProductIds.reduce((sum, id) => sum + id);

console.log(sumInvalidProductIds);
