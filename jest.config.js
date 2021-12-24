module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/"],
};
