import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const testEnv = Deno.env.get('test');
const wide = testEnv !== undefined ? 11 : 101;
const tall = testEnv !== undefined ? 7 : 103;

const robots = lines.map((line) => {
	const match = line.match(/p=(?<x>-?\d+),(?<y>-?\d+) v=(?<vx>-?\d+),(?<vy>-?\d+)/)!.groups!;
	return {
		position: [Number(match.x), Number(match.y)],
		velocity: [Number(match.vx), Number(match.vy)],
	}
});

for (let i = 0; i < 100; i++) {
	for (const robot of robots) {
		robot.position[0] = (robot.position[0] + robot.velocity[0]) % wide;
		if (robot.position[0] < 0) {
			robot.position[0] += wide;
		}
		robot.position[1] = (robot.position[1] + robot.velocity[1]) % tall;
		if (robot.position[1] < 0) {
			robot.position[1] += tall;
		}
	}
}

const horizontalMiddle = Math.floor(wide / 2);
const verticalMiddle = Math.floor(tall / 2);
const area = [0, 0, 0, 0];

for (const robot of robots) {
	const isTop = robot.position[1] < verticalMiddle;
	const isRight = robot.position[0] > horizontalMiddle;
	const isBottom = robot.position[1] > verticalMiddle;
	const isLeft = robot.position[0] < horizontalMiddle;

	if (isTop && isLeft) area[0]++;
	if (isTop && isRight) area[1]++;
	if (isBottom && isRight) area[2]++;
	if (isBottom && isLeft) area[3]++;
}

console.log(area.reduce((result, count) => result * count));
