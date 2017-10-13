var balm = require('balm');

module.exports = {
  server: {
    open: true,
    proxyTable: {
      '/api': {
        target: 'http://your.project.dev',
        changeOrigin: true
      }
    }
  },
  roots: {
    source: 'app'
  },
  paths: {
    source: {
      css: 'styles',
      js: 'scripts',
      img: 'images'
    }
  },
  styles: {
    ext: 'scss',
    autoprefixer: [
      '> 1%',
      'last 2 versions',
      'not ie < 9'
    ]
  },
  scripts: {
    entry: {
      lib: ['vue', 'vue-router', 'axios', 'vue-meta'],
      main: './app/scripts/main.js', // Entry js file
      'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry'
    },
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }],
    alias: {
      'vue$': balm.config.production ? 'vue/dist/vue.min.js' : 'vue/dist/vue.esm.js'
    }
  },
  cache: true,
  assets: {
    root: 'assets', // Replace 'assets' to your remote project root
    publicPath: 'public',
    excludes: [
      'dist/js/pdf.worker.js',
      'dist/media/*'
    ]
  }
  // More Config
  // https://github.com/balmjs/balm/blob/master/docs/configuration.md
};
