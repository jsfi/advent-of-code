import { getArea } from './getArea.js';

console.log(await getArea((line) => {
	const [ direction, stepsString ] = line.split(' ');
	const steps = Number(stepsString);

	return [ direction, steps ];
}));
