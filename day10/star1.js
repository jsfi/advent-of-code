import { getRegister } from './getRegister.js';

const register = await getRegister();

let sumSignalStrengths = 0;
for (let i = 0; i < register.length; i++) {
	if ((i + 20) % 40 === 0) {
		// "during the cycle" so before completion
		sumSignalStrengths += register[i - 1] * i;
	}
}

console.log(sumSignalStrengths);
