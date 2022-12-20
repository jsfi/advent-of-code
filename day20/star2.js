import { getSum } from './getSum.js';
import { getSequence } from './getSequence.js';
import { move } from './move.js';

const DECRYPTION_KEY = 811589153;
const sequence = await getSequence(DECRYPTION_KEY);

for (let mix = 1; mix <= 10; mix++) {
	move(sequence);
}

console.log(getSum(sequence));
