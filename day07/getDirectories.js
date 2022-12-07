import { getLines } from '../getLines.js';

/**
 * @typedef {Object} File
 * @property {string} name
 * @property {number} size
 */

/**
 * @typedef {Object} Directory
 * @property {string} name
 * @property {number | undefined} size
 * @property {Directory[]} directories
 * @property {File[]} files
 */

const COMMAND_CD = '$ cd ';
const COMMAND_LS = '$ ls';
const REGEX_LINE_DIR = /^dir [a-z]+$/
const REGEX_LINE_FILE = /^(?<fileSize>\d+) (?<fileName>[a-z.]+)$/

/**
 * @return {Promise<Directory[]>}
 */
export async function getDirectories() {
	const lines = await getLines(import.meta.url);

	/**
	 * @type {Directory[]}
	 */
	const directories = [];
	/**
	 * @type {Directory[]}
	 */
	const path = [];

	for (const line of lines) {
		if (line.startsWith(COMMAND_CD)) {
			const target = line.replace(COMMAND_CD, '');
			if (target === '..') {
				path.pop();
				continue;
			}
			if (target.match(/^[a-z/]+$/)) {
				const directory = {
					name: target,
					size: undefined,
					directories: [],
					files: [],
				};
				directories.push(directory);
				path.at(-1)?.directories.push(directory);
				path.push(directory);
				continue;
			}

			throw new Error('Unknown target: ' + target);
		}

		if (line === COMMAND_LS || line.match(REGEX_LINE_DIR)) {
			// ignore
			continue;
		}

		const matchFile = line.match(REGEX_LINE_FILE);
		if (matchFile) {
			const { fileName, fileSize } = matchFile.groups;
			const file = {
				name: fileName,
				size: Number(fileSize),
			};
			path.at(-1).files.push(file);
			continue;
		}

		throw new Error('Unknown line: ' + line);
	}

	let calculated = 0;
	while (directories.length !== calculated) {
		const lastCalculated = calculated;

		for (const directory of directories) {
			if (
				directory.size !== undefined
				|| (
					directory.directories.length > 0
					&& directory.directories.some(({ size }) => size === undefined)
				)
			) {
				// ignore directory on this iteration
				continue;
			}

			directory.size = directory.directories.reduce((sum, { size }) => sum + size, 0)
				+ directory.files.reduce((sum, { size }) => sum + size, 0);
			calculated++;
		}

		if (calculated === lastCalculated) {
			throw new Error('Prevent infinite loop');
		}
	}

	return directories;
}