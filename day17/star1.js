import { findMinimumHeatLoss } from './findMinimumHeatLoss.js';

console.log(findMinimumHeatLoss(
	(distance) => distance < 3,
	() => true,
));
