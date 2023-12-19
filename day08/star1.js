import { getMapData } from './getMapData.js';

const [ getSteps ] = getMapData();

console.log(getSteps('AAA', nodeName => nodeName === 'ZZZ'));
