import { assertEquals } from 'jsr:@std/assert@^1.0.0';
import { runProgram } from './run-program.ts';

Deno.test('Test 1', () => {
	const result = runProgram([2, 6], 0n, 0n, 9n);
	assertEquals(result[2], 1n);
});

Deno.test('Test 2', () => {
	const result = runProgram([5, 0, 5, 1, 5, 4], 10n, 0n, 0n);
	assertEquals(result[0], [0, 1, 2]);
});

Deno.test('Test 3', () => {
	const result = runProgram([0, 1, 5, 4, 3, 0], 2024n, 0n, 0n);
	assertEquals(result[0], [4, 2, 5, 6, 7, 7, 7, 7, 3, 1, 0]);
	assertEquals(result[1], 0n);
});

Deno.test('Test 4', () => {
	const result = runProgram([1, 7], 0n, 29n, 0n);
	assertEquals(result[2], 26n);
});

Deno.test('Test 5', () => {
	const result = runProgram([4, 0], 0n, 2024n, 43690n);
	assertEquals(result[2], 44354n);
});
