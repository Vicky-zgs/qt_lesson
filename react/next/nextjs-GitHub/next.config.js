const withCss = require('@zeit/next-css')
// withLess

if ( typeof require !== 'undefined' ) {
  // 扩展.css
  require.extensions['.css'] = (file) => {}
}

module.exports = withCss({})
// module.exports = withLess(withCss({}))