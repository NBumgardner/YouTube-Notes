// Import modules
var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');

// Create middleware functions, from nodeJS, to set up server
var app = connect();
app.use(serveStatic('./dist'));
app.use(serveStatic('./'));

// Start server
console.log('Starting webserver on http://localhost:8080/');
http.createServer(app).listen(8080);
