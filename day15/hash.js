export function hash(string) {
	let value = 0;

	for (const char of string) {
		value += char.codePointAt(0);
		value *= 17;
		value %= 256;
	}

	return value;
}