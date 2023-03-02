const baseSettings = {
  extends: [
    'eslint:recommended',
    "plugin:@typescript-eslint/recommended"
  ],
  parserOptions: { project: ['tsconfig-tests.json'] },
}

module.exports = {
  ...baseSettings,
  overrides: [
    {
      ...baseSettings,
      files: ['test/**/*.ts'],
      env: { jest: true },
      plugins: ['security'],
    },
  ],
}
