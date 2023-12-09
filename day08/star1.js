import { getMapData } from './getMapData.js';

const [ getSteps ] = await getMapData();

console.log(getSteps('AAA', nodeName => nodeName === 'ZZZ'));
