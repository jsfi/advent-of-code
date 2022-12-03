export function getPoints(moves, resultMap) {
	let points = 0;
	for (const [first, second] of moves) {
		const pointsOfMove = resultMap[first][second];
		points += pointsOfMove;
	}

	return points;
}
