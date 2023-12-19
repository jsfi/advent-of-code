import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

export function getMaps() {
	const maps = [];
	let currentMap = [];

	for (const line of lines) {
		if (line === '') {
			maps.push(currentMap);
			currentMap = [];
			continue;
		}

		currentMap.push(line.split(''));
	}
	maps.push(currentMap);

	return maps;
}
