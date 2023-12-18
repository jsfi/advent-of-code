import { getArea } from './getArea.js';

console.log(await getArea((line) => {
	const [ , , hex ] = line.split(' ');
	const steps = Number.parseInt(hex.slice(2, 7), 16);
	const directionDigit = hex.slice(7, 8);
	const direction = directionDigit === '0'
		? 'R' : directionDigit === '1'
			? 'D' : directionDigit === '2'
				? 'L' : 'U';

	return [ direction, steps ];
}));
