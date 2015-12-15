let http = require('http');
let fs = require('fs');     



let router = (url) => {
  switch (url) {
    case "/":
    case "/index":
      return () => fs.readFileSync("index.html");
    case "/fuck":
      return () => 'you';

    default: 
      console.log('default');
      return () => {
        let data = "";
        try {
          data = fs.readFileSync(url.slice(1));
        } catch (err){
          console.log(err);
        }
        return `${data}`;
      }
  }
}

let startServer = (port, router) => {
  http.createServer(
    (request, response) => {
    	console.log('new request...');
    	
      url = request.url;
      console.log(`url:${url}`);

      response.writeHead(200, {"content-type" : "text/html"})
    	response.write(`${router(url)()}`);
    	response.end();
    	
      console.log('response was sended\n');
    }
  ).listen(port);
  console.log('server has started\n');
}

startServer(80, router);