import { getPairs } from './getPairs.js';

const ANALYZE_Y = Boolean(process.env.test) ? 10 : 2000000;

const pairs = await getPairs();

const xsesWithBeaconInAnalyzeRow = new Set();
for (const [_, [beaconX, beaconY]] of pairs) {
	if (beaconY === ANALYZE_Y) {
		xsesWithBeaconInAnalyzeRow.add(beaconX);
	}
}

const xsesWithoutBeaconInAnalyzeRow = new Set();
for (const [[sensorX, sensorY], [beaconX, beaconY]] of pairs) {
	const distance = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);
	if (sensorY - distance <= ANALYZE_Y && sensorY + distance >= ANALYZE_Y) {
		const absX = distance - Math.abs(sensorY - ANALYZE_Y);

		for (let x = sensorX - absX; x <= sensorX + absX; x++) {
			if (!xsesWithBeaconInAnalyzeRow.has(x)) {
				xsesWithoutBeaconInAnalyzeRow.add(x);
			}
		}
	}
}

console.log(xsesWithoutBeaconInAnalyzeRow.size);
