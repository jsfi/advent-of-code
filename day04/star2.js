import { getTeams } from './getTeams.js';

const teams = await getTeams();

let partiallyOverlapped = 0;
for (const [[fromA, toA], [fromB, toB]] of teams) {
	if (!(fromA > toB || fromB > toA)) {
		partiallyOverlapped++;
	}
}

console.log(partiallyOverlapped);
