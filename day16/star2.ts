import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const maze = lines.map((line) => line.split(''));

type Position = [number, number];

const directions: Array<Position> = [
	[-1, 0],
	[0, 1],
	[1, 0],
	[0, -1],
];

const turnsByDirection = new Map([
	[directions[0], [directions[3], directions[1]]],
	[directions[1], [directions[0], directions[2]]],
	[directions[2], [directions[1], directions[3]]],
	[directions[3], [directions[2], directions[0]]],
]);

let current!: Position;
start: for (let row = 0; row < maze.length; row++) {
	const line = maze[row];
	for (let col = 0; col < line.length; col++) {
		if (line[col] === 'S') {
			current = [row, col];
			break start;
		}
	}
}

const stack: Array<Array<{ position: Position; direction: Position; score: number; path: Array<string> }>> = [[
	{ position: current, direction: directions[1], score: 0, path: [] },
]];

const addToStack = (position: Position, direction: Position, score: number, path: Array<string>) => {
	const turns = Math.floor(score / 1000);
	let stackOfTurn = stack[turns];

	if (!stackOfTurn) {
		stackOfTurn = [];
		stack[turns] = stackOfTurn;
	}

	stackOfTurn.push({ position: position, direction, score, path });
};

let minPathLength = Infinity;
const minPaths: Array<Array<string>> = [];
let turns = 0;
const visited = new Map<string, number>();
const visitedThisTurn = new Map<string, number>();

while (true) {
	const turnStack = stack[turns];

	// No more turns to check
	if (!turnStack) {
		break;
	}

	// Stack has been processed
	if (!turnStack.length) {
		for (const [key, minScore] of visitedThisTurn) {
			visited.set(key, Math.min(visited.get(key) ?? Infinity, minScore));
		}
		visitedThisTurn.clear();
		turns++;
		continue;
	}

	const { position, direction, score, path } = turnStack.pop()!;

	const key = position.concat(direction).join(',');

	// Already found a shorter path or prevent loops
	if (score > minPathLength || (visited.get(key) ?? Infinity < score)) {
		continue;
	}

	visitedThisTurn.set(key, score);

	const [row, col] = position;
	const [rowDiff, colDiff] = direction;

	const nextRow = row + rowDiff;
	const nextCol = col + colDiff;
	const nextChar = maze[nextRow]?.[nextCol];

	if (nextChar === 'E') {
		const finalScore = score + 1;
		if (finalScore <= minPathLength) {
			if (finalScore < minPathLength) {
				minPaths.length = 0;
				minPathLength = finalScore;
			}
			minPaths.push(path);
		}
		continue;
	}

	if (nextChar === '.') {
		const nextPosition: Position = [nextRow, nextCol];
		addToStack(nextPosition, direction, score + 1, path.concat(nextPosition.join(',')));
	}

	turnsByDirection.get(direction)!.forEach((turnDirection) => {
		const turnRow = position[0] + turnDirection[0];
		const turnCol = position[1] + turnDirection[1];
		const turnPosition: Position = [turnRow, turnCol];
		const turnChar = maze[turnRow]?.[turnCol];

		if (turnChar === '.' && !visited.has(turnPosition.join(','))) {
			addToStack(turnPosition, turnDirection, score + 1000 + 1, path.concat(turnPosition.join(',')));
		}
	});
}

// Adding 2 to the size to account for the start and end
console.log(new Set(minPaths.flat()).size + 2);
