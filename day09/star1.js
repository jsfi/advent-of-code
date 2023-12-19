import { sumOfList } from '../sumOfList.js';
import { getAllSequences } from './getAllSequences.js';

const allSequences = getAllSequences();

const extrapolatedValues = allSequences.map(sequences => {
	for (let i = sequences.length - 2; i >= 0; i--) {
		sequences[i].push(sequences.at(i).at(-1) + sequences.at(i + 1).at(-1));
	}

	return sequences.at(0).at(-1)
});

console.log(sumOfList(extrapolatedValues));
