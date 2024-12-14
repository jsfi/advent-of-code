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

let i = 0;
while (true) {
	i++;
	const map = Array.from({ length: tall }, () => Array.from({ length: wide }, () => ' '));
	for (const robot of robots) {
		robot.position[0] = (robot.position[0] + robot.velocity[0]) % wide;
		if (robot.position[0] < 0) {
			robot.position[0] += wide;
		}

		robot.position[1] = (robot.position[1] + robot.velocity[1]) % tall;
		if (robot.position[1] < 0) {
			robot.position[1] += tall;
		}

		map[robot.position[1]][robot.position[0]] = '#';
	}

	// If there are 8 or more consecutive # in a row, print the map and the seconds
	// Why 8? Because I decided a tree should be at least 8 characters wide
	if (map.some((line) => line.join('').match(/#{8,}/))) {
		console.log(map.map((line) => line.join('')).join('\n'));
		console.log('Seconds', i);
		break;
	}
}
