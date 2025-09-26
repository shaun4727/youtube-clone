// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";
// import prettier from "eslint-config-prettier";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   {
//     ignores: ["dist"],
//   },
//   prettier,
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

// export default eslintConfig;

// eslint.config.mjs
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Helper for compatibility with old-style configs (like Next.js)
const compat = new FlatCompat({
    baseDirectory: __dirname,
})

export default tseslint.config(
    // 1. Ignore build outputs
    {
        ignores: ['dist', 'build', '.next', 'node_modules'],
    },

    // 2. Next.js configs (core web vitals + TS rules)
    ...compat.extends('next/core-web-vitals', 'next/typescript'),

    // 3. Main config
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                React: true,
                JSX: true,
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'jsx-a11y': jsxA11y,
            import: importPlugin,
        },
        extends: [
            eslint.configs.recommended, // ESLint defaults
            ...tseslint.configs.recommended, // TS rules
            prettier, // Disable formatting conflicts
        ],
        rules: {},
        settings: {
            react: {
                version: 'detect',
            },
        },
    }
)
