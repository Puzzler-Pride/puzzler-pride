import { defineConfig } from "eslint/config";

import globals from "globals";
import * as astroParser from "astro-eslint-parser";
import tsParser from "@typescript-eslint/parser";
import eslintJs from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import prettier from "eslint-plugin-prettier";

export default defineConfig(
  [
    // Global configuration
    {
      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.node,
        },
      },
    },

    // Base configs
    eslintJs.configs.recommended,

    // Prettier config
    {
      plugins: {
        prettier: prettier,
      },
      rules: {
        // disable warnings, since prettier should format on save
        "prettier/prettier": "off",
      },
    },

    // astro setup without a11y
    astro.configs.recommended,

    {
      files: ["**/*.astro"],
      languageOptions: {
        parser: astroParser,
        parserOptions: {
          parser: tsParser,
          extraFileExtensions: [".astro"],
          sourceType: "module",
          ecmaVersion: "latest",
          project: "./tsconfig.json",
        },
      },
      rules: {
        "no-undef": "off", // Disable "not defined" errors for specific Astro types that are globally available (ImageMetadata)
        "@typescript-eslint/no-explicit-any": "off", // you may want this as it can get annoying
      },
    },

    {
      files: ["**/*.js"],

      rules: {
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
      },
    },
    {
      files: ["**/*.astro"],

      languageOptions: {
        parser: astroParser,

        parserOptions: {
          parser: "@typescript-eslint/parser",
          project: "tsconfig.json",
          extraFileExtensions: [".astro"],
        },
      },

      rules: {
        "no-unused-vars": "warn",
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
      },
    },
    {
      files: ["**/*.{js,ts}"],

      languageOptions: {
        parser: tsParser,
      },

      extends: [tseslint.configs.recommended],

      rules: {
        "@typescript-eslint/no-unused-vars": ["error", {
          argsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        }],

        "@typescript-eslint/no-non-null-assertion": "off",
      },
    },

    // Ignore patterns
    {
      ignores: ["**/.astro/", "dist/**", "**/*.d.ts", ".github/"],
    },
  ]
);
