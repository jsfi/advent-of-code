import { getLines } from '../get-lines.ts';
import { getIsSafe} from './get-is-safe.ts';

const lines = getLines(import.meta.url);

const reports: Array<Array<number>> = lines.map((line) => line.split(/\s+/).map(Number));
const safeReports = reports.filter(getIsSafe);

console.log(safeReports.length);
