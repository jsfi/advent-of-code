import { getPairs } from './getPairs.js';
import { checkOrder } from './checkOrder.js';

const pairs = await getPairs();

let sumInOrder = 0;
for (let i = 0; i < pairs.length; i++) {
	const [left, right] = pairs[i];
	if (checkOrder(left, right)) {
		sumInOrder += i + 1;
	}
}

console.log(sumInOrder);
