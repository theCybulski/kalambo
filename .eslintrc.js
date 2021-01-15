module.exports = {
  extends: ['react-app', 'airbnb', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  env: {
    jest: true,
    browser: true
  },
  plugins: ['@typescript-eslint', 'import', 'react', 'react-hooks', 'jsx-a11y', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
      alias: {
        map: [
          ['components', './src/components'],
          ['views', './src/views'],
          ['shared', './src/shared'],
          ['utils', './src/utils'],
          ['api', './src/api'],
          ['assets', './src/assets']
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    }
  },
  rules: {
    'no-nested-ternary': 'off',
    'camelcase': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' } ],
    '@typescript-eslint/no-use-before-define': ['error'],
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    'comma-dangle': ['error', 'always-multiline'],
    'global-require': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/extensions': [2, 'never', { json: 'always' }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.stories.{ts,js,tsx,jsx}',
          "**/*.test.{ts,js,tsx,jsx}",
          "**/__mocks__/*"
        ],
      },
    ],
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    'indent': 'off',
    'jsx-a11y/anchor-is-valid': ['error', { components: ['Link'], specialLink: ['to'] }],
    'jsx-a11y/label-has-associated-control': 'error',
    'jsx-a11y/label-has-for': 'off',
    'no-unused-vars': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'react/button-has-type': 'error',
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': ['error', { extensions: [ '.tsx', '.js' ] }],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/prop-types': 'off',
    'react/sort-comp': 'off',
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'react/jsx-props-no-spreading': 'off'
  },
};
