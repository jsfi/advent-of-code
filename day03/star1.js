import { getLines } from '../getLines.js';

const lines = await getLines(import.meta.url);

let result = 0;
let number = '';
let numbers = [];
let symbols = new Set();

const pushNumber = (end, row) => {
    if (number) {
        numbers.push([number, end - number.length, row]);
        number = '';
    }
}

for (let row = 0; row < lines.length; row++) {
    for (let column = 0; column < lines[row].length; column++) {
        const value = lines[row][column];

        if (value.match(/\d/)) {
            number += value;
            continue;
        }

        pushNumber(column, row);

        if (value === '.') {
            continue;
        }

        symbols.add(`${column}|${row}`);
    }

    pushNumber(lines[row].length, row);
}

for (const number of numbers) {
    const [value, column, row] = number;

    numberLoop: for (let rowSymbol = row - 1; rowSymbol <= row + 1; rowSymbol++) {
        for (let columnSymbol = column - 1; columnSymbol <= column + value.length; columnSymbol++) {
            if (symbols.has(`${columnSymbol}|${rowSymbol}`)) {
                result += Number(value);
                break numberLoop;
            }
        }
    }
}

console.log(result);
