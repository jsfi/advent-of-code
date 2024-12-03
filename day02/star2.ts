import { getLines } from '../get-lines.ts';
import { getIsSafe } from './get-is-safe.ts';

const lines = getLines(import.meta.url);

const reports: Array<Array<number>> = lines.map((line) => line.split(/\s+/).map(Number));
const safeReports = reports.filter((report) => {
	let isSafe = getIsSafe(report);

	if (!isSafe) {
		// Check if a single level can be removed to make the report safe
		for (let i = 0; i < report.length; i++) {
			const isSafeWithSingleBadLevel = getIsSafe(report.slice(0, i).concat(report.slice(i + 1)));
			if (isSafeWithSingleBadLevel) {
				isSafe = true;
				break;
			}
		}
	}

	return isSafe;
});

console.log(safeReports.length);
