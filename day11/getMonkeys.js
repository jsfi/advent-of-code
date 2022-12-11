import { getLines } from '../getLines.js';

const MONKEY = 'Monkey ';
const ITEMS = 'Starting items: ';
const OPERATION = 'Operation: ';
const TEST = 'Test: ';
const TRUE = 'If true: throw to monkey ';
const FALSE = 'If false: throw to monkey ';

function from(line, part) {
	return line.slice(part.length);
}

export async function getMonkeys() {
	const lines = await getLines(import.meta.url);

	const monkeys = [];
	let monkey = {};

	for (const line of lines) {
		const trimmedLine = line.trim();
		if (trimmedLine.startsWith(MONKEY)) {
			monkey = {};
			monkeys.push(monkey);
		} else if (trimmedLine.startsWith(ITEMS)) {
			monkey.items = from(trimmedLine, ITEMS).split(', ').map(Number);
		} else if (trimmedLine.startsWith(OPERATION)) {
			monkey.operation = new Function('old', from(trimmedLine, OPERATION).replace('new =', 'return'));
		} else if (trimmedLine.startsWith(TEST)) {
			monkey.test = new Function('level', from(trimmedLine, TEST).replace('divisible by ', 'return level % ') + ' === 0');
		} else if (trimmedLine.startsWith(TRUE)) {
			monkey.true = Number(from(trimmedLine, TRUE));
		} else if (trimmedLine.startsWith(FALSE)) {
			monkey.false = Number(from(trimmedLine, FALSE));
		} else if (trimmedLine !== '') {
			throw new Error(`Unknown line ${line}`);
		}
	}

	return monkeys;
}
