import { getDirectories } from './getDirectories.js';

const TOTAL = 70000000;
const MIN_AVAILABLE = 30000000;

const directories = await getDirectories();

const sizes = directories.map(directory => directory.size);
const maxSize = Math.max(...sizes);
const minFree = MIN_AVAILABLE - (TOTAL - maxSize);

let minSize = maxSize;
for (const size of sizes) {
	if (size > minFree && size < minSize) {
		minSize = size;
	}
}

console.log(minSize);
