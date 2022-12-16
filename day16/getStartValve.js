import { getLines } from '../getLines.js';

const REGEX = /Valve (?<valve>\w+) has flow rate=(?<rate>\w+); tunnels? leads? to valves? (?<next>[\w, ]+)/;

export async function getStartValve() {
	const lines = await getLines(import.meta.url);

	const valveMap = new Map();
	for (const line of lines) {
		const match = line.match(REGEX);
		const valve = {
			name: match.groups.valve,
			rate: Number(match.groups.rate),
			next: match.groups.next.split(', '),
		};
		valveMap.set(match.groups.valve, valve);
	}

	for (const valve of valveMap.values()) {
		const distances = new Map([[valve, 0], ...valve.next.map(valveName => [valveMap.get(valveName), 1])]);
		let lastDistance = 1;

		while (distances.size < valveMap.size) {
			for (const [distantValve, distance] of distances) {
				if (distance === lastDistance) {
					for (const nextValveName of distantValve.next) {
						const nextValve = valveMap.get(nextValveName);
						if (!distances.has(nextValve)) {
							distances.set(nextValve, lastDistance + 1);
						}
					}
				}
			}

			lastDistance++;
		}

		valve.distances = distances;
	}

	return valveMap.get('AA');
}
