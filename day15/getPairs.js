import { getLines } from '../getLines.js';

const REGEX_SENSOR = /Sensor at x=(?<sensorX>-?\d+), y=(?<sensorY>-?\d+): closest beacon is at x=(?<beaconX>-?\d+), y=(?<beaconY>-?\d+)/;

export async function getPairs() {
	const lines = await getLines(import.meta.url);

	const map = new Map();

	for (const line of lines) {
		const { sensorX, sensorY, beaconX, beaconY } = line.match(REGEX_SENSOR).groups;
		map.set([Number(sensorX), Number(sensorY)], [Number(beaconX), Number(beaconY)]);
	}

	return map;
}