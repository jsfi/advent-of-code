/**
 * @param {string[][]} moves
 * @param {Record<string, Record<string, number>>} resultMap
 * @returns {number}
 */
export function getPoints(moves, resultMap) {
	let points = 0;
	for (const [first, second] of moves) {
		const pointsOfMove = resultMap[first][second];
		points += pointsOfMove;
	}

	return points;
}
