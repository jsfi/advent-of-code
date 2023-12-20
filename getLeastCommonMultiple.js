// euclidean algorithm
function getGreatestCommonDivisor(a, b) {
	if (b === 0) {
		return a;
	}
	return getGreatestCommonDivisor(b, a % b);
}

export function getLeastCommonMultiple(numbers) {
	let leastCommonMultiple = 1;
	for (const number of numbers) {
		leastCommonMultiple = (leastCommonMultiple * number) / getGreatestCommonDivisor(leastCommonMultiple, number);
	}

	return leastCommonMultiple;
}