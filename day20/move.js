export function move(sequence) {
	for (const item of sequence) {
		const value = item.value;
		if (value === 0) continue;

		item.prev.next = item.next;
		item.next.prev = item.prev;

		let node = item;
		for (let i = 0; i < item.moves; i++) node = value < 0 ? node.prev : node.next;

		if (value < 0) {
			// so we can always use "insert after"
			node = node.prev;
		}

		item.next = node.next;
		item.prev = node;
		node.next.prev = item;
		node.next = item;
	}
}
