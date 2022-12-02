import { readFile } from 'node:fs/promises';

export async function getLines(metaUrl) {
	const filePath = new URL(`./input${Boolean(process.env.test) ? '-test' : ''}.txt`, metaUrl);
	const contents = await readFile(filePath, { encoding: 'utf8' });
	return contents.split('\n');
}
