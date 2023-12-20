import { getMapData } from './getMapData.js';
import { getLeastCommonMultiple } from '../getLeastCommonMultiple.js';

const [ getSteps, networkMap ] = getMapData()

const startNodeNames = Array.from(networkMap.keys())
	.filter(key => key.endsWith('A'));

// all paths are perfect loops that repeat every n steps
const loops = startNodeNames.map(startNodeName => getSteps(startNodeName, nodeName => nodeName.endsWith('Z')));

console.log(getLeastCommonMultiple(loops));
