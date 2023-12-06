// jest.config.js



export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '@nestjs/mongoose': '<rootDir>/node_modules/@nestjs/mongoose',
      "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
    },
    moduleFileExtensions: ['js', 'json', 'ts'],
    "scripts": {
      "test": "jest"
    },
    "jest": {
      "preset": "ts-jest",
      "testEnvironment": "node"
    }
  };
  