import { getLines } from '../getLines.js';
import { SAND_X, SAND_Y, SYMBOL_AIR, SYMBOL_ROCK } from './constants.js';

export async function getGrid() {
	const lines = await getLines(import.meta.url);

	const rocks = lines.map(line => line.split(' -> ')
		.map(point => point.split(',').map(Number))
	);

	const xses = [];
	const yses = [];
	for (const rock of rocks) {
		for (const [x, y] of rock) {
			xses.push(x);
			yses.push(y);
		}
	}

	const minX = Math.min(SAND_X, ...xses);
	const maxX = Math.max(SAND_X, ...xses);
	const minY = Math.min(SAND_Y, ...yses);
	const maxY = Math.max(SAND_Y, ...yses);

	const cols = maxX - minX + 1;
	const rows = maxY - minY + 1;
	const grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => SYMBOL_AIR));

	grid.xShift = minX;

	for (const rock of rocks) {
		if (rock.length < 2) {
			throw Error('Invalid line');
		}

		for (let i = 1; i < rock.length; i++) {
			const [firstX, firstY] = rock.at(i - 1);
			const [secondX, secondY] = rock.at(i);

			const fromX = Math.min(firstX, secondX) - minX;
			const toX = Math.max(firstX, secondX) - minX;
			const fromY = Math.min(firstY, secondY) - minY;
			const toY = Math.max(firstY, secondY) - minY;

			if (fromY === toY) {
				for (let x = fromX; x <= toX; x++) {
					grid[fromY][x] = SYMBOL_ROCK;
				}
			} else if (fromX === toX) {
				for (let y = fromY; y <= toY; y++) {
					grid[y][fromX] = SYMBOL_ROCK;
				}
			} else {
				throw Error('Diagonal line');
			}
		}
	}

	return grid;
}
