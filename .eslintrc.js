
module.exports = {
    'root': true,

    'env': {
        'browser': true,
        'node': true
    },

    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],

    'parser': '@typescript-eslint/parser',
    'parserOptions': { 
        'project': ['./tsconfig.json']
    },

    'plugins': ['@typescript-eslint'],

    'rules': {
        'indent': ['warn', 4],
        'quotes': ['warn', 'single'],
        'semi': ['error', 'always'],
    },

    'noInlineConfig': true,

}