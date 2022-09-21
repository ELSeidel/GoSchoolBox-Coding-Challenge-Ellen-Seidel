import { evaluateExpression } from './calculatorUtils';

test('add 2 positive numbers', () => {
    expect(evaluateExpression('3+2')).toBe(5)
});

test('add 2 negative numbers', () => {
    expect(evaluateExpression('-3+-2')).toBe(-5)
});

test('subtract one number from another', () => {
    expect(evaluateExpression('-3--2')).toBe(-1)
});

test('add many numbers', () => {
    expect(evaluateExpression('3+2+1+0+-8+200')).toBe(198)
});

test('multiply 2 numbers', () => {
    expect(evaluateExpression('3*-3')).toBe(-9)
});

test('multiply many numbers', () => {
    expect(evaluateExpression('3*2*1*10*3*4')).toBe(720)
});

test('divide 2 numbers', () => {
    expect(evaluateExpression('3/-6')).toBe(-0.5)
});

test('divide and multiply', () => {
    expect(evaluateExpression('42/7*6')).toBe(36)
});

test('PEMDAS for basic operations', () => {
    expect(evaluateExpression('42/6-1*8')).toBe(-1)
});

test('simple exponents', () => {
    expect(evaluateExpression('3^4')).toBe(81)
});

test('PEMDAS including exponents', () => {
    expect(evaluateExpression('1-8^2*10')).toBe(-639)
});

test('fractional exponents', () => {
    expect(evaluateExpression('256^0.25')).toBe(4)
});

test('negative exponents', () => {
    expect(evaluateExpression('10^-2')).toBe(0.01)
});
