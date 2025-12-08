import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

type Position = [number, number, number];
const junctionBoxes: Array<Position> = lines.map((line) => line.split(',').map((value) => Number(value)));
const distances: Map<number, Array<[Position, Position]>> = new Map();

for (let index1 = 0; index1 < junctionBoxes.length; index1++) {
	for (let index2 = index1 + 1; index2 < junctionBoxes.length; index2++) {
		const box1 = junctionBoxes[index1];
		const box2 = junctionBoxes[index2];
		const distance = Math.sqrt(
			Math.pow(box1[0] - box2[0], 2) +
			Math.pow(box1[1] - box2[1], 2) +
			Math.pow(box1[2] - box2[2], 2)
		);
		if (!distances.has(distance)) {
			distances.set(distance, []);
		}
		distances.get(distance).push([box1, box2]);
	}
}

const sortedDistances = Array.from(distances.keys())
	.sort((a, b) => a - b);

const circuits: Array<Set<Position>> = [];
connecting: while (true) {
	const smallestDistance = sortedDistances.shift();
	const pairs = distances.get(smallestDistance);
	for (const [box1, box2] of pairs) {
		let firstMatchingCircuit: Set<Position> = null;
		for (let index = 0; index < circuits.length; index++) {
			const existingCircuit = circuits[index];
			if (existingCircuit.has(box1) || existingCircuit.has(box2)) {
				if (firstMatchingCircuit) {
					// Merge circuits
					for (const position of existingCircuit) {
						firstMatchingCircuit.add(position);
					}
					circuits.splice(index, 1);
					index--;
				} else {
					existingCircuit.add(box1);
					existingCircuit.add(box2);
					firstMatchingCircuit = existingCircuit;
				}
			}
		}

		if (!firstMatchingCircuit) {
			// Create new circuit
			const newCircuit = new Set<Position>();
			newCircuit.add(box1);
			newCircuit.add(box2);
			circuits.push(newCircuit);
		}

		if (circuits.length === 1 && circuits[0].size === junctionBoxes.length) {
			console.log(box1[0] * box2[0]);
			break connecting;
		}
	}
}
