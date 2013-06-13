/**
 * User: jo
 * Date: 13.06.13
 * Time: 16:26
 *
 */
var express = require('express'),
	deffunc = require('default_func');

exports.engine = 'jade';
exports.views = __dirname + '/views';
exports.useBeforeController = [
	function (req, res, next) {
		console.log('Admins!');
		next();
	},
	express.logger('dev'),
	express.static(__dirname + '/public'),
	express.cookieParser('some secret here'),
	express.session(),
	express.bodyParser(),
	express.methodOverride()
];

exports.useAfterController = [
   	deffunc.catchError,
	deffunc.error404
];