import { getLines } from '../getLines.js';

const MATCH_CRATES = /[A-Z]/g;
const MATCH_MOVE = /\d+/g;
const STACK_PREFIX_WIDTH = 1;
const STACK_WIDTH = 4;

/**
 * @return {Promise<([stacks: string[][], moves: [quantity: number, fromIndex: number, toIndex: number][]])>}
 */
export async function parseInput() {
	const lines = await getLines(import.meta.url);

	const stackIndexLine = lines.findIndex(line => line.startsWith(' 1 '));
	const stackCount = Number(lines[stackIndexLine].trim().split(' ').pop());

	/**
	 * @type {string[][]}
	 */
	const stacks = Array.from({ length: stackCount }, () => []);
	for (let i = 0; i < stackIndexLine; i++) {
		const matches = lines[i].matchAll(MATCH_CRATES);
		for (const match of matches) {
			const stackIndex = (match.index - STACK_PREFIX_WIDTH) / STACK_WIDTH;
			stacks[stackIndex].push(match[0]);
		}
	}
	stacks.forEach(stack => stack.reverse());

	/**
	 * @type {[quantity: number, fromIndex: number, toIndex: number][]}
	 */
	const moves = [];
	for (let i = stackIndexLine + 2; i < lines.length; i++) {
		moves.push(lines[i].match(MATCH_MOVE).map(Number));
	}

	return [stacks, moves];
}
