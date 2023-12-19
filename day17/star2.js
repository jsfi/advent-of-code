import { findMinimumHeatLoss } from './findMinimumHeatLoss.js';

console.log(findMinimumHeatLoss(
	(distance) => distance < 10,
	(distance) => distance > 3,
));
