require('dotenv').config({ silent: true });
const spdy = require('spdy');
const fs = require('fs');
const app = require('./index');

const options = {
  key: fs.readFileSync(process.env.KEY_PATH),
  cert: fs.readFileSync(process.env.CERT_PATH),
};

const PORT = 3000;

spdy
  .createServer(options, app)
  .listen(PORT, (err) => {
    if (err) {
      return process.exit(1);
    }
    console.log('App listening on port %s', PORT);
  });
