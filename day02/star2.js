import { getMoves } from './getMoves.js';
import { getPoints } from './getPoints.js';
import {
	FIRST_PAPER,
	FIRST_ROCK,
	FIRST_SCISSORS,
	POINTS_PAPER,
	POINTS_ROCK,
	POINTS_SCISSORS,
	POINTS_DRAW,
	POINTS_LOSE,
	POINTS_WIN
} from './points.js';

const SECOND_LOSE = 'X';
const SECOND_DRAW = 'Y';
const SECOND_WIN = 'Z';

export const resultMap = {
	[FIRST_ROCK]: {
		[SECOND_LOSE]: POINTS_SCISSORS + POINTS_LOSE,
		[SECOND_DRAW]: POINTS_ROCK + POINTS_DRAW,
		[SECOND_WIN]: POINTS_PAPER + POINTS_WIN,
	},
	[FIRST_PAPER]: {
		[SECOND_LOSE]: POINTS_ROCK + POINTS_LOSE,
		[SECOND_DRAW]: POINTS_PAPER + POINTS_DRAW,
		[SECOND_WIN]: POINTS_SCISSORS + POINTS_WIN,
	},
	[FIRST_SCISSORS]: {
		[SECOND_LOSE]: POINTS_PAPER + POINTS_LOSE,
		[SECOND_DRAW]: POINTS_SCISSORS + POINTS_DRAW,
		[SECOND_WIN]: POINTS_ROCK + POINTS_WIN,
	},
};

const moves = await getMoves();
const points = getPoints(moves, resultMap);

console.log(points);
