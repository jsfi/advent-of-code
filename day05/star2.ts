import { pageOrderingRules, updates } from './manual-data.ts';

const unorderedUpdates = updates.filter(pages => {
	const requiredPages = new Set<number>();
	for (const page of pages) {
		if (requiredPages.has(page)) {
			return true;
		}

		const requiredPagesForPage = pageOrderingRules.get(page);
		if (requiredPagesForPage) {
			for (const requiredPage of requiredPagesForPage) {
				requiredPages.add(requiredPage);
			}
		}
	}

	return false;
});

const fixedUpdates = unorderedUpdates.map((pages) => {
	return pages.toSorted((a, b) => {
		const aRequiredPages = pageOrderingRules.get(a);
		const aRequiresB = aRequiredPages?.includes(b) || false;

		const bRequiredPages = pageOrderingRules.get(b);
		const bRequiresA = bRequiredPages?.includes(a) || false;

		if (aRequiresB && bRequiresA) {
			throw new Error('Circular dependency');
		}

		if (aRequiresB) {
			return 1;
		}

		if (bRequiresA) {
			return -1;
		}

		return 0;
	});
});

const middlePageNumbers = fixedUpdates.map((pages) => pages[Math.floor(pages.length / 2)]);
console.log(middlePageNumbers.reduce((sum, number) => sum + number));
