const StaticServer = require('static-server');
const server = new StaticServer({
  rootPath: './docs',            // required, the root of the server file tree
  port: 80,               // required, the port to listen
  name: 'localhost',   // optional, will set "X-Powered-by" HTTP header
//   host: '10.0.0.100',       // optional, defaults to any interface
  cors: '*',                // optional, defaults to undefined
  followSymlink: true,      // optional, defaults to a 404 error
  templates: {
    // index: 'foo.html',      // optional, defaults to 'index.html'
    notFound: '404.html'    // optional, defaults to undefined
  }
});
 
server.start(function () {
  console.log('Server listening to', server.port);
});