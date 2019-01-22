// jshint node: true
'use strict';

const PORT = 8081;
const conf = require('./gulp.json');
const express = require('express');
const path = require('path');
const app = express();

const proxy = require('express-http-proxy');
const urlParser = require('url');

app.use(express.static(path.join(__dirname, conf.dist.root)));

// Routes

function proxyForPath(path) {
  const apiServer = 'localhost:8080';
  app.use(path, proxy(apiServer, {
    forwardPath: function (req, res) {
      const parsedUrl = urlParser.parse(req.url);
      const forwardPath = parsedUrl.path;
      return path + forwardPath;
    }
  }));
}

proxyForPath('/api');
proxyForPath('/static');

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, conf.dist.root, conf.dist.filenames.templates));
});

// Start serving

app.listen(PORT, function () {
  console.log('Server started at http://localhost:%s', PORT);
});
