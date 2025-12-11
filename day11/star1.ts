import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

type Device = Record<string, Device>
const deviceMap: Map<string, Device> = new Map();

for (const line of lines) {
	const [name, outputString] = line.split(': ');
	let device = deviceMap.get(name);
	if (!device) {
		device = {};
		deviceMap.set(name, device);
	}

	const outputs = outputString.split(' ');
	for (const outputName of outputs) {
		let outputDevice = deviceMap.get(outputName);
		if (!outputDevice) {
			outputDevice = {};
			deviceMap.set(outputName, outputDevice);
		}
		device[outputName] = outputDevice;
	}
}

const outDevice = deviceMap.get('out');

let pathsToOut = 0;
const stack: Array<[Device, Set<Device>]> = [[deviceMap.get('you'), new Set()]];
while (stack.length > 0) {
	const [device, path] = stack.shift();
	for (const outputDevice of Object.values(device)) {
		if (outputDevice === outDevice) {
			pathsToOut++;
			continue;
		}

		if (path.has(outputDevice)) {
			continue;
		}

		const newPath = new Set(path);
		newPath.add(outputDevice);
		stack.push([outputDevice, newPath]);
	}
}

console.log(pathsToOut);
