import { readFileSync } from 'node:fs';

function getFileName() {
	let suffix = '';
	const testEnv = process.env.TEST;
	if (testEnv !== undefined) {
		suffix = '-test';
		const testEnvNum = Number(testEnv);
		if (!Number.isNaN(testEnvNum)) {
			suffix += `-${testEnvNum}`;
		}
	}

	return `./input${suffix}.txt`;
}

export function getLines(metaUrl: string): string[] {
	const filePath = new URL(getFileName(), metaUrl);
	const contents = readFileSync(filePath, { encoding: 'utf-8' });
	return contents.split('\n');
}
