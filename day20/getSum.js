export function getSum(sequence) {
	let node = sequence.zero.next;
	let sum = 0;

	for (let i = 1; i <= 3000; i++) {
		if (i % 1000 === 0) {
			sum += node.value;
		}
		node = node.next;
	}

	return sum;
}
