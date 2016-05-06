// Import modules
var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');
var fs = require('fs');
var url = require('url');

// Create middleware functions, from nodeJS, to set up server
var app = connect();
app.use(serveStatic('./dist'));
app.use(serveStatic('./'));

// TODO: Debug refresh feature. Currently goes to *Choose-View*, instead of the current view.
//   Problem may lie elsewhere, such as index.html. Errors look like:
//   "watch-video:44 Uncaught TypeError: Cannot read property 'change2ViewWatch' of undefined"

// Map all the expected SPA (Single Page App.) URLs to the root index.html
app.use(function (req, res, next) {
  var reqUri = url.parse(req.url);
  // regex only recognizes URLs of the three views.
  var regex = /^\/(choose-video|watch-video|save-notes)$/;

  //if (true) { // To skip test: Comment-in this, comment-out below line.
  if (regex.test(reqUri.pathname)) { // Good regex. Bug occurs on refresh.
    fs.readFile('./dist/index.html', { encoding: 'utf8' }, function (err, data) {
      if (err) {
        throw err;
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Content-Length', data.length);
      res.write(data, 'utf8', function (err) {
        if (err) {
          throw err;
        }
        res.end();
      });
    });
  } else {
    next();
  }
});

// Start server
console.log('Starting webserver on http://localhost:8080/');
http.createServer(app).listen(8080);
