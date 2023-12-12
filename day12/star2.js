import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

let result = 0;

for (const line of lines) {
	const [ foldedRecord, foldedGroup ] = line.split(' ');
	const record = Array.from({ length: 5 }, () => foldedRecord).join('?');
	const group = Array.from({ length: 5 }, () => foldedGroup).join(',');
	const cache = new Map();

	const parsedGroup = group.split(',').map(Number);
	const replaceAndCheck = (record, parsedGroup) => {
		const cacheKey = `${record}|${parsedGroup.join(',')}`;
		if (cache.has(cacheKey)) {
			return cache.get(cacheKey);
		}

		const firstMatch = record.match(/^\.*(#+)\.+/);
		if (firstMatch) {
			if (firstMatch[1].length === parsedGroup[0]) {
				// continue with matching the rest of the record and group
				return replaceAndCheck(record.substring(firstMatch[0].length), parsedGroup.slice(1));
			}

			return 0;
		}

		const index = record.indexOf('?');

		if (index === -1) {
			const parsedRecord = record.split(/\.+/).filter(Boolean);
			if (parsedRecord.length === parsedGroup.length
				&& parsedRecord.every((recordGroup, index) => recordGroup.length === parsedGroup[index])) {
				return 1;
			}

			return 0;
		}

		let count = 0;

		count += replaceAndCheck(record.substring(0, index) + '.' + record.substring(index + 1), parsedGroup);
		count += replaceAndCheck(record.substring(0, index) + '#' + record.substring(index + 1), parsedGroup);

		cache.set(cacheKey, count);
		return count;
	}

	const count = replaceAndCheck(record, parsedGroup);

	console.log(line, count);
	result += count;
}

console.log(result);
