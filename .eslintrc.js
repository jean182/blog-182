module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: [
    "react-app",
    "airbnb",
    "plugin:jsx-a11y/recommended",
    "prettier",
    "prettier/react"
  ],
  plugins: [
    "jsx-a11y",
    "prettier"
  ],
  rules: {
    semi: 0,
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "import/prefer-default-export": "off",
    "react/no-danger": "off",
    "prettier/prettier": [
      "error", {
        semi: false
      }
    ],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/*.setup-test-env.js", "**/*.jest-preprocess.js"]}],
  }
}
