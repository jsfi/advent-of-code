import { getRowsAndColumns } from './getRowsAndColumns.js';

const [rows, columns] = await getRowsAndColumns();

const hiddenTrees = [];

// all trees on the edges are visible
for (let y = 1; y < rows.length - 1; y++) {
	const row = rows[y];
	for (let x = 1; x < row.length - 1; x++) {
		const tree = row[x];
		const hidesTree = (treeInFront) => treeInFront >= tree;
		if (
			row.slice(0, x).some(hidesTree) // to the left
			&& row.slice(x + 1).some(hidesTree) // to the right
			&& columns[x].slice(0, y).some(hidesTree) // to the top
			&& columns[x].slice(y + 1).some(hidesTree) // to the bottom
		) {
			hiddenTrees.push([x, y]);
		}
	}
}

console.log(rows.length * rows[0].length - hiddenTrees.length);
