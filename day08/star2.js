import { getRowsAndColumns } from './getRowsAndColumns.js';

const [rows, columns] = await getRowsAndColumns();

const scores = [];

// all trees on the edges are ignored
for (let y = 1; y < rows.length - 1; y++) {
	const row = rows[y];
	for (let x = 1; x < row.length - 1; x++) {
		const tree = row[x];
		const getVisibleTrees = (trees) => {
			const indexOfBlockingTree = trees.findIndex(t => t >= tree);
			return indexOfBlockingTree === -1
				? trees.length
				: indexOfBlockingTree + 1;
		};
		const score =
			getVisibleTrees(row.slice(0, x).reverse()) // to the left
			* getVisibleTrees(row.slice(x + 1)) // to the right
			* getVisibleTrees(columns[x].slice(0, y).reverse()) // to the top
			* getVisibleTrees(columns[x].slice(y + 1)) // to the bottom
		scores.push(score);
	}
}

console.log(Math.max(...scores));
