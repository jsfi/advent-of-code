import { getLines } from '../getLines.js';
import { hash } from './hash.js';

const lines = await getLines(import.meta.url);

let result = 0;

lines.at(0).split(',').forEach((step) => {
	result += hash(step);
});

console.log(result);
