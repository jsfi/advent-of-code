import { getLines } from '../getLines.js';

const REGEX_IS_NUMBER = /^\d+$/;
const REGEX_PARSE_JOB = /^(?<dep1>\w+)\s(?<operation>\W)\s(?<dep2>\w+)$/;

const lines = await getLines(import.meta.url);

const monkeys = {};
const monkeyQueue = [];
for (const line of lines) {
	const [monkeyName, job] = line.split(': ');

	if (job.match(REGEX_IS_NUMBER)) {
		monkeys[monkeyName] = Number(job);
	} else {
		const { dep1, dep2, operation } = job.match(REGEX_PARSE_JOB).groups;
		monkeyQueue.push({
			name: monkeyName,
			dep1,
			dep2,
			operation
		});
	}
}

const calculate = (value1, value2, operation) => {
	switch (operation) {
		case '+':
			return value1 + value2;
		case '-':
			return value1 - value2;
		case '*':
			return value1 * value2;
		case '/':
			return value1 / value2;
		default:
			throw new Error(`Unknown operation: ${operation}`);
	}
}

while (monkeyQueue.length) {
	const item = monkeyQueue.shift();

	const value1 = monkeys[item.dep1];
	const value2 = monkeys[item.dep2];

	if (value1 === undefined || value2 === undefined) {
		monkeyQueue.push(item);
		continue;
	}

	monkeys[item.name] = calculate(value1, value2, item.operation);

}

console.log(monkeys.root);