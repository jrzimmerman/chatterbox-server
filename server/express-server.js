var express = require('express');
var app = express();

var messageData = {results:[]};

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

headers['Content-Type'] = "application/json";

app.get("/classes/messages", function(req, res) {
  res.set(headers);
  res.status(200);
  res.send(JSON.stringify(messageData));
});

app.post("/classes/messages", function(req, res) {
  res.set(headers);
  res.status(201);
  var message = '';
  req.on('data',function(data){
      message += data;
    });
  req.on('end', function(){
    messageData.results.push(JSON.parse(message));
    res.end(message);
  });
});

app.options("/classes/messages", function(req, res) {
  res.set(headers);
  res.status(200).send();
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server listening at http://%s:%s', host, port);
});