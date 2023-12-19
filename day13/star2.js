import { getMaps } from './getMaps.js';

const maps = getMaps();

let result = 0;
for (const map of maps) {
	let mirrorColumn = -1;
	for (let column = 0; column < map[0].length - 1; column++) {
		let errors = 0;
		checkColumn: for (let match = 0; match <= Math.min(column, map[0].length - column - 2); match++) {
			for (let row = 0; row < map.length; row++) {
				if (map[row][column - match] !== map[row][column + match + 1]) {
					errors++;

					if (errors > 1) {
						break checkColumn;
					}
				}
			}
		}

		if (errors === 1) {
			mirrorColumn = column + 1;
			break;
		}
	}

	let mirrorRow = -1;
	for (let row = 0; row < map.length - 1; row++) {
		let errors = 0;
		checkRow: for (let match = 0; match <= Math.min(row, map.length - row - 2); match++) {
			for (let column = 0; column < map[0].length; column++) {
				if (map[row - match][column] !== map[row + match + 1][column]) {
					errors++;

					if (errors > 1) {
						break checkRow;
					}
				}
			}
		}


		if (errors === 1) {
			mirrorRow = row + 1;
			break;
		}
	}

	if (mirrorColumn > 0) {
		result += mirrorColumn;
	}

	if (mirrorRow > 0) {
		result += mirrorRow * 100;
	}
}

console.log(result);
