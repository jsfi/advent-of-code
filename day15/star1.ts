import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const moves = lines.pop()!.split('');
lines.pop(); // Remove empty line
const map = lines.map((line) => line.split(''));

type Position = [number, number];
let current!: Position;
start: for (let row = 0; row < map.length; row++) {
	const line = map[row];
	for (let col = 0; col < line.length; col++) {
		if (line[col] === '@') {
			current = [row, col];
			break start;
		}
	}
}

const tryToMove = (row: number, col: number, rowDiff: number, colDiff: number): boolean => {
	const nextRow = row + rowDiff;
	const nextCol = col + colDiff;
	const nextChar = map[nextRow]?.[nextCol];

	// Wall
	if (nextChar === '#') {
		return false;
	}

	const move = () => {
		map[nextRow][nextCol] = map[row][col];
		map[row][col] = '.';
	};

	// Empty space
	if (nextChar === '.') {
		move();
		return true;
	}

	// Box
	if (nextChar === 'O') {
		const canMove = tryToMove(nextRow, nextCol, rowDiff, colDiff);
		if (canMove) {
			move();
		}
		return canMove;
	}

	throw new Error(`Unexpected character: ${nextChar}`);
};

for (const move of moves) {
	const [row, col] = current;
	const [rowDiff, colDiff] = {
		'^': [-1, 0],
		'>': [0, 1],
		'v': [1, 0],
		'<': [0, -1],
	}[move]!;

	if (tryToMove(row, col, rowDiff, colDiff)) {
		current = [row + rowDiff, col + colDiff];
	}
}

console.log(map.map((line) => line.join('')).join('\n'));

let result = 0;
for (let row = 0; row < map.length; row++) {
	const line = map[row];
	for (let col = 0; col < line.length; col++) {
		if (line[col] === 'O') {
			result += 100 * row + col;
		}
	}
}
console.log(result);
