export const ERROR_EXPRESSION = 'Invalid Expression!'
export const OPERATION_CHARACTERS = ['/', '*', '-', '+', '^'];

export function evaluateExpression(expression) {
    let parsedArray = parseInput(expression);

    if (parsedArray === ERROR_EXPRESSION) {
        return ERROR_EXPRESSION;
    }

    else {
        parsedArray = handleExpoents(parsedArray);
        parsedArray = handleMultiplcationAndDivision(parsedArray);
        parsedArray = handleAdditionAndSubtraction(parsedArray);
        return parsedArray;
    }
}

function handleExpoents(parsedArray) {
    // If we already have a number, return that value
    if (typeof (parsedArray) === 'number') {
        return parsedArray;
    }

    // if parsed array has only one value, display that value
    if (parsedArray.length === 1) {
        return parsedArray[0];
    }

    // This case should never happen! We should catch it in the parsing logic
    if (parsedArray.length === 0 || parsedArray.length === 2) {
        throw 'Error while parsing. Please try again.';
    }

    let newStack = [];

    // Look for exponent symbol. We know our operations
    // occur every other value in the array, so we start at i = 1
    // and increase counter by 2
    for (let i = 1; i < parsedArray.length - 1; i += 2) {
        if (parsedArray[i] === "^") {
            const newVal = parsedArray[i - 1] ** parsedArray[i + 1];
            newStack.push(newVal);
            if (i < parsedArray.length - 2) {
                newStack = newStack.concat(parsedArray.slice(i + 2));
            }
            return handleMultiplcationAndDivision(newStack);
        }

        else {
            newStack.push(parsedArray[i - 1]);
            newStack.push(parsedArray[i]);
        }
    }
    newStack.push(parsedArray[parsedArray.length - 1]);
    return newStack;
}

function handleMultiplcationAndDivision(parsedArray) {
    // If we already have a number, return that value
    if (typeof (parsedArray) === 'number') {
        return parsedArray;
    }

    // if parsed array has only one value, display that value
    if (parsedArray.length === 1) {
        return parsedArray[0];
    }

    // This case should never happen! We should catch it in the parsing logic
    if (parsedArray.length === 0 || parsedArray.length === 2) {
        throw 'Error while parsing. Please try again.';
    }

    let newStack = [];

    // Look for multiplication and division. We know our operations
    // occur every other value in the array, so we start at i = 1
    // and increase counter by 2
    for (let i = 1; i < parsedArray.length - 1; i += 2) {
        if (parsedArray[i] === "*") {
            const newVal = parsedArray[i - 1] * parsedArray[i + 1];
            newStack.push(newVal);
            if (i < parsedArray.length - 2) {
                newStack = newStack.concat(parsedArray.slice(i + 2));
            }
            return handleMultiplcationAndDivision(newStack);
        }

        else if (parsedArray[i] === "/") {
            const newVal = parsedArray[i - 1] / parsedArray[i + 1];
            newStack.push(newVal);
            if (i < parsedArray.length - 2) {
                newStack = newStack.concat(parsedArray.slice(i + 2));
            }
            return handleMultiplcationAndDivision(newStack)
        }

        else {
            newStack.push(parsedArray[i - 1]);
            newStack.push(parsedArray[i]);
        }
    }
    newStack.push(parsedArray[parsedArray.length - 1]);
    return newStack;
}

function handleAdditionAndSubtraction(parsedArray) {
    // If we already have a number, return that value
    if (typeof (parsedArray) === 'number') {
        return parsedArray;
    }

    // if parsed array has only one value, display that value
    if (parsedArray.length === 1) {
        return parsedArray[0];
    }

    // This case should never happen! We should catch it in the parsing logic
    if (parsedArray.length === 0 || parsedArray.length === 2) {
        throw 'Error while parsing. Please try again.'
    }

    let newStack = [];

    // Look for addition and subtraction. We know our operations
    // occur every other value in the array, so we start at i = 1
    // and increase counter by 2. Additionally, at this point we
    // should have nothing but numbers and +/- symbols
    for (let i = 1; i < parsedArray.length - 1; i += 2) {
        if (parsedArray[i] === "+") {
            const newVal = parsedArray[i - 1] + parsedArray[i + 1];
            newStack.push(newVal);
            if (i < parsedArray.length - 2) {
                newStack = newStack.concat(parsedArray.slice(i + 2));
            }
            return handleAdditionAndSubtraction(newStack);
        }
        else {
            const newVal = parsedArray[i - 1] - parsedArray[i + 1];
            newStack.push(newVal);
            if (i < parsedArray.length - 2) {
                newStack = newStack.concat(parsedArray.slice(i + 2));
            }
            return handleAdditionAndSubtraction(newStack)
        }
    }
    return newStack;
}

// Parses the expression into numbers and operations. 
// Preserves order of the numbers and operations
// Returns an array with number and operation alternating
// ex "34+9-3*2" returns [34, '+', 9, '-', 3, '*', 2]
function parseInput(expression) {

    expression = convertExpoentialNotation(expression);

    let currentNum = '';
    let inputStack = [];

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        // we hit an operation character
        if (OPERATION_CHARACTERS.includes(char)) {

            // If the operation occurs and there is no number on the left,
            // it can only be +/- since it could indicate positive/negative value
            if (currentNum === '' && (char === '+' || char === '-')) {
                currentNum = char;
            }

            else {
                const validNumber = isValidNum(currentNum);

                if (!validNumber) {
                    console.log('1');
                    console.log(inputStack);
                    console.log(currentNum);
                    return ERROR_EXPRESSION;
                }

                inputStack.push(parseFloat(currentNum));
                inputStack.push(char);
                currentNum = '';
            }
        }

        // did not hit an operation, add to existing number
        else {
            currentNum = currentNum + char;
        }
    }

    // Check if string after the last operation is a number.
    const validNumber = isValidNum(currentNum);
    if (!validNumber) {
        console.log('2');
        console.log(inputStack);
        console.log(currentNum);
        return ERROR_EXPRESSION;
    }
    inputStack.push(parseFloat(currentNum));

    console.log(inputStack);

    return inputStack;

}

// Any string we check here can only have characters
// 0-9, +, -, .
function isValidNum(input) {
    if (
        input === '' || 
        input === '.' || 
        input === '+' || 
        input === '-'
    ) {
        return false;
    }

    const numDecimals = (input.split('.').length) - 1;
    const numAdditions = (input.split('+').length) - 1;
    const numSubtractions = (input.split('-').length) - 1;

    // If there is an addition sign, it must be at the start of the expression
    if (numAdditions === 1 && input[0] != '+') {
        return false;
    }

    // If there is a subtraction sign, it must be at the start of the expression
    if (numSubtractions === 1 && input[0] != '-') {
        return false;
    }

    // A number can only contain one decimal, plus, and minus sign
    if (numDecimals > 1 || numAdditions > 1 || numSubtractions > 1) {
        return false;
    }

    return true;
}

function convertExpoentialNotation(expression) {
    let convertedExpression = '';
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        if (char === 'e') {
            convertedExpression += '*';
            convertedExpression += '10';
            convertedExpression += '^';
        } else {
            convertedExpression += char;
        }
    }
    return convertedExpression;
}