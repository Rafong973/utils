const terser = require('@rollup/plugin-terser')

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/bundle.js',
      format: 'es'
    },
    {
      file: 'lib/bundle.min.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()]
    }
  ]
}
