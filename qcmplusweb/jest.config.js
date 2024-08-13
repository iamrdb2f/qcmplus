module.exports = {
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!axios)/',
    ],
    moduleFileExtensions: ['js', 'jsx'],
    testEnvironment: 'jsdom',
};
