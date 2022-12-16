import { getStartValve } from './getStartValve.js';

const start = await getStartValve();

const TIME = 27;
const queue = [{
	minutes: TIME,
	flow: 0,
	released: 0,
	valve1: start,
	valve1Minutes: 1,
	valve2: start,
	valve2Minutes: 1,
	opened: new Set(),
}];
let maxReleased = 0;
let maxPath;

while (queue.length) {
	const current = queue.shift();

	if (current.minutes === 0) {
		if (current.released > maxReleased) {
			maxReleased = current.released;
			maxPath = current;
		}
		continue;
	}

	const nextItem = {
		minutes: current.minutes - 1,
		flow: current.flow,
		released: current.released + current.flow,
		valve1: current.valve1,
		valve1Minutes: current.valve1Minutes - 1,
		valve2: current.valve2,
		valve2Minutes: current.valve2Minutes - 1,
		opened: current.opened,
		last: current,
	}

	const getNextValves = (currentValve) => {
		const nextValves = [];

		for (const [nextValve, distance] of currentValve.distances) {
			const timeTillOpen = distance + 1;

			if (
				nextValve.rate > 0 // valve has value
				&& !current.opened.has(nextValve) // is not already open
				&& current.minutes > timeTillOpen // can be reached in remaining time // maybe +1?
			) {
				nextValves.push([nextValve, timeTillOpen]);
			}
		}

		return nextValves;
	}

	let nextValve1Data = [];
	if (nextItem.valve1Minutes === 0) {
		nextItem.flow += current.valve1.rate;
		nextValve1Data = getNextValves(current.valve1);
	}
	let nextValve2Data = [];
	if (nextItem.valve2Minutes === 0) {
		nextItem.flow += current.valve2.rate;
		nextValve2Data = getNextValves(current.valve2);
	}

	if (
		nextValve1Data.length === 1 && nextValve2Data.length === 1 // each has only 1 item
		&& nextValve1Data[0][0] === nextValve2Data[0][0] // and it is the same item
	) {
		// ignore the second one
		nextValve2Data = [];
	}

	if (nextValve1Data.length > 0 && nextValve2Data.length > 0) {
		for (const [nextValve1, timeTillOpen1] of nextValve1Data) {
			for (const [nextValve2, timeTillOpen2] of nextValve2Data) {
				if (nextValve1 !== nextValve2) {
					const nextOpened = new Set(current.opened);
					nextOpened.add(nextValve1).add(nextValve2);
					queue.push({
						...nextItem,
						valve1: nextValve1,
						valve1Minutes: timeTillOpen1,
						valve2: nextValve2,
						valve2Minutes: timeTillOpen2,
						opened: nextOpened,
					});
				}
			}
		}
	} else if (nextValve1Data.length > 0) {
		for (const [nextValve1, timeTillOpen] of nextValve1Data) {
			const nextOpened = new Set(current.opened);
			nextOpened.add(nextValve1);
			queue.push({
				...nextItem,
				valve1: nextValve1,
				valve1Minutes: timeTillOpen,
				opened: nextOpened,
			});
		}
	} else if (nextValve2Data.length > 0) {
		for (const [nextValve2, timeTillOpen] of nextValve2Data) {
			const nextOpened = new Set(current.opened);
			nextOpened.add(nextValve2);
			queue.push({
				...nextItem,
				valve2: nextValve2,
				valve2Minutes: timeTillOpen,
				opened: nextOpened,
			});
		}
	} else {
		queue.push(nextItem);
	}
}

console.log(maxReleased);
