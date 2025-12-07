import { getLines } from '../get-lines.ts';

const [start, ...lines] = getLines(import.meta.url);
let beams = new Map<number, number>([[start.indexOf('S'), 1]]);

for (const line of lines) {
	const nextBeams = new Map<number, number>();
	for (const [beam, count] of beams.entries()) {
		if (line[beam] === '^' ) {
			const leftBeam = beam - 1;
			nextBeams.set(leftBeam, (nextBeams.get(leftBeam) || 0) + count);

			const rightBeam = beam + 1;
			nextBeams.set(rightBeam, (nextBeams.get(rightBeam) || 0) + count);
		} else {
			nextBeams.set(beam, (nextBeams.get(beam) || 0) + count);
		}
	}
	beams = nextBeams;
}

const beamCount = Array.from(beams.values()).reduce((sum, beams) => sum + beams, 0);
console.log(beamCount);
