export function sumCalories(lines) {
	const elves = [];
	let elf = [];
	for (const line of lines) {
		if (line === '') {
			elves.push(elf);
			elf = [];
		}

		elf.push(Number(line));
	}
	elves.push(elf);

	return elves.map(elf => elf.reduce((sum, val) => sum + val));
}