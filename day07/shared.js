import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

export function getHandsWithBets() {
	return lines.map(line => {
		const [ hand, bet ] = line.split(' ');
		return [ hand.split(''), Number(bet) ];
	});
}

export function getRankingHands(cards) {
	const rankingHands = new Map(
		[
			'HIGH_CARD', 'ONE_PAIR', 'TWO_PAIRS',
			'THREE_OF_A_KIND', 'FULL_HOUSE',
			'FOUR_OF_A_KIND', 'FIVE_OF_A_KIND'
		].map((hand, index) => [ hand, index ])
	);

	const ranks = Array.from({ length: rankingHands.size }, () => []);

	const addHandWithBetByCounts = (handWithBet, highestCount, secondHighestCount) => {
		let rank;
		if (highestCount === 5) {
			rank = rankingHands.get('FIVE_OF_A_KIND');
		} else if (highestCount === 4) {
			rank = rankingHands.get('FOUR_OF_A_KIND');
		} else if (highestCount === 3 && secondHighestCount === 2) {
			rank = rankingHands.get('FULL_HOUSE');
		} else if (highestCount === 3) {
			rank = rankingHands.get('THREE_OF_A_KIND');
		} else if (highestCount === 2 && secondHighestCount === 2) {
			rank = rankingHands.get('TWO_PAIRS');
		} else if (highestCount === 2) {
			rank = rankingHands.get('ONE_PAIR');
		} else {
			rank = rankingHands.get('HIGH_CARD');
		}
		ranks[rank].push(handWithBet);
	}

	const rankingCards = new Map(cards.map((card, index) => [ card, index ]))

	const getWinnings = () => {
		for (const rank of ranks) {
			rank.sort(([ aHand ], [ bHand ]) => {
				for (let cardIndex = 0; cardIndex < aHand.length; cardIndex++) {
					const aCard = rankingCards.get(aHand[cardIndex]);
					const bCard = rankingCards.get(bHand[cardIndex]);
					if (aCard !== bCard) {
						return aCard - bCard;
					}
				}
			});
		}

		return ranks.flat().reduce((sum, [ , bet ], index) => sum + bet * (index + 1), 0);
	}

	return [ addHandWithBetByCounts, getWinnings ];
}

export function getHandCount(hand) {
	let handCount = new Map();

	for (const card of hand) {
		handCount.set(card, (handCount.get(card) || 0) + 1);
	}

	const orderedCounts = Array.from(handCount.values()).sort((a, b) => b - a);

	return [ orderedCounts, handCount ];
}
