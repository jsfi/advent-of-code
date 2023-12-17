import { findMinimumHeatLoss } from './findMinimumHeatLoss.js';

console.log(await findMinimumHeatLoss(
	(distance) => distance < 10,
	(distance) => distance > 3,
));
