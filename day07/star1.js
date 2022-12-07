import { getDirectories } from './getDirectories.js';

const SMALL_DIRECTORY_SIZE = 100000;

const directories = await getDirectories();

let sumOfSmallDirectories = 0;
for (const directory of directories) {
	const directorySize = directory.size;
	if (directorySize <= SMALL_DIRECTORY_SIZE) {
		sumOfSmallDirectories += directorySize;
	}
}

console.log(sumOfSmallDirectories);
