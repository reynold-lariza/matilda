var cluster = require("cluster");
var http = require("http");
var numCPUs = require("os").cpus().length;
var port = 8095;


    http.createServer(function(request, response) {
        //console.log("Request for:  " + request.url);
        response.writeHead(200);
        response.end("hello world\n");
    }).listen(port);
