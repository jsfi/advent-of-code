import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

let maxValues = 0;
const calibrations = lines.map((line) => {
	const [calibrationResult, valuesString] = line.split(': ');
	const values = valuesString.split(' ').map(Number)

	maxValues = Math.max(maxValues, values.length);

	return [Number(calibrationResult), values] as const;
});

type Operators = Array<Array<'+' | '*' | '|'>>;

const operatorsPerCount: Array<Operators> = [[[]]];
for (let i = 1; i < maxValues; i++) {
	const lastOperators = operatorsPerCount[i - 1];
	const operators: Operators = [];
	for (const operator of lastOperators) {
		operators.push([...operator, '+'], [...operator, '*'], [...operator, '|'])
	}
	operatorsPerCount.push(operators);
}

let result = 0;
for (const calibration of calibrations) {
	const [calibrationResult, values] = calibration;
	const count = values.length;
	const operators = operatorsPerCount[count-1];

	for (const operator of operators) {
		let operatorResult = values[0];
		for (let i = 1; i < count; i++) {
			switch (operator[i - 1]) {
				case '+':
					operatorResult += values[i];
					break;
				case '*':
					operatorResult *= values[i];
					break;
				case '|':
					operatorResult = Number(`${operatorResult}${values[i]}`);
					break;
				default:
					throw new Error('Unknown operator');
			}
		}

		if (calibrationResult === operatorResult) {
			result += calibrationResult;
			break;
		}
	}
}

console.log(result);
