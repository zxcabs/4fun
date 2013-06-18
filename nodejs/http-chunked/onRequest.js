var fs = require('fs');


var ch = '123456890qwertyuiiopasdfghjklzxcvbnm'.split('');
function random() {
	var l = Math.random() * ch.length | 0,
		s = new Array(l);

	while (l) {
		s[l] = ch[Math.random() * ch.length | 0];
		l -= 1;
	}

	return s.join('');
}

function is(req, method, url) {
	url = url || '/';
	return req.method === method && req.url === url;
}

function bind(req, res) {
	var count = 0,
		timer;

	res.setHeader('Transfer-Encoding', 'chunked');

	function send() {
		console.log('send');
		count += 1;
		
		var msg = new Buffer('Hello WORLD!!! msg: ' + count + '; ' + random() + '\r\n');

		res.write(new Buffer((msg.length - 2).toString(16) + '\r\n'));
		res.write(msg);

		timer = setTimeout(send, 1000);
	}

	req.on('close', function () {
		clearTimeout(timer);
		console.log('request close');
		res.end('0\r\n');
	});

	res.write(parseInt(50, 10).toString(16) + '\r\n');
	res.write(new Buffer(50) + '\r\n');

	send();
}

module.exports = function onRequest(req, res) {
	console.log(req.method + ': ' + req.url);

	if (is(req, 'GET', '/')) {
		var rs = fs.createReadStream('./index.html');
		rs.pipe(res);
	} else if (is(req, 'GET', '/msg')) {
		bind(req, res);
	} else {
		res.end();
	}
};