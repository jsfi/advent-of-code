import { getWorkflowsAndRatings } from './getWorkflowsAndRatings.js';

const [ workflows, ratings ] = getWorkflowsAndRatings();

const inWorkflow = workflows.get('in');

let result = 0;
ratingLoop: for (const rating of ratings) {
	let currentWorkflow = inWorkflow;

	while (currentWorkflow) {
		for (const rule of currentWorkflow) {
			let outcome;

			if (Array.isArray(rule)) {
				const [ property, comparator, value, outcomeOfRule ] = rule;
				switch (comparator) {
					case '<':
						if (rating[property] < value) {
							outcome = outcomeOfRule;
						}
						break;
					case '>':
						if (rating[property] > value) {
							outcome = outcomeOfRule;
						}
						break;
				}
			} else {
				outcome = rule;
			}

			if (!outcome) {
				continue;
			}

			if (outcome === 'R') {
				currentWorkflow = workflows.get(outcome);
				continue ratingLoop;
			}

			if (outcome === 'A') {
				result += Object.values(rating).reduce((sum, value) => sum + value);
				continue ratingLoop;
			}

			currentWorkflow = workflows.get(outcome);
			break;
		}
	}
}

console.log(result);
