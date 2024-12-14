import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const COST_A = 3;
const COST_B = 1;
const MAX = 100;

const machines = [];
for (let i = 0; i < lines.length; i += 4) {
	const matchA = /X\+(?<x>\d+), Y\+(?<y>\d+)/.exec(lines[i])?.groups!;
	const matchB = /X\+(?<x>\d+), Y\+(?<y>\d+)/.exec(lines[i + 1])?.groups!;
	const prize = /X=(?<x>\d+), Y=(?<y>\d+)/.exec(lines[i + 2])?.groups!;

	machines.push({
		a: {
			x: Number(matchA.x),
			y: Number(matchA.y),
		},
		b: {
			x: Number(matchB.x),
			y: Number(matchB.y),
		},
		prize: {
			x: Number(prize.x),
			y: Number(prize.y),
		},
	});
}

let cost = 0;
for (const machine of machines) {
	let minCost = Infinity;
	for (let a = 0; a < MAX; a++) {
		const costA = a * COST_A;
		if (costA > minCost) {
			break;
		}

		for (let b = 0; b < MAX; b++) {
			if (
				machine.prize.x === machine.a.x * a + machine.b.x * b &&
				machine.prize.y === machine.a.y * a + machine.b.y * b
			) {
				const costRound = costA + b * COST_B;
				if (costRound < minCost) {
					minCost = costRound;
					break;
				}
			}
		}
	}

	if (minCost !== Infinity) {
		cost += minCost;
	}
}

console.log(cost);
