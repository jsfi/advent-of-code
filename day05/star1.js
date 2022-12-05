import { parseInput } from './parseInput.js';

const [stacks, moves] = await parseInput();

for (const [quantity, fromIndex, toIndex] of moves) {
	// crates are moved 1 by 1, so they are added in reverse order to the new stack
	stacks[toIndex - 1].push(...stacks[fromIndex - 1].splice(-quantity, quantity).reverse());
}

console.log(stacks.map(stack => stack.at(-1)).join(''));
