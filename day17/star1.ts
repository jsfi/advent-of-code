import { getLines } from '../get-lines.ts';
import { runProgram } from './run-program.ts';

const lines = getLines(import.meta.url);

console.log(
	runProgram(
		lines[4].split(': ')[1].split(',').map(Number),
		BigInt(lines[0].split(': ')[1]),
		BigInt(lines[1].split(': ')[1]),
		BigInt(lines[2].split(': ')[1]),
	)[0].join(','),
);
