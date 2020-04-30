module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/recommended',
        '@vue/standard',
        '@vue/typescript'
    ],
    rules: {
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        semi: [
            2,
            'always'
        ],
        indent: 'off',
        'vue/script-indent': ['warn', 4, {
            baseIndent: 1
        }],
        'vue/html-indent': ['warn', 4, {
            baseIndent: 1
        }],
        'space-before-function-paren': [
            'error', { anonymous: 'ignore', named: 'never' }
        ],
        'vue/html-closing-bracket-spacing': ['error', {
            startTag: 'never',
            endTag: 'never',
            selfClosingTag: 'always'
        }],
        'vue/no-v-html': 0,
        'generator-star-spacing': 0,
        'object-curly-spacing': ['error', 'always', { objectsInObjects: true }],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error', {
            vars: 'all',
            args: 'none',
            ignoreRestSiblings: false
        }],
        camelcase: 'off'
    },
    parserOptions: {
        parser: '@typescript-eslint/parser'
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                jest: true
            }
        }
    ]
};
