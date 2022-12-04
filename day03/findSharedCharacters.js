/**
 * @param {string} string1
 * @param {string} string2
 * @returns {string[]}
 */
export function findSharedCharacters(string1, string2) {
	return Array.from(new Set(string1.match(new RegExp(`[${string2}]`, 'g'))));
}
