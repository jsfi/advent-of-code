export function getIsSafe(report: Array<number>) {
	const direction = report[0] < report[1] ? 1 : -1;

	for (let i = 0; i < report.length - 1; i++) {
		const diff = (report[i + 1] - report[i]) * direction;
		if (diff < 1 || diff > 3) {
			return false;
		}
	}

	return true;
}
