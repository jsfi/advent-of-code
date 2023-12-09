import { getHandCount, getHandsWithBets, getRankingHands } from './shared.js';

const handsWithBets = await getHandsWithBets();

const [ addHandWithBetByCounts, getWinnings ] = getRankingHands([
	'J',
	'2', '3', '4', '5',
	'6', '7', '8', '9',
	'T', 'Q', 'K', 'A'
]);

for (const handWithBet of handsWithBets) {
	const [ orderedCounts, handCount ] = getHandCount(handWithBet[0]);
	let [ highestCount, secondHighestCount ] = orderedCounts;

	const jokerCount = handCount.get('J');
	if (jokerCount) {
		if (jokerCount === 5) {
			// do nothing
		} else if (jokerCount === highestCount || jokerCount === secondHighestCount) {
			highestCount += secondHighestCount;
			secondHighestCount = orderedCounts[2];
		} else {
			highestCount += jokerCount;
		}
	}

	addHandWithBetByCounts(handWithBet, highestCount, secondHighestCount);
}

console.log(getWinnings());
