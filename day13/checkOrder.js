export function checkOrder(left, right) {
	const isArrayLeft = Array.isArray(left);
	const isArrayRight = Array.isArray(right);

	if (isArrayLeft && isArrayRight) {
		const length = Math.max(left.length, right.length);

		// if both values are lists, compare the first value of each list, then the second value, and so on
		for (let i = 0; i < length; i++) {
			const inOrder = checkOrder(left[i], right[i]);
			if (inOrder === undefined) {
				continue;
			}

			return inOrder;
		}

		// If the lists are the same length and no comparison makes a decision about the order,
		//  continue checking the next part of the input
		return undefined;
	}

	// left side ran out of items
	if (left === undefined) {
		return true;
	}

	// right side ran out of items
	if (right === undefined) {
		return false;
	}

	if (isArrayLeft) {
		return checkOrder(left, [right]);
	} else if (isArrayRight) {
		return checkOrder([left], right);
	} else {
		// the inputs are the same integer; continue checking the next part of the input
		if (left === right) {
			return undefined;
		}

		return left < right;
	}
}
