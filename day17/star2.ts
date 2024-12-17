import { getLines } from '../get-lines.ts';
import { runProgram } from './run-program.ts';

const lines = getLines(import.meta.url);

const program = lines[4].split(': ')[1].split(',').map(Number);

const findAForCopy = (targetRegisterA: bigint, matchIndex: number): bigint => {
	// Found the correct value for register A
	if (matchIndex < 0) return targetRegisterA;

	// Possible starting values that will finish with the target register value
	//  begin with the target multiplied by 8 and end within the next 7 values.
	// This is because of step 6 of the program, which divides the value by 8 and ignores the remainder.
	for (let registerA = targetRegisterA * 8n; registerA < (targetRegisterA * 8n) + 8n; registerA++) {
		const [[result]] = runProgram(program, registerA);
		if (result === program[matchIndex]) {
			const finalVal = findAForCopy(registerA, matchIndex - 1);
			if (finalVal >= 0) return finalVal;
		}
	}

	return -1n;
};

// We pass the value the program should finish with
console.log(findAForCopy(0n, program.length - 1));
