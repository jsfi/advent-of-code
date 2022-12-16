import { getStartValve } from './getStartValve.js';

const start = await getStartValve();

const TIME = 30;
const queue = [{
	minutes: TIME,
	flow: 0,
	released: 0,
	valve: start,
	opened: new Set(),
}];
let maxReleased = 0;

while (queue.length) {
	const current = queue.shift();

	if (current.minutes === 0) {
		if (current.released > maxReleased) {
			maxReleased = current.released;
		}
		continue;
	}

	let noNextValve = true;

	for (const [nextValve, distance] of current.valve.distances) {
		const timeTillOpen = distance + 1;

		if (
			nextValve.rate > 0 // valve has value
			&& !current.opened.has(nextValve) // is not already open
			&& current.minutes > timeTillOpen // can be reached in remaining time // maybe +1?
		) {
			const nextOpened = new Set(current.opened);
			nextOpened.add(nextValve);
			queue.push({
				minutes: current.minutes - timeTillOpen,
				flow: current.flow + nextValve.rate,
				released: current.released + timeTillOpen * current.flow,
				valve: nextValve,
				opened: nextOpened,
			});
			noNextValve = false;
		}
	}

	if (noNextValve) {
		queue.push({
			...current,
			minutes: 0,
			released: current.released + current.minutes * current.flow,
		});
	}
}

console.log(maxReleased);