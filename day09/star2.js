import { sumOfList } from '../sumOfList.js';
import { getAllSequences } from './getAllSequences.js';

const allSequences = getAllSequences();

const extrapolatedValues = allSequences.map(sequences => {
	for (let i = sequences.length - 2; i >= 0; i--) {
		sequences[i].unshift(sequences.at(i).at(0) - sequences.at(i + 1).at(0));
	}

	return sequences[0].at(0);
});

console.log(sumOfList(extrapolatedValues));
