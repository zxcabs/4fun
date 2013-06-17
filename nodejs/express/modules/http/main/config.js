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
exports.strict_routing = true;

exports.before = [
	express.logger('dev'),
	express.static(__dirname + '/public'),
	express.cookieParser('some secret here'),
	express.session(),
	express.bodyParser(),
	express.methodOverride()
];

exports.after = [
   	deffunc.catchError,
	deffunc.error404
];