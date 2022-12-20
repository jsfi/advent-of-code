import { getSum } from './getSum.js';
import { getSequence } from './getSequence.js';
import { move } from './move.js';

const sequence = await getSequence();

move(sequence);

console.log(getSum(sequence));
