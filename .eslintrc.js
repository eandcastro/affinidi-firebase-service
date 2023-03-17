const baseSettings = {
  extends: ['@affinidi/eslint-config'],
  parserOptions: { project: ['tsconfig-tests.json'] },
}

module.exports = {
  ...baseSettings,
  "rules": {
    'arrow-body-style': ['error', 'as-needed'],
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars-experimental": "error",
    'import/order': [
      'warn',
      {
        groups: [['external', 'builtin'], 'internal', ['sibling', 'parent'], 'index'],
        pathGroups: [
          {
            pattern: '@(nestjs)',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'prefer-const': ['error', { destructuring: 'all' }],
    quotes: 0,
    '@typescript-eslint/quotes': ['error', 'single', { allowTemplateLiterals: true }],
  },
  overrides: [
    {
      ...baseSettings,
      files: ['test/**/*.ts'],
      env: { jest: true },
      plugins: ['security'],
    },
  ],
}
