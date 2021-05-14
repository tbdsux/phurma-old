module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 8
  },
  extends: ['eslint:recommended', 'plugin:cypress/recommended'],
  rules: {
    'no-console': 'off'
  },
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        react: {
          version: 'detect'
        }
      },
      env: {
        browser: true,
        node: true,
        es6: true
      },

      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        // 'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended'
      ],
      rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        // 'jsx-11y/anchor-is-valid': 'off', (NOTE: Until Next.js solves this, it won't be enabled)
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/explicit-module-boundary-types': 'off'
        // '@typescript-eslint/explicit-function-return-type': [
        //   'warn',
        //   {
        //     allowExpressions: true,
        //     allowConciseArrowFunctionExpressionsStartingWithVoid: true
        //   }
        // ]
      }
    }
  ]
};
