import { readFile } from 'node:fs/promises';

/**
 * @returns {string}
 */
function getFileName() {
	let suffix = '';
	const testEnv = process.env.test;
	if (testEnv !== undefined) {
		suffix = '-test';
		const testEnvNum = Number(testEnv);
		if (!Number.isNaN(testEnvNum)) {
			suffix += `-${testEnvNum}`;
		}
	}

	return `./input${suffix}.txt`;
}

/**
 * @param {string} metaUrl
 * @returns {Promise<string[]>}
 */
export async function getLines(metaUrl) {
	const filePath = new URL(getFileName(), metaUrl);
	const contents = await readFile(filePath, { encoding: 'utf8' });
	return contents.split('\n');
}
