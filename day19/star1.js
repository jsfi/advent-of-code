import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

const REGEX = /Blueprint (?<blueprintId>\d+): Each ore robot costs (?<oreRobotCostOre>\d+) ore. Each clay robot costs (?<clayRobotCostOre>\d+) ore. Each obsidian robot costs (?<obsidianRobotCostOre>\d+) ore and (?<obsidianRobotCostClay>\d+) clay. Each geode robot costs (?<geodeRobotCostOre>\d+) ore and (?<geodeRobotCostObsidian>\d+) obsidian./

const bluePrints = [];
for (const line of lines) {
	const { groups } = line.match(REGEX);
	bluePrints.push({
		id: Number(groups.blueprintId),
		oreRobotCostOre: Number(groups.oreRobotCostOre),
		clayRobotCostOre: Number(groups.clayRobotCostOre),
		obsidianRobotCostOre: Number(groups.obsidianRobotCostOre),
		obsidianRobotCostClay: Number(groups.obsidianRobotCostClay),
		geodeRobotCostOre: Number(groups.geodeRobotCostOre),
		geodeRobotCostObsidian: Number(groups.geodeRobotCostObsidian),
	});
}

const MAX_TIME = 24;

let sumQuality = 0;

for (const bluePrint of bluePrints) {
	const maxOre = Math.max(bluePrint.oreRobotCostOre, bluePrint.clayRobotCostOre, bluePrint.obsidianRobotCostOre, bluePrint.geodeRobotCostOre);
	const maxClay = bluePrint.obsidianRobotCostClay;
	const maxObsidian = bluePrint.geodeRobotCostObsidian;

	let currentPaths = [[
		/* minute */ 0,
		/* oreRobot */ 1, /* clayRobot */ 0, /* obsidianRobot */ 0, /* geodeRobot */ 0,
		/* ore */ 0, /* clay */ 0, /* obsidian */ 0, /* geode */ 0,
	]];

	for (let i = 0; i < MAX_TIME; i++) {
		let nextPaths = [];

		for (const state of currentPaths) {
			const [minute, oreRobots, clayRobots, obsidianRobots, geodeRobots, ore, clay, obsidian, geode] = state;

			const nextOre = ore + oreRobots;
			const nextClay = clay + clayRobots;
			const nextObsidian = obsidian + obsidianRobots;
			const nextGeode = geode + geodeRobots;

			if (ore < maxOre) {
				nextPaths.push([
					minute + 1,
					oreRobots, clayRobots, obsidianRobots, geodeRobots,
					nextOre, nextClay, nextObsidian, nextGeode
				]);
			}

			if (ore >= bluePrint.oreRobotCostOre && oreRobots < maxOre) {
				nextPaths.push([
					minute + 1,
					oreRobots + 1, clayRobots, obsidianRobots, geodeRobots,
					nextOre - bluePrint.oreRobotCostOre, nextClay, nextObsidian, nextGeode,
				]);
			}

			if (ore >= bluePrint.clayRobotCostOre && clayRobots < maxClay) {
				nextPaths.push([
					minute + 1,
					oreRobots, clayRobots + 1, obsidianRobots, geodeRobots,
					nextOre - bluePrint.clayRobotCostOre, nextClay, nextObsidian, nextGeode,
				]);
			}

			if (ore >= bluePrint.obsidianRobotCostOre && clay >= bluePrint.obsidianRobotCostClay && obsidianRobots < maxObsidian) {
				nextPaths.push([
					minute + 1,
					oreRobots, clayRobots, obsidianRobots + 1, geodeRobots,
					nextOre - bluePrint.obsidianRobotCostOre, nextClay - bluePrint.obsidianRobotCostClay, nextObsidian, nextGeode,
				]);
			}

			if (ore >= bluePrint.geodeRobotCostOre && obsidian >= bluePrint.geodeRobotCostObsidian) {
				nextPaths.push([
					minute + 1,
					oreRobots, clayRobots, obsidianRobots, geodeRobots + 1,
					nextOre - bluePrint.oreRobotCostOre, nextClay, nextObsidian - bluePrint.geodeRobotCostObsidian, nextGeode,
				]);
			}
		}

		currentPaths = nextPaths;
	}

	let maxGeodes = 0;
	for (const state of currentPaths) {
		const geodes = state.at(-1);
		if (maxGeodes < geodes) {
			maxGeodes = geodes;
		}
	}
	sumQuality += bluePrint.id * maxGeodes;
	console.log(bluePrint.id, maxGeodes, bluePrint.id * maxGeodes);
}

console.log(sumQuality);
