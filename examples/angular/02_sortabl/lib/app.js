/**
 * Created with JetBrains WebStorm.
 * User: reznichenko
 *
 */

var express = require('express'),
    app = express();

//config
app.set('http_port', 4000);

app.use(express.logger('dev'));
app.use(express.static(__dirname + '/../public'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use('/api', require('./api.js'));

module.exports = app;