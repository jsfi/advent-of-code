import { getLines } from '../getLines.js';

const REGEX_IS_NUMBER = /^\d+$/;
const REGEX_PARSE_JOB = /^(?<dep1>\w+)\s(?<operation>\W)\s(?<dep2>\w+)$/;

const lines = await getLines(import.meta.url);

const monkeys = {};
const monkeyQueue = [];
for (const line of lines) {
	const [monkeyName, job] = line.split(': ');

	if (monkeyName === 'humn') {
		continue;
	}

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

let firstQueued;
while (monkeyQueue.length) {
	const item = monkeyQueue.shift();

	const value1 = monkeys[item.dep1];
	const value2 = monkeys[item.dep2];

	if (value1 === undefined || value2 === undefined) {
		monkeyQueue.push(item);

		if (firstQueued) {
			if (firstQueued === item) {
				break;
			}
		} else {
			firstQueued = item;
		}

		continue;
	}

	monkeys[item.name] = calculate(value1, value2, item.operation);
	firstQueued = undefined;
}

const humn = {};
const unknownMonkeys = {
	humn,
};
for (const item of monkeyQueue) {
	unknownMonkeys[item.name] = item;
}
for (const item of monkeyQueue) {
	const value1 = monkeys[item.dep1];
	if (value1 === undefined) {
		item.dep1 = unknownMonkeys[item.dep1];
	} else {
		item.dep1 = value1;
	}

	const value2 = monkeys[item.dep2];
	if (value2 === undefined) {
		item.dep2 = unknownMonkeys[item.dep2];
	} else {
		item.dep2 = value2;
	}
}

const root = unknownMonkeys.root;
let [target, path] = root.dep1.name
	? [root.dep2, root.dep1]
	: [root.dep1, root.dep2];

while (path !== humn) {
	const value1 = path.dep1;
	const value2 = path.dep2;
	const isNumber1 = Boolean(value2.name);

	switch (path.operation) {
		case '+':
			target -= isNumber1 ? value1 : value2;
			break;
		case '-':
			if (isNumber1) {
				target = value1 - target;
			} else {
				target = target + value2;
			}
			break;
		case '*':
			target /= isNumber1 ? value1 : value2;
			break;
		case '/':
			if (isNumber1) {
				target = value1 / target;
			} else {
				target = target * value2;
			}
			break;
		default:
			throw new Error(`Unknown operation: ${path.operation}`);
	}

	path = isNumber1 ? value2 : value1;
}

console.log(target);
