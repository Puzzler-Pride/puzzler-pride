import { defineConfig, globalIgnores } from "eslint/config";

import { node, browser } from "globals";
import parser from "astro-eslint-parser";
import tsParser from "@typescript-eslint/parser";
import { configs } from "@eslint/js";

import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: configs.recommended,
  allConfig: configs.all
});

export default defineConfig([
  globalIgnores([".astro/*"]),
  {
    languageOptions: {
      globals: {
        ...node,
        ...browser,
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
