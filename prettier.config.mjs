// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
    trailingComma: 'all',
    tabWidth: 4,
    singleQuote: true,
    printWidth: 80,
    useTabs: false,
    semi: true,
    singleQuote: true,
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'always',
    jsxSingleQuote: false,
    htmlWhitespaceSensitivity: 'css',
    proseWrap: 'preserve',
}

export default config
