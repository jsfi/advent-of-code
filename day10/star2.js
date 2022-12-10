import { getRegister } from './getRegister.js';

const register = await getRegister();

let row = '';
for (let i = 0; i < register.length; i++) {
	const registerValue = register[i];
	const pixel = i % 40 + 1;

	row += pixel >= registerValue && pixel <= registerValue + 2
		? '#' : '.';

	if (row.length === 40) {
		console.log(row);
		row = '';
	}
}
