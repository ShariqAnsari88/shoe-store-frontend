module.exports = {
  'env': {
    'browser': true,
    'es2015': true,
    'node': true,
    'commonjs': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [ '.eslintrc.{js,cjs}' ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [ '@typescript-eslint', 'react', 'prettier', 'import', '@stylistic' ],
  'rules': {
    '@stylistic/indent': [ 'warn', 2 ],
    '@stylistic/space-before-blocks': 'warn',
    '@stylistic/brace-style': 'warn',
    '@stylistic/function-call-argument-newline': [ 'warn','consistent' ],
    '@stylistic/block-spacing': 'warn',
    '@stylistic/newline-per-chained-call': [ 'error', { 'ignoreChainWithDepth': 4 } ],
    '@stylistic/comma-dangle': [ 'warn', 'never' ],
    '@stylistic/no-multi-spaces': 'error',
    '@stylistic/max-statements-per-line': [ 'warn', { 'max': 5 } ],

    '@typescript-eslint/no-unused-vars': 'warn',
    'linebreak-style': [ 'error', 'unix' ],
    'quotes': [ 'warn', 'single' ],
    'semi': [ 'warn', 'never' ],
    'import/no-unresolved': 'off',
    'object-curly-spacing': [ 'warn', 'always' ],
    'array-bracket-spacing': [ 'warn', 'always' ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Built-in imports (come from NodeJS native) go first
          'external', // <- External imports
          'internal', // <- Absolute imports
          [ 'sibling', 'parent' ], // <- Relative imports, the sibling and parent types they can be mingled together
          'index', // <- index imports
          'unknown' // <- unknown
        ],
        'newlines-between': 'always',
        alphabetize: {
          /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
          order: 'asc',
          /* ignore case. Options: [true, false] */
          caseInsensitive: true
        }
      }
    ]
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json'
      }
    }
  }
}
