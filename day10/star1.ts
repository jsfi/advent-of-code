import { getLines } from '../get-lines.ts';

const lines = getLines(import.meta.url);

const machines = lines.map((line) => {
	const lights = line.slice(1, line.indexOf(']')).split('').map(light => light === '#');
	const buttons = line
		.slice(line.indexOf(']') + 2, line.lastIndexOf(')') + 1)
		.split(' ')
		.map(button => button.slice(1, -1).split(',').map(Number));

	return { lights, buttons};
});

let total = 0;
for (const { lights, buttons } of machines) {
	// Skip if all lights are supposed to be off
	if (lights.every(light => !light)) {
		console.log(`Skipping machine with all lights off`);
		continue;
	}

	// Create a cache to avoid re-processing the same button presses
	let cache = new Map<string, Array<boolean>>;
	const emptyCacheKey = Array.from({ length: buttons.length }).fill(0).join();
	cache.set(emptyCacheKey, Array.from({ length: lights.length }).fill(false));

	// initialize the stack with each button pressed once
	const pressStack = buttons.map((button, i) => {
		return [emptyCacheKey, i];
	});

	while (pressStack.length > 0) {
		const [cacheKey, nextButtonIndex] = pressStack.shift();
		const buttonPresses = cacheKey.split(',').map(Number);

		// Skip if this button has already been pressed once,
		//  because pressing it twice is equivalent to not pressing it at all
		if (buttonPresses[nextButtonIndex]) {
			continue;
		}

		buttonPresses[nextButtonIndex]++;
		const newCacheKey = buttonPresses.join();

		// If the same combination of button presses has already been processed, skip it
		if (cache.has(newCacheKey)) {
			continue;
		}

		const newLights = cache.get(cacheKey).slice();
		for (const toggleLight of buttons[nextButtonIndex]) {
			newLights[toggleLight] = !newLights[toggleLight];
		}

		if (newLights.every((light, index) => light === lights[index])) {
			total += buttonPresses.reduce((sum, presses) => sum + presses);
			break;
		}

		cache.set(newCacheKey, newLights);

		for (let index = 0; index < buttons.length; index++) {
			pressStack.push([newCacheKey, index]);
		}
	}
}

console.log(total);
