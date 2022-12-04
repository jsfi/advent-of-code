const codePointLA = 'a'.codePointAt(0);
const codePointUA = 'A'.codePointAt(0);

/**
 * @param {string} char
 * @returns {number}
 */
export function getPriority(char) {
	return char.codePointAt(0)
		+ (char === char.toLowerCase()
			? 1 - codePointLA
			: 27 - codePointUA);
}
