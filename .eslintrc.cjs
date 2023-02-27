module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    "cypress/globals": true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react/jsx-runtime"],
  overrides: [],
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: "latest",
    sourceType: "module",
    babelOptions: {
      plugins: ["@babel/plugin-syntax-import-assertions"],
      presets: ["@babel/preset-react"],
    },
  },
  plugins: ["react", "react-hooks", "react-refresh", "cypress"],
  rules: {
    "react/prop-types": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react-refresh/only-export-components": "warn",
    "no-unused-vars": "warn",
  },
  ignorePatterns: ["test.js"],
};
