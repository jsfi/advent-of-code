import { getLines } from '../get-lines.ts';

const [start, ...lines] = getLines(import.meta.url);
let beams = new Set([start.indexOf('S')]);

let splitters = 0;
for (const line of lines) {
	const nextBeams = new Set<number>();
	for (const beam of beams.values()) {
		if (line[beam] === '^' ) {
			nextBeams.add(beam - 1);
			nextBeams.add(beam + 1);
			splitters += 1;
		} else {
			nextBeams.add(beam);
		}
	}
	beams = nextBeams;
}

console.log(splitters);
