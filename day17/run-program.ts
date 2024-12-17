export function runProgram(
	program: number[],
	initRegisterA: bigint,
	registerB = 0n,
	registerC = 0n,
) {
	const output: Array<number> = [];
	let instructionPointer = 0;
	let registerA = initRegisterA;

	const getLiteralValue = () => program[instructionPointer + 1];

	const getBigLiteralValue = () => BigInt(getLiteralValue());

	const getComboValue = () => {
		const operand = getLiteralValue();

		switch (operand) {
			case 0:
			case 1:
			case 2:
			case 3:
				return BigInt(operand);
			case 4:
				return registerA;
			case 5:
				return registerB;
			case 6:
				return registerC;
			default:
				throw new Error('Invalid operand');
		}
	};

	// division
	const adv = () => {
		registerA = registerA >> getComboValue();
		instructionPointer += 2;
	};

	// bitwise XOR
	const bxl = () => {
		registerB = registerB ^ getBigLiteralValue();
		instructionPointer += 2;
	};

	// modulo 8
	const bst = () => {
		registerB = getComboValue() & 7n;
		instructionPointer += 2;
	};

	const jnz = () => {
		if (registerA === 0n) {
			instructionPointer += 2;
		} else {
			instructionPointer = getLiteralValue();
		}
	};

	const bxc = () => {
		registerB = registerB ^ registerC;
		instructionPointer += 2;
	};

	const out = () => {
		output.push(Number(getComboValue() & 7n));
		instructionPointer += 2;
	};

	const bdv = () => {
		registerB = registerA >> getComboValue();
		instructionPointer += 2;
	};

	const cdv = () => {
		registerC = registerA >> getComboValue();
		instructionPointer += 2;
	};

	const operations = [adv, bxl, bst, jnz, bxc, out, bdv, cdv];

	while (true) {
		const opcode = program[instructionPointer];
		if (opcode === undefined) {
			return [output, registerA, registerB, registerC] as const;
		}

		operations[Number(opcode)]();
	}
}
