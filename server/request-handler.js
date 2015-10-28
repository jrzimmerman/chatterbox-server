
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var messageData = {results:[]};

exports.requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  if(request.method === "GET" && request.url === "/classes/messages") {
    var statusCode = 200;
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = "application/json";
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(messageData));

  } else if (request.method === 'OPTIONS') {

    var statusCode = 200;
    var headers = defaultCorsHeaders;

    headers['Content-Type'] = "application/json";
    response.writeHead(statusCode, headers);
    response.end();

  } else if(request.method === "POST") {
    
    var message = '';
    var statusCode = 201;
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = "application/json";
    response.writeHead(statusCode, headers);
    request.on('data',function(data){
      message += data;
    });
    request.on('end', function(){
      messageData.results.push(JSON.parse(message));
      response.end(message);
    });

  } else {
    
    var statusCode = 404;
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = "application/json";
    response.writeHead(statusCode, headers);
    response.end('404');

  }
};
