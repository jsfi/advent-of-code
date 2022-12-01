import { readFile } from 'node:fs/promises';

export async function getLines(relativePath, metaUrl) {
	const filePath = new URL(relativePath, metaUrl);
	const contents = await readFile(filePath, { encoding: 'utf8' });
	return contents.split('\n');
}