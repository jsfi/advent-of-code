import { getLines } from '../getLines.js';

export async function getCubes() {
	const lines = await getLines(import.meta.url);

	const cubes = lines.map(line => line.split(',').map(Number));
	const cubeStrings = new Set(lines);

	const hasCube = ([x, y, z]) => cubeStrings.has(`${x},${y},${z}`);

	return [cubes, hasCube];
}
