module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$'
};