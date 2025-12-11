import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

type Device = Record<string, Device>
const deviceMap: Map<string, Device> = new Map();
const deviceNameMap: Map<Device, string> = new Map();

for (const line of lines) {
	const [name, outputString] = line.split(': ');
	let device = deviceMap.get(name);
	if (!device) {
		device = {};
		deviceMap.set(name, device);
		deviceNameMap.set(device, name);
	}

	const outputs = outputString.split(' ');
	for (const outputName of outputs) {
		let outputDevice = deviceMap.get(outputName);
		if (!outputDevice) {
			outputDevice = {};
			deviceMap.set(outputName, outputDevice);
			deviceNameMap.set(outputDevice, outputName);
		}
		device[outputName] = outputDevice;
	}
}

const outDevice = deviceMap.get('out');
const dacDevice = deviceMap.get('dac');
const fftDevice = deviceMap.get('fft');

const cache: Map<Device, number> = new Map();

function getPathsToOutFrom(device: Device, path: Set<Device>): number {
	const hasDac = path.has(dacDevice);
	const hasFft = path.has(fftDevice);
	const cacheKey = `${deviceNameMap.get(device)}|${hasDac ? '1' : '0'}|${hasFft ? '1' : '0'}`;
	if (cache.has(cacheKey)) {
		return cache.get(cacheKey);
	}

	let paths = 0;
	for (const outputDevice of Object.values(device)) {
		if (outputDevice === outDevice) {
			if (hasDac && hasFft) {
				paths++;
			}
			continue
		}

		if (path.has(outputDevice)) {
			continue;
		}

		const newPath = new Set(path);
		newPath.add(outputDevice);
		paths += getPathsToOutFrom(outputDevice, newPath);
	}

	cache.set(cacheKey, paths);

	return paths;
}

console.log(getPathsToOutFrom(deviceMap.get('svr'), new Set()));
