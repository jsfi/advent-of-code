import { getLines } from '../getLines.js';

export async function initJetPattern() {
	const lines = await getLines(import.meta.url);
	const jetPattern = lines[0];
	const jetPatternLength = jetPattern.length;
	let currentJet = 0;

	return () => {
		const nextPattern = jetPattern[currentJet];
		currentJet = (currentJet + 1) % jetPatternLength;
		return nextPattern;
	};
}
