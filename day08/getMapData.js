import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

export function getMapData() {
	const [ lineInstructions, , ...linesNetwork ] = lines;
	const instructions = lineInstructions.split('');

	const networkMap = new Map();

	const networkNodes = linesNetwork.map(line => line.split(' = '));
	for (const [ source, destinations ] of networkNodes) {
		if (!networkMap.has(source)) {
			networkMap.set(source, {});
		}
		const node = networkMap.get(source);

		const [ left, right ] = destinations
			.slice(1, -1)
			.split(', ');
		node.L = left;
		node.R = right;
	}

	const getSteps = (currentNodeName, isEndNodeName) => {
		let instructionIndex = 0;
		let steps = 0;

		while (!isEndNodeName(currentNodeName)) {
			currentNodeName = networkMap.get(currentNodeName)[instructions[instructionIndex]];
			instructionIndex = (instructionIndex + 1) % instructions.length;
			steps++;
		}

		return steps;
	}

	return [ getSteps, networkMap ];
}
