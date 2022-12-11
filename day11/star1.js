import { getMonkeys } from './getMonkeys.js';

const monkeys = await getMonkeys();

const inspections = monkeys.map(() => 0);
for (let i = 0; i < 20; i++) {
	for (let m = 0; m < monkeys.length; m++) {
		const monkey = monkeys[m];
		while (monkey.items.length) {
			inspections[m]++;
			const item = monkey.items.splice(0, 1).pop();
			const updatedItem = Math.floor(monkey.operation(item) / 3);
			const nextMonkey = monkey.test(updatedItem) ? monkey.true : monkey.false;
			monkeys[nextMonkey].items.push(updatedItem);
		}
	}
}

inspections.sort((a, b) => b - a);
console.log(inspections[0] * inspections[1]);
