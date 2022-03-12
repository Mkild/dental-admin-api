module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  plugins: ['eslint-plugin-promise', 'eslint-plugin-import', 'eslint-plugin-node'],
  extends: ['eslint:recommended'],
  parser: 'babel-eslint',
  rules: {
    'no-unused-vars': 'off',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    quotes: [1, 'single'], // 引号类型 `` "" ''
    semi: [2, 'never'], // 语句强制分号结尾
    'space-before-function-paren': [0, 'always'], // 函数定义时括号前面要不要有空格
  },
}
