module.exports = {
  collectCoverage: true,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "d.ts"],
  testPathIgnorePatterns: ["/lib/", "/node_modules/"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
