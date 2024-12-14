import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const COST_A = 3;
const COST_B = 1;

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
			x: Number(prize.x) + 10000000000000,
			y: Number(prize.y) + 10000000000000,
		},
	});
}

/**
 * PrizeX = A * AX + B * BX
 * PrizeY = A * AY + B * BY
 *  ->
 * A = (PrizeX - B * BX) / AX
 * A = (PrizeY - B * BY) / AY
 *  ->
 * (PrizeX - B * BX) / AX = (PrizeY - B * BY) / AY
 *  ->
 * B = (AX * PrizeY - AY * PrizeX) / (AX * BY - AY * BX)
 */

let result = 0;
for (const machine of machines) {
	const b = (machine.a.x * machine.prize.y - machine.a.y * machine.prize.x) /
		(machine.a.x * machine.b.y - machine.a.y * machine.b.x);
	const a = (machine.prize.x - b * machine.b.x) / machine.a.x;

	if (a === Math.floor(a) && b === Math.floor(b)) {
		result += a * COST_A + b * COST_B;
	}
}

console.log(result);
