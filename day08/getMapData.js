import { getLines } from '../getLines.js';

export async function getMapData() {

	const [ lineInstructions, , ...linesNetwork ] = await getLines(import.meta.url);

	const instructions = lineInstructions.split('');

	const networkMap = new Map();

	const networkNodes = linesNetwork.map(line => line.split(' = '));
	for (const [ source, destinations ] of networkNodes) {
		if (!networkMap.has(source)) {
			networkMap.set(source, {});
		}
		const node = networkMap.get(source);

		const [ left, right ] = destinations
			.substring(1, destinations.length - 1)
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
