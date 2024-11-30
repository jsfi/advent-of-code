function getFileName() {
	let suffix = '';
	const testEnv = Deno.env.get('test');
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
	const contents = Deno.readTextFileSync(filePath);
	return contents.split('\n');
}
