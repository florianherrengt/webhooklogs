module.exports = {
    rootDir: ".build/src",
    testEnvironment: "node",
    moduleFileExtensions: ["js"],
    moduleDirectories: ["node_modules"],
    coverageReporters: ["html"],
    coveragePathIgnorePatterns: [],
    testMatch: ["**/?(*.)+(test).[jt]s?(x)"],
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
};
