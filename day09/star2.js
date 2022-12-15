import { getNumberOfTailMoves } from './getNumberOfTailMoves.js';

console.log(await getNumberOfTailMoves(Array.from({ length: 10 }, () => [0, 0])));
