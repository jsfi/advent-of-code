import { getTeams } from './getTeams.js';

const teams = await getTeams();

let fullOverlapped = 0;
for (const [[fromA, toA], [fromB, toB]] of teams) {
	if (
		(fromA >= fromB && toA <= toB)
		|| (fromB >= fromA && toB <= toA)
	) {
		fullOverlapped++;
	}
}

console.log(fullOverlapped);
