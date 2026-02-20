const {
  defineConfig,
  globalIgnores,
} = require("eslint/config");

const globals = require("globals");
const parser = require("astro-eslint-parser");
const tsParser = require("@typescript-eslint/parser");
const js = require("@eslint/js");

const {
  FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

module.exports = defineConfig([  
  globalIgnores([".astro/*"]),
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },

      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {},
    },

    extends: compat.extends(
      "eslint:recommended",
      "plugin:astro/recommended",
      "plugin:astro/jsx-a11y-strict",
    ),

    rules: {},
  }, {
    files: ["**/*.js"],

    rules: {
      "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    },
  }, {
    files: ["**/*.astro"],

    languageOptions: {
      parser: parser,

      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },

    rules: {
      "no-unused-vars": "warn",
      "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    },
  }, {
    files: ["**/*.ts"],

    languageOptions: {
      parser: tsParser,
    },

    extends: compat.extends("plugin:@typescript-eslint/recommended"),

    rules: {
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      }],

      "@typescript-eslint/no-non-null-assertion": "off",
    },
  }, {
    files: ["**/*.astro/*.js", "*.astro/*.js"],

    languageOptions: {
      parser: tsParser,
    },
  }
]);
