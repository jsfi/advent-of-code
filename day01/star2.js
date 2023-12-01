import { getLines } from '../getLines.js';

const stringDigits = new Map([
    ['one', '1'],
    ['two', '2'],
    ['three', '3'],
    ['four', '4'],
    ['five', '5'],
    ['six', '6'],
    ['seven', '7'],
    ['eight', '8'],
    ['nine', '9'],
]);

const isDigit = (char) => !Number.isNaN(Number(char));

const lines = await getLines(import.meta.url);

let result = 0;

for (const line of lines) {
    const chars = line.split('');

    let firstDigit, lastDigit;

    loopFirstDigit: for (let index = 0; index < chars.length; index++) {
        const char = chars[index];
        if (isDigit(char)) {
            firstDigit = char;
            break;
        }

        for (const [stringDigit, digit] of stringDigits) {
            if (char === stringDigit[0] && chars.slice(index, index + stringDigit.length).join('') === stringDigit) {
                firstDigit = digit;
                break loopFirstDigit;
            }
        }
    }

    loopLastDigit: for (let index = chars.length; index >= 0; index--) {
        const char = chars[index];
        if (isDigit(char)) {
            lastDigit = char;
            break;
        }

        for (const [stringDigit, digit] of stringDigits) {
            if (
                char === stringDigit.at(-1)
                && index >= stringDigit.length
                && chars.slice(index - stringDigit.length + 1, index + 1).join('') === stringDigit
            ) {
                lastDigit = digit;
                break loopLastDigit;
            }
        }
    }

    const twoDigitNumber = Number(firstDigit + lastDigit);
    result += twoDigitNumber;
}

console.log(result);
