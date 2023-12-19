import { getWorkflowsAndRatings } from './getWorkflowsAndRatings.js';

const [ workflows ] = getWorkflowsAndRatings();

const paths = [ [ 'in' ] ];
const pathsThatEndWithAccept = [];

while (paths.length) {
	const path = paths.shift();

	const rule = path.at(-1);

	if (rule === 'A') {
		pathsThatEndWithAccept.push(path.slice(0, -1));
		continue;
	}

	if (rule === 'R') {
		continue;
	}

	const rules = workflows.get(rule);
	let workflowPath = [ ...path.slice(0, -1) ];
	for (const rule of rules) {
		if (Array.isArray(rule)) {
			paths.push([ ...workflowPath, [ true, rule ], rule.at(3) ]);
			workflowPath.push([ false, rule ]);
		} else {
			paths.push([ ...workflowPath, rule ]);
		}
	}
}

let result = 0;
for (const path of pathsThatEndWithAccept) {
	const ratingRange = {
		x: { min: 1, max: 4000 },
		m: { min: 1, max: 4000 },
		a: { min: 1, max: 4000 },
		s: { min: 1, max: 4000 },
	};

	for (const [ matches, [ property, comparator, value ] ] of path) {
		switch (comparator) {
			case '<':
				if (matches) {
					ratingRange[property].max = Math.min(ratingRange[property].max, value - 1);
				} else {
					ratingRange[property].min = Math.max(ratingRange[property].min, value);
				}
				break;
			case '>':
				if (matches) {
					ratingRange[property].min = Math.max(ratingRange[property].min, value + 1);
				} else {
					ratingRange[property].max = Math.min(ratingRange[property].max, value);
				}
				break;
		}
	}

	result += Object.values(ratingRange).reduce((product, { min, max }) => product * (max - min + 1), 1);
}

console.log(result);
