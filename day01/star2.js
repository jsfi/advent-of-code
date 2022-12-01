import { getLines } from '../getLines.js';
import { sumCalories } from './sumCalories.js';

const lines = await getLines('./input.txt', import.meta.url);
const calories = sumCalories(lines);

calories.sort((a, b) => b - a);

const topThreeCalories = calories.slice(0, 3);
const sumTopThreeCalories = topThreeCalories.reduce((sum, val) => sum + val);

console.log(sumTopThreeCalories);
