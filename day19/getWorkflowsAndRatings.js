import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

export function getWorkflowsAndRatings() {
	const workflows = new Map();
	const ratings = [];

	for (const line of lines) {
		if (line === '') {
			continue;
		}

		if (line.startsWith('{')) {
			const rating = {};
			line.slice(1, -1).split(',')
				.forEach(value => {
					const [ key, valueString ] = value.split('=');
					rating[key] = Number(valueString);
				});
			ratings.push(rating);
			continue;
		}

		const workflow = [];
		const indexOfRules = line.indexOf('{');
		const workflowName = line.slice(0, indexOfRules);
		line.slice(indexOfRules + 1, -1).split(',')
			.forEach((rule, index, rules) => {
				if (index === rules.length - 1) {
					workflow.push(rule);
					return;
				}

				const parsedRule = rule.match(/(?<property>\w)(?<comparator>[<>])(?<value>\w+):(?<outcome>\w+)/);
				const { property, comparator, value, outcome } = parsedRule.groups;
				workflow.push([ property, comparator, Number(value), outcome ]);
			});
		workflows.set(workflowName, workflow);
	}

	return [ workflows, ratings ];
}
