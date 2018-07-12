module.exports = (app) => {
  if (process.env.NODE_ENV === 'production') {
    // in production, serve gzipped js bundle
    app.get('*.js', (req, res, next) => {
      req.url = `${req.url}.gz`;
      res.set('Content-Encoding', 'gzip');
      res.set('Content-Type', 'application/javascript');
      next();
    });

    // in production, serve gzipped css bundle
    app.get('*.css', (req, res, next) => {
      req.url = `${req.url}.gz`;
      res.set('Content-Encoding', 'gzip');
      res.set('Content-Type', 'text/css');
      next();
    });
  }
};
