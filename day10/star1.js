import { getMapData } from './getMapData.js';

const loop = await getMapData();

console.log(Math.ceil(loop.length / 2));
