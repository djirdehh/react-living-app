module.exports = {
  stripPrefix: 'build/',
  staticFileGlobs: [
    'build/*.html',
    'build/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,ico}',
    'build/icons/*',
    'build/manifest.json',
    'build/static/**/!(*map*)'
  ],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: 'build/service-worker.js',
  navigateFallback: '/index.html',
  runtimeCaching: [{
    urlPattern: /api\.teleport\.org/,
    handler: 'networkFirst'
  }]
};
