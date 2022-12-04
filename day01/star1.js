import { getCalories } from './getCalories.js';

const calories = await getCalories();
const maxCalories = Math.max(...calories);

console.log(maxCalories);
