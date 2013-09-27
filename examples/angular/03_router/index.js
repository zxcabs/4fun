/**
 * Created with JetBrains WebStorm.
 * User: reznichenko
 *
 */
var express = require('express'),
    app = express();

//config
app.set('http_port', 4010);

app.use(express.logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

app.listen(app.get('http_port'));