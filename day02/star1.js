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

const SECOND_ROCK = 'X';
const SECOND_PAPER = 'Y';
const SECOND_SCISSORS = 'Z';

const resultMap = {
	[FIRST_ROCK]: {
		[SECOND_ROCK]: POINTS_ROCK + POINTS_DRAW,
		[SECOND_PAPER]: POINTS_PAPER + POINTS_WIN,
		[SECOND_SCISSORS]: POINTS_SCISSORS + POINTS_LOSE,
	},
	[FIRST_PAPER]: {
		[SECOND_ROCK]: POINTS_ROCK + POINTS_LOSE,
		[SECOND_PAPER]: POINTS_PAPER + POINTS_DRAW,
		[SECOND_SCISSORS]: POINTS_SCISSORS + POINTS_WIN,
	},
	[FIRST_SCISSORS]: {
		[SECOND_ROCK]: POINTS_ROCK + POINTS_WIN,
		[SECOND_PAPER]: POINTS_PAPER + POINTS_LOSE,
		[SECOND_SCISSORS]: POINTS_SCISSORS + POINTS_DRAW,
	},
};

const moves = await getMoves();
const points = getPoints(moves, resultMap);

console.log(points);
