import { getLines } from '../getLines.js';
import { getNumbers } from '../getNumbers.js';

const lines = await getLines(import.meta.url);

let seeds = [];
const almanac = new Map();
const destinationToSource = new Map();
let currentDestination = '';

for (const line of lines) {
	if (line === '') {
		continue;
	}

	if (line.startsWith('seeds')) {
		const [ , seedString ] = line.split(': ');
		const seedRanges = getNumbers(seedString);
		for (let seedRangeIndex = 0; seedRangeIndex < seedRanges.length; seedRangeIndex += 2) {
			seeds.push([ seedRanges[seedRangeIndex], seedRanges[seedRangeIndex + 1] ]);
		}
		continue;
	}

	if (line.match(/^[a-z]/)) {
		const [ mapping ] = line.split(' ');
		const [ source, destination ] = mapping.split('-to-');
		destinationToSource.set(destination, source);
		almanac.set(destination, []);
		currentDestination = destination;
		continue;
	}

	if (line.match(/^\d/)) {
		almanac.get(currentDestination).push(getNumbers(line));
		continue;
	}

	throw new Error('Unknown line ' + line);
}

let location = 1;
while (true) {
	let value = location;
	let destination = 'location';

	while (destination !== 'seed') {
		const mappingValues = almanac.get(destination);
		for (const [ destination, source, range ] of mappingValues) {
			if (value >= destination && value < destination + range) {
				value = source + value - destination;
				break;
			}
		}

		destination = destinationToSource.get(destination);
	}

	if (seeds.some(([ start, range ]) => value >= start && value < start + range)) {
		console.log(location);
		break;
	}

	location++;
}
