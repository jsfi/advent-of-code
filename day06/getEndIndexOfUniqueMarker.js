import { getLines } from '../getLines.js';

export async function getEndIndexOfUniqueMarker(markerLength) {
	const lines = await getLines(import.meta.url);

	for (const dataStream of lines) {
		for (let i = 0; i < dataStream.length - markerLength - 1; i++) {
			const endIndex = i + markerLength;
			if (new Set(dataStream.slice(i, endIndex)).size === markerLength) {
				console.log(endIndex);
				break;
			}
		}
	}
}
