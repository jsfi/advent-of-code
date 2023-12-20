import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

const divider = ' -> ';
const lowPulse = false;

let broadcaster;
const modules = new Map();
const destinationToModules = new Map();

let pulseCountLow = 0;
let pulseCountHigh = 0;
let countPulse = (pulse = false) => pulse ? pulseCountHigh++ : pulseCountLow++;

const getModule = (name) => {
	return modules.get(name) || countPulse;
}

const stack = [];

const getModulesToDestination = (destination) => {
	let modulesToDestination = destinationToModules.get(destination);
	if (!modulesToDestination) {
		modulesToDestination = new Map();
		destinationToModules.set(destination, modulesToDestination);
	}

	return modulesToDestination;
}

for (const line of lines) {
	const [ typeAndName, destinationsString ] = line.split(divider);
	const name = typeAndName.slice(1);
	const destinations = destinationsString.split(', ');

	for (const destination of destinations) {
		getModulesToDestination(destination).set(name, lowPulse);
	}

	if (typeAndName === 'broadcaster') {
		broadcaster = () => {
			countPulse();
			for (const destination of destinations) {
				stack.push(() => getModule(destination)(lowPulse, 'broadcaster'));
			}
		}
	} else if (typeAndName.startsWith('%')) {
		let state = lowPulse;
		modules.set(name, pulse => {
			countPulse(pulse);
			if (pulse === lowPulse) {
				state = !state;
				for (const destination of destinations) {
					stack.push(() => getModule(destination)(state, name));
				}
			}
		});
	} else if (typeAndName.startsWith('&')) {
		const state = getModulesToDestination(name);
		modules.set(name, (pulse, module) => {
			countPulse(pulse);
			state.set(module, pulse);
			const pulseOut = !Array.from(state.values()).every(Boolean);
			for (const destination of destinations) {
				stack.push(() => getModule(destination)(pulseOut, name));
			}
		});
	}
}

for (let i = 0; i < 1000; i++) {
	broadcaster();
	while (stack.length) {
		stack.shift()();
	}
}

console.log(pulseCountLow * pulseCountHigh);
