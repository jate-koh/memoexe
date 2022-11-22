

module.exports = {
    'root': true,

    'env': {
        'browser': true,
        'node': true
    },

    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'airbnb-typescript/base'
    ],

    'parser': '@typescript-eslint/parser',
    'parserOptions': { 
        'project': ['./tsconfig.json']
    },

    'plugins': [
        'import',
        '@typescript-eslint'
    ],

    'rules': {
        // Eslint:Recommended Rules
        'indent': 'off',
        'quotes': ['warn', 'single'],
        'semi': ['error', 'always'],

        // Typescript-Eslint
        '@typescript-eslint/indent': ['warn', 4],
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/naming-convention': 'warn',

        // AirBNB
        'no-console': 'off',
        'class-methods-use-this': 'off',

        // Import
        'import/prefer-default-export': 'off',
        'import/extensions': 'off'
    },

    'noInlineConfig': true,

}