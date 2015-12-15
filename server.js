var http = require('http');
var fs = require('fs');
var router = function(url) {
  switch (url) {
    case "/":
    case "/index":
      return function() {
        return fs.readFileSync("index.html");
      };
    case "/fuck":
      return function() {
        return 'you';
      };
    default:
      console.log('default');
      return function() {
        var data = "";
        try {
          data = fs.readFileSync(url.slice(1));
        } catch (err) {
          console.log(err);
        }
        return ("" + data);
      };
  }
};
var startServer = function(port, router) {
  http.createServer(function(request, response) {
    console.log('new request...');
    url = request.url;
    console.log(("url:" + url));
    response.writeHead(200, {"content-type": "text/html"});
    response.write(("" + router(url)()));
    response.end();
    console.log('response was sended\n');
  }).listen(port);
  console.log('server has started\n');
};
startServer(80, router);
