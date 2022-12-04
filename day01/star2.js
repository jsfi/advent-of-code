import { sumOfList } from '../sumOfList.js';
import { getCalories } from './getCalories.js';

const calories = await getCalories();

calories.sort((a, b) => b - a);

const topThreeCalories = calories.slice(0, 3);
const sumTopThreeCalories = sumOfList(topThreeCalories);

console.log(sumTopThreeCalories);
