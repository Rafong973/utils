const terser = require('@rollup/plugin-terser')

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'lib/bundle.js',
    format: 'cjs'
  },
  plugins: [terser()]
}
