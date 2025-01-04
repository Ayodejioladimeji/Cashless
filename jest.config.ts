
import nextJest from "next/jest";

const createJestConfig = nextJest({
    dir: "./",
});

const customJestConfig = {
    testEnvironment: "jsdom",
    testPathIgnorePatterns: ["/node_modules/", "/.next/"],
    moduleDirectories: ["node_modules", "<rootDir>/"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
       
        "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
        "^.+\\.(png|jpg|jpeg|gif|webp|svg|ico|bmp|tiff)$": "<rootDir>/__mocks__/fileMock.ts",
    },
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest", 
    },
    collectCoverage: true,
    collectCoverageFrom: [
        "components/**/*.{ts,tsx}",
        "app/**/*.{ts,tsx}",
        "!**/node_modules/**",
        "!**/.next/**",
    ],
    coverageReporters: ["text", "lcov"],
};

export default createJestConfig(customJestConfig);
