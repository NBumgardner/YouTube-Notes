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

// Map all the expected SPA (Single Page App.) URLs to the root index.html
app.use(function (req, res, next) {
  var reqUri = url.parse(req.url);
  // Brainstorming correct regex to cover all valid URLs in the SPA.
  // var regex = /^\/[0-9]+/
  var regex_views = /^\/(choose-video|watch-video|save-notes)$/;
  // var regex_views_with_search = /^\/(choose-video(\/\w+)*|watch-video|save-notes)$/
  // var regex_youtube = /^http://(?:www\.)?youtu(?:be\.com/watch\?v=|\.be/)([\w\-]+)(&(amp;)?[\w\?=]*)?$/
  // regex = regex;
  var regex = regex_views;
  console.log(reqUri);
  if (regex.test(reqUri.pathname)) {
  //if (/^\/[0-9]+/.test(reqUri.pathname)) {
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
