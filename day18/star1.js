import { getCubes } from './cube.js';
import { getSurroundingCubes } from './getSurroundingCubes.js';

const [cubes, hasCube] = await getCubes();

let sides = 0;
for (let i = 0; i < cubes.length; i++) {
	let visibleCubeSides = 6;
	getSurroundingCubes(cubes[i]).forEach(cube => {
		if (hasCube(cube)) {
			visibleCubeSides--;
		}
	});

	sides += visibleCubeSides;
}

console.log(sides);
