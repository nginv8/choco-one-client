module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '*.config.js', '*.config.cjs', '*.config.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
  },
  plugins: ['react-refresh', 'tailwindcss'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'consistent-return': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    'react/function-component-definition': 'off',
    'react/require-default-props': 'off',
    'react/button-has-type': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-boolean-value': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
};
