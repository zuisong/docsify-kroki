/* eslint-disable no-undef */

// babel.config.js
module.exports = api => {
  const isTest = api.env('test');
  // You can use isTest to determine what presets and plugins to use.
  if (isTest) {
    return {
      presets: [
        ["@babel/preset-env", {
          "targets": {
            "node": "current"
          }
        }],
        ["@babel/preset-typescript"]
      ],
    };
  }
  return {
    presets: [
      ["@babel/preset-env", {}],
      ["@babel/preset-typescript"]
    ],
  };
};
