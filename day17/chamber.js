export const WIDTH_CHAMBER = 7;

export function getChamber() {
	const chamber = [];

	const rockHitsRock = (rock, x, y) => {
		for (let rockY = 0; rockY < rock.length; rockY++) {
			const row = rock[rockY];

			for (let rockX = 0; rockX < row.length; rockX++) {
				const chamberRow = chamber[y + rockY];

				if (!chamberRow) {
					return false;
				}

				if (row[rockX] === '#' && chamberRow[x + rockX] === '#') {
					return true;
				}
			}
		}

		return false;
	};

	const addRockToChamber = (rock, x, y) => {
		for (let rockY = 0; rockY < rock.length; rockY++) {
			let row = rock[rockY];

			for (let rockX = 0; rockX < row.length; rockX++) {
				if (row[rockX] === '#') {
					const chamberRowIndex = y + rockY;
					let chamberRow = chamber[chamberRowIndex];

					if (!chamberRow) {
						chamberRow = Array.from({ length: WIDTH_CHAMBER }, () => '.');
						chamber[chamberRowIndex] = chamberRow;
					}
					chamberRow[x + rockX] = '#';
				}
			}
		}
	};

	return [rockHitsRock, addRockToChamber];
}
