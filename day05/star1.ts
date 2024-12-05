import { pageOrderingRules, updates } from './manual-data.ts';

const orderedUpdates = updates.filter(pages => {
	const requiredPages = new Set<number>();
	for (const page of pages) {
		if (requiredPages.has(page)) {
			return false;
		}

		const requiredPagesForPage = pageOrderingRules.get(page);
		if (requiredPagesForPage) {
			for (const requiredPage of requiredPagesForPage) {
				requiredPages.add(requiredPage);
			}
		}
	}

	return true;
});

const middlePageNumbers = orderedUpdates.map((pages) => pages[Math.floor(pages.length / 2)]);
console.log(middlePageNumbers.reduce((sum, number) => sum + number));
