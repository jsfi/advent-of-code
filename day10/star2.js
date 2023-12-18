import { getMapData } from './getMapData.js';

const loop = await getMapData();

const corners = loop.filter(([ , , char ]) => char !== '-' && char !== '|');

let s1 = 0;
let s2 = 0;
for (let index = 0; index < corners.length; index++) {
	const nextIndex = (index + 1) % corners.length;
	s1 += corners.at(index).at(0) * corners.at(nextIndex).at(1);
	s2 += corners.at(index).at(1) * corners.at(nextIndex).at(0);
}

const area = Math.abs(s1 - s2) / 2;

// after we calculate the area, we have to remove the edge to get the enclosed tiles
// a straight line adds 1/2, an outside corner 3/4 and an inside corner 1/4
// as every inside corner must match with an outside corner, we can simplify those to 1/2
// additionally we have 4 unmatched outside corners, which are 1/4 below 1/2 each
// therefore we have to remove 1, if we simplify the calculation to 1/2 for every type
const edge = loop.length / 2 - 1;

console.log(area - edge);
