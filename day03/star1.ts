import { getLines } from '../get-lines.ts';

const banks = getLines(import.meta.url);
const maxJoltage: Array<number> = [];

for (const bank of banks) {
	const batteries = bank.split('').map(Number);

	const maxBatteryWithoutLast = Math.max(...batteries.slice(0, batteries.length - 1));
	const firstIndexMaxBattery = batteries.indexOf(maxBatteryWithoutLast);

	const maxBatteryFromFirst = Math.max(...batteries.slice(firstIndexMaxBattery + 1));
	maxJoltage.push(maxBatteryWithoutLast * 10 + maxBatteryFromFirst);
}

const sumMaxJoltage = maxJoltage.reduce((sum, joltage) => sum + joltage);

console.log(sumMaxJoltage);
