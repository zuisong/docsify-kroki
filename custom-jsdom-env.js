import { TestEnvironment } from 'jest-environment-jsdom'
/**
 * A custom environment to set the TextEncoder
 */
module.exports = class CustomTestEnvironment extends TestEnvironment {
  async setup() {
    await super.setup();
    if (typeof this.global.TextEncoder === "undefined") {
      const { TextEncoder, TextDecoder } = require("util");
      this.global.TextEncoder = TextEncoder;
      this.global.TextDecoder = TextDecoder;
    }
  }
};
