import { getLines } from '../getLines.js';
import { sumOfList } from '../sumOfList.js';
import { sumCalories } from './sumCalories.js';

const lines = await getLines(import.meta.url);
const calories = sumCalories(lines);

calories.sort((a, b) => b - a);

const topThreeCalories = calories.slice(0, 3);
const sumTopThreeCalories = sumOfList(topThreeCalories);

console.log(sumTopThreeCalories);
