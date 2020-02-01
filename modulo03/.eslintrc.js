module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier":"error",
    "class-methods-use-this": "off", // Controler acessa sem ser por this
    "no-param-reassign": "off", // Sequillize faz isso
    "camlcase": "off", // Alguns momentos var chama nome_assim
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }] // para o caso dos middleware que podem ter o next e não usar
  },
};
