import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

let result = 0;

for (const line of lines) {
	const [ record, group ] = line.split(' ');

	const parsedGroup = group.split(',').map(Number);
	const replaceAndCheck = (record) => {
		const index = record.indexOf('?');

		if (index === -1) {
			const parsedRecord = record.split(/\.+/).filter(Boolean);
			if (
				parsedRecord.length === parsedGroup.length
				&& parsedRecord.every((recordGroup, index) => recordGroup.length === parsedGroup[index])
			) {
				result++;
			}

			return;
		}

		replaceAndCheck(record.slice(0, index) + '.' + record.slice(index + 1));
		replaceAndCheck(record.slice(0, index) + '#' + record.slice(index + 1));
	}

	replaceAndCheck(record);
}

console.log(result);
