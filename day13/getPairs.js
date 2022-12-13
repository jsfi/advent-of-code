import { getLines } from '../getLines.js';

export async function getPairs() {
	const lines = await getLines(import.meta.url);

	let pair = [];
	const pairs = [pair];

	for (const line of lines) {
		if (line === '') {
			pair = [];
			pairs.push(pair);
			continue;
		}

		const list = [];

		const listString = line.slice(1, -1);
		const nested = [list];
		let numString = '';

		const finishNumString = () => {
			if (numString) {
				nested.at(-1).push(Number(numString));
				numString = '';
			}
		}

		for (let i = 0; i < listString.length; i++) {
			const value = listString[i];
			if (value === '[') {
				const currentList = [];
				nested.at(-1).push(currentList);
				nested.push(currentList);
			} else if (value === ']') {
				finishNumString();
				nested.pop();
			} else if (value === ',') {
				finishNumString();
			} else {
				numString += value;
			}
		}
		finishNumString();

		pair.push(list);
	}

	return pairs;
}
