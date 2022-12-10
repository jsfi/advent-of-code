import { getLines } from '../getLines.js';

/**
 * @returns {Promise<number[]>}
 */
export async function getRegister() {
	const lines = await getLines(import.meta.url);

	let value = 1;
	const register = [value];
	const push = () => register.push(value);

	for (const line of lines) {
		if (line === 'noop') {
			push();
			continue;
		}

		if (line.startsWith('addx')) {
			push();

			value += Number(line.split(' ').at(1));
			push();
			continue;
		}

		throw new Error(`Undefined signal ${line}`);
	}

	return register;
}