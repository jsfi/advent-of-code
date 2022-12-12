/**
 * @param {Cell[][]} queue
 * @returns {Cell[]}
 */
export function getShortestPathToEnd(queue) {
	while (queue.length) {
		const currentPath = queue.shift();
		const currentCell = currentPath.at(-1);

		for (const child of currentCell.children) {
			const path = [...currentPath, child];

			if (child.end) {
				return path;
			}

			if (!child.visited) {
				child.visited = true;
				queue.push(path);
			}
		}
	}
}
