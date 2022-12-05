import { parseInput } from './parseInput.js';

const [stacks, moves] = await parseInput();

for (const [quantity, fromIndex, toIndex] of moves) {
	// crates are moved at once, so they are added in the same order to the new stack
	stacks[toIndex - 1].push(...stacks[fromIndex - 1].splice(-quantity, quantity));
}

console.log(stacks.map(stack => stack.at(-1)).join(''));
