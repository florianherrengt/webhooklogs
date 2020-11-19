module.exports = {
    preset: "ts-jest",
    rootDir: "src",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testEnvironment: "node",
    moduleFileExtensions: ["js", "ts", "tsx"],
    moduleDirectories: ["node_modules"],
    coverageReporters: ["html"],
    coveragePathIgnorePatterns: [],
    testMatch: ["**/?(*.)+(unit.test).[jt]s?(x)"],
    setupFilesAfterEnv: [],
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json",
        },
    },
};
