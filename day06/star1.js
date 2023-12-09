import { getLines } from '../getLines.js';
import { getNumbers } from '../getNumbers.js';

const lines = await getLines(import.meta.url);

const [ , timeString ] = lines[0].split(':');
const [ , distanceString ] = lines[1].split(':');

const times = getNumbers(timeString);
const distances = getNumbers(distanceString);

let result = 1;

for (let index = 0; index < times.length; index++) {
	const time = times[index];
	const minDistance = distances[index];

	let wins = 0;
	for (let speed = 1; speed < time; speed++) {
		const distance = (time - speed) * speed;

		if (distance > minDistance) {
			wins++;
		}
	}

	result *= wins;
}

console.log(result);
