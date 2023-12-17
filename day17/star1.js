import { findMinimumHeatLoss } from './findMinimumHeatLoss.js';

console.log(await findMinimumHeatLoss(
	(distance) => distance < 3,
	() => true,
));
