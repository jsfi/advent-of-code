import { getLines } from '../getLines.js';
import { getLeastCommonMultiple } from '../getLeastCommonMultiple.js';

const lines = await getLines(import.meta.url);

const divider = ' -> ';
const lowPulse = false;

let broadcaster;
const modules = new Map();
const destinationToModules = new Map();

const getModule = (name) => {
	return modules.get(name) || (() => {});
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
			for (const destination of destinations) {
				stack.push(() => getModule(destination)(lowPulse, 'broadcaster'));
			}
		}
	} else if (typeAndName.startsWith('%')) {
		let state = lowPulse;
		modules.set(name, pulse => {
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
			state.set(module, pulse);
			const pulseOut = !Array.from(state.values()).every(Boolean);
			for (const destination of destinations) {
				stack.push(() => getModule(destination)(pulseOut, name));
			}
		});
	}
}

let iteration = 0;

const cycles = new Map();
for (const module of destinationToModules.get('kj').keys()) {
	cycles.set(module, 0);
	const callback = modules.get(module);
	modules.set(module, (pulse, source) => {
		if (!pulse && cycles.get(module) === 0) {
			cycles.set(module, iteration);
			if (Array.from(cycles.values()).every(Boolean)) {
				throw 'found it';
			}
		}
		callback(pulse, source);
	});
}

try {
	while (true) {
		iteration++;
		broadcaster();
		while (stack.length) {
			stack.shift()();
		}
	}
} catch (error) {
	console.log(getLeastCommonMultiple(Array.from(cycles.values())));
}
