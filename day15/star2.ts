import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const moves = lines.pop()!.split('');
lines.pop(); // Remove empty line
const map = lines.map((line) =>
	line.split('').map((char) => {
		if (char === 'O') {
			return '[]';
		}

		if (char === '@') {
			return '@.';
		}

		return `${char}${char}`;
	}).join('').split('')
);

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

console.log(map.map((line) => line.join('')).join('\n'));

const canMove = (row: number, col: number, rowDiff: number, colDiff: number): boolean => {
	const nextRow = row + rowDiff;
	const nextCol = col + colDiff;
	const nextChar = map[nextRow]?.[nextCol];

	// Wall
	if (nextChar === '#') {
		return false;
	}

	// Empty space
	if (nextChar === '.') {
		return true;
	}

	// If the box is moving right, we can ignore the check for the left half of the box "["
	//  because it will take the place of the right half of the box "]" and vice versa
	const moveRight = colDiff === 1;
	const moveLeft = colDiff === -1;

	// Box left
	if (nextChar === '[') {
		return (
			moveRight || canMove(nextRow, nextCol, rowDiff, colDiff)
		) && (
			moveLeft || canMove(nextRow, nextCol + 1, rowDiff, colDiff)
		);
	}

	// Box right
	if (nextChar === ']') {
		return (
			moveRight || canMove(nextRow, nextCol - 1, rowDiff, colDiff)
		) && (
			moveLeft || canMove(nextRow, nextCol, rowDiff, colDiff)
		);
	}

	throw new Error(`Unexpected character: ${nextChar}`);
};

const doMove = (row: number, col: number, rowDiff: number, colDiff: number): void => {
	const nextRow = row + rowDiff;
	const nextCol = col + colDiff;
	const nextChar = map[nextRow]?.[nextCol];

	// If the box is moving right, the right half of the box "]"
	//  must be moved first
	const moveRight = colDiff === 1;

	// Box left
	if (nextChar === '[') {
		if (moveRight) doMove(nextRow, nextCol + 1, rowDiff, colDiff);
		doMove(nextRow, nextCol, rowDiff, colDiff);
		if (!moveRight) doMove(nextRow, nextCol + 1, rowDiff, colDiff);
	}

	// Box right
	if (nextChar === ']') {
		if (moveRight) doMove(nextRow, nextCol, rowDiff, colDiff);
		doMove(nextRow, nextCol - 1, rowDiff, colDiff);
		if (!moveRight) doMove(nextRow, nextCol, rowDiff, colDiff);
	}

	map[row + rowDiff][col + colDiff] = map[row][col];
	map[row][col] = '.';
};

for (const move of moves) {
	const [row, col] = current;
	const [rowDiff, colDiff] = {
		'^': [-1, 0],
		'>': [0, 1],
		'v': [1, 0],
		'<': [0, -1],
	}[move]!;

	if (canMove(row, col, rowDiff, colDiff)) {
		doMove(row, col, rowDiff, colDiff);
		current = [row + rowDiff, col + colDiff];
	}
}

console.log(map.map((line) => line.join('')).join('\n'));

let result = 0;
for (let row = 0; row < map.length; row++) {
	const line = map[row];
	for (let col = 0; col < line.length; col++) {
		if (line[col] === '[') {
			result += 100 * row + col;
		}
	}
}
console.log(result);
