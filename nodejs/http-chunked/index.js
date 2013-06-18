var http = require('http');

var server = http.createServer(require('./onRequest'));
server.listen(3210, function (err){
	if (err) return console.error(err);
	console.log('server listening 3210');
});