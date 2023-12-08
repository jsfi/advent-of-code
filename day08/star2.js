import { getMapData } from './getMapData.js';

const [getSteps, networkMap] = await getMapData()

const startNodeNames = Array.from(networkMap.keys())
    .filter(key => key.endsWith('A'));

// all paths are perfect loops that repeat every n steps
const loops = startNodeNames.map(startNodeName => getSteps(startNodeName, nodeName => nodeName.endsWith('Z')));

// euclidean algorithm
function getGreatestCommonDivisor(a, b) {
    if (b === 0) {
        return a;
    }
    return getGreatestCommonDivisor(b, a % b);
}

let leastCommonMultiple = 1;
for (const loop of loops) {
    leastCommonMultiple = (leastCommonMultiple * loop) / getGreatestCommonDivisor(leastCommonMultiple, loop);
}

console.log(leastCommonMultiple);
