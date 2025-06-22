// @ts-check
import eslint from "@eslint/js"
// @ts-ignore
import { flatConfig } from "@next/eslint-plugin-next"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import reactCompiler from "eslint-plugin-react-compiler"
import eslintPluginReactHooks from "eslint-plugin-react-hooks"
import tseslint from "typescript-eslint"

export default tseslint.config(
  // @ts-ignore
  flatConfig.recommended,
  flatConfig.coreWebVitals,
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/build/**",
      "eslint.config.mjs",
    ],
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      eslint.configs.recommended,
      reactCompiler.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      eslintPluginPrettierRecommended,
    ],
    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // React & hooks
      "react-compiler/react-compiler": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // TypeScript
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "warn",
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
      "@typescript-eslint/prefer-optional-chain": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],

      // Code quality
      eqeqeq: ["error", "always"],
      "prefer-const": "error",
      "no-implicit-coercion": "error",
    },
  },
)
