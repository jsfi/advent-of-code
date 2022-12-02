import { getLines } from '../getLines.js';
import { sumCalories } from './sumCalories.js';

const lines = await getLines(import.meta.url);
const calories = sumCalories(lines);

const maxCalories = Math.max(...calories);

console.log(maxCalories);
