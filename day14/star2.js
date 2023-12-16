import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

const cycles = 1_000_000_000;

const platformRepeats = new Map();

const platform = lines.map(line => line.split(''));
const rows = platform.length;
const columns = platform.at(0).length;

for (let cycle = 0; cycle < cycles; cycle++) {
	// north
	let moveToRowNorth = platform.at(0).map(() => 0);
	for (let row = 0; row < rows; row++) {
		for (let column = 0; column < columns; column++) {
			const char = platform[row][column];
			if (char === 'O') {
				platform[row][column] = '.';
				platform[moveToRowNorth[column]][column] = char;
				moveToRowNorth[column]++;
			} else if (char === '#') {
				moveToRowNorth[column] = row + 1;
			}
		}
	}

	// west
	for (let row = 0; row < rows; row++) {
		let moveToColumnWest = 0;
		for (let column = 0; column < columns; column++) {
			const char = platform[row][column];
			if (char === 'O') {
				platform[row][column] = '.';
				platform[row][moveToColumnWest] = char;
				moveToColumnWest++;
			} else if (char === '#') {
				moveToColumnWest = column + 1;
			}
		}
	}

	// south
	let moveToRowSouth = platform.at(0).map(() => rows - 1);
	for (let row = rows - 1; row >= 0; row--) {
		for (let column = 0; column < columns; column++) {
			const char = platform[row][column];
			if (char === 'O') {
				platform[row][column] = '.';
				platform[moveToRowSouth[column]][column] = char;
				moveToRowSouth[column]--;
			} else if (char === '#') {
				moveToRowSouth[column] = row - 1;
			}
		}
	}

	// east
	for (let row = 0; row < rows; row++) {
		let moveToColumnWest = columns - 1;
		for (let column = columns - 1; column >= 0; column--) {
			const char = platform[row][column];
			if (char === 'O') {
				platform[row][column] = '.';
				platform[row][moveToColumnWest] = char;
				moveToColumnWest--;
			} else if (char === '#') {
				moveToColumnWest = column - 1;
			}
		}
	}

	const platFormString = platform.map(row => row.join('')).join('\n');
	if (platformRepeats.has(platFormString)) {
		const firstCycleIndex = platformRepeats.get(platFormString);
		const cycleDiff = cycle - firstCycleIndex;
		// skip cycles that don't change anything
		while (cycle + cycleDiff < cycles) cycle += cycleDiff;
		platformRepeats.clear();
	} else {
		platformRepeats.set(platFormString, cycle);
	}
}

let result = 0;
for (let row = 0; row < rows; row++) {
	for (let column = 0; column < columns; column++) {
		const char = platform[row][column];
		if (char === 'O') {
			result += rows - row;
		}
	}
}

console.log(result);
