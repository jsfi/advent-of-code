import { getLines } from '../get-lines.ts';

const banks = getLines(import.meta.url);
const maxJoltage: Array<number> = [];
const maxBatteries = 12;

for (const bank of banks) {
	let batteries = bank.split('').map(Number);
	const activeBatteries: Array<number> = [];

	for (let remainingBatterySpaces = maxBatteries - 1; remainingBatterySpaces >= 0; remainingBatterySpaces--) {
		const maxBatteryWithSpace = Math.max(...batteries.slice(0, batteries.length - remainingBatterySpaces));
		activeBatteries.push(maxBatteryWithSpace);

		const firstIndexMaxBattery = batteries.indexOf(maxBatteryWithSpace);
		batteries = batteries.slice(firstIndexMaxBattery + 1);
	}

	const joltage = activeBatteries.reduce((sum, battery, index) =>
		sum + battery * Math.pow(10, maxBatteries - index - 1),
	0);
	maxJoltage.push(joltage);
}

const sumMaxJoltage = maxJoltage.reduce((sum, joltage) => sum + joltage);

console.log(sumMaxJoltage);
