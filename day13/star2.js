import { getPairs } from './getPairs.js';
import { checkOrder } from './checkOrder.js';

const pairs = await getPairs();

const dividerA = [[2]];
const dividerB = [[6]];

const packets = [
	dividerA,
	dividerB,
];

for (let i = 0; i < pairs.length; i++) {
	packets.push(...pairs[i]);
}

packets.sort((a, b) => checkOrder(a, b) ? -1 : 1)

console.log((packets.indexOf(dividerA) + 1) * (packets.indexOf(dividerB) + 1));
