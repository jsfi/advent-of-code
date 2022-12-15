import { getPairs } from './getPairs.js';


const DISTRESS_MIN = 0;
const DISTRESS_MAX = Boolean(process.env.test) ? 20 : 4000000;
const FREQUENCY_MULTIPLIER = 4000000;

const pairs = await getPairs();

const getRanges = [];
for (const [[sensorX, sensorY], [beaconX, beaconY]] of pairs) {
	const distance = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);
	getRanges.push((analyzeY) => {
		if (sensorY - distance <= analyzeY && sensorY + distance >= analyzeY) {
			const absX = distance - Math.abs(sensorY - analyzeY);
			return [sensorX - absX, sensorX + absX];
		}
	});
}

DISTRESS_SPACE: for (let y = DISTRESS_MIN; y <= DISTRESS_MAX; y++) {
	const ranges = getRanges
		.map(getRange => getRange(y))
		.filter(Boolean)
		.sort((a, b) => a[0] - b[0]);

	const union = ranges.shift();
	for (const range of ranges) {
		// not strictly correct (we could have ranges outside the distress space)
		//  but for the provided inputs it is good enough
		if (range[0] <= union[1]) {
			if (range[1] > union[1]) {
				union[1] = range[1];
			}
		} else {
			const x = range[0] -1;
			console.log(x * FREQUENCY_MULTIPLIER + y);
			break DISTRESS_SPACE;
		}
	}
}
