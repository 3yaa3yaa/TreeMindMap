module.exports = {
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.js"],
  moduleNameMapper: {
    "^.+\\.(css|less)$": "<rootDir>/test/CSSStub.js",
    "^.+\\.(png)$": "<rootDir>/test/PNGStub.js",
  },
};
