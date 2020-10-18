module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    amd: true,
    node: true
  },
  extends: [
    "react-app",
    "airbnb",
    "plugin:jsx-a11y/recommended",
    'plugin:@typescript-eslint/eslint-recommended',
    "prettier/@typescript-eslint", 
    'plugin:@typescript-eslint/recommended',
    "prettier",
    "prettier/react"
  ],
  plugins: [
    "jsx-a11y",
    "prettier"
  ],
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@src", "./src"],
          ["@components", "./src/components"],
          ["@styles", "./src/styles"],
          ["@theme", "./src/theme"],
          ["@utils", "./src/utils"],
        ],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    }
  },
  rules: {
    semi: 0,
    "react/jsx-props-no-spreading": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
    "import/prefer-default-export": "off",
    "react/no-danger": "off",
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    "prettier/prettier": [
      "error", {
        semi: false
      }
    ],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/*.setup-test-env.js", "**/*.jest-preprocess.js", "**/*.spec.ts", "**/*.spec.tsx"]}],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
   ],
  }
}
