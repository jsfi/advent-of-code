import { getLines } from '../getLines.js';
import { getNumbers } from '../getNumbers.js';

const lines = await getLines(import.meta.url);

let seeds = [];
const almanac = new Map();
const sourceToDestination = new Map();
let currentSource = '';

for (const line of lines) {
    if (line === '') {
        continue;
    }

    if (line.startsWith('seeds')) {
        const [, seedString] = line.split(': ');
        seeds = getNumbers(seedString);
        continue;
    }

    if (line.match(/^[a-z]/)) {
        const [mapping] = line.split(' ');
        const [source, destination] = mapping.split('-to-');
        sourceToDestination.set(source, destination);
        almanac.set(source, []);
        currentSource = source;
        continue;
    }

    if (line.match(/^\d/)) {
        almanac.get(currentSource).push(getNumbers(line));
        continue;
    }

    throw new Error('Unknown line ' + line);
}

let sourceCategory = 'seed';
let values = seeds;

while (sourceCategory !== 'location') {
    const mappingValues = almanac.get(sourceCategory);

    values = values.map(value => {
        for (const [destination, source, range] of mappingValues) {
            if (value >= source && value < source + range) {
                return destination + value - source;
            }
        }

        return value;
    });

    sourceCategory = sourceToDestination.get(sourceCategory);
}

console.log(Math.min(...values));
