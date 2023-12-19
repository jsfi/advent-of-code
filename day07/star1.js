import { getHandCount, getHandsWithBets, getRankingHands } from './shared.js';

const handsWithBets = getHandsWithBets();

const [ addHandWithBetByCounts, getWinnings ] = getRankingHands([
	'2', '3', '4', '5',
	'6', '7', '8', '9',
	'T', 'J', 'Q', 'K', 'A'
]);

for (const handWithBet of handsWithBets) {
	const [ orderedCounts ] = getHandCount(handWithBet[0]);
	const [ highestCount, secondHighestCount ] = orderedCounts;

	addHandWithBetByCounts(handWithBet, highestCount, secondHighestCount);
}

const winnings = getWinnings();

console.log(winnings);
