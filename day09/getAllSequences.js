import { getLines } from '../getLines.js';
import { getNumbers } from '../getNumbers.js';

const lines = await getLines(import.meta.url);

export function getAllSequences() {
	return lines.map(line => {
		const numbers = getNumbers(line);
		const sequences = [ numbers ];

		while (true) {
			const nextSequence = [];
			const lastSequence = sequences.at(-1);

			for (let i = 0; i < lastSequence.length - 1; i++) {
				nextSequence.push(lastSequence.at(i + 1) - lastSequence.at(i));
			}

			sequences.push(nextSequence);

			if (nextSequence.every(number => number === 0)) {
				break;
			}
		}

		return sequences;
	});
}
