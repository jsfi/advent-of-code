import { getLines } from '../getLines.js';

export async function getSequence(decryptionKey = 1) {
	const lines = await getLines(import.meta.url);
	const length = lines.length;

	let first;
	let prev;
	const sequence = [];

	for (const line of lines) {
		const decryptedValue = Number(line) * decryptionKey;
		const current = {
			value: decryptedValue,
			moves: Math.abs(decryptedValue % (length - 1)),
			prev,
		};
		sequence.push(current);

		if (current.value === 0) {
			sequence.zero = current;
		}

		if (prev) {
			prev.next = current;
		} else {
			first = current;
		}
		prev = current;
	}

	first.prev = prev;
	prev.next = first;

	return sequence;
}
