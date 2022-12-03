const codePointLA = 'a'.codePointAt(0);
const codePointUA = 'A'.codePointAt(0);

export function getPriorities(list) {
	return list.map(item =>
		item.codePointAt(0)
		+ (item === item.toLowerCase()
			? 1 - codePointLA
			: 27 - codePointUA)
	);
}
