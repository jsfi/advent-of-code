import { getLines } from '../getLines.js';
import { sumCalories } from './sumCalories.js';

const lines = await getLines('./input.txt', import.meta.url);
const calories = sumCalories(lines);

const maxCalories = Math.max(...calories);

console.log(maxCalories);
