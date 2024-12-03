import { getLines } from '../get-lines.ts';

const line = getLines(import.meta.url).join('');

type Mode =
	| 'search' // Find next mul(
	| 'read1' // Read number1
	| 'read2' // Read number2
	| 'disabled' // Disabled

let mode: Mode = 'search';
let number1 = '';
let number2 = '';
let result = 0;

for (let i = 0; i < line.length; i++) {
	if (mode !== 'disabled' && line.slice(i, i + 7) === 'don\'t()') {
		mode = 'disabled';
		i += 6;
		continue;
	}

	if (mode === 'disabled') {
		// Until we find "do()" we don't evaluate "mul()" expressions
		const slice = line.slice(i, i + 4);
		if (slice === 'do()') {
			mode = 'search';
			i += 3;
		}
	} else if (mode === 'search') {
		// Find the next "mul(" and set the mode to "read1"
		const slice = line.slice(i, i + 4)
		if (slice === 'mul(') {
			mode = 'read1';
			i += 3;
		}
	} else if (mode === 'read1') {
		// Read the first number
		//  If the character is a "," then set the mode to "read2"
		//  If the character is neither a digit nor a "," the command is invalid
		const char = line[i];
		if (char.match(/\d/)) {
			number1 += char;
		} else if (char === ',' && number1) {
			mode = 'read2';
		}  else {
			number1 = '';
			mode = 'search';
		}
	} else if (mode === 'read2') {
		// Read the second number
		//  If the character is a ")" and both numbers are set, evaluate the expression
		//  If the character is neither a digit nor a ")" the command is invalid
		const char = line[i];

		if (char.match(/\d/)) {
			number2 += char;
			continue;
		}

		if (char === ')' && number1 && number2) {
			result += Number(number1) * Number(number2);
		}

		number1 = '';
		number2 = '';
		mode = 'search';
	}
}

console.log(result);
